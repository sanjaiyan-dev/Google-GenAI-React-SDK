import { useCallback, useEffect, useRef, useState } from 'react';
import type { Chat } from '@google/genai';
import { useGenAIClient } from './useGenAIClient.js';
import type { ChatMessage, UseChatOptions } from '../types/index.js';

function generateId(): string {
  return crypto.randomUUID();
}

/**
 * Multi-turn chat hook. Maintains session state and message history.
 * Supports both streaming and non-streaming responses.
 *
 * @example
 * ```tsx
 * const { sendMessage, messages, isResponding, reset } = useChat({
 *   model: 'gemini-2.0-flash',
 *   streaming: true,
 * });
 *
 * // Send a message
 * sendMessage('Hello, how are you?');
 *
 * // Render messages
 * {messages.map(m => <div key={m.id}>{m.role}: {m.text}</div>)}
 * ```
 */
export function useChat(options: UseChatOptions) {
  const { model, systemInstruction, temperature, streaming = true } = options;
  const client = useGenAIClient();
  const chatRef = useRef<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isResponding, setIsResponding] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  // Tracks the id of the model message being streamed
  const streamingMsgIdRef = useRef<string | null>(null);

  // Create (or recreate) the chat session
  const createSession = useCallback(() => {
    chatRef.current = client.chats.create({
      model,
      config: {
        ...(systemInstruction && { systemInstruction }),
        ...(temperature !== undefined && { temperature }),
      },
    });
  }, [client, model, systemInstruction, temperature]);

  // Initialize session on mount
  useEffect(() => {
    createSession();
  }, [createSession]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!chatRef.current) createSession();
      const chat = chatRef.current!;

      setError(null);
      setIsResponding(true);

      // Add user message immediately
      const userMsg: ChatMessage = { role: 'user', text, id: generateId() };
      setMessages((prev) => [...prev, userMsg]);

      try {
        if (streaming) {
          // Add placeholder model message
          const modelMsgId = generateId();
          streamingMsgIdRef.current = modelMsgId;
          setMessages((prev) => [...prev, { role: 'model', text: '', id: modelMsgId }]);

          const result = await chat.sendMessageStream({ message: text });
          for await (const chunk of result) {
            const chunkText = chunk.text ?? '';
            if (chunkText) {
              setMessages((prev) =>
                prev.map((m) => (m.id === modelMsgId ? { ...m, text: m.text + chunkText } : m)),
              );
            }
          }
          streamingMsgIdRef.current = null;
        } else {
          const response = await chat.sendMessage({ message: text });
          const responseText = response.text ?? '';
          setMessages((prev) => [...prev, { role: 'model', text: responseText, id: generateId() }]);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        // Remove the empty streaming placeholder on error
        if (streamingMsgIdRef.current) {
          setMessages((prev) => prev.filter((m) => m.id !== streamingMsgIdRef.current));
          streamingMsgIdRef.current = null;
        }
      } finally {
        setIsResponding(false);
      }
    },
    [createSession, streaming],
  );

  const reset = useCallback(() => {
    createSession();
    setMessages([]);
    setError(null);
    setIsResponding(false);
  }, [createSession]);

  return {
    /** Send a message to the chat session */
    sendMessage,
    /** All messages in the current session */
    messages,
    /** Whether the model is currently generating a response */
    isResponding,
    /** Error from the last message, if any */
    error,
    /** Reset the session and clear history */
    reset,
    /** Number of messages */
    messageCount: messages.length,
  };
}
