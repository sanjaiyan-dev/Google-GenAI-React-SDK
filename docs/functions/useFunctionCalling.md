[**react-google-genai**](../README.md)

***

[react-google-genai](../globals.md) / useFunctionCalling

# Function: useFunctionCalling()

> **useFunctionCalling**(`options`): `object`

Defined in: [src/hooks/useFunctionCalling.ts:32](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/hooks/useFunctionCalling.ts#L32)

Hook for automatic multi-turn function calling with Gemini.
Registers your local handler functions, and the hook automatically executes
them when the model requests it, looping until the model returns a final response.

## Parameters

### options

[`UseFunctionCallingOptions`](../interfaces/UseFunctionCallingOptions.md)

## Returns

### call

> **call**: `UseMutateFunction`\<`FunctionCallingResult`, `Error`, `string`, `unknown`\> = `mutation.mutate`

Trigger function-call generation

### callAsync

> **callAsync**: `UseMutateAsyncFunction`\<`FunctionCallingResult`, `Error`, `string`, `unknown`\> = `mutation.mutateAsync`

Trigger and await result

### data

> **data**: `FunctionCallingResult` \| `null`

Final result after all function calls complete

### error

> **error**: `Error` \| `null` = `mutation.error`

### isError

> **isError**: `boolean` = `mutation.isError`

### isPending

> **isPending**: `boolean` = `mutation.isPending`

### isSuccess

> **isSuccess**: `boolean` = `mutation.isSuccess`

### reset

> **reset**: () => `void` = `mutation.reset`

#### Returns

`void`

### text

> **text**: `string`

Final text response

### turns

> **turns**: `number`

Number of model turns taken

### variables

> **variables**: `string` \| `undefined` = `mutation.variables`

## Example

```tsx
const { call, data, isPending, error } = useFunctionCalling({
  model: 'gemini-2.0-flash',
  tools: [{ functionDeclarations: [getWeatherDeclaration] }],
  handlers: {
    getWeather: async ({ city }) => ({ temperature: 22, unit: 'C' }),
  },
});

<button onClick={() => call('What is the weather in London?')}>Ask</button>
{data && <p>{data.text}</p>}
```
