[**react-google-genai**](../README.md)

***

[react-google-genai](../globals.md) / UseStreamContentOptions

# Interface: UseStreamContentOptions

Defined in: [src/types/index.ts:559](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L559)

Options for streaming content generation.

Configures the model behavior for streaming responses. When using streaming,
the model sends response tokens incrementally, enabling real-time display of
responses before generation completes.

## Remarks

**Streaming vs Non-Streaming:**
- **Streaming**: Better UX (progressive display), but slightly higher latency to first token
- **Non-streaming**: Simpler, faster for short responses, requires waiting for full response

**Common use cases for streaming:**
- Chat interfaces
- Code generation (show code as it's written)
- Content generation (document writing, articles)
- Real-time summarization

## See

 - useStreamContent hook for usage
 - useStreamContentQuery for query-based streaming

## Extended by

- [`UseStreamContentQueryOptions`](UseStreamContentQueryOptions.md)
- [`UseStreamContentHook`](UseStreamContentHook.md)

## Properties

### model

> **model**: `string`

Defined in: [src/types/index.ts:571](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L571)

The Gemini model identifier for streaming generation.

#### Remarks

Not all models support streaming equally. Streaming support is generally good for:
- gemini-2.0-flash
- gemini-1.5-flash
- gemini-3.1-pro

Verify streaming support for your model in the documentation.

***

### systemInstruction?

> `optional` **systemInstruction?**: `string`

Defined in: [src/types/index.ts:580](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L580)

Optional system instruction for the streaming session.

#### Remarks

Same behavior as [UseGenerateContentOptions.systemInstruction](UseGenerateContentOptions.md#systeminstruction).
Applies to all chunks received in this stream.

***

### temperature?

> `optional` **temperature?**: `number`

Defined in: [src/types/index.ts:589](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L589)

Sampling temperature for the streaming generation.

#### Remarks

Same range and behavior as [UseGenerateContentOptions.temperature](UseGenerateContentOptions.md#temperature).
Affects the randomness of each chunk generated.
