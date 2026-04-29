import { useQuery } from '@tanstack/react-query';
import { useGenAIClient } from '../useGenAIClient';
import { UseInteractionBaseCreateHook } from '../../types';
import type { Interactions } from '@google/genai';

export const useInteractionBaseCreateQuery = (options: UseInteractionBaseCreateHook) => {
  const client = useGenAIClient();
  const queryKey = ['@google/genai', 'interactionBase', options.model, options.prompt] as const;
  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await client.interactions.create({
        model: options.model,
        input: options.prompt,
        api_version: options.api_version ?? '',
      });

      return response as Interactions.Interaction;
    },
    staleTime: options.cacheConfig?.staleTime ?? 1000 * 60 * 5,
    gcTime: options.cacheConfig?.gcTime ?? 1000 * 60 * 12,
    enabled: options.trigger ?? true,
  });
};
