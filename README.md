# ✨ react-google-genai

> **Ergonomic React hooks for Google Gemini AI** — streaming, multi-turn chat, automatic function calling, and TanStack Query integration. Pre-compiled with the React Compiler.

<div align="center">

[![npm](https://img.shields.io/npm/v/react-google-genai?style=flat-square&color=2563eb)](https://www.npmjs.com/package/react-google-genai)
[![license](https://img.shields.io/npm/l/react-google-genai?style=flat-square&color=2563eb)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5+-3178c6?style=flat-square)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19+-087ea4?style=flat-square)](https://react.dev)
[![TanStack Query](https://img.shields.io/badge/TanStack%20Query-5+-ef4444?style=flat-square)](https://tanstack.com/query)

</div>

---

## 🎯 Overview

**react-google-genai** is a production-ready SDK that brings the power of Google's Gemini AI to React applications with a suite of ergonomic hooks. Built on top of TanStack Query for powerful state management, it provides:

- 🚀 **Out-of-the-box streaming** — Display AI responses token-by-token for better UX
- 💬 **Multi-turn conversations** — Stateful chat management with automatic history
- ⚡ **Function calling** — Let the AI call your custom functions automatically
- 🎨 **Flexible authentication** — API Key or Vertex AI support
- 📦 **Zero-config setup** — Works instantly, highly customizable
- 🔒 **Type-safe** — Full TypeScript support with comprehensive JSDoc
- ⚙️ **React Compiler ready** — Pre-compiled for automatic memoization

---

## 📦 Installation

```bash
npm install react-google-genai @google/genai @tanstack/react-query
```

### Requirements
- **React 18+**
- **TanStack Query 5+**
- **Node.js 20+**

---

## � Example App

An example Vite app is available in the `example` folder.

```bash
cd example
cp .env.example .env
# set VITE_GEMINI_API_KEY in example/.env
npm install
npm run dev
```

If you want to run the example against your local package source instead of the published npm package:

```bash
cd example
npm install ../
npm run dev
```

---

## �🚀 Quick Start

### Step 1: Configure your provider

Choose your authentication method:

#### **Option A: API Key (Development)**
```tsx
import { GenAIProvider } from 'react-google-genai';

export function App() {
  return (
    <GenAIProvider apiKey={process.env.VITE_GEMINI_API_KEY!}>
      <YourApp />
    </GenAIProvider>
  );
}
```

#### **Option B: Vertex AI (Production)**
```tsx
import { GenAIProvider } from 'react-google-genai';

export function App() {
  return (
    <GenAIProvider
      vertexAIConfig={{
        project: process.env.GCP_PROJECT_ID!,
        location: 'us-central1'
      }}
    >
      <YourApp />
    </GenAIProvider>
  );
}
```

### Step 2: Use hooks in your components

---

## 📚 Core Hooks

### 🤖 One-Shot Generation

Generate content with a single request using **`useGenerateContentMutate`**:

```tsx
import { useGenerateContentMutate } from 'react-google-genai';

export function JokeGenerator() {
  const { generate, text, isPending, error } = useGenerateContentMutate({
    model: 'gemini-2.5-flash',
    temperature: 0.9,
  });

  return (
    <div>
      <button 
        onClick={() => generate('Tell me a funny joke')} 
        disabled={isPending}
      >
        {isPending ? '⏳ Generating...' : '✨ Generate Joke'}
      </button>
      
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {text && <p>{text}</p>}
    </div>
  );
}
```

**When to use:** Button clicks, form submissions, explicit user actions

---

### 🧠 Declarative Generation

Fetch generated text declaratively using **`useGenerateContentQuery`**. This hook is ideal when you want automatic caching, stale-while-revalidate behavior, and a simple query-style API.

```tsx
import { useGenerateContentQuery } from 'react-google-genai';

export function QueryGenerationDemo() {
  const { data, text, isPending, isError, error, refetch } = useGenerateContentQuery({
    model: 'gemini-2.5-flash',
    prompt: 'Provide Thirukkural 619 regarding "Perseverance" and explain its relevance to modern problem solving.',
    temperature: 0.2,
    retryCount: 2,
  });

  return (
    <div>
      <button onClick={() => refetch()} disabled={isPending}>
        {isPending ? 'Fetching…' : 'Refresh'}
      </button>

      {isError && <p style={{ color: 'red' }}>Error: {error?.message}</p>}
      {text && <p>{text}</p>}
    </div>
  );
}
```

**When to use:** Data-driven pages, cache-aware requests, and reactive prompt handling

---

### 🔄 Streaming Responses

Display AI responses in real-time as they're generated with **`useStreamContent`**:

```tsx
import { useStreamContent } from 'react-google-genai';

export function StreamingDemo() {
  const { stream, fullText, isStreaming, error, abort } = useStreamContent({
    model: 'gemini-2.5-flash',
    systemInstruction: 'You are a helpful coding assistant.',
  });

  return (
    <div>
      <button onClick={() => stream('Explain React hooks')} disabled={isStreaming}>
        {isStreaming ? '⏳ Streaming...' : '🎬 Start Stream'}
      </button>
      
      {isStreaming && (
        <button onClick={abort} style={{ marginLeft: '10px' }}>
          ⏹️ Stop
        </button>
      )}

      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      
      <div 
        style={{ 
          whiteSpace: 'pre-wrap',
          minHeight: '100px',
          padding: '10px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px'
        }}
      >
        {fullText}
        {isStreaming && '▌'}
      </div>
    </div>
  );
}
```

### 🎞️ Streaming with React Query
Use **`useStreamContentQuery`** when you want streamed AI output managed by TanStack Query. This hook returns a query result and a stable `queryKey`, so you can render chunked text declaratively and reuse query caching across components.

```tsx
import { useStreamContentQuery } from 'react-google-genai';

export function StreamingQueryDemo() {
  const { streamQuery, queryKey } = useStreamContentQuery({
    prompt: 'Explain quantum entanglement in simple terms',
    model: 'gemini-2.5-flash',
    trigger: true,
    refetchMode: 'reset',
  });

  const fullText = streamQuery.data?.join('') ?? '';

  return (
    <div>
      <p>Query Key: {JSON.stringify(queryKey)}</p>
      {streamQuery.isFetching && <p>Streaming…</p>}
      {streamQuery.isError && <p style={{ color: 'red' }}>Error: {streamQuery.error?.message}</p>}
      <div style={{ whiteSpace: 'pre-wrap', minHeight: '120px', padding: '10px', background: '#f7f7ff', borderRadius: '8px' }}>
        {fullText}
      </div>
    </div>
  );
}
```

**Features:**
- `abort()` — Cancel streaming mid-way
- `chunks` — Access individual chunks for custom processing
- `fullText` — Complete accumulated response
- Real-time display of responses

---

### ⚙️ Interaction Hooks

Use the Interactions API helpers when you want structured request control or query-based interaction creation.

#### `useInteractionBaseCreateQuery`

The query variant creates an interaction declaratively and caches the result based on `model` + `prompt`.

```tsx
import { useInteractionBaseCreateQuery } from 'react-google-genai';

export function InteractionQueryDemo() {
  const { interactionResponse, queryKey } = useInteractionBaseCreateQuery({
    model: 'gemini-2.5-flash',
    prompt: 'Translate this sentence into Tamil: "Hello world."',
    systemInstruction: 'You are a translator.',
    trigger: true,
  });

  const text = interactionResponse.data?.output?.[0]?.content?.[0]?.text ?? '';

  return (
    <div>
      <p>Query key: {JSON.stringify(queryKey)}</p>
      {interactionResponse.isLoading && <p>Loading…</p>}
      {interactionResponse.isError && <p style={{ color: 'red' }}>Error: {interactionResponse.error?.message}</p>}
      <p>{text}</p>
    </div>
  );
}
```

#### `useInteractionBaseMutate`

Use the mutation variant for imperative interaction control, including manual create and delete operations.

```tsx
import { useInteractionBaseMutate } from 'react-google-genai';

export function InteractionMutateDemo() {
  const { create, delete: remove } = useInteractionBaseMutate({
    model: 'gemini-2.5-flash',
    systemInstruction: 'You are a helpful assistant.',
    onCreateError: (error) => console.error(error),
    onDeleteError: (error) => console.error(error),
  });

  const handleCreate = () => create.generate('Hello from a user');
  const handleDelete = () => remove.delete({ interactionID: 'example-id' });

  return (
    <div>
      <button onClick={handleCreate}>Create</button>
      <button onClick={handleDelete} disabled={remove.isPending}>Delete</button>
      {create.isPending && <p>Creating…</p>}
      {create.isError && <p style={{ color: 'red' }}>{create.error?.message}</p>}
      <p>{create.text}</p>
    </div>
  );
}
```

---

### 💬 Multi-Turn Chat

Maintain conversation history with **`useChat`**:

```tsx
import { useChat } from 'react-google-genai';
import { useState } from 'react';

export function ChatInterface() {
  const [input, setInput] = useState('');
  const { sendMessage, messages, isResponding, error, reset } = useChat({
    model: 'gemini-2.5-flash',
    streaming: true, // Stream responses by default
    systemInstruction: 'You are a helpful assistant.',
  });

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  return (
    <div style={{ maxWidth: '600px' }}>
      {/* Message History */}
      <div style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '20px' }}>
        {messages.map((msg) => (
          <div 
            key={msg.id}
            style={{
              marginBottom: '10px',
              padding: '10px',
              borderRadius: '8px',
              backgroundColor: msg.role === 'user' ? '#e3f2fd' : '#f5f5f5'
            }}
          >
            <strong>{msg.role === 'user' ? '👤 You' : '🤖 Assistant'}:</strong>
            <p>{msg.text}</p>
          </div>
        ))}
        {isResponding && <p style={{ color: '#666' }}>⏳ Assistant is thinking...</p>}
      </div>

      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}

      {/* Input Area */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          disabled={isResponding}
          style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button onClick={handleSend} disabled={isResponding || !input.trim()}>
          Send
        </button>
        <button onClick={reset} style={{ backgroundColor: '#f44336', color: 'white' }}>
          Reset
        </button>
      </div>

      <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
        📍 {messages.length} messages in conversation
      </p>
    </div>
  );
}
```

**Key Features:**
- Automatic history management
- Stateful multi-turn conversations
- Streaming or non-streaming responses
- Message persistence and replay

---

### 🔧 Function Calling

Let AI execute your custom functions automatically with **`useFunctionCalling`**:

```tsx
import { useFunctionCalling } from 'react-google-genai';
import type { Tool } from 'react-google-genai';

// Define your tools
const tools: Tool[] = [
  {
    name: 'getWeather',
    description: 'Get current weather for a city',
    parameters: {
      type: 'OBJECT',
      properties: {
        city: { type: 'STRING', description: 'City name' },
        unit: { 
          type: 'STRING', 
          enum: ['C', 'F'],
          description: 'Temperature unit'
        }
      },
      required: ['city']
    }
  },
  {
    name: 'calculateDistance',
    description: 'Calculate distance between two cities',
    parameters: {
      type: 'OBJECT',
      properties: {
        from: { type: 'STRING', description: 'Starting city' },
        to: { type: 'STRING', description: 'Destination city' }
      },
      required: ['from', 'to']
    }
  }
];

// Implement your handlers
const handlers = {
  getWeather: async ({ city, unit = 'C' }) => {
    // Call your API or service
    const response = await fetch(`/api/weather?city=${city}&unit=${unit}`);
    return await response.json();
  },
  
  calculateDistance: async ({ from, to }) => {
    // Call your API or service
    const response = await fetch(`/api/distance?from=${from}&to=${to}`);
    return await response.json();
  }
};

export function SmartAssistant() {
  const { call, text, isPending, error, turns } = useFunctionCalling({
    model: 'gemini-2.5-flash',
    tools,
    handlers,
    systemInstruction: 'You are a travel assistant. Use the available tools to help users.',
  });

  return (
    <div>
      <button onClick={() => call('What is the weather in London and Paris?')} disabled={isPending}>
        {isPending ? '⏳ Processing...' : '🌍 Ask'}
      </button>

      {error && <p style={{ color: 'red' }}>❌ Error: {error.message}</p>}

      {text && (
        <div style={{ marginTop: '20px' }}>
          <p>{text}</p>
          <p style={{ fontSize: '12px', color: '#666' }}>
            🔄 Function calls: {turns}
          </p>
        </div>
      )}
    </div>
  );
}
```

**How it works:**
1. User sends prompt
2. Model analyzes and decides which functions to call
3. SDK automatically executes matching handlers
4. Results are sent back to model
5. Model generates final response with function results
6. Process repeats until model finishes

---

### 📊 Model Information

Query cached model metadata with **`useModelInfo`**:

```tsx
import { useModelInfo } from 'react-google-genai';

export function ModelSelector() {
  const { data: modelInfo, isLoading, error } = useModelInfo('gemini-2.5-flash');

  if (isLoading) return <p>⏳ Loading model info...</p>;
  if (error) return <p>❌ Error: {error.message}</p>;

  return (
    <div>
      <h3>{modelInfo?.displayName}</h3>
      <p>Version: {modelInfo?.version}</p>
      <p>Input tokens: ${modelInfo?.inputTokenCostPer1M}</p>
      <p>Output tokens: ${modelInfo?.outputTokenCostPer1M}</p>
      <p>Max input: {modelInfo?.inputTokenLimit} tokens</p>
      <p>Max output: {modelInfo?.outputTokenLimit} tokens</p>
    </div>
  );
}
```

---

## ⚙️ Advanced Configuration

### Custom QueryClient

For fine-grained control over caching and refetching:

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GenAIProvider } from 'react-google-genai';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      retry: 3,
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GenAIProvider 
        apiKey={process.env.VITE_GEMINI_API_KEY!}
        queryClient={queryClient}
      >
        <YourApp />
      </GenAIProvider>
    </QueryClientProvider>
  );
}
```

### Handling Errors

All hooks support error callbacks and error states:

```tsx
const { generate, error, isPending } = useGenerateContentMutate({
  model: 'gemini-2.5-flash',
  onError: async (error) => {
    console.error('Generation failed:', error.message);
    // Log to error tracking service
    await logToSentry(error);
    // Show user-friendly message
    showNotification('Failed to generate content. Please try again.');
  }
});

// Also check error state
if (error) {
  if (error.message.includes('429')) {
    // Rate limit exceeded
  } else if (error.message.includes('401')) {
    // Invalid API key
  }
}
```

---

## 📖 Complete API Reference

### `<GenAIProvider />`

Root provider component that sets up the context for all hooks.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `apiKey` | `string` | ✅* | Gemini API key from [ai.google.dev](https://ai.google.dev) |
| `vertexAIConfig` | `{ project: string, location: string }` | ✅* | Vertex AI configuration (mutually exclusive with `apiKey`) |
| `queryClient` | `QueryClient` | ❌ | Custom TanStack QueryClient instance |
| `children` | `ReactNode` | ✅ | Child components |

\* Exactly one of `apiKey` or `vertexAIConfig` is required

---

### `useGenerateContentMutate(options)`

One-shot text generation with manual triggering.

**Options:**
```ts
interface UseGenerateContentOptions {
  model: string;                           // e.g., 'gemini-2.5-flash'
  systemInstruction?: string;              // Optional system prompt
  maxOutputTokens?: number;                // Max response length
  temperature?: number;                    // 0-2, higher = more creative
  onError?: (error: Error) => void;       // Error callback
}
```

**Returns:**
```ts
{
  generate: (prompt: string) => void;
  generateAsync: (prompt: string) => Promise<GenerateResult>;
  data: GenerateResult | null;
  text: string;                            // Extracted text from response
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: Error | null;
  status: 'idle' | 'pending' | 'success' | 'error';
  reset: () => void;
}
```

---

### `useStreamContent(options)`

Token-by-token streaming for real-time responses.

**Options:** Same as `useGenerateContentOptions`

**Returns:**
```ts
{
  stream: (prompt: string) => Promise<void>;
  abort: () => void;
  reset: () => void;
  chunks: string[];
  fullText: string;
  isStreaming: boolean;
  error: Error | null;
}
```

---

### `useStreamContentQuery(options)`

Streaming content generation integrated with TanStack Query.

**Options:**
```ts
interface UseStreamContentQueryOptions {
  model: string;
  prompt?: string;
  systemInstruction?: string;
  temperature?: number;
  trigger?: boolean;
  refetchMode?: 'reset' | 'merge';
  cacheConfig?: {
    staleTime?: number;
    gcTime?: number;
  };
  retryCount?: number;
}
```

**Returns:**
```ts
{
  streamQuery: {
    data?: string[];
    error?: Error;
    isFetching: boolean;
    isError: boolean;
    status: string;
    refetch: () => Promise<void>;
  };
  queryKey: readonly unknown[];
}
```

> Note: `streamQuery.data` is an array of streaming chunks. Use `streamQuery.data?.join('')` to display the full concatenated response.

---

### `useGenerateContentQuery(options)`

Declarative content generation with automatic TanStack Query caching.

**Options:**
```ts
interface UseGenerateContentOptionsQuery {
  model: string;
  prompt: string;
  systemInstruction?: string;
  maxOutputTokens?: number;
  temperature?: number;
  cacheConfig?: {
    staleTime?: number;
    gcTime?: number;
  };
  trigger?: boolean;
  retryCount?: number;
}
```

**Returns:**
```ts
{
  queryKey: readonly unknown[];
  data: GenerateResult | null;
  text: string;
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: Error | null;
  status: 'pending' | 'error' | 'success';
  refetch: () => Promise<void>;
}
```

---

### `useInteractionBaseCreateQuery(options)`

Declaratively create an interaction using the Interactions API and cache the response based on `model` and `prompt`.

**Options:**
```ts
interface UseInteractionBaseCreateHookQuery {
  model: string;
  prompt: string;
  api_version?: string;
  systemInstruction?: string;
  temperature?: number;
  cacheConfig?: {
    staleTime?: number;
    gcTime?: number;
  };
  trigger?: boolean;
}
```

**Returns:**
```ts
{
  interactionResponse: {
    data?: Interactions.Interaction;
    error?: Error;
    isLoading: boolean;
    isError: boolean;
    status: string;
    refetch: () => Promise<void>;
  };
  queryKey: readonly unknown[];
}
```

---

### `useInteractionBaseMutate(options)`

Imperative interaction creation and deletion with mutation-based control.

**Options:**
```ts
interface UseInteractionBaseCreateHookMutate {
  model: string;
  api_version?: string;
  systemInstruction?: string;
  temperature?: number;
  onCreateError?: (error: Error) => void | Promise<void>;
  onDeleteError?: (error: Error) => void | Promise<void>;
}
```

**Returns:**
```ts
{
  create: {
    generate: (prompt: string) => void;
    generateAsync: (prompt: string) => Promise<GenerateResult>;
    data: GenerateResult | null;
    text: string;
    isPending: boolean;
    isError: boolean;
    isSuccess: boolean;
    error: Error | null;
    status: 'idle' | 'pending' | 'success' | 'error';
    reset: () => void;
  };
  delete: {
    delete: (variables: { interactionID: string; interactionDeleteParams?: Interactions.InteractionDeleteParams }) => void;
    deleteAsync: (variables: { interactionID: string; interactionDeleteParams?: Interactions.InteractionDeleteParams }) => Promise<unknown>;
    data: unknown | null;
    variables: unknown;
    isPending: boolean;
    isError: boolean;
    isSuccess: boolean;
    error: Error | null;
    status: 'idle' | 'pending' | 'success' | 'error';
    reset: () => void;
  };
}
```

---

### `useChat(options)`

Multi-turn conversation management.

**Options:**
```ts
interface UseChatOptions {
  model: string;
  systemInstruction?: string;
  temperature?: number;
  streaming?: boolean;                     // Default: true
}
```

**Returns:**
```ts
{
  sendMessage: (message: string) => void;
  sendMessageAsync: (message: string) => Promise<void>;
  messages: ChatMessage[];
  isResponding: boolean;
  error: Error | null;
  reset: () => void;
  messageCount: number;
}
```

---

### `useFunctionCalling(options)`

Automatic function invocation by the model.

**Options:**
```ts
interface UseFunctionCallingOptions {
  model: string;
  tools: Tool[];
  handlers: Record<string, (args: Record<string, unknown>) => Promise<unknown> | unknown>;
  systemInstruction?: string;
  temperature?: number;
}
```

**Returns:**
```ts
{
  call: (prompt: string) => void;
  callAsync: (prompt: string) => Promise<GenerateResult>;
  data: GenerateResult | null;
  text: string;
  turns: number;                           // Number of function calls
  isPending: boolean;
  isError: boolean;
  error: Error | null;
  reset: () => void;
}
```

---

### `useModelInfo(model: string)`

Query model metadata and capabilities.

**Returns:** Standard TanStack Query result
```ts
{
  data: Model | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}
```

---

## 🎨 Best Practices

### 1. **Authentication**
```tsx
// ✅ Load API key from environment
const apiKey = process.env.VITE_GEMINI_API_KEY;
if (!apiKey) throw new Error('Missing VITE_GEMINI_API_KEY');

<GenAIProvider apiKey={apiKey}>
  <App />
</GenAIProvider>

// ❌ Never hardcode API keys
// ❌ Never expose API keys in client-side code in production
```

### 2. **Temperature Selection**
```tsx
// Deterministic (Q&A, extraction)
temperature: 0.1

// Balanced (general use)
temperature: 0.7

// Creative (brainstorming, writing)
temperature: 1.5
```

### 3. **Error Handling**
```tsx
const { generate, error, isPending } = useGenerateContentMutate({
  model: 'gemini-2.5-flash',
  onError: handleError, // Always provide error handler
});

function handleError(error: Error) {
  if (error.message.includes('429')) {
    // Implement exponential backoff
  } else if (error.message.includes('401')) {
    // Refresh authentication
  }
}
```

### 4. **Streaming for Better UX**
```tsx
// Good: Stream long responses
<useStreamContent model="gemini-2.5-flash" />

// Also good: Non-streaming for quick responses
<useGenerateContentMutate model="gemini-2.5-flash" />
```

### 5. **System Instructions**
```tsx
// Specific instructions improve output quality
systemInstruction: `
You are an expert React developer.
- Always use TypeScript
- Provide production-ready code
- Include error handling
- Add descriptive comments
`
```

---

## 🔍 Troubleshooting

### API Key Issues
```
Error: Invalid API key
→ Verify key at https://ai.google.dev
→ Check environment variable is loaded
→ Ensure no extra whitespace
```

### Rate Limiting
```
Error: 429 Too Many Requests
→ Implement exponential backoff
→ Use streaming to reduce token usage
→ Check your quota at Google Cloud Console
```

### CORS Errors
```
Error: CORS policy blocked request
→ Use Vertex AI for backend integration
→ Implement backend proxy
→ Check allowed origins in API settings
```

### Model Not Found
```
Error: Model 'xyz' not found
→ Use 'gemini-2.5-flash' or 'gemini-1.5-pro'
→ Check model availability in your region
→ Verify model name spelling
```

---

## 📊 Performance Tips

1. **Memoize handlers in function calling:**
   ```tsx
   const handlers = useMemo(() => ({ getWeather, getLocation }), []);
   ```

2. **Use streaming for long responses:**
   - Improves perceived performance
   - Better user experience
   - Reduced memory usage

3. **Cache model info:**
   - Queries are automatically cached
   - Use custom `QueryClient` for fine-tuning

4. **Batch function calls:**
   - Group related functions together
   - Reduces model latency

5. **React Compiler benefits:**
   - Pre-compiled for automatic memoization
   - No additional setup needed
   - Works even without React Compiler enabled

---

## 🧪 Testing

```tsx
import { renderHook, act } from '@testing-library/react';
import { useGenerateContentMutate } from 'react-google-genai';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

it('generates content', async () => {
  const wrapper = ({ children }) => (
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  );

  const { result } = renderHook(() => useGenerateContentMutate({
    model: 'gemini-2.5-flash'
  }), { wrapper });

  act(() => {
    result.current.generate('Hello');
  });

  expect(result.current.isPending).toBe(true);
});
```

---

## 📚 Resources

- 📖 [Full Documentation](./docs/globals.md)
- 🌐 [Google Gemini Docs](https://ai.google.dev)
- ☁️ [Vertex AI Documentation](https://cloud.google.com/vertex-ai/docs)
- 🎯 [TanStack Query](https://tanstack.com/query)
- 🔑 [Get API Key](https://ai.google.dev/)

---

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues and pull requests.

---

## 📄 License

MIT © 2026 @sanjaiyan-dev
