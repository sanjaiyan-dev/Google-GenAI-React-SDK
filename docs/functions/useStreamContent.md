[**react-google-genai**](../README.md)

***

[react-google-genai](../globals.md) / useStreamContent

# Function: useStreamContent()

> **useStreamContent**(`options`): `object`

Defined in: [src/hooks/useStreamContent.ts:31](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/hooks/useStreamContent.ts#L31)

Hook for streaming content generation. Accumulates chunks progressively.

## Parameters

### options

[`UseStreamContentOptions`](../interfaces/UseStreamContentOptions.md)

## Returns

### abort

> **abort**: () => `void`

Abort in-progress stream

#### Returns

`void`

### chunks

> **chunks**: `string`[] = `state.chunks`

Array of received text chunks

### error

> **error**: `Error` \| `null` = `state.error`

Error if stream failed

### fullText

> **fullText**: `string` = `state.fullText`

Full concatenated text so far

### isStreaming

> **isStreaming**: `boolean` = `state.isStreaming`

Whether streaming is in progress

### reset

> **reset**: () => `void`

Reset all state

#### Returns

`void`

### stream

> **stream**: (`prompt`) => `Promise`\<`void`\>

Start streaming generation

#### Parameters

##### prompt

`string`

#### Returns

`Promise`\<`void`\>

## Example

```tsx
const { stream, fullText, isStreaming, error, reset } = useStreamContent({
  model: 'gemini-2.5-flash',
});

<button onClick={() => stream('Explain quantum entanglement')}>Stream</button>
{isStreaming && <p>Generating...</p>}
<p>{fullText}</p>
```
