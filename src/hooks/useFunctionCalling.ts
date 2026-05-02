import { useMutation } from '@tanstack/react-query';
import { useGenAIClient } from './useGenAIClient.js';
import type { UseFunctionCallingOptions } from '../types/index.js';
import type { Content, FunctionCallingConfigMode } from '@google/genai';

interface FunctionCallingResult {
  text: string;
  turns: number;
}

const MAX_TURNS = 10;

/**
 * Hook for automatic multi-turn function calling with Gemini.
 * Registers your local handler functions, and the hook automatically executes
 * them when the model requests it, looping until the model returns a final response.
 *
 * @example
 * ```tsx
 * const { call, data, isPending, error } = useFunctionCalling({
 *   model: 'gemini-2.5-flash',
 *   tools: [{ functionDeclarations: [getWeatherDeclaration] }],
 *   handlers: {
 *     getWeather: async ({ city }) => ({ temperature: 22, unit: 'C' }),
 *   },
 * });
 *
 * <button onClick={() => call('What is the weather in London?')}>Ask</button>
 * {data && <p>{data.text}</p>}
 * ```
 */
export function useFunctionCalling(options: UseFunctionCallingOptions) {
  const client = useGenAIClient();
  const { model, tools, handlers, systemInstruction, temperature } = options;

  const mutation = useMutation<FunctionCallingResult, Error, string>({
    mutationFn: async (prompt: string): Promise<FunctionCallingResult> => {
      // Build initial conversation history
      const contents: Content[] = [{ role: 'user', parts: [{ text: prompt }] }];
      let turns = 0;

      while (turns < MAX_TURNS) {
        turns++;

        const response = await client.models.generateContent({
          model,
          contents,
          config: {
            tools,
            toolConfig: {
              functionCallingConfig: {
                mode: 'AUTO' as FunctionCallingConfigMode,
              },
            },
            ...(systemInstruction && { systemInstruction }),
            ...(temperature !== undefined && { temperature }),
          },
        });

        const candidate = response.candidates?.[0];
        if (!candidate) throw new Error('No candidate returned from model');

        const parts = candidate.content?.parts ?? [];

        // Add model response to history
        contents.push({
          role: 'model',
          parts,
        });

        // Check for function calls
        const functionCalls = parts.filter((p) => p.functionCall != null);

        if (functionCalls.length === 0) {
          // No function calls — model gave final text response
          const text = response.text ?? '';
          return { text, turns };
        }

        // Execute each function call and collect results
        const functionResponses: Content = {
          role: 'user',
          parts: await Promise.all(
            functionCalls.map(async (part) => {
              const fc = part.functionCall!;
              const handlerName = fc.name ?? '';
              const handler = handlers[handlerName];

              let result: unknown;
              if (handler) {
                result = await handler((fc.args ?? {}) as Record<string, unknown>);
              } else {
                result = { error: `No handler registered for "${handlerName}"` };
              }

              return {
                functionResponse: {
                  id: fc.id ?? '',
                  name: handlerName,
                  response: { result },
                },
              };
            }),
          ),
        };

        contents.push(functionResponses);
      }

      throw new Error(`Function calling loop exceeded ${MAX_TURNS} turns`);
    },
  });

  return {
    /** Trigger function-call generation */
    call: mutation.mutate,
    /** Trigger and await result */
    callAsync: mutation.mutateAsync,
    /** Final result after all function calls complete */
    data: mutation.data ?? null,
    /** Final text response */
    text: mutation.data?.text ?? '',
    /** Number of model turns taken */
    turns: mutation.data?.turns ?? 0,
    variables: mutation.variables,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    reset: mutation.reset,
  };
}
