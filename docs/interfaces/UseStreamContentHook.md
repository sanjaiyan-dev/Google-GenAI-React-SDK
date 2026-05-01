[**react-google-genai**](../README.md)

***

[react-google-genai](../globals.md) / UseStreamContentHook

# Interface: UseStreamContentHook

Defined in: [src/types/index.ts:754](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L754)

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

Defined in: [src/types/index.ts:571](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L571)

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

Defined in: [src/types/index.ts:779](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L779)

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

Defined in: [src/types/index.ts:580](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L580)

Optional system instruction for the streaming session.

#### Remarks

Same behavior as [UseGenerateContentOptions.systemInstruction](UseGenerateContentOptions.md#systeminstruction).
Applies to all chunks received in this stream.

#### Inherited from

[`UseStreamContentOptions`](UseStreamContentOptions.md).[`systemInstruction`](UseStreamContentOptions.md#systeminstruction)

***

### temperature?

> `optional` **temperature?**: `number`

Defined in: [src/types/index.ts:589](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L589)

Sampling temperature for the streaming generation.

#### Remarks

Same range and behavior as [UseGenerateContentOptions.temperature](UseGenerateContentOptions.md#temperature).
Affects the randomness of each chunk generated.

#### Inherited from

[`UseStreamContentOptions`](UseStreamContentOptions.md).[`temperature`](UseStreamContentOptions.md#temperature)
