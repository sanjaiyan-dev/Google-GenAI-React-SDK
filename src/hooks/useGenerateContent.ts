import { useMutation } from '@tanstack/react-query';
import { useGenAIClient } from './useGenAIClient.js';
import type { UseGenerateContentOptions, GenerateResult } from '../types/index.js';

/**
 * Hook for one-shot content generation using Gemini.
 *
 * @example
 * ```tsx
 * const { generate, data, isPending, error } = useGenerateContent({
 *   model: 'gemini-2.0-flash',
 * });
 *
 * <button onClick={() => generate('Tell me a joke')}>Generate</button>
 * {isPending && <Spinner />}
 * {data && <p>{data.text}</p>}
 * ```
 */
export function useGenerateContent(options: UseGenerateContentOptions) {
  const client = useGenAIClient();

  const mutation = useMutation<GenerateResult, Error, string>({
    mutationFn: async (prompt: string): Promise<GenerateResult> => {
      const response = await client.models.generateContent({
        model: options.model,
        contents: prompt,
        config: {
          ...(options.systemInstruction && {
            systemInstruction: options.systemInstruction,
          }),
          ...(options.maxOutputTokens && {
            maxOutputTokens: options.maxOutputTokens,
          }),
          ...(options.temperature !== undefined && {
            temperature: options.temperature,
          }),
        },
      });

      const text = response.text ?? '';
      return { response, text };
    },
  });

  return {
    /** Trigger content generation */
    generate: mutation.mutate,
    /** Trigger content generation and await promise */
    generateAsync: mutation.mutateAsync,
    /** Last successful result */
    data: mutation.data ?? null,
    /** Convenience: extracted text from last response */
    text: mutation.data?.text ?? '',
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    /** Reset mutation state */
    reset: mutation.reset,
  };
}
