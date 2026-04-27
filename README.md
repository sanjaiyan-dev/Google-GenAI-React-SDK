# react-google-genai

> **Ergonomic React hooks for Google Gemini AI** — streaming, multi-turn chat, automatic function calling, and TanStack Query integration. Compiled with the React Compiler.

[![npm](https://img.shields.io/npm/v/react-google-genai)](https://www.npmjs.com/package/react-google-genai)
[![license](https://img.shields.io/npm/l/react-google-genai)](./LICENSE)

---

## Features

- **`useGenerateContent`** — One-shot text generation via `useMutation`
- **`useStreamContent`** — Token-by-token streaming with abort support
- **`useChat`** — Multi-turn conversations with history, streaming by default
- **`useFunctionCalling`** — Automatic tool-use loop; register handlers and forget
- **`useModelInfo`** — Cached model metadata via `useQuery`
- ✅ Full TypeScript types
- ✅ React Compiler pre-compiled
- ✅ Zero config — bring your own `QueryClient` or let the library create one
- ✅ Dual ESM + CJS build

---

## Installation

```bash
npm install react-google-genai @google/genai @tanstack/react-query
```

---

## Quick Start

### 1. Wrap your app

```tsx
import { GenAIProvider } from 'react-google-genai';

function App() {
  return (
    <GenAIProvider apiKey={process.env.VITE_GEMINI_API_KEY!}>
      <MyApp />
    </GenAIProvider>
  );
}
```

### 2. Generate content

```tsx
import { useGenerateContent } from 'react-google-genai';

function Demo() {
  const { generate, text, isPending } = useGenerateContent({
    model: 'gemini-2.0-flash',
  });

  return (
    <>
      <button onClick={() => generate('Tell me a joke')} disabled={isPending}>
        {isPending ? 'Generating…' : 'Generate'}
      </button>
      <p>{text}</p>
    </>
  );
}
```

### 3. Streaming

```tsx
import { useStreamContent } from 'react-google-genai';

function StreamDemo() {
  const { stream, fullText, isStreaming } = useStreamContent({
    model: 'gemini-2.0-flash',
  });

  return (
    <>
      <button onClick={() => stream('Explain React Compiler')} disabled={isStreaming}>
        Stream
      </button>
      <p>{fullText}</p>
    </>
  );
}
```

### 4. Multi-turn Chat

```tsx
import { useChat } from 'react-google-genai';

function ChatDemo() {
  const { sendMessage, messages, isResponding, reset } = useChat({
    model: 'gemini-2.0-flash',
    streaming: true,
  });

  return (
    <>
      {messages.map((m) => (
        <div key={m.id}><b>{m.role}:</b> {m.text}</div>
      ))}
      <button onClick={() => sendMessage('Hello!')} disabled={isResponding}>
        Send
      </button>
      <button onClick={reset}>Reset</button>
    </>
  );
}
```

### 5. Function Calling

```tsx
import { useFunctionCalling } from 'react-google-genai';

const weatherDeclaration = {
  name: 'getWeather',
  description: 'Gets current weather for a city',
  parameters: {
    type: 'OBJECT',
    properties: {
      city: { type: 'STRING', description: 'City name' },
    },
    required: ['city'],
  },
};

function FunctionCallingDemo() {
  const { call, text, isPending } = useFunctionCalling({
    model: 'gemini-2.0-flash',
    tools: [{ functionDeclarations: [weatherDeclaration] }],
    handlers: {
      getWeather: async ({ city }) => ({ temperature: 22, unit: 'C', city }),
    },
  });

  return (
    <>
      <button onClick={() => call('What is the weather in London?')} disabled={isPending}>
        Ask
      </button>
      <p>{text}</p>
    </>
  );
}
```

### 6. Model Info

```tsx
import { useModelInfo } from 'react-google-genai';

function ModelInfo() {
  const { data, isLoading } = useModelInfo('gemini-2.0-flash');
  if (isLoading) return <p>Loading…</p>;
  return <p>{data?.displayName}</p>;
}
```

---

## API Reference

### `<GenAIProvider>`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `apiKey` | `string` | ✅ | Gemini API key |
| `queryClient` | `QueryClient` | ❌ | Custom TanStack QueryClient |

### `useGenerateContent(options)`

| Option | Type | Description |
|--------|------|-------------|
| `model` | `string` | Model name |
| `systemInstruction` | `string` | Optional system prompt |
| `maxOutputTokens` | `number` | Max tokens |
| `temperature` | `number` | Sampling temperature |

Returns: `{ generate, generateAsync, data, text, isPending, isError, error, reset }`

### `useStreamContent(options)`

Returns: `{ stream, abort, reset, chunks, fullText, isStreaming, error }`

### `useChat(options)`

| Option | Type | Default |
|--------|------|---------|
| `streaming` | `boolean` | `true` |

Returns: `{ sendMessage, messages, isResponding, error, reset, messageCount }`

### `useFunctionCalling(options)`

| Option | Type | Description |
|--------|------|-------------|
| `tools` | `Tool[]` | Gemini tool definitions |
| `handlers` | `Record<string, FunctionHandler>` | Local function implementations |

Returns: `{ call, callAsync, data, text, turns, isPending, isError, error, reset }`

### `useModelInfo(model: string)`

Returns standard TanStack Query result.

---

## React Compiler

This library is pre-compiled with `babel-plugin-react-compiler`. No additional setup needed for users — even those **not** using the React Compiler benefit from automatic memoization.

---

## License

MIT
