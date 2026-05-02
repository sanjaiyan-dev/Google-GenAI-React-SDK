[**react-google-genai**](../README.md)

***

[react-google-genai](../globals.md) / useInteractionBaseCreateQuery

# Function: useInteractionBaseCreateQuery()

> **useInteractionBaseCreateQuery**(`options`): `object`

Defined in: [src/hooks/interactions/useInteractionBase.ts:26](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/hooks/interactions/useInteractionBase.ts#L26)

Hook for declarative interaction creation using the Vertex AI Interactions API.

## Parameters

### options

[`UseInteractionBaseCreateHookQuery`](../interfaces/UseInteractionBaseCreateHookQuery.md)

## Returns

`object`

### interactionResponse

> **interactionResponse**: `UseQueryResult`\<`Interaction`, `Error`\>

### queryKey

> **queryKey**: readonly \[`"@google/genai"`, `"interactionBase"`, `Model_2`, `string` \| `TextContent` \| `ImageContent` \| `AudioContent` \| `DocumentContent` \| `VideoContent` \| `ThoughtContent` \| `FunctionCallContent` \| `CodeExecutionCallContent` \| `URLContextCallContent` \| `MCPServerToolCallContent` \| `GoogleSearchCallContent` \| `FileSearchCallContent` \| `GoogleMapsCallContent` \| `FunctionResultContent` \| `CodeExecutionResultContent` \| `URLContextResultContent` \| `GoogleSearchResultContent` \| `MCPServerToolResultContent` \| `FileSearchResultContent` \| `GoogleMapsResultContent` \| `Content_2`[] \| `Turn`[]\]

## Remarks

This hook automatically creates an interaction when enabled and caches
the result by `model` and `prompt`. It exposes the underlying query state
via `interactionResponse` so calling components can render loading, error,
and success states.

## Example

```tsx
const { interactionResponse, queryKey } = useInteractionBaseCreateQuery({
  model: 'gemini-2.5-flash',
  prompt: 'Translate this sentence into Tamil.',
  systemInstruction: 'You are a translator.',
});

const text = interactionResponse.data?.output?.[0]?.content?.[0]?.text ?? '';
```
