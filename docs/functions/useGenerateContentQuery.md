[**react-google-genai**](../README.md)

***

[react-google-genai](../globals.md) / useGenerateContentQuery

# Function: useGenerateContentQuery()

> **useGenerateContentQuery**(`options`): `object`

Defined in: [src/hooks/useGenerateContent.ts:85](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/hooks/useGenerateContent.ts#L85)

## Parameters

### options

[`UseGenerateContentOptionsQuery`](../interfaces/UseGenerateContentOptionsQuery.md)

## Returns

### data

> **data**: [`GenerateResult`](../interfaces/GenerateResult.md) \| `null`

The raw result from the Gemini API. Defaults to null if no data.

### error

> **error**: `Error` \| `null` = `query.error`

The error object if the query failed.

### isError

> **isError**: `boolean` = `query.isError`

Boolean state indicating if the query encountered an error.

### isPending

> **isPending**: `boolean` = `query.isPending`

Boolean state indicating if the query is currently fetching.

### isSuccess

> **isSuccess**: `boolean` = `query.isSuccess`

Boolean state indicating if the query was successful.

### queryKey

> **queryKey**: readonly \[`"@google/genai"`, `"generateContent"`, `string`, `string`, `string` \| `undefined`, `number` \| `undefined`\]

The unique key used for this query in the cache.

### refetch

> **refetch**: (`options?`) => `Promise`\<`QueryObserverResult`\<[`GenerateResult`](../interfaces/GenerateResult.md), `Error`\>\> = `query.refetch`

Function to manually trigger a refetch of the data.

#### Parameters

##### options?

`RefetchOptions`

#### Returns

`Promise`\<`QueryObserverResult`\<[`GenerateResult`](../interfaces/GenerateResult.md), `Error`\>\>

### status

> **status**: `"error"` \| `"pending"` \| `"success"` = `query.status`

The current status of the query ('pending' | 'error' | 'success').

### text

> **text**: `string`

Convenience field containing only the text part of the response.
