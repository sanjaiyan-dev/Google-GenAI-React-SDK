import type {
  GoogleGenAI,
  GenerateContentResponse,
  Tool,
  Part,
  Interactions,
  Model,
  Models,
} from '@google/genai';
import type { QueryClient, experimental_streamedQuery } from '@tanstack/react-query';

// ─── Provider ────────────────────────────────────────────────────────────────

/**
 * Configuration for the GenAI provider component.
 * This configures the underlying Google GenAI client and optionally provides a custom TanStack QueryClient.
 */
export interface GenAIProviderConfig {
  /** Your Gemini API key from Google AI Studio. */
  apiKey: string;
  /**
   * Optional existing TanStack QueryClient.
   * If not provided, a new one will be created and managed by the provider.
   */
  queryClient?: QueryClient;
  /** React components that will have access to the GenAI context. */
  children: React.ReactNode;
}

interface CacheConfig {
  /** Time in milliseconds until the data is considered stale. Defaults to 5 minutes. */
  staleTime?: number;
  /** Time in milliseconds until unused data is removed from the cache. Defaults to 12 minutes. */
  gcTime?: number;
}

// ─── Generate Content ─────────────────────────────────────────────────────────

/**
 * Base options for content generation hooks.
 */
export interface UseGenerateContentOptions {
  /**
   * The Gemini model to use (e.g., 'gemini-2.0-flash').
   * See Google documentation for available models.
   */
  model: Parameters<Models['generateContent']>['0']['model'];
  /**
   * Optional system instruction to guide the model's behavior across all interactions.
   */
  systemInstruction?: string;
  /**
   * Maximum number of tokens to include in the output.
   */
  maxOutputTokens?: Model['outputTokenLimit'];
  /**
   * Controls the randomness of the output.
   * Values range from 0 to 2. Lower values are more deterministic.
   */
  temperature?: Model['temperature'];
  /**
   * Optional callback function triggered when a generation request fails.
   * In `useGenerateContentMutate`, this is passed directly to the mutation.
   *
   * @param error - The error object thrown during the request.
   */
  onError?: (error: Error) => void | Promise<void>;
}

/**
 * Specific options for the `useGenerateContentQuery` hook.
 * Inherits model configuration from UseGenerateContentOptions but includes query-specific settings.
 */
export interface UseGenerateContentOptionsQuery extends Omit<UseGenerateContentOptions, 'onError'> {
  /** The input prompt for the generation. Changes to this prompt will trigger a new fetch. */
  prompt: string;
  /** Configuration for TanStack Query's caching behavior. */
  cacheConfig?: CacheConfig;
  /**
   * If false, the query will not automatically execute.
   * Useful for manual triggers or waiting for other data.
   * Defaults to true.
   */
  trigger?: boolean;
  /**
   * Number of retry attempts if the fetch fails.
   * Defaults to 3.
   */
  retryCount?: number;
}

/**
 * The standardized result object for content generation.
 */
export interface GenerateResult {
  /** The full raw response object from the @google/genai SDK. */
  response: GenerateContentResponse;
  /** The extracted text content from the first candidate. */
  text: string;
}

// ─── Stream Content ───────────────────────────────────────────────────────────

/**
 * Options for streaming content generation.
 */
export interface UseStreamContentOptions {
  /** Gemini model name. */
  model: string;
  /** Optional system prompt. */
  systemInstruction?: string;
  /** Sampling temperature. */
  temperature?: Model['temperature'];
}

export interface UseStreamContentQueryOptions extends UseStreamContentOptions {
  prompt?: string;
  refetchMode?: Parameters<typeof experimental_streamedQuery>['0']['refetchMode'];
  cacheConfig?: CacheConfig;
  /**
   * If false, the query will not automatically execute.
   * Useful for manual triggers or waiting for other data.
   * Defaults to true.
   */
  trigger?: boolean;
}

/**
 * Represents the reactive state of an active stream.
 */
export interface StreamState {
  /** Array of all text chunks received so far. */
  chunks: string[];
  /** The concatenated full text from all chunks. */
  fullText: string;
  /** True while the stream is actively receiving data. */
  isStreaming: boolean;
  /** Error object if the stream fails. */
  error: Error | null;
}

/**
 * Return type for the `useStreamContent` hook.
 */
export interface UseStreamContentHook extends UseStreamContentOptions {
  /** Promise that resolves when the stream completes or rejects on error. */
  onError: Promise<void>;
}

// ─── Chat ─────────────────────────────────────────────────────────────────────

/**
 * Role of the message author in a chat conversation.
 */
export type ChatRole = 'user' | 'model';

/**
 * Represents a single message in a chat history.
 */
export interface ChatMessage {
  /** The role of the author. */
  role: ChatRole;
  /** The text content of the message. */
  text: string;
  /** A unique identifier for the message, useful for React keys. */
  id: string;
}

/**
 * Configuration options for the `useChat` hook.
 */
export interface UseChatOptions {
  /** Gemini model name. */
  model: string;
  /** Initial system instructions for the chat model. */
  systemInstruction?: string;
  /** Sampling temperature. */
  temperature?: Model['temperature'];
  /**
   * Whether to stream responses back from the model.
   * Defaults to true.
   */
  streaming?: boolean;
}

// ─── Function Calling ─────────────────────────────────────────────────────────

/**
 * Signature for a custom function implementation that can be called by the model.
 */
export type FunctionHandler = (args: Record<string, unknown>) => Promise<unknown> | unknown;

/**
 * Configuration for integrating function calling into a model interaction.
 */
export interface UseFunctionCallingOptions {
  /** Gemini model name. */
  model: string;
  /** List of tool declarations (functions) the model can invoke. */
  tools: Tool[];
  /**
   * A mapping of function names to their local Javascript implementations.
   */
  handlers: Record<string, FunctionHandler>;
  /** Optional system instructions. */
  systemInstruction?: string;
  /** Sampling temperature. */
  temperature?: Model['temperature'];
}

// ─── Interaction API ──────────────────────────────────────────────────────
export interface UseInteractionBaseCreateHook {
  prompt: Parameters<Interactions['create']>['0']['input'];
  api_version?: Parameters<Interactions['create']>['0']['api_version'];
  model: Interactions.Model;
  cacheConfig?: CacheConfig;
  trigger?: boolean;
}

// ─── Re-exports from @google/genai for convenience ───────────────────────────

export type { GoogleGenAI, GenerateContentResponse, Tool, Part };
