[**react-google-genai**](../README.md)

***

[react-google-genai](../globals.md) / useChat

# Function: useChat()

> **useChat**(`options`): `object`

Defined in: [src/hooks/useChat.ts:28](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/hooks/useChat.ts#L28)

Multi-turn chat hook. Maintains session state and message history.
Supports both streaming and non-streaming responses.

## Parameters

### options

[`UseChatOptions`](../interfaces/UseChatOptions.md)

## Returns

### error

> **error**: `Error` \| `null`

Error from the last message, if any

### isResponding

> **isResponding**: `boolean`

Whether the model is currently generating a response

### messageCount

> **messageCount**: `number` = `messages.length`

Number of messages

### messages

> **messages**: [`ChatMessage`](../interfaces/ChatMessage.md)[]

All messages in the current session

### reset

> **reset**: () => `void`

Reset the session and clear history

#### Returns

`void`

### sendMessage

> **sendMessage**: (`text`) => `Promise`\<`void`\>

Send a message to the chat session

#### Parameters

##### text

`string`

#### Returns

`Promise`\<`void`\>

## Example

```tsx
const { sendMessage, messages, isResponding, reset } = useChat({
  model: 'gemini-2.5-flash',
  streaming: true,
});

// Send a message
sendMessage('Hello, how are you?');

// Render messages
{messages.map(m => <div key={m.id}>{m.role}: {m.text}</div>)}
```
