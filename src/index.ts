/**
 * The intelligence layer for your UI. A type-safe React SDK for `@google/genai` for static content generation with TanStack-powered mutations, sub-second latency, and optimized state management ✨
 *
 *
 * @packageDocumentation
 */

// Provider & Context
export { GenAIProvider } from './context/GenAIContext';

// Hooks
export { useGenAIClient } from './hooks/useGenAIClient';
export { useGenerateContentMutate, useGenerateContentQuery } from './hooks/useGenerateContent';
export { useStreamContent, useStreamContentQuery } from './hooks/useStreamContent';
export { useChat } from './hooks/useChat';
export { useFunctionCalling } from './hooks/useFunctionCalling';
export { useModelInfo } from './hooks/useModelInfo';
export {
  useInteractionBaseCreateQuery,
  useInteractionBaseMutate,
} from './hooks/interactions/useInteractionBase';

// Utils
export { extractText, extractTextFromParts, textPrompt, imagePrompt } from './utils/index';

// Types
export type {
  GenAIProviderConfig,
  UseGenerateContentOptions,
  UseStreamContentOptions,
  UseChatOptions,
  UseFunctionCallingOptions,
  FunctionHandler,
  GenerateResult,
  StreamState,
  ChatMessage,
  ChatRole,
  GoogleGenAI,
  GenerateContentResponse,
  Tool,
  Part,
} from './types/index';
export type * from './types/index';
