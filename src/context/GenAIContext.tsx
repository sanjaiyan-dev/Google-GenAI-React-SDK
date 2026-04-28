import React, { createContext, useContext, useMemo } from 'react';
import { GoogleGenAI } from '@google/genai';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import type { GenAIProviderConfig } from '../types/index.js';

interface GenAIContextValue {
  client: GoogleGenAI;
}

const GenAIContext = createContext<GenAIContextValue | null>(null);

/** @internal Use useGenAIClient() from hooks instead */
export function useGenAIContext(): GenAIContextValue {
  const ctx = useContext(GenAIContext);
  if (!ctx) {
    throw new Error(
      '[react-google-genai] No GenAIProvider found. ' +
      'Wrap your app with <GenAIProvider apiKey="...">',
    );
  }
  return ctx;
}

function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 3,
      },
    },
  });
}

/**
 * Provides the Google GenAI client and TanStack QueryClient to all child hooks.
 *
 * @example
 * ```tsx
 * <GenAIProvider apiKey={process.env.GEMINI_API_KEY}>
 *   <App />
 * </GenAIProvider>
 * ```
 */
export function GenAIProvider({
  apiKey,
  queryClient,
  children,
}: GenAIProviderConfig): React.JSX.Element {
  const client = useMemo(() => new GoogleGenAI({ apiKey }), [apiKey]);
  const nearestQueryClient = useQueryClient(queryClient);
  const [qClient] = React.useState(() => nearestQueryClient ?? createQueryClient());

  const contextValue = useMemo(() => ({ client }), [client]);

  return (
    <GenAIContext.Provider value={contextValue}>
      <QueryClientProvider client={qClient}>{children}</QueryClientProvider>
    </GenAIContext.Provider>
  );
}
