[**react-google-genai**](../README.md)

***

[react-google-genai](../globals.md) / StreamState

# Interface: StreamState

Defined in: [src/types/index.ts:675](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L675)

Reactive state representing an active or completed streaming session.

Provides real-time feedback about the streaming process, including received chunks,
full text buffer, streaming status, and error information.

## Remarks

This state updates reactively as chunks arrive, allowing components to display
progressive content. Use with `useEffect` to perform actions when stream completes.

## Example

```typescript
const stream = useStreamContent({
  model: 'gemini-2.0-flash',
  prompt: userInput
});

return (
  <div>
    {stream.fullText && <p>{stream.fullText}</p>}
    {stream.isStreaming && <Spinner />}
    {stream.error && <Error>{stream.error.message}</Error>}
  </div>
);
```

## Properties

### chunks

> **chunks**: `string`[]

Defined in: [src/types/index.ts:689](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L689)

Array of all text chunks received so far, in order.

#### Remarks

Each element is a single chunk of text from the model.
Empty array until the first chunk arrives.
Cleared when stream completes or resets.

Useful when you need individual chunks for:
- Streaming to different output destinations
- Rate-limiting chunk processing
- Detailed progress tracking

***

### error

> **error**: `Error` \| `null`

Defined in: [src/types/index.ts:739](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L739)

Error object if the stream failed, or null if successful.

#### Remarks

Set when the stream encounters an error (network failure, rate limit, etc.).
Only check this after `isStreaming` becomes false.

Common error types:
- `Error`: Network or API errors
- Contains `message` property with error description

#### Example

```typescript
if (!stream.isStreaming && stream.error) {
  console.error('Stream failed:', stream.error.message);
}
```

***

### fullText

> **fullText**: `string`

Defined in: [src/types/index.ts:703](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L703)

The concatenated full text from all received chunks.

#### Remarks

This is equivalent to `chunks.join('')`.
Represents the complete output accumulated so far.

Empty string until first chunk arrives.
Continues growing until `isStreaming` becomes false.

In most UI cases, display this instead of individual chunks.

***

### isStreaming

> **isStreaming**: `boolean`

Defined in: [src/types/index.ts:719](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L719)

Boolean flag indicating if the stream is actively receiving data.

#### Remarks

**True**: Stream is open and expecting more chunks
**False**: Stream has completed (successfully or with error)

Use this flag to:
- Show/hide loading spinners
- Enable/disable send buttons
- Determine when to display final content

When false, check [StreamState.error](#error) for error information.
