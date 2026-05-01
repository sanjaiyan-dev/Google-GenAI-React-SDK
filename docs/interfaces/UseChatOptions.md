[**react-google-genai**](../README.md)

***

[react-google-genai](../globals.md) / UseChatOptions

# Interface: UseChatOptions

Defined in: [src/types/index.ts:918](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L918)

Configuration options for the `useChat` hook.

Configures a multi-turn chat session with the Gemini model. The hook manages
conversation history and alternating user/model messages.

## Remarks

**Chat session lifecycle:**
1. Initialize hook with options
2. Send user messages via mutation
3. Hook maintains message history
4. Model responds, appending to history
5. Next message uses full history for context

**Streaming vs non-streaming:**
- `streaming: true` (default): Responses are streamed token-by-token
- `streaming: false`: Full response received at once

Each hook instance maintains its own independent conversation history.
Create multiple hooks for multiple conversations.

## See

useChat hook for implementation

## Example

```typescript
const chat = useChat({
  model: 'gemini-2.0-flash',
  systemInstruction: 'You are a helpful assistant.',
  streaming: true
});
```

## Properties

### model

> **model**: `string`

Defined in: [src/types/index.ts:928](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L928)

The Gemini model identifier for the chat session.

#### Remarks

All messages in this conversation will use this model.
Cannot be changed mid-conversation; create a new hook instance to switch models.

Examples: 'gemini-2.0-flash', 'gemini-1.5-pro'

***

### streaming?

> `optional` **streaming?**: `boolean`

Defined in: [src/types/index.ts:980](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L980)

Whether to stream responses in the chat.

#### Remarks

**Streaming enabled (true):**
- Tokens arrive incrementally
- Better perceived responsiveness
- Ideal for interactive chat UI
- Can display partial responses

**Streaming disabled (false):**
- Full response arrives at once
- Simpler to handle
- May feel slower to user

#### Default

```ts
true
```

***

### systemInstruction?

> `optional` **systemInstruction?**: `string`

Defined in: [src/types/index.ts:948](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L948)

Initial system instructions for the chat model.

#### Remarks

System instruction applies to the entire conversation and persists across
all turns unless explicitly overridden in a message.

**Examples:**
- "You are a Python expert. Provide code examples where applicable."
- "Answer all questions in haiku format."
- "You have knowledge cutoff of April 2024."

Useful for establishing:
- Persona/role
- Response format requirements
- Domain expertise
- Special capabilities

***

### temperature?

> `optional` **temperature?**: `number`

Defined in: [src/types/index.ts:961](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L961)

Sampling temperature for chat responses.

#### Remarks

Same behavior as [UseGenerateContentOptions.temperature](UseGenerateContentOptions.md#temperature).

**Recommended values:**
- **0-0.5**: Customer support, Q&A, factual responses
- **0.7-1**: General chat, balanced
- **1-1.5**: Creative writing, brainstorming
