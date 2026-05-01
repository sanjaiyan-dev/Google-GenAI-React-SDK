/**
 * @fileoverview Type definitions for the Google GenAI React SDK
 *
 * This module provides comprehensive TypeScript type definitions and interfaces for integrating
 * Google's Gemini API with React applications using TanStack Query for state management.
 * It supports multiple authentication methods (API Key and Vertex AI), various content generation
 * patterns (query-based, mutation-based, and streaming), and advanced features like function calling
 * and chat interactions.
 *
 * @module types
 *
 * @remarks
 * The types are organized into logical sections:
 * - **Provider**: Configuration for GenAI provider initialization
 * - **Generate Content**: Options and results for one-shot content generation
 * - **Stream Content**: Options and state for streaming responses
 * - **Chat**: Types for multi-turn conversation support
 * - **Function Calling**: Types for model function invocation capability
 * - **Interaction API**: Types for Vertex AI Interactions API
 *
 * Most types extend from or reference types from `@google/genai` and `@tanstack/react-query`.
 * When using these types, ensure the corresponding hooks in `/hooks` are properly configured.
 */

import type {
  GoogleGenAI,
  GenerateContentResponse,
  Tool,
  Part,
  Interactions,
  Model,
  Models,
  GoogleGenAIOptions,
} from '@google/genai';
import type { QueryClient, experimental_streamedQuery } from '@tanstack/react-query';

// ─── Provider ────────────────────────────────────────────────────────────────

/**
 * Configuration for the GenAI provider component.
 *
 * This is a discriminated union type that enforces mutually exclusive authentication methods.
 * Use either Vertex AI authentication or direct API Key authentication, but not both.
 * The provider wraps your application and makes GenAI functionality available to all child components
 * via React Context.
 *
 * @typeParam VertexAIConfig - Configuration object for Vertex AI authentication
 * @typeParam ApiKeyConfig - Configuration object for direct API Key authentication
 *
 * @remarks
 * **Authentication Methods:**
 * - **Vertex AI**: Use when deploying on Google Cloud Platform with service account credentials.
 *   Requires `project` (GCP project ID) and `location` (e.g., "us-central1").
 * - **API Key**: Use when accessing Gemini API directly from Google AI Studio.
 *   Requires a valid `apiKey` string.
 *
 * **QueryClient Behavior:**
 * If no `queryClient` is provided, the provider automatically creates and manages its own.
 * For production applications, consider providing a custom `QueryClient` configured with your
 * preferred cache durations and retry strategies.
 *
 * @example
 * ```tsx
 * // Vertex AI configuration
 * <GenAIProvider
 *   vertexAIConfig={{
 *     project: 'my-gcp-project',
 *     location: 'us-central1'
 *   }}
 * >
 *   <App />
 * </GenAIProvider>
 * ```
 *
 * @example
 * ```tsx
 * // API Key configuration
 * <GenAIProvider apiKey="your-gemini-api-key">
 *   <App />
 * </GenAIProvider>
 * ```
 *
 * @see {@link UseGenerateContentOptions} for content generation configuration
 * @see {@link UseStreamContentOptions} for streaming configuration
 * @see {@link UseChatOptions} for chat configuration
 */
export type GenAIProviderConfig =
  | {
      /**
       * Vertex AI mode configuration.
       *
       * When provided, the provider will authenticate using Google Cloud Vertex AI
       * instead of a direct Gemini API key. This is the recommended approach for
       * production deployments on Google Cloud Platform.
       *
       * @remarks
       * Vertex AI requires the following:
       * - Valid GCP project with Vertex AI API enabled
       * - Service account credentials configured in your environment
       * - Appropriate IAM permissions (roles/aiplatform.user or equivalent)
       *
       * @see https://cloud.google.com/vertex-ai/docs/generative-ai/gemini-on-vertex-ai
       */
      vertexAIConfig: {
        /**
         * Google Cloud project ID used for Vertex AI.
         *
         * @remarks
         * This is the numeric or alphanumeric project ID (not the project name).
         * You can find this in the GCP Console or via `gcloud config get-value project`.
         */
        project: GoogleGenAIOptions['project'];

        /**
         * Region for Vertex AI requests (e.g. "us-central1").
         *
         * @remarks
         * Must be a valid GCP region where Vertex AI services are available.
         * Common regions: us-central1, europe-west1, asia-east1
         */
        location: GoogleGenAIOptions['location'];
      };

      /**
       * API key is NOT allowed when using Vertex AI mode.
       * This enforces mutually exclusive auth methods.
       */
      apiKey?: never;

      /**
       * Optional existing TanStack QueryClient instance.
       *
       * @remarks
       * If not provided, a new QueryClient with default settings will be created.
       * The provider maintains ownership of this client throughout its lifecycle.
       * When you provide a custom client:
       * - Your cache configuration preferences are respected
       * - You can share the same client across multiple providers
       * - You're responsible for managing the client's lifecycle if needed
       *
       * @see https://tanstack.com/query/latest/docs/react/reference/QueryClient
       */
      queryClient?: QueryClient;

      /**
       * React components that will have access to the GenAI context.
       *
       * @remarks
       * All descendant components can use the GenAI hooks (useGenAIClient, useChat, etc.)
       * without prop drilling. The context provides the configured GenAI client instance.
       */
      children: React.ReactNode;
    }
  | {
      /**
       * API key mode configuration.
       *
       * Used for direct authentication with Google AI Studio / Gemini API.
       * This is the simplest setup for development and prototyping.
       *
       * @remarks
       * To obtain an API key:
       * 1. Visit https://ai.google.dev/
       * 2. Click "Get API Key" button
       * 3. Create a new API key in Google Cloud Console
       * 4. Use the key with this configuration
       *
       * **Security considerations:**
       * - Never commit API keys to version control
       * - Use environment variables (e.g., REACT_APP_GEMINI_KEY)
       * - Consider using a backend proxy for production applications
       * - Restrict key usage in Cloud Console (by HTTP referrer or IP)
       *
       * @see https://ai.google.dev/
       */
      apiKey: GoogleGenAIOptions['apiKey'];

      /**
       * Vertex AI config is NOT allowed when using API key mode.
       *
       * @remarks
       * This enforces mutually exclusive authentication methods at the type level.
       * Setting `vertexAIConfig` when `apiKey` is provided will result in a type error.
       */
      vertexAIConfig?: never;

      /**
       * Optional existing TanStack QueryClient instance.
       *
       * @remarks
       * If not provided, a new QueryClient with default settings will be created.
       * The provider maintains ownership of this client throughout its lifecycle.
       * When you provide a custom client:
       * - Your cache configuration preferences are respected
       * - You can share the same client across multiple providers
       * - You're responsible for managing the client's lifecycle if needed
       *
       * @see https://tanstack.com/query/latest/docs/react/reference/QueryClient
       */
      queryClient?: QueryClient;

      /**
       * React components that will have access to the GenAI context.
       *
       * @remarks
       * All descendant components can use the GenAI hooks (useGenAIClient, useChat, etc.)
       * without prop drilling. The context provides the configured GenAI client instance.
       */
      children: React.ReactNode;
    };

/**
 * Configuration for TanStack Query's caching behavior.
 *
 * Controls how long query results are cached and retained in memory.
 * These settings apply to all queries created by the hooks in this SDK.
 *
 * @remarks
 * **Caching Strategy:**
 * - `staleTime`: How long until cached data is considered stale (needs refetching)
 * - `gcTime`: How long unused data is kept in memory before garbage collection
 *
 * For example, with defaults:
 * - Fresh data: [0-5 minutes] - Query uses cached data without background refetch
 * - Stale data: [5-12 minutes] - Query uses cached data but triggers background refetch
 * - Evicted: [12+ minutes] - Data is removed from cache memory
 *
 * **Common patterns:**
 * - Frequently changing data (chat): `{ staleTime: 0, gcTime: 1000 * 60 }` (1 min)
 * - Stable data (model info): `{ staleTime: 1000 * 60 * 60, gcTime: 1000 * 60 * 60 * 24 }` (1 day)
 *
 * @see https://tanstack.com/query/latest/docs/react/guides/important-defaults
 */
interface CacheConfig {
  /**
   * Time in milliseconds until the data is considered stale.
   *
   * @remarks
   * During the stale time window, cached data is used immediately without background refetch.
   * After stale time expires, the next query will trigger a background refetch while still
   * using the stale data initially (if available).
   *
   * @default 300000 (5 minutes)
   */
  staleTime?: number;

  /**
   * Time in milliseconds until unused data is removed from the cache.
   *
   * @remarks
   * This is the "garbage collection" time. Data that hasn't been accessed since this duration
   * will be permanently removed from memory. Must be >= staleTime for predictable behavior.
   *
   * @default 720000 (12 minutes)
   */
  gcTime?: number;
}

// ─── Generate Content ─────────────────────────────────────────────────────────

/**
 * Base options for content generation hooks.
 *
 * This interface provides common configuration options shared by both mutation and query
 * variants of the generate content functionality. It configures the model behavior and
 * error handling.
 *
 * @remarks
 * **Usage Patterns:**
 * - Use `useGenerateContentMutate` for imperative content generation (button clicks, user actions)
 * - Use `useGenerateContentQuery` for declarative content generation (when data is needed)
 * - Both hooks accept options extending this interface
 *
 * **Model Selection:**
 * Available models vary based on your authentication method and region.
 * Current popular models: 'gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-pro'
 *
 * @see https://ai.google.dev/models
 * @see useGenerateContentMutate for mutation variant
 * @see useGenerateContentQuery for query variant
 */
export interface UseGenerateContentOptions {
  /**
   * The Gemini model identifier to use for content generation.
   *
   * @remarks
   * Examples: 'gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-pro'
   *
   * Different models have different capabilities:
   * - **Flash models**: Fast, lower cost, good for most tasks
   * - **Pro models**: More capable, better at complex reasoning
   *
   * The specific models available depend on:
   * - Your authentication method (API key vs Vertex AI)
   * - The region (for Vertex AI)
   * - Your API plan
   *
   * @see https://ai.google.dev/models/gemini
   */
  model: Parameters<Models['generateContent']>['0']['model'];

  /**
   * Optional system instruction to guide the model's behavior.
   *
   * @remarks
   * The system instruction is a permanent behavior guide that applies to all content
   * generated within this hook instance. It's sent with every request and affects how
   * the model interprets and responds to user prompts.
   *
   * **Examples:**
   * - "You are a helpful technical writer. Use clear language and examples."
   * - "Format all responses as JSON"
   * - "Always respond in Spanish"
   *
   * System instructions persist across multiple generations in the same hook instance
   * but can be overridden by contradictory instructions in the user prompt.
   */
  systemInstruction?: string;

  /**
   * Maximum number of tokens to include in the output.
   *
   * @remarks
   * Tokens are roughly equivalent to 4 characters in English text.
   * Limits include both completion tokens and any function outputs.
   *
   * If output exceeds this limit, generation stops mid-response.
   * Each model has a maximum supported value. Leaving undefined uses the model's default.
   */
  maxOutputTokens?: Model['outputTokenLimit'];

  /**
   * Controls the randomness and creativity of the output.
   *
   * @remarks
   * **Range:** 0 to 2 (or model-specific maximum)
   *
   * **Guidance:**
   * - `0` or `0.1`: Deterministic, always produces same output for same input (use for: classification, extraction, QA)
   * - `0.5` to `1`: Balanced (use for: general content generation, brainstorming)
   * - `1.5` to `2`: Creative, high variability (use for: creative writing, ideation)
   *
   * Paired with `top_p` or `top_k` for fine-grained control.
   *
   * @default undefined (model default, typically 1)
   */
  temperature?: Model['temperature'];

  /**
   * Optional callback function triggered when a content generation request fails.
   *
   * @remarks
   * In `useGenerateContentMutate`, this callback is passed directly to the mutation.
   *
   * **Common error scenarios:**
   * - Network failures
   * - Invalid API key
   * - Rate limiting (HTTP 429)
   * - Model not found
   * - Content filter violations
   *
   * The callback can be async for cleanup operations (logging, analytics, etc.).
   *
   * @param error - The error object thrown during the request
   *
   * @example
   * ```typescript
   * onError: async (error) => {
   *   console.error('Generation failed:', error.message);
   *   await logToAnalytics({ error: error.message });
   * }
   * ```
   */
  onError?: (error: Error) => void | Promise<void>;
}

/**
 * Options specific to the `useGenerateContentQuery` hook.
 *
 * Extends {@link UseGenerateContentOptions} with query-specific settings for declarative
 * content generation using TanStack Query. Use this when content generation should be
 * triggered automatically based on props/dependencies rather than user actions.
 *
 * @remarks
 * **Key differences from mutation:**
 * - Automatically refetches when dependencies change
 * - Includes caching behavior configuration
 * - Can be disabled and re-triggered programmatically
 * - Better for reactive/declarative code
 *
 * **Use cases:**
 * - Generating summaries when document content changes
 * - Auto-translating text as it's typed
 * - Enriching data on load
 * - SEO-critical content generation
 *
 * @see useGenerateContentMutate for imperative variant
 * @see CacheConfig for detailed cache behavior
 */
export interface UseGenerateContentOptionsQuery extends Omit<UseGenerateContentOptions, 'onError'> {
  /**
   * The input prompt for content generation.
   *
   * @remarks
   * This is the primary trigger for the query. Any change to this string will:
   * 1. Update the query key
   * 2. Trigger a new fetch (unless data is within `staleTime`)
   * 3. Store separate cache entries for each unique prompt
   *
   * **Tips:**
   * - Keep prompts consistent for better cache hits
   * - Include all context needed in the prompt
   * - Avoid including runtime identifiers that change frequently
   */
  prompt: string;

  /**
   * Configuration for TanStack Query's caching and garbage collection behavior.
   *
   * @remarks
   * Allows fine-tuning how long results are cached and when they're considered fresh.
   * See {@link CacheConfig} for detailed explanation of `staleTime` and `gcTime`.
   *
   * @see CacheConfig for default values and guidance
   */
  cacheConfig?: CacheConfig;

  /**
   * Controls whether the query automatically executes.
   *
   * @remarks
   * **When `true` (default):**
   * - Query runs immediately on mount
   * - Query refetches when prompt changes
   * - Query respects cache and stale time
   *
   * **When `false`:**
   * - Query is prepared but doesn't execute
   * - Can be triggered manually with the `refetch` method
   * - Useful for waiting on other dependencies
   *
   * @example
   * ```typescript
   * const { data, refetch } = useGenerateContentQuery({
   *   model: 'gemini-2.0-flash',
   *   prompt: userText,
   *   trigger: userText.length > 0, // Only run if user has typed something
   * });
   * ```
   *
   * @default true
   */
  trigger?: boolean;

  /**
   * Number of automatic retry attempts if the fetch fails.
   *
   * @remarks
   * Retries occur with exponential backoff automatically. Each retry happens with
   * increasing delay (by default: 1s, 2s, 4s, etc.).
   *
   * When retries are exhausted, the error is exposed via the query's error state.
   * You can trigger a manual retry via the `refetch` method.
   *
   * @default 3
   */
  retryCount?: number;
}

/**
 * Standardized result object returned by content generation operations.
 *
 * Provides both the raw API response and convenient extracted text, simplifying
 * consumption in React components.
 *
 * @remarks
 * This interface unifies the output format across different generation methods:
 * - `useGenerateContentMutate` returns this in `data`
 * - `useGenerateContentQuery` returns this in `data`
 * - Custom hooks may also return this structure
 *
 * @see GenerateContentResponse for details on raw API response structure
 *
 * @example
 * ```typescript
 * const { data, isLoading } = useGenerateContentQuery({
 *   model: 'gemini-2.0-flash',
 *   prompt: 'Summarize this article: ...'
 * });
 *
 * return (
 *   <div>
 *     {isLoading && <Spinner />}
 *     {data?.text && <p>{data.text}</p>}
 *   </div>
 * );
 * ```
 */
export interface GenerateResult {
  /**
   * The full raw response object from the @google/genai SDK.
   *
   * @remarks
   * Contains complete API response including:
   * - `candidates`: Array of response alternatives (usually 1 element with default settings)
   * - `usageMetadata`: Token usage information for billing/monitoring
   * - `promptFeedback`: Safety/filtering feedback on the input prompt
   *
   * Access this when you need:
   * - Token counts for analytics
   * - Multiple response candidates
   * - Full safety feedback details
   * - Raw content including any embedded media
   *
   * @see https://ai.google.dev/api/rest/v1/GenerateContentResponse
   */
  response: GenerateContentResponse;

  /**
   * The extracted text content from the model's first response candidate.
   *
   * @remarks
   * This is a convenience property that extracts just the text from the first candidate.
   * Equivalent to `response.candidates?.[0]?.content?.parts?.[0]?.text ?? ''`
   *
   * Contains an empty string if:
   * - No candidates were returned
   * - The candidate contains no text (e.g., function call)
   * - The model produced no output
   *
   * For multi-modal responses or function calls, use the `response` field directly.
   */
  text: string;
}

// ─── Stream Content ───────────────────────────────────────────────────────────

/**
 * Options for streaming content generation.
 *
 * Configures the model behavior for streaming responses. When using streaming,
 * the model sends response tokens incrementally, enabling real-time display of
 * responses before generation completes.
 *
 * @remarks
 * **Streaming vs Non-Streaming:**
 * - **Streaming**: Better UX (progressive display), but slightly higher latency to first token
 * - **Non-streaming**: Simpler, faster for short responses, requires waiting for full response
 *
 * **Common use cases for streaming:**
 * - Chat interfaces
 * - Code generation (show code as it's written)
 * - Content generation (document writing, articles)
 * - Real-time summarization
 *
 * @see useStreamContent hook for usage
 * @see useStreamContentQuery for query-based streaming
 */
export interface UseStreamContentOptions {
  /**
   * The Gemini model identifier for streaming generation.
   *
   * @remarks
   * Not all models support streaming equally. Streaming support is generally good for:
   * - gemini-2.0-flash
   * - gemini-1.5-flash
   * - gemini-3.1-pro
   *
   * Verify streaming support for your model in the documentation.
   */
  model: string;

  /**
   * Optional system instruction for the streaming session.
   *
   * @remarks
   * Same behavior as {@link UseGenerateContentOptions.systemInstruction}.
   * Applies to all chunks received in this stream.
   */
  systemInstruction?: string;

  /**
   * Sampling temperature for the streaming generation.
   *
   * @remarks
   * Same range and behavior as {@link UseGenerateContentOptions.temperature}.
   * Affects the randomness of each chunk generated.
   */
  temperature?: Model['temperature'];
}

/**
 * Options specific to `useStreamContentQuery` hook.
 *
 * Extends {@link UseStreamContentOptions} with query-based streaming configuration.
 * Use this for declarative streaming that automatically triggers based on dependencies.
 *
 * @remarks
 * Similar to {@link UseGenerateContentOptionsQuery}, this variant:
 * - Automatically manages refetch on prompt changes
 * - Supports cache configuration
 * - Can be conditionally triggered
 *
 * @see useStreamContentQuery for usage
 */
export interface UseStreamContentQueryOptions extends UseStreamContentOptions {
  /**
   * The prompt for streaming content generation.
   *
   * @remarks
   * Optional when used with `trigger: false` for manual triggering.
   * Changes to this prompt trigger a new stream.
   */
  prompt?: string;

  /**
   * Controls query refetch behavior during streaming.
   *
   * @remarks
   * Configuration for when and how to refetch stream data. See TanStack Query docs
   * for available `refetchMode` options.
   *
   * @see https://tanstack.com/query/v5/docs/reference/streamedQuery
   */
  refetchMode?: Parameters<typeof experimental_streamedQuery>['0']['refetchMode'];

  /**
   * Configuration for caching chunk history.
   *
   * @remarks
   * Controls how long completed chunks are cached. Note that active streams
   * are not cached; only completed stream results.
   *
   * @see CacheConfig
   */
  cacheConfig?: CacheConfig;
  /**
   * Controls whether the stream query automatically starts.
   *
   * @remarks
   * **When `true` (default):** Stream starts immediately
   * **When `false`:** Stream is prepared but doesn't start; can trigger manually
   *
   * @default true
   */
  trigger?: boolean;
}

/**
 * Reactive state representing an active or completed streaming session.
 *
 * Provides real-time feedback about the streaming process, including received chunks,
 * full text buffer, streaming status, and error information.
 *
 * @remarks
 * This state updates reactively as chunks arrive, allowing components to display
 * progressive content. Use with `useEffect` to perform actions when stream completes.
 *
 * @example
 * ```typescript
 * const stream = useStreamContent({
 *   model: 'gemini-2.0-flash',
 *   prompt: userInput
 * });
 *
 * return (
 *   <div>
 *     {stream.fullText && <p>{stream.fullText}</p>}
 *     {stream.isStreaming && <Spinner />}
 *     {stream.error && <Error>{stream.error.message}</Error>}
 *   </div>
 * );
 * ```
 */
export interface StreamState {
  /**
   * Array of all text chunks received so far, in order.
   *
   * @remarks
   * Each element is a single chunk of text from the model.
   * Empty array until the first chunk arrives.
   * Cleared when stream completes or resets.
   *
   * Useful when you need individual chunks for:
   * - Streaming to different output destinations
   * - Rate-limiting chunk processing
   * - Detailed progress tracking
   */
  chunks: string[];

  /**
   * The concatenated full text from all received chunks.
   *
   * @remarks
   * This is equivalent to `chunks.join('')`.
   * Represents the complete output accumulated so far.
   *
   * Empty string until first chunk arrives.
   * Continues growing until `isStreaming` becomes false.
   *
   * In most UI cases, display this instead of individual chunks.
   */
  fullText: string;

  /**
   * Boolean flag indicating if the stream is actively receiving data.
   *
   * @remarks
   * **True**: Stream is open and expecting more chunks
   * **False**: Stream has completed (successfully or with error)
   *
   * Use this flag to:
   * - Show/hide loading spinners
   * - Enable/disable send buttons
   * - Determine when to display final content
   *
   * When false, check {@link StreamState.error} for error information.
   */
  isStreaming: boolean;

  /**
   * Error object if the stream failed, or null if successful.
   *
   * @remarks
   * Set when the stream encounters an error (network failure, rate limit, etc.).
   * Only check this after `isStreaming` becomes false.
   *
   * Common error types:
   * - `Error`: Network or API errors
   * - Contains `message` property with error description
   *
   * @example
   * ```typescript
   * if (!stream.isStreaming && stream.error) {
   *   console.error('Stream failed:', stream.error.message);
   * }
   * ```
   */
  error: Error | null;
}

/**
 * Return type for the `useStreamContent` hook.
 *
 * Extends {@link UseStreamContentOptions} with streaming-specific return values,
 * providing both configuration context and completion signaling.
 *
 * @remarks
 * The hook returns this object immediately, with `onError` being a promise that
 * resolves when the stream completes successfully or rejects when it fails.
 *
 * @see useStreamContent for usage details
 */
export interface UseStreamContentHook extends UseStreamContentOptions {
  /**
   * Promise that resolves when the stream completes or rejects on error.
   *
   * @remarks
   * Use this promise to coordinate with other async operations:
   * - Wait for stream completion before processing
   * - Trigger side effects after streaming finishes
   * - Chain additional operations
   *
   * **Resolves:** When streaming completes successfully
   * **Rejects:** When streaming encounters an error
   *
   * @example
   * ```typescript
   * const hook = useStreamContent(options);
   *
   * try {
   *   await hook.onError; // Wait for completion
   *   console.log('Stream completed successfully');
   * } catch (error) {
   *   console.error('Stream failed:', error);
   * }
   * ```
   */
  onError: Promise<void>;
}

// ─── Chat ─────────────────────────────────────────────────────────────────────

/**
 * Type representing the role/author of a message in a chat conversation.
 *
 * @remarks
 * Gemini API uses two-way chat:
 * - `'user'`: Messages from the end user
 * - `'model'`: Responses from the Gemini model
 *
 * @see ChatMessage for the complete message structure
 *
 * @example
 * ```typescript
 * type ChatRole = 'user' | 'model';
 * const userMessage: ChatRole = 'user';
 * const modelResponse: ChatRole = 'model';
 * ```
 */
export type ChatRole = 'user' | 'model';

/**
 * Represents a single message in a chat conversation history.
 *
 * Immutable message structure used in multi-turn conversations. Each message
 * is sent to the model with its role to maintain conversation context.
 *
 * @remarks
 * **Message flow in chat:**
 * 1. User sends message (role: 'user')
 * 2. Model responds (role: 'model')
 * 3. Conversation history is maintained with alternating roles
 *
 * **Storage and keys:**
 * - Messages are typically stored in an array/list
 * - Use `id` field for React list keys (never use array index)
 * - IDs should be stable across re-renders
 *
 * @example
 * ```typescript
 * const messages: ChatMessage[] = [
 *   {
 *     role: 'user',
 *     text: 'What is machine learning?',
 *     id: 'msg-1'
 *   },
 *   {
 *     role: 'model',
 *     text: 'Machine learning is a subset of AI...',
 *     id: 'msg-2'
 *   }
 * ];
 * ```
 *
 * @see ChatRole for role type definition
 * @see UseChatOptions for chat configuration
 */
export interface ChatMessage {
  /**
   * The role/author of the message.
   *
   * @remarks
   * - `'user'`: Message from the end user
   * - `'model'`: Response from Gemini
   *
   * Used by the API to understand conversational context.
   */
  role: ChatRole;

  /**
   * The text content of the message.
   *
   * @remarks
   * Contains the actual message text sent or received.
   * Empty string is not recommended but supported.
   *
   * For multi-modal content (images, etc.), use the raw API response.
   */
  text: string;

  /**
   * Unique identifier for the message.
   *
   * @remarks
   * Used as React key for list rendering. Should be:
   * - Unique within the conversation
   * - Stable across re-renders
   * - Not the array index
   *
   * **Generation strategies:**
   * - UUID: `crypto.randomUUID()`
   * - Timestamp + random: `${Date.now()}-${Math.random()}`
   * - Server-generated IDs: When backed by a database
   *
   * @example
   * ```tsx
   * {messages.map(msg => (
   *   <div key={msg.id}>{msg.text}</div>
   * ))}
   * ```
   */
  id: string;
}

/**
 * Configuration options for the `useChat` hook.
 *
 * Configures a multi-turn chat session with the Gemini model. The hook manages
 * conversation history and alternating user/model messages.
 *
 * @remarks
 * **Chat session lifecycle:**
 * 1. Initialize hook with options
 * 2. Send user messages via mutation
 * 3. Hook maintains message history
 * 4. Model responds, appending to history
 * 5. Next message uses full history for context
 *
 * **Streaming vs non-streaming:**
 * - `streaming: true` (default): Responses are streamed token-by-token
 * - `streaming: false`: Full response received at once
 *
 * Each hook instance maintains its own independent conversation history.
 * Create multiple hooks for multiple conversations.
 *
 * @see useChat hook for implementation
 *
 * @example
 * ```typescript
 * const chat = useChat({
 *   model: 'gemini-2.0-flash',
 *   systemInstruction: 'You are a helpful assistant.',
 *   streaming: true
 * });
 * ```
 */
export interface UseChatOptions {
  /**
   * The Gemini model identifier for the chat session.
   *
   * @remarks
   * All messages in this conversation will use this model.
   * Cannot be changed mid-conversation; create a new hook instance to switch models.
   *
   * Examples: 'gemini-2.0-flash', 'gemini-1.5-pro'
   */
  model: string;

  /**
   * Initial system instructions for the chat model.
   *
   * @remarks
   * System instruction applies to the entire conversation and persists across
   * all turns unless explicitly overridden in a message.
   *
   * **Examples:**
   * - "You are a Python expert. Provide code examples where applicable."
   * - "Answer all questions in haiku format."
   * - "You have knowledge cutoff of April 2024."
   *
   * Useful for establishing:
   * - Persona/role
   * - Response format requirements
   * - Domain expertise
   * - Special capabilities
   */
  systemInstruction?: string;

  /**
   * Sampling temperature for chat responses.
   *
   * @remarks
   * Same behavior as {@link UseGenerateContentOptions.temperature}.
   *
   * **Recommended values:**
   * - **0-0.5**: Customer support, Q&A, factual responses
   * - **0.7-1**: General chat, balanced
   * - **1-1.5**: Creative writing, brainstorming
   */
  temperature?: Model['temperature'];

  /**
   * Whether to stream responses in the chat.
   *
   * @remarks
   * **Streaming enabled (true):**
   * - Tokens arrive incrementally
   * - Better perceived responsiveness
   * - Ideal for interactive chat UI
   * - Can display partial responses
   *
   * **Streaming disabled (false):**
   * - Full response arrives at once
   * - Simpler to handle
   * - May feel slower to user
   *
   * @default true
   */
  streaming?: boolean;
}

// ─── Function Calling ─────────────────────────────────────────────────────────

/**
 * Function signature for a custom function implementation callable by the model.
 *
 * When you declare a function tool to the model, you must provide a handler with this signature
 * to process when the model decides to call that function.
 *
 * @param args - The arguments passed by the model, mapped from the tool definition
 * @returns The result of the function, can be Promise or sync
 *
 * @remarks
 * **Argument mapping:**
 * - Arguments come as a Record (object/dict) keyed by parameter name
 * - Parameter names and types are defined in the Tool schema
 * - The handler is responsible for type safety or validation
 *
 * **Async handling:**
 * - Handler can return a Promise for async operations
 * - SDK handles both sync and async returns
 * - Error throwing is supported (caught and passed back to model)
 *
 * **Return value handling:**
 * - Return value is passed back to the model
 * - Model can see function results and respond appropriately
 * - Serializable types are recommended (strings, numbers, objects)
 *
 * @example
 * ```typescript
 * const handler: FunctionHandler = async (args) => {
 *   const { city, unit } = args as { city: string; unit: 'C' | 'F' };
 *   const temp = await fetchWeather(city, unit);
 *   return { temperature: temp, unit };
 * };
 * ```
 *
 * @see UseFunctionCallingOptions for usage in hooks
 * @see Tool for tool/function schema definition
 */
export type FunctionHandler = (args: Record<string, unknown>) => Promise<unknown> | unknown;

/**
 * Configuration for integrating function calling into a model interaction.
 *
 * Function calling enables the Gemini model to request that specific functions
 * be executed on the client, enabling workflows where the model can interact
 * with external tools, databases, or computations.
 *
 * @remarks
 * **Function calling flow:**
 * 1. User sends prompt to model with available tools/functions declared
 * 2. Model decides if it needs to call any functions
 * 3. SDK calls the corresponding handler function
 * 4. Handler result is sent back to model
 * 5. Model continues generation with function results
 * 6. Process repeats until model finishes response
 *
 * **Common use cases:**
 * - Weather app: User asks "What's the weather?" → Model calls weather function
 * - Calculator: User asks "What's 2+2?" → Model calls calculate function
 * - Data lookup: User asks for user info → Model calls database query function
 * - API integration: Model calls external APIs on demand
 *
 * **Restrictions:**
 * - Tool names must be valid identifiers
 * - Handler must be provided for every declared tool
 * - Function results should be serializable
 *
 * @example
 * ```typescript
 * const tools: Tool[] = [{
 *   name: 'get_weather',
 *   description: 'Get weather for a city',
 *   parameters: {
 *     type: 'OBJECT',
 *     properties: {
 *       city: { type: 'STRING', description: 'City name' },
 *       unit: { type: 'STRING', enum: ['C', 'F'] }
 *     }
 *   }
 * }];
 *
 * const useFunctionCalling = useFunctionCallingHook({
 *   model: 'gemini-2.0-flash',
 *   tools,
 *   handlers: {
 *     get_weather: async (args) => {
 *       const { city, unit } = args;
 *       return await fetchWeather(city, unit);
 *     }
 *   }
 * });
 * ```
 *
 * @see Tool for schema definition
 * @see FunctionHandler for handler implementation
 */
export interface UseFunctionCallingOptions {
  /**
   * The Gemini model to use for this function calling session.
   *
   * @remarks
   * Not all models support function calling equally. Ensure your model supports
   * the features you need. See Google documentation for model capabilities.
   *
   * Generally supported: gemini-2.0-flash, gemini-1.5-flash, gemini-1.5-pro
   */
  model: string;

  /**
   * List of tool/function declarations available to the model.
   *
   * @remarks
   * These define the interface the model can request. Each tool must have:
   * - `name`: Unique identifier (matches handler key)
   * - `description`: What the function does (for model understanding)
   * - `parameters`: JSON schema describing input parameters
   *
   * The model reads these descriptions to understand when and how to call functions.
   * More detailed descriptions lead to better function calling decisions.
   *
   * @see Tool for detailed schema structure
   */
  tools: Tool[];

  /**
   * Mapping of function/tool names to their implementation handlers.
   *
   * @remarks
   * Must provide a handler for every tool declared in `tools`.
   * If a tool is declared but no handler exists, an error will be thrown when
   * the model tries to invoke it.
   *
   * **Key requirements:**
   * - Keys must exactly match tool names
   * - Handlers have {@link FunctionHandler} signature
   * - Handlers should handle errors gracefully
   * - Return values should be serializable
   *
   * @example
   * ```typescript
   * handlers: {
   *   get_weather: async (args) => {  },
   *   search_web: async (args) => {  },
   *   calculate: (args) => { }
   * }
   * ```
   */
  handlers: Record<string, FunctionHandler>;

  /**
   * Optional system instructions for the function calling session.
   *
   * @remarks
   * Same behavior as {@link UseGenerateContentOptions.systemInstruction}.
   *
   * Useful for guiding the model's function calling behavior:
   * - "Prefer calling search_web when you don't know something"
   * - "Always validate input with search_web before responding"
   * - "Call function X for this type of query"
   */
  systemInstruction?: string;

  /**
   * Sampling temperature for function calling responses.
   *
   * @remarks
   * Same behavior as {@link UseGenerateContentOptions.temperature}.
   *
   * Lower temperatures are recommended for function calling to improve consistency.
   */
  temperature?: Model['temperature'];
}

// ─── Interaction API ──────────────────────────────────────────────────────
/**
 * Base configuration for Vertex AI Interactions API operations.
 *
 * The Interactions API provides a stateful conversation interface for Vertex AI,
 * alternative to the stateless generation API. It manages conversation state server-side,
 * which can be useful for long-running conversations.
 *
 * @remarks
 * **When to use Interactions API:**
 * - Long-running conversations that need server-side state persistence
 * - Multi-turn conversations with large context windows
 * - Coordinated interactions across multiple clients
 * - Integrated with Vertex AI memory/retrieval systems
 *
 * **Compared to generation API:**
 * - **Interactions**: Stateful, server manages history
 * - **Generation**: Stateless, client manages history
 *
 * @see https://cloud.google.com/vertex-ai/docs/generative-ai/interactions-api
 * @see UseInteractionBaseCreateHookMutate for mutation variant
 * @see UseInteractionBaseCreateHookQuery for query variant
 */
interface UseInteractionBaseCreateHook {
  /**
   * API version for the Interactions endpoint.
   *
   * @remarks
   * Specifies which version of the Interactions API to use.
   * Leave empty or omit to use the default version.
   *
   * Extracted from the Interactions.create parameters type.
   */
  api_version?: Parameters<Interactions['create']>['0']['api_version'];

  /**
   * The model to use for this interaction.
   *
   * @remarks
   * Must be a valid Vertex AI model identifier.
   * Examples: 'gemini-2.0-flash', 'gemini-1.5-pro'
   *
   * Extracted from Interactions.Model type from @google/genai
   */
  model: Interactions.Model;

  /**
   * System instructions for the interaction session.
   *
   * @remarks
   * Same semantics as other system instruction fields.
   * Applied to the entire interaction conversation.
   *
   * Extracted from Interactions.create parameter type.
   */
  systemInstruction?: Parameters<Interactions['create']>['0']['system_instruction'];

  /**
   * Sampling temperature for interaction responses.
   *
   * @remarks
   * Same behavior as temperature in other options types.
   */
  temperature?: Model['temperature'];
}

/**
 * Options for mutation-based Interactions API operations.
 *
 * Extends {@link UseInteractionBaseCreateHook} with mutation-specific error handling.
 * Use this for imperative interaction control via the `useInteractionBaseMutate` hook.
 *
 * @remarks
 * **Mutation workflow:**
 * - Call `create.generate(prompt)` to create an interaction and send initial message
 * - Call `delete.delete(interactionID)` to delete an interaction when done
 * - Error handlers are invoked if operations fail
 *
 * **Error handling:**
 * - `onCreateError`: Triggered when generation/creation fails
 * - `onDeleteError`: Triggered when deletion fails
 *
 * @see useInteractionBaseMutate for hook implementation
 */
export interface UseInteractionBaseCreateHookMutate extends UseInteractionBaseCreateHook {
  /**
   * Optional callback for generation/creation request failures.
   *
   * @remarks
   * Invoked when `create.generate` or `create.generateAsync` fails.
   * Can perform side effects like error logging, analytics, or cleanup.
   *
   * Can be async for awaiting cleanup operations.
   *
   * @param error - The error object from the failed request
   *
   * @example
   * ```typescript
   * onCreateError: async (error) => {
   *   console.error('Failed to create interaction:', error);
   *   await reportToSentry(error);
   * }
   * ```
   */
  onCreateError?: (error: Error) => void | Promise<void>;

  /**
   * Optional callback for deletion request failures.
   *
   * @remarks
   * Invoked when `delete.delete` or `delete.deleteAsync` fails.
   * Can perform side effects like error logging or retry logic.
   *
   * Can be async for awaiting cleanup operations.
   *
   * @param error - The error object from the failed request
   *
   * @example
   * ```typescript
   * onDeleteError: async (error) => {
   *   console.error('Failed to delete interaction:', error);
   *   // Retry or log for manual cleanup
   * }
   * ```
   */
  onDeleteError?: (error: Error) => void | Promise<void>;
}

/**
 * Options for query-based Interactions API operations.
 *
 * Extends {@link UseInteractionBaseCreateHook} with query-specific settings.
 * Use this for declarative interaction control via the `useInteractionBaseCreateQuery` hook.
 *
 * @remarks
 * **Query workflow:**
 * - Hook automatically creates interaction with provided prompt
 * - Results are cached based on model and prompt
 * - Refetch triggers when prompt changes
 * - Can be conditionally triggered
 *
 * **Compared to mutation:**
 * - Query auto-triggers based on dependencies
 * - Automatic caching and refetch management
 * - Better for reactive/declarative code
 *
 * @see useInteractionBaseCreateQuery for hook implementation
 */
export interface UseInteractionBaseCreateHookQuery extends UseInteractionBaseCreateHook {
  /**
   * The initial prompt for creating the interaction.
   *
   * @remarks
   * Sent with the interaction creation request. Changes to this prompt
   * create a new interaction (with new query key and cache entry).
   *
   * Extracted from Interactions.create input parameter type.
   */
  prompt: Parameters<Interactions['create']>['0']['input'];

  /**
   * Configuration for caching interaction results.
   *
   * @remarks
   * Controls how long interaction responses are cached and when they're
   * considered stale. See {@link CacheConfig} for detailed explanation.
   *
   * @see CacheConfig
   */
  cacheConfig?: CacheConfig;

  /**
   * Controls whether the interaction query automatically executes.
   *
   * @remarks
   * **When true (default):** Query runs immediately
   * **When false:** Query is prepared but doesn't run; can trigger manually
   *
   * Useful for waiting on other dependencies before creating interaction.
   *
   * @default true
   */
  trigger?: boolean;
}

// ─── Re-exports from @google/genai for convenience ───────────────────────────

/**
 * Re-exported types from the `@google/genai` SDK for convenience.
 *
 * These types are exported from this module for easier imports in consuming code.
 * Import directly from this module instead of `@google/genai` when available.
 *
 * @remarks
 * **Exported types:**
 *
 * - **GoogleGenAI**: The main client class for Gemini API access
 * - **GenerateContentResponse**: API response from content generation requests
 * - **Tool**: Function/tool schema definition for function calling
 * - **Part**: Individual content part (text, image, function call result, etc.)
 *
 * These are the most commonly used types from the underlying SDK.
 * For other types, import directly from `@google/genai`.
 *
 * @see https://www.npmjs.com/package/@google/genai
 * @see GenAIProviderConfig for provider configuration
 * @see UseGenerateContentOptions for generation options
 *
 * @example
 * ```typescript
 * // Preferred: import from this module
 * import type { Tool, GenerateContentResponse } from './types';
 *
 * // Also valid: import from original module
 * import type { Tool } from '@google/genai';
 * ```
 */
export type { GoogleGenAI, GenerateContentResponse, Tool, Part };
