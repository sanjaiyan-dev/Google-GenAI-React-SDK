[**react-google-genai**](../README.md)

***

[react-google-genai](../globals.md) / ChatRole

# Type Alias: ChatRole

> **ChatRole** = `"user"` \| `"model"`

Defined in: [src/types/index.ts:801](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L801)

Type representing the role/author of a message in a chat conversation.

## Remarks

Gemini API uses two-way chat:
- `'user'`: Messages from the end user
- `'model'`: Responses from the Gemini model

## See

ChatMessage for the complete message structure

## Example

```typescript
type ChatRole = 'user' | 'model';
const userMessage: ChatRole = 'user';
const modelResponse: ChatRole = 'model';
```
