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
    /** Trigger content generation */
    generate: mutation.mutate,
    /** Trigger content generation and await promise */
    generateAsync: mutation.mutateAsync,
    /** Last successful result */
    data: mutation.data ?? null,
    /** Last submitted input variables used for the generation */
    variables: mutation.variables,
    /** Convenience: extracted text from last response */
    text: mutation.data?.text ?? '',
    /** True while the mutation is currently executing */
    isPending: mutation.isPending,
    /** True if the last mutation resulted in an error */
    isError: mutation.isError,
    /** True if the last mutation succeeded */
    isSuccess: mutation.isSuccess,
    /** Error object from the last failed mutation (if any) */
    error: mutation.error,
    /** Current mutation status (idle | pending | error | success) */
    status: mutation.status,
    /** Reset mutation state */
    reset: mutation.reset,
  };
}

export const useGenerateContentQuery = (options: UseGenerateContentOptionsQuery) => {
  const client = useGenAIClient();
  const queryKey = [
    '@google/genai',
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
    queryKey,
    data: query.data ?? null,
    text: query.data?.text ?? '',
    isPending: query.isPending,
    isError: query.isError,
    isSuccess: query.isSuccess,
    error: query.error,
    status: query.status,
    refetch: query.refetch,
  };
};
