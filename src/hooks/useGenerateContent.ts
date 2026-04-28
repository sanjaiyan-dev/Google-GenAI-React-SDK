import { useMutation, useQuery } from '@tanstack/react-query';
import { useGenAIClient } from './useGenAIClient.js';
import type {
  UseGenerateContentOptions,
  GenerateResult,
  UseGenerateContentOptionsQuery,
} from '../types/index.js';

/**
 * Hook for one-shot content generation using Gemini.
 *
 * @example
 * ```tsx
 * const { generate, data, isPending, error } = useGenerateContentMutate({
 *   model: 'gemini-2.0-flash',
 * });
 *
 * <button onClick={() => generate('Tell me a joke')}>Generate</button>
 * {isPending && <Spinner />}
 * {data && <p>{data.text}</p>}
 * ```
 */

export function useGenerateContentMutate(options: UseGenerateContentOptions) {
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
    onError: (err) => {
      options.onError?.(err);
    },
  });

  return {
    /**
     * Function to trigger the generation.
     * @param {string} prompt - The input text for the model.
     */
    generate: mutation.mutate,
    /**
     * Async version of generate that returns a Promise.
     * @param {string} prompt - The input text for the model.
     */
    generateAsync: mutation.mutateAsync,
    /** The raw result from the Gemini API. Defaults to null if no data. */
    data: mutation.data ?? null,
    /** The prompt string used for the current/last generation. */
    variables: mutation.variables,
    /** Convenience field containing only the text part of the response. */
    text: mutation.data?.text ?? '',
    /** Boolean state indicating if the request is currently in flight. */
    isPending: mutation.isPending,
    /** Boolean state indicating if the last request failed. */
    isError: mutation.isError,
    /** Boolean state indicating if the last request was successful. */
    isSuccess: mutation.isSuccess,
    /** The error object if the request failed. */
    error: mutation.error,
    /** The current status of the mutation ('idle' | 'pending' | 'error' | 'success'). */
    status: mutation.status,
    /** Function to reset the mutation state to its initial values. */
    reset: mutation.reset,
  };
}

export const useGenerateContentQuery = (options: UseGenerateContentOptionsQuery) => {
  const client = useGenAIClient();
  const queryKey = [
    '@google/genai',
    'generateContent',
    options.prompt,
    options.model,
    options.systemInstruction,
    options.temperature,
  ] as const;
  const query = useQuery({
    queryKey,
    queryFn: async (): Promise<GenerateResult> => {
      const response = await client.models.generateContent({
        model: options.model,
        contents: options.prompt,
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

      return {
        response,
        text,
      };
    },
    staleTime: options.cacheConfig.staleTime ?? 1000 * 60 * 5,
    gcTime: options.cacheConfig.gcTime ?? 1000 * 60 * 12,
    enabled: options.trigger ?? true,
    retry: options.retryCount ?? 3,
  });

  return {
    /** The unique key used for this query in the cache. */
    queryKey,
    /** The raw result from the Gemini API. Defaults to null if no data. */
    data: query.data ?? null,
    /** Convenience field containing only the text part of the response. */
    text: query.data?.text ?? '',
    /** Boolean state indicating if the query is currently fetching. */
    isPending: query.isPending,
    /** Boolean state indicating if the query encountered an error. */
    isError: query.isError,
    /** Boolean state indicating if the query was successful. */
    isSuccess: query.isSuccess,
    /** The error object if the query failed. */
    error: query.error,
    /** The current status of the query ('pending' | 'error' | 'success'). */
    status: query.status,
    /** Function to manually trigger a refetch of the data. */
    refetch: query.refetch,
  };
};
