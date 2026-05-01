[**react-google-genai**](../README.md)

***

[react-google-genai](../globals.md) / UseGenerateContentOptionsQuery

# Interface: UseGenerateContentOptionsQuery

Defined in: [src/types/index.ts:400](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L400)

Options specific to the `useGenerateContentQuery` hook.

Extends [UseGenerateContentOptions](UseGenerateContentOptions.md) with query-specific settings for declarative
content generation using TanStack Query. Use this when content generation should be
triggered automatically based on props/dependencies rather than user actions.

## Remarks

**Key differences from mutation:**
- Automatically refetches when dependencies change
- Includes caching behavior configuration
- Can be disabled and re-triggered programmatically
- Better for reactive/declarative code

**Use cases:**
- Generating summaries when document content changes
- Auto-translating text as it's typed
- Enriching data on load
- SEO-critical content generation

## See

 - useGenerateContentMutate for imperative variant
 - CacheConfig for detailed cache behavior

## Extends

- `Omit`\<[`UseGenerateContentOptions`](UseGenerateContentOptions.md), `"onError"`\>

## Properties

### cacheConfig?

> `optional` **cacheConfig?**: `CacheConfig`

Defined in: [src/types/index.ts:426](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L426)

Configuration for TanStack Query's caching and garbage collection behavior.

#### Remarks

Allows fine-tuning how long results are cached and when they're considered fresh.
See CacheConfig for detailed explanation of `staleTime` and `gcTime`.

#### See

CacheConfig for default values and guidance

***

### maxOutputTokens?

> `optional` **maxOutputTokens?**: `number`

Defined in: [src/types/index.ts:330](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L330)

Maximum number of tokens to include in the output.

#### Remarks

Tokens are roughly equivalent to 4 characters in English text.
Limits include both completion tokens and any function outputs.

If output exceeds this limit, generation stops mid-response.
Each model has a maximum supported value. Leaving undefined uses the model's default.

#### Inherited from

[`UseGenerateContentOptions`](UseGenerateContentOptions.md).[`maxOutputTokens`](UseGenerateContentOptions.md#maxoutputtokens)

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

#### Inherited from

[`UseGenerateContentOptions`](UseGenerateContentOptions.md).[`model`](UseGenerateContentOptions.md#model)

***

### prompt

> **prompt**: `string`

Defined in: [src/types/index.ts:415](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L415)

The input prompt for content generation.

#### Remarks

This is the primary trigger for the query. Any change to this string will:
1. Update the query key
2. Trigger a new fetch (unless data is within `staleTime`)
3. Store separate cache entries for each unique prompt

**Tips:**
- Keep prompts consistent for better cache hits
- Include all context needed in the prompt
- Avoid including runtime identifiers that change frequently

***

### retryCount?

> `optional` **retryCount?**: `number`

Defined in: [src/types/index.ts:467](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L467)

Number of automatic retry attempts if the fetch fails.

#### Remarks

Retries occur with exponential backoff automatically. Each retry happens with
increasing delay (by default: 1s, 2s, 4s, etc.).

When retries are exhausted, the error is exposed via the query's error state.
You can trigger a manual retry via the `refetch` method.

#### Default

```ts
3
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

#### Inherited from

[`UseGenerateContentOptions`](UseGenerateContentOptions.md).[`systemInstruction`](UseGenerateContentOptions.md#systeminstruction)

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

#### Inherited from

[`UseGenerateContentOptions`](UseGenerateContentOptions.md).[`temperature`](UseGenerateContentOptions.md#temperature)

***

### trigger?

> `optional` **trigger?**: `boolean`

Defined in: [src/types/index.ts:453](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L453)

Controls whether the query automatically executes.

#### Remarks

**When `true` (default):**
- Query runs immediately on mount
- Query refetches when prompt changes
- Query respects cache and stale time

**When `false`:**
- Query is prepared but doesn't execute
- Can be triggered manually with the `refetch` method
- Useful for waiting on other dependencies

#### Example

```typescript
const { data, refetch } = useGenerateContentQuery({
  model: 'gemini-2.0-flash',
  prompt: userText,
  trigger: userText.length > 0, // Only run if user has typed something
});
```

#### Default

```ts
true
```
