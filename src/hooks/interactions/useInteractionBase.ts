import { useMutation, useQuery } from '@tanstack/react-query';
import { useGenAIClient } from '../useGenAIClient';
import { UseInteractionBaseCreateHookQuery, UseInteractionBaseCreateHookMutate } from '../../types';
import type { Interactions } from '@google/genai';

/**
 * Hook for declarative interaction creation using the Vertex AI Interactions API.
 *
 * @remarks
 * This hook automatically creates an interaction when enabled and caches
 * the result by `model` and `prompt`. It exposes the underlying query state
 * via `interactionResponse` so calling components can render loading, error,
 * and success states.
 *
 * @example
 * ```tsx
 * const { interactionResponse, queryKey } = useInteractionBaseCreateQuery({
 *   model: 'gemini-2.5-flash',
 *   prompt: 'Translate this sentence into Tamil.',
 *   systemInstruction: 'You are a translator.',
 * });
 *
 * const text = interactionResponse.data?.output?.[0]?.content?.[0]?.text ?? '';
 * ```
 */
export const useInteractionBaseCreateQuery = (options: UseInteractionBaseCreateHookQuery) => {
  const client = useGenAIClient();
  const queryKey = ['@google/genai', 'interactionBase', options.model, options.prompt] as const;
  return {
    interactionResponse: useQuery({
      queryKey,
      queryFn: async () => {
        const response = await client.interactions.create({
          model: options.model,
          input: options.prompt,
          api_version: options.api_version ?? '',
          ...(options.systemInstruction && {
            systemInstruction: options.systemInstruction,
          }),
          ...(options.temperature !== undefined && {
            temperature: options.temperature,
          }),
        });

        return response as Interactions.Interaction;
      },
      staleTime: options.cacheConfig?.staleTime ?? 1000 * 60 * 5,
      gcTime: options.cacheConfig?.gcTime ?? 1000 * 60 * 12,
      enabled: options.trigger ?? true,
    }),
    queryKey,
  };
};

/**
 * Hook for imperative interaction creation and deletion.
 *
 * @remarks
 * Use this hook when you need manual control over creation and deletion
 * workflows. The `create` object exposes generation helpers, while the
 * `delete` object exposes interaction cleanup helpers.
 *
 * @example
 * ```tsx
 * const { create, delete: remove } = useInteractionBaseMutate({
 *   model: 'gemini-2.5-flash',
 *   systemInstruction: 'You are a helpful assistant.',
 * });
 *
 * create.generate('Hello from the user');
 * remove.delete({ interactionID: 'example-id' });
 * ```
 */
export const useInteractionBaseMutate = (options: UseInteractionBaseCreateHookMutate) => {
  const client = useGenAIClient();

  const mutationCreate = useMutation({
    mutationFn: async (prompt: string) => {
      const response = await client.models.generateContent({
        model: options.model,
        contents: prompt,
        config: {
          ...(options.systemInstruction && {
            systemInstruction: options.systemInstruction,
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
    onError: (err) => {
      options.onCreateError?.(err);
    },
  });

  const mutationDelete = useMutation({
    mutationFn: async ({
      interactionID,
      interactionDeleteParams,
    }: {
      interactionID: string;
      interactionDeleteParams?: Interactions.InteractionDeleteParams;
    }) => {
      const res = await client.interactions.delete(interactionID, {
        ...(interactionDeleteParams?.api_version !== undefined && {
          api_version: interactionDeleteParams?.api_version,
        }),
      });

      return res;
    },
    onError: (err) => {
      options.onDeleteError?.(err);
    },
  });

  return {
    create: {
      /**
       * Function to trigger the generation.
       * @param {string} prompt - The input text for the model.
       */
      generate: mutationCreate.mutate,
      /**
       * Async version of generate that returns a Promise.
       * @param {string} prompt - The input text for the model.
       */
      generateAsync: mutationCreate.mutateAsync,
      /** The raw result from the Gemini API. Defaults to null if no data. */
      data: mutationCreate.data ?? null,
      /** The prompt string used for the current/last generation. */
      variables: mutationCreate.variables,
      /** Convenience field containing only the text part of the response. */
      text: mutationCreate.data?.text ?? '',
      /** Boolean state indicating if the request is currently in flight. */
      isPending: mutationCreate.isPending,
      /** Boolean state indicating if the last request failed. */
      isError: mutationCreate.isError,
      /** Boolean state indicating if the last request was successful. */
      isSuccess: mutationCreate.isSuccess,
      /** The error object if the request failed. */
      error: mutationCreate.error,
      /** The current status of the mutation ('idle' | 'pending' | 'error' | 'success'). */
      status: mutationCreate.status,
      /** Function to reset the mutation state to its initial values. */
      reset: mutationCreate.reset,
    },
    delete: {
      /**
       * Function to delete an interaction.
       * @param {string} variables.interactionID - The ID of the interaction to delete
       * @param variables.interactionDeleteParams - Optional delete parameters
       */
      delete: mutationDelete.mutate,
      /**
       * Async version of delete that returns a Promise.
       * @param {string} variables.interactionID - The ID of the interaction to delete
       * @param variables.interactionDeleteParams - Optional delete parameters
       */
      deleteAsync: mutationDelete.mutateAsync,
      /** The raw result from the Gemini API. Defaults to null if no data. */
      data: mutationDelete.data ?? null,
      /** The prompt string used for the current/last generation. */
      variables: mutationDelete.variables,
      /** Boolean state indicating if the request is currently in flight. */
      isPending: mutationDelete.isPending,
      /** Boolean state indicating if the last request failed. */
      isError: mutationDelete.isError,
      /** Boolean state indicating if the last request was successful. */
      isSuccess: mutationDelete.isSuccess,
      /** The error object if the request failed. */
      error: mutationDelete.error,
      /** The current status of the mutation ('idle' | 'pending' | 'error' | 'success'). */
      status: mutationDelete.status,
      /** Function to reset the mutation state to its initial values. */
      reset: mutationDelete.reset,
    },
  };
};
