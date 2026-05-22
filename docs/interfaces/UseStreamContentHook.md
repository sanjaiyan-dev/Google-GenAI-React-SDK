[**react-google-genai**](../README.md)

***

[react-google-genai](../globals.md) / UseStreamContentHook

# Interface: UseStreamContentHook

Defined in: [src/types/index.ts:810](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L810)

Return type for the `useStreamContent` hook.

Extends [UseStreamContentOptions](UseStreamContentOptions.md) with streaming-specific return values,
providing both configuration context and completion signaling.

## Remarks

The hook returns this object immediately, with `onError` being a promise that
resolves when the stream completes successfully or rejects when it fails.

## See

useStreamContent for usage details

## Extends

- [`UseStreamContentOptions`](UseStreamContentOptions.md)

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

#### Inherited from

[`UseStreamContentOptions`](UseStreamContentOptions.md).[`model`](UseStreamContentOptions.md#model)

***

### onError

> **onError**: `Promise`\<`void`\>

Defined in: [src/types/index.ts:835](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L835)

Promise that resolves when the stream completes or rejects on error.

#### Remarks

Use this promise to coordinate with other async operations:
- Wait for stream completion before processing
- Trigger side effects after streaming finishes
- Chain additional operations

**Resolves:** When streaming completes successfully
**Rejects:** When streaming encounters an error

#### Example

```typescript
const hook = useStreamContent(options);

try {
  await hook.onError; // Wait for completion
  console.log('Stream completed successfully');
} catch (error) {
  console.error('Stream failed:', error);
}
```

***

### systemInstruction?

> `optional` **systemInstruction?**: `string`

Defined in: [src/types/index.ts:609](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L609)

Optional system instruction for the streaming session.

#### Remarks

Same behavior as [UseGenerateContentOptions.systemInstruction](UseGenerateContentOptions.md#systeminstruction).
Applies to all chunks received in this stream.

#### Inherited from

[`UseStreamContentOptions`](UseStreamContentOptions.md).[`systemInstruction`](UseStreamContentOptions.md#systeminstruction)

***

### temperature?

> `optional` **temperature?**: `number`

Defined in: [src/types/index.ts:618](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L618)

Sampling temperature for the streaming generation.

#### Remarks

Same range and behavior as [UseGenerateContentOptions.temperature](UseGenerateContentOptions.md#temperature).
Affects the randomness of each chunk generated.

#### Inherited from

[`UseStreamContentOptions`](UseStreamContentOptions.md).[`temperature`](UseStreamContentOptions.md#temperature)

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

#### Inherited from

[`UseStreamContentOptions`](UseStreamContentOptions.md).[`thinkingConfig`](UseStreamContentOptions.md#thinkingconfig)
