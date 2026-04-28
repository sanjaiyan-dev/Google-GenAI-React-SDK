import type { GoogleGenAI, GenerateContentResponse, Tool, Part } from '@google/genai';
import type { QueryClient, ThrowOnError } from '@tanstack/react-query';

// ─── Provider ────────────────────────────────────────────────────────────────

export interface GenAIProviderConfig {
  /** Your Gemini API key */
  apiKey: string;
  /** Optional existing QueryClient. A new one is created if not provided. */
  queryClient?: QueryClient;
  children: React.ReactNode;
}

// ─── Generate Content ─────────────────────────────────────────────────────────

export interface UseGenerateContentOptions {
  /** Gemini model name, e.g. 'gemini-2.0-flash' */
  model: string;
  /** Optional system instruction */
  systemInstruction?: string;
  /** Max output tokens */
  maxOutputTokens?: number;
  /** Temperature 0–2 */
  temperature?: number;
  /**
   * Callback function triggered when the generation process encounters an error.
   * Useful for global error handling, logging, or showing toast notifications.
   *
   * @param error - The error object thrown during the request.
   */
  onError?: (error: Error) => void | Promise<void>;
}

export interface UseGenerateContentOptionsQuery extends UseGenerateContentOptions {
  prompt: string;
  cacheConfig: {
    staleTime?: number;
    gcTime?: number;
  };
  trigger?: boolean;
  retryCount?: number;
}

export interface GenerateResult {
  response: GenerateContentResponse;
  text: string;
}

// ─── Stream Content ───────────────────────────────────────────────────────────

export interface UseStreamContentOptions {
  model: string;
  systemInstruction?: string;
  temperature?: number;
}

export interface StreamState {
  chunks: string[];
  fullText: string;
  isStreaming: boolean;
  error: Error | null;
}

export interface UseStreamContentHook extends UseStreamContentOptions {
  onError: Promise<void>;
}

// ─── Chat ─────────────────────────────────────────────────────────────────────

export type ChatRole = 'user' | 'model';

export interface ChatMessage {
  role: ChatRole;
  text: string;
  id: string;
}

export interface UseChatOptions {
  model: string;
  systemInstruction?: string;
  temperature?: number;
  /** Use streaming responses. Default: true */
  streaming?: boolean;
}

// ─── Function Calling ─────────────────────────────────────────────────────────

export type FunctionHandler = (args: Record<string, unknown>) => Promise<unknown> | unknown;

export interface UseFunctionCallingOptions {
  model: string;
  tools: Tool[];
  /** Map of function name → implementation */
  handlers: Record<string, FunctionHandler>;
  systemInstruction?: string;
  temperature?: number;
}

// ─── Re-exports from @google/genai for convenience ───────────────────────────

export type { GoogleGenAI, GenerateContentResponse, Tool, Part };
