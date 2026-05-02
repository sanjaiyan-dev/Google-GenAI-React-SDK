[**react-google-genai**](../README.md)

***

[react-google-genai](../globals.md) / useGenerateContentMutate

# Function: useGenerateContentMutate()

> **useGenerateContentMutate**(`options`): `object`

Defined in: [src/hooks/useGenerateContent.ts:24](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/hooks/useGenerateContent.ts#L24)

Hook for one-shot content generation using Gemini.

## Parameters

### options

[`UseGenerateContentOptions`](../interfaces/UseGenerateContentOptions.md)

## Returns

### data

> **data**: [`GenerateResult`](../interfaces/GenerateResult.md) \| `null`

The raw result from the Gemini API. Defaults to null if no data.

### error

> **error**: `Error` \| `null` = `mutation.error`

The error object if the request failed.

### generate

> **generate**: `UseMutateFunction`\<[`GenerateResult`](../interfaces/GenerateResult.md), `Error`, `string`, `unknown`\> = `mutation.mutate`

Function to trigger the generation.

#### Param

The input text for the model.

### generateAsync

> **generateAsync**: `UseMutateAsyncFunction`\<[`GenerateResult`](../interfaces/GenerateResult.md), `Error`, `string`, `unknown`\> = `mutation.mutateAsync`

Async version of generate that returns a Promise.

#### Param

The input text for the model.

### isError

> **isError**: `boolean` = `mutation.isError`

Boolean state indicating if the last request failed.

### isPending

> **isPending**: `boolean` = `mutation.isPending`

Boolean state indicating if the request is currently in flight.

### isSuccess

> **isSuccess**: `boolean` = `mutation.isSuccess`

Boolean state indicating if the last request was successful.

### reset

> **reset**: () => `void` = `mutation.reset`

Function to reset the mutation state to its initial values.

#### Returns

`void`

### status

> **status**: `"error"` \| `"idle"` \| `"pending"` \| `"success"` = `mutation.status`

The current status of the mutation ('idle' | 'pending' | 'error' | 'success').

### text

> **text**: `string`

Convenience field containing only the text part of the response.

### variables

> **variables**: `string` \| `undefined` = `mutation.variables`

The prompt string used for the current/last generation.

## Example

```tsx
const { generate, data, isPending, error } = useGenerateContentMutate({
  model: 'gemini-2.5-flash',
});

<button onClick={() => generate('Tell me a joke')}>Generate</button>
{isPending && <Spinner />}
{data && <p>{data.text}</p>}
```
