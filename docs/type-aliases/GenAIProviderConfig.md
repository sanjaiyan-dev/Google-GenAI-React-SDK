[**react-google-genai**](../README.md)

***

[react-google-genai](../globals.md) / GenAIProviderConfig

# Type Alias: GenAIProviderConfig

> **GenAIProviderConfig** = \{ `apiKey?`: `never`; `children`: `React.ReactNode`; `queryClient?`: `QueryClient`; `vertexAIConfig`: \{ `location`: `GoogleGenAIOptions`\[`"location"`\]; `project`: `GoogleGenAIOptions`\[`"project"`\]; \}; \} \| \{ `apiKey`: `GoogleGenAIOptions`\[`"apiKey"`\]; `children`: `React.ReactNode`; `queryClient?`: `QueryClient`; `vertexAIConfig?`: `never`; \}

Defined in: [src/types/index.ts:19](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L19)

Configuration for the GenAI provider component.
This configures the underlying Google GenAI client and optionally provides a custom TanStack QueryClient.

## Union Members

### Type Literal

\{ `apiKey?`: `never`; `children`: `React.ReactNode`; `queryClient?`: `QueryClient`; `vertexAIConfig`: \{ `location`: `GoogleGenAIOptions`\[`"location"`\]; `project`: `GoogleGenAIOptions`\[`"project"`\]; \}; \}

#### apiKey?

> `optional` **apiKey?**: `never`

API key is NOT allowed when using Vertex AI mode.
This enforces mutually exclusive auth methods.

#### children

> **children**: `React.ReactNode`

React components that will have access to the GenAI context.

#### queryClient?

> `optional` **queryClient?**: `QueryClient`

Optional existing TanStack QueryClient.
If not provided, a new one will be created and managed by the provider.

#### vertexAIConfig

> **vertexAIConfig**: `object`

Vertex AI mode configuration.
When provided, the provider will use Google Cloud Vertex AI
instead of a direct Gemini API key.

##### vertexAIConfig.location

> **location**: `GoogleGenAIOptions`\[`"location"`\]

Region for Vertex AI requests (e.g. "us-central1").

##### vertexAIConfig.project

> **project**: `GoogleGenAIOptions`\[`"project"`\]

Google Cloud project ID used for Vertex AI.

***

### Type Literal

\{ `apiKey`: `GoogleGenAIOptions`\[`"apiKey"`\]; `children`: `React.ReactNode`; `queryClient?`: `QueryClient`; `vertexAIConfig?`: `never`; \}

#### apiKey

> **apiKey**: `GoogleGenAIOptions`\[`"apiKey"`\]

API key mode configuration.
Used for Google AI Studio / Gemini API authentication.

#### children

> **children**: `React.ReactNode`

React components that will have access to the GenAI context.

#### queryClient?

> `optional` **queryClient?**: `QueryClient`

Optional existing TanStack QueryClient.
If not provided, a new one will be created and managed by the provider.

#### vertexAIConfig?

> `optional` **vertexAIConfig?**: `never`

Vertex AI config is NOT allowed when using API key mode.
This prevents mixing authentication strategies.
