[**react-google-genai**](../README.md)

***

[react-google-genai](../globals.md) / UseGenerateContentOptions

# Interface: UseGenerateContentOptions

Defined in: [src/types/index.ts:282](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L282)

Base options for content generation hooks.

This interface provides common configuration options shared by both mutation and query
variants of the generate content functionality. It configures the model behavior and
error handling.

## Remarks

**Usage Patterns:**
- Use `useGenerateContentMutate` for imperative content generation (button clicks, user actions)
- Use `useGenerateContentQuery` for declarative content generation (when data is needed)
- Both hooks accept options extending this interface

**Model Selection:**
Available models vary based on your authentication method and region.
Current popular models: 'gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-pro'

## See

 - https://ai.google.dev/models
 - useGenerateContentMutate for mutation variant
 - useGenerateContentQuery for query variant

## Properties

### maxOutputTokens?

> `optional` **maxOutputTokens?**: `number`

Defined in: [src/types/index.ts:330](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L330)

Maximum number of tokens to include in the output.

#### Remarks

Tokens are roughly equivalent to 4 characters in English text.
Limits include both completion tokens and any function outputs.

If output exceeds this limit, generation stops mid-response.
Each model has a maximum supported value. Leaving undefined uses the model's default.

***

### model

> **model**: `string`

Defined in: [src/types/index.ts:300](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L300)

The Gemini model identifier to use for content generation.

#### Remarks

Examples: 'gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-pro'

Different models have different capabilities:
- **Flash models**: Fast, lower cost, good for most tasks
- **Pro models**: More capable, better at complex reasoning

The specific models available depend on:
- Your authentication method (API key vs Vertex AI)
- The region (for Vertex AI)
- Your API plan

#### See

https://ai.google.dev/models/gemini

***

### onError?

> `optional` **onError?**: (`error`) => `void` \| `Promise`\<`void`\>

Defined in: [src/types/index.ts:374](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L374)

Optional callback function triggered when a content generation request fails.

#### Parameters

##### error

`Error`

The error object thrown during the request

#### Returns

`void` \| `Promise`\<`void`\>

#### Remarks

In `useGenerateContentMutate`, this callback is passed directly to the mutation.

**Common error scenarios:**
- Network failures
- Invalid API key
- Rate limiting (HTTP 429)
- Model not found
- Content filter violations

The callback can be async for cleanup operations (logging, analytics, etc.).

#### Example

```typescript
onError: async (error) => {
  console.error('Generation failed:', error.message);
  await logToAnalytics({ error: error.message });
}
```

***

### systemInstruction?

> `optional` **systemInstruction?**: `string`

Defined in: [src/types/index.ts:318](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L318)

Optional system instruction to guide the model's behavior.

#### Remarks

The system instruction is a permanent behavior guide that applies to all content
generated within this hook instance. It's sent with every request and affects how
the model interprets and responds to user prompts.

**Examples:**
- "You are a helpful technical writer. Use clear language and examples."
- "Format all responses as JSON"
- "Always respond in Spanish"

System instructions persist across multiple generations in the same hook instance
but can be overridden by contradictory instructions in the user prompt.

***

### temperature?

> `optional` **temperature?**: `number`

Defined in: [src/types/index.ts:347](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L347)

Controls the randomness and creativity of the output.

#### Remarks

**Range:** 0 to 2 (or model-specific maximum)

**Guidance:**
- `0` or `0.1`: Deterministic, always produces same output for same input (use for: classification, extraction, QA)
- `0.5` to `1`: Balanced (use for: general content generation, brainstorming)
- `1.5` to `2`: Creative, high variability (use for: creative writing, ideation)

Paired with `top_p` or `top_k` for fine-grained control.

#### Default

```ts
undefined (model default, typically 1)
```
