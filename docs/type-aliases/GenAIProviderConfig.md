[**react-google-genai**](../README.md)

***

[react-google-genai](../globals.md) / GenAIProviderConfig

# Type Alias: GenAIProviderConfig

> **GenAIProviderConfig** = \{ `apiKey?`: `never`; `children`: `React.ReactNode`; `queryClient?`: `QueryClient`; `vertexAIConfig`: \{ `location`: `GoogleGenAIOptions`\[`"location"`\]; `project`: `GoogleGenAIOptions`\[`"project"`\]; \}; \} \| \{ `apiKey`: `GoogleGenAIOptions`\[`"apiKey"`\]; `children`: `React.ReactNode`; `queryClient?`: `QueryClient`; `vertexAIConfig?`: `never`; \}

Defined in: [src/types/index.ts:87](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L87)

Configuration for the GenAI provider component.

This is a discriminated union type that enforces mutually exclusive authentication methods.
Use either Vertex AI authentication or direct API Key authentication, but not both.
The provider wraps your application and makes GenAI functionality available to all child components
via React Context.

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

##### Remarks

All descendant components can use the GenAI hooks (useGenAIClient, useChat, etc.)
without prop drilling. The context provides the configured GenAI client instance.

#### queryClient?

> `optional` **queryClient?**: `QueryClient`

Optional existing TanStack QueryClient instance.

##### Remarks

If not provided, a new QueryClient with default settings will be created.
The provider maintains ownership of this client throughout its lifecycle.
When you provide a custom client:
- Your cache configuration preferences are respected
- You can share the same client across multiple providers
- You're responsible for managing the client's lifecycle if needed

##### See

https://tanstack.com/query/latest/docs/react/reference/QueryClient

#### vertexAIConfig

> **vertexAIConfig**: `object`

Vertex AI mode configuration.

When provided, the provider will authenticate using Google Cloud Vertex AI
instead of a direct Gemini API key. This is the recommended approach for
production deployments on Google Cloud Platform.

##### Remarks

Vertex AI requires the following:
- Valid GCP project with Vertex AI API enabled
- Service account credentials configured in your environment
- Appropriate IAM permissions (roles/aiplatform.user or equivalent)

##### See

https://cloud.google.com/vertex-ai/docs/generative-ai/gemini-on-vertex-ai

##### vertexAIConfig.location

> **location**: `GoogleGenAIOptions`\[`"location"`\]

Region for Vertex AI requests (e.g. "us-central1").

###### Remarks

Must be a valid GCP region where Vertex AI services are available.
Common regions: us-central1, europe-west1, asia-east1

##### vertexAIConfig.project

> **project**: `GoogleGenAIOptions`\[`"project"`\]

Google Cloud project ID used for Vertex AI.

###### Remarks

This is the numeric or alphanumeric project ID (not the project name).
You can find this in the GCP Console or via `gcloud config get-value project`.

***

### Type Literal

\{ `apiKey`: `GoogleGenAIOptions`\[`"apiKey"`\]; `children`: `React.ReactNode`; `queryClient?`: `QueryClient`; `vertexAIConfig?`: `never`; \}

#### apiKey

> **apiKey**: `GoogleGenAIOptions`\[`"apiKey"`\]

API key mode configuration.

Used for direct authentication with Google AI Studio / Gemini API.
This is the simplest setup for development and prototyping.

##### Remarks

To obtain an API key:
1. Visit https://ai.google.dev/
2. Click "Get API Key" button
3. Create a new API key in Google Cloud Console
4. Use the key with this configuration

**Security considerations:**
- Never commit API keys to version control
- Use environment variables (e.g., REACT_APP_GEMINI_KEY)
- Consider using a backend proxy for production applications
- Restrict key usage in Cloud Console (by HTTP referrer or IP)

##### See

https://ai.google.dev/

#### children

> **children**: `React.ReactNode`

React components that will have access to the GenAI context.

##### Remarks

All descendant components can use the GenAI hooks (useGenAIClient, useChat, etc.)
without prop drilling. The context provides the configured GenAI client instance.

#### queryClient?

> `optional` **queryClient?**: `QueryClient`

Optional existing TanStack QueryClient instance.

##### Remarks

If not provided, a new QueryClient with default settings will be created.
The provider maintains ownership of this client throughout its lifecycle.
When you provide a custom client:
- Your cache configuration preferences are respected
- You can share the same client across multiple providers
- You're responsible for managing the client's lifecycle if needed

##### See

https://tanstack.com/query/latest/docs/react/reference/QueryClient

#### vertexAIConfig?

> `optional` **vertexAIConfig?**: `never`

Vertex AI config is NOT allowed when using API key mode.

##### Remarks

This enforces mutually exclusive authentication methods at the type level.
Setting `vertexAIConfig` when `apiKey` is provided will result in a type error.

## Type Param

Configuration object for Vertex AI authentication

## Type Param

Configuration object for direct API Key authentication

## Remarks

**Authentication Methods:**
- **Vertex AI**: Use when deploying on Google Cloud Platform with service account credentials.
  Requires `project` (GCP project ID) and `location` (e.g., "us-central1").
- **API Key**: Use when accessing Gemini API directly from Google AI Studio.
  Requires a valid `apiKey` string.

**QueryClient Behavior:**
If no `queryClient` is provided, the provider automatically creates and manages its own.
For production applications, consider providing a custom `QueryClient` configured with your
preferred cache durations and retry strategies.

## Examples

```tsx
// Vertex AI configuration
<GenAIProvider
  vertexAIConfig={{
    project: 'my-gcp-project',
    location: 'us-central1'
  }}
>
  <App />
</GenAIProvider>
```

```tsx
// API Key configuration
<GenAIProvider apiKey="your-gemini-api-key">
  <App />
</GenAIProvider>
```

## See

 - [UseGenerateContentOptions](../interfaces/UseGenerateContentOptions.md) for content generation configuration
 - [UseStreamContentOptions](../interfaces/UseStreamContentOptions.md) for streaming configuration
 - [UseChatOptions](../interfaces/UseChatOptions.md) for chat configuration
