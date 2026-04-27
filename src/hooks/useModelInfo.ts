import { useQuery } from '@tanstack/react-query';
import { useGenAIClient } from './useGenAIClient.js';

/**
 * Hook to fetch metadata about a Gemini model.
 * Result is cached via TanStack Query.
 *
 * @example
 * ```tsx
 * const { data, isLoading } = useModelInfo('gemini-2.0-flash');
 * if (data) console.log(data.displayName, data.inputTokenLimit);
 * ```
 */
export function useModelInfo(model: string) {
  const client = useGenAIClient();

  return useQuery({
    queryKey: ['genai', 'model', model],
    queryFn: () => client.models.get({ model }),
    staleTime: 1000 * 60 * 60, // 1 hour — model metadata rarely changes
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    enabled: Boolean(model),
  });
}
