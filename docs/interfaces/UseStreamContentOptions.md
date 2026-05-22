[**react-google-genai**](../README.md)

***

[react-google-genai](../globals.md) / UseStreamContentOptions

# Interface: UseStreamContentOptions

Defined in: [src/types/index.ts:588](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L588)

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

Defined in: [src/types/index.ts:600](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L600)

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

Defined in: [src/types/index.ts:609](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L609)

Optional system instruction for the streaming session.

#### Remarks

Same behavior as [UseGenerateContentOptions.systemInstruction](UseGenerateContentOptions.md#systeminstruction).
Applies to all chunks received in this stream.

***

### temperature?

> `optional` **temperature?**: `number`

Defined in: [src/types/index.ts:618](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L618)

Sampling temperature for the streaming generation.

#### Remarks

Same range and behavior as [UseGenerateContentOptions.temperature](UseGenerateContentOptions.md#temperature).
Affects the randomness of each chunk generated.

***

### thinkingConfig?

> `optional` **thinkingConfig?**: `ThinkingConfig`

Defined in: [src/types/index.ts:645](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L645)

Configuration for the model's explicit thinking and reasoning capabilities.

#### Remarks

Enables control over the "chain-of-thought" generation process for complex logic, multi-step planning, and reasoning.
This feature is supported by Gemini 2.5 and Gemini 3 series models.

**Key Parameters:**
- `includeThoughts`: Determines whether to return the model's internal reasoning process in the response parts.
- `thinkingBudget`: (Gemini 2.5 series) The token budget allocated for reasoning. Setting this to `0` disables thinking to reduce latency (except on `gemini-2.5-pro`, which has a minimum budget of `128`).
- `thinkingLevel`: (Gemini 3 series) The level of reasoning depth (`'MINIMAL'`, `'LOW'`, `'MEDIUM'`, `'HIGH'`). Lower levels reduce latency and token usage for simpler tasks.

#### Example

```typescript
// For Gemini 3: Request low-level reasoning and return the thoughts in the response
thinkingConfig: {
  includeThoughts: true,
  thinkingLevel: 'LOW',
}

// For Gemini 2.5: Disable thinking completely to achieve lower latency
thinkingConfig: {
  thinkingBudget: 0,
}
```
