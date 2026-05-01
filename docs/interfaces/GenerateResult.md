[**react-google-genai**](../README.md)

***

[react-google-genai](../globals.md) / GenerateResult

# Interface: GenerateResult

Defined in: [src/types/index.ts:499](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L499)

Standardized result object returned by content generation operations.

Provides both the raw API response and convenient extracted text, simplifying
consumption in React components.

## Remarks

This interface unifies the output format across different generation methods:
- `useGenerateContentMutate` returns this in `data`
- `useGenerateContentQuery` returns this in `data`
- Custom hooks may also return this structure

## See

GenerateContentResponse for details on raw API response structure

## Example

```typescript
const { data, isLoading } = useGenerateContentQuery({
  model: 'gemini-2.0-flash',
  prompt: 'Summarize this article: ...'
});

return (
  <div>
    {isLoading && <Spinner />}
    {data?.text && <p>{data.text}</p>}
  </div>
);
```

## Properties

### response

> **response**: [`GenerateContentResponse`](GenerateContentResponse.md)

Defined in: [src/types/index.ts:517](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L517)

The full raw response object from the @google/genai SDK.

#### Remarks

Contains complete API response including:
- `candidates`: Array of response alternatives (usually 1 element with default settings)
- `usageMetadata`: Token usage information for billing/monitoring
- `promptFeedback`: Safety/filtering feedback on the input prompt

Access this when you need:
- Token counts for analytics
- Multiple response candidates
- Full safety feedback details
- Raw content including any embedded media

#### See

https://ai.google.dev/api/rest/v1/GenerateContentResponse

***

### text

> **text**: `string`

Defined in: [src/types/index.ts:533](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L533)

The extracted text content from the model's first response candidate.

#### Remarks

This is a convenience property that extracts just the text from the first candidate.
Equivalent to `response.candidates?.[0]?.content?.parts?.[0]?.text ?? ''`

Contains an empty string if:
- No candidates were returned
- The candidate contains no text (e.g., function call)
- The model produced no output

For multi-modal responses or function calls, use the `response` field directly.
