// Provider & Context
export { GenAIProvider } from './context/GenAIContext.js';

// Hooks
export { useGenAIClient } from './hooks/useGenAIClient.js';
export { useGenerateContentMutate, useGenerateContentQuery } from './hooks/useGenerateContent.js';
export { useStreamContent, useStreamContentQuery } from './hooks/useStreamContent.js';
export { useChat } from './hooks/useChat.js';
export { useFunctionCalling } from './hooks/useFunctionCalling.js';
export { useModelInfo } from './hooks/useModelInfo.js';

// Utils
export { extractText, extractTextFromParts, textPrompt, imagePrompt } from './utils/index.js';

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
} from './types/index.js';
