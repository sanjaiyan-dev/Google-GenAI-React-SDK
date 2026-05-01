[**react-google-genai**](../README.md)

***

[react-google-genai](../globals.md) / ChatMessage

# Interface: ChatMessage

Defined in: [src/types/index.ts:839](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L839)

Represents a single message in a chat conversation history.

Immutable message structure used in multi-turn conversations. Each message
is sent to the model with its role to maintain conversation context.

## Remarks

**Message flow in chat:**
1. User sends message (role: 'user')
2. Model responds (role: 'model')
3. Conversation history is maintained with alternating roles

**Storage and keys:**
- Messages are typically stored in an array/list
- Use `id` field for React list keys (never use array index)
- IDs should be stable across re-renders

## Example

```typescript
const messages: ChatMessage[] = [
  {
    role: 'user',
    text: 'What is machine learning?',
    id: 'msg-1'
  },
  {
    role: 'model',
    text: 'Machine learning is a subset of AI...',
    id: 'msg-2'
  }
];
```

## See

 - ChatRole for role type definition
 - UseChatOptions for chat configuration

## Properties

### id

> **id**: `string`

Defined in: [src/types/index.ts:883](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L883)

Unique identifier for the message.

#### Remarks

Used as React key for list rendering. Should be:
- Unique within the conversation
- Stable across re-renders
- Not the array index

**Generation strategies:**
- UUID: `crypto.randomUUID()`
- Timestamp + random: `${Date.now()}-${Math.random()}`
- Server-generated IDs: When backed by a database

#### Example

```tsx
{messages.map(msg => (
  <div key={msg.id}>{msg.text}</div>
))}
```

***

### role

> **role**: [`ChatRole`](../type-aliases/ChatRole.md)

Defined in: [src/types/index.ts:849](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L849)

The role/author of the message.

#### Remarks

- `'user'`: Message from the end user
- `'model'`: Response from Gemini

Used by the API to understand conversational context.

***

### text

> **text**: `string`

Defined in: [src/types/index.ts:860](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L860)

The text content of the message.

#### Remarks

Contains the actual message text sent or received.
Empty string is not recommended but supported.

For multi-modal content (images, etc.), use the raw API response.
