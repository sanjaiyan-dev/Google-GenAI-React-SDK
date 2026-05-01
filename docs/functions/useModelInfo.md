[**react-google-genai**](../README.md)

***

[react-google-genai](../globals.md) / useModelInfo

# Function: useModelInfo()

> **useModelInfo**(`model`): `UseQueryResult`\<`Model`, `Error`\>

Defined in: [src/hooks/useModelInfo.ts:17](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/hooks/useModelInfo.ts#L17)

Hook to fetch metadata about a Gemini model.
Result is cached via TanStack Query.

## Parameters

### model

`Model_2`

## Returns

`UseQueryResult`\<`Model`, `Error`\>

Fetched about models

## Example

```tsx
const { data, isLoading } = useModelInfo('gemini-2.0-flash');
if (data) console.log(data.displayName, data.inputTokenLimit);
```
