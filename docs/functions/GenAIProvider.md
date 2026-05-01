[**react-google-genai**](../README.md)

***

[react-google-genai](../globals.md) / GenAIProvider

# Function: GenAIProvider()

> **GenAIProvider**(`__namedParameters`): `Element`

Defined in: [src/context/GenAIContext.tsx:45](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/context/GenAIContext.tsx#L45)

Provides the Google GenAI client and TanStack QueryClient to all child hooks.

## Parameters

### \_\_namedParameters

[`GenAIProviderConfig`](../type-aliases/GenAIProviderConfig.md)

## Returns

`Element`

## Example

```tsx
<GenAIProvider apiKey={process.env.GEMINI_API_KEY}>
  <App />
</GenAIProvider>
```
