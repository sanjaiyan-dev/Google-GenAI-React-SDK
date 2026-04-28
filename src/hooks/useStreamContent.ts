import { useCallback, useRef, useState } from 'react';
import { useGenAIClient } from './useGenAIClient.js';
import type { UseStreamContentOptions, StreamState } from '../types/index.js';

const INITIAL_STATE: StreamState = {
  chunks: [],
  fullText: '',
  isStreaming: false,
  error: null,
};

/**
 * Hook for streaming content generation. Accumulates chunks progressively.
 *
 * @example
 * ```tsx
 * const { stream, fullText, isStreaming, error, reset } = useStreamContent({
 *   model: 'gemini-2.0-flash',
 * });
 *
 * <button onClick={() => stream('Explain quantum entanglement')}>Stream</button>
 * {isStreaming && <p>Generating...</p>}
 * <p>{fullText}</p>
 * ```
 */
export function useStreamContent(options: UseStreamContentOptions) {
  const client = useGenAIClient();
  const [state, setState] = useState<StreamState>(INITIAL_STATE);
  const abortRef = useRef<(() => void) | null>(null);

  const stream = useCallback(
    async (prompt: string) => {
      // Abort any in-progress stream
      abortRef.current?.();
      let aborted = false;
      abortRef.current = () => {
        aborted = true;
      };

      setState({ chunks: [], fullText: '', isStreaming: true, error: null });

      try {
        const streamResult = await client.models.generateContentStream({
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

        for await (const chunk of streamResult) {
          if (aborted) break;
          const chunkText = chunk.text ?? '';
          if (chunkText) {
            setState((prev) => ({
              ...prev,
              chunks: [...prev.chunks, chunkText],
              fullText: prev.fullText + chunkText,
            }));
          }
        }

        if (!aborted) {
          setState((prev) => ({ ...prev, isStreaming: false }));
        }
      } catch (err) {
        if (!aborted) {
          setState((prev) => ({
            ...prev,
            isStreaming: false,
            error: err instanceof Error ? err : new Error(String(err)),
          }));
        }
      }
    },
    [client, options.model, options.systemInstruction, options.temperature],
  );

  const abort = useCallback(() => {
    abortRef.current?.();
    setState((prev) => ({ ...prev, isStreaming: false }));
  }, []);

  const reset = useCallback(() => {
    abortRef.current?.();
    setState(INITIAL_STATE);
  }, []);

  return {
    /** Start streaming generation */
    stream,
    /** Abort in-progress stream */
    abort,
    /** Reset all state */
    reset,
    /** Array of received text chunks */
    chunks: state.chunks,
    /** Full concatenated text so far */
    fullText: state.fullText,
    /** Whether streaming is in progress */
    isStreaming: state.isStreaming,
    /** Error if stream failed */
    error: state.error,
  };
}
