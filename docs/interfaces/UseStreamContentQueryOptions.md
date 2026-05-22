[**react-google-genai**](../README.md)

***

[react-google-genai](../globals.md) / UseStreamContentQueryOptions

# Interface: UseStreamContentQueryOptions

Defined in: [src/types/index.ts:662](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L662)

Options specific to `useStreamContentQuery` hook.

Extends [UseStreamContentOptions](UseStreamContentOptions.md) with query-based streaming configuration.
Use this for declarative streaming that automatically triggers based on dependencies.

## Remarks

Similar to [UseGenerateContentOptionsQuery](UseGenerateContentOptionsQuery.md), this variant:
- Automatically manages refetch on prompt changes
- Supports cache configuration
- Can be conditionally triggered

## See

useStreamContentQuery for usage

## Extends

- [`UseStreamContentOptions`](UseStreamContentOptions.md)

## Properties

### cacheConfig?

> `optional` **cacheConfig?**: `CacheConfig`

Defined in: [src/types/index.ts:692](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L692)

Configuration for caching chunk history.

#### Remarks

Controls how long completed chunks are cached. Note that active streams
are not cached; only completed stream results.

#### See

CacheConfig

***

### model

> **model**: `string`

Defined in: [src/types/index.ts:600](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L600)

The Gemini model identifier for streaming generation.

#### Remarks

Not all models support streaming equally. Streaming support is generally good for:
- gemini-2.0-flash
- gemini-1.5-flash
- gemini-3.1-pro

Verify streaming support for your model in the documentation.

#### Inherited from

[`UseStreamContentOptions`](UseStreamContentOptions.md).[`model`](UseStreamContentOptions.md#model)

***

### prompt?

> `optional` **prompt?**: `string`

Defined in: [src/types/index.ts:670](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L670)

The prompt for streaming content generation.

#### Remarks

Optional when used with `trigger: false` for manual triggering.
Changes to this prompt trigger a new stream.

***

### refetchMode?

> `optional` **refetchMode?**: `"append"` \| `"reset"` \| `"replace"`

Defined in: [src/types/index.ts:681](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L681)

Controls query refetch behavior during streaming.

#### Remarks

Configuration for when and how to refetch stream data. See TanStack Query docs
for available `refetchMode` options.

#### See

https://tanstack.com/query/v5/docs/reference/streamedQuery

***

### systemInstruction?

> `optional` **systemInstruction?**: `string`

Defined in: [src/types/index.ts:609](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L609)

Optional system instruction for the streaming session.

#### Remarks

Same behavior as [UseGenerateContentOptions.systemInstruction](UseGenerateContentOptions.md#systeminstruction).
Applies to all chunks received in this stream.

#### Inherited from

[`UseStreamContentOptions`](UseStreamContentOptions.md).[`systemInstruction`](UseStreamContentOptions.md#systeminstruction)

***

### temperature?

> `optional` **temperature?**: `number`

Defined in: [src/types/index.ts:618](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L618)

Sampling temperature for the streaming generation.

#### Remarks

Same range and behavior as [UseGenerateContentOptions.temperature](UseGenerateContentOptions.md#temperature).
Affects the randomness of each chunk generated.

#### Inherited from

[`UseStreamContentOptions`](UseStreamContentOptions.md).[`temperature`](UseStreamContentOptions.md#temperature)

***

### thinkingConfig?

> `optional` **thinkingConfig?**: `ThinkingConfig`

Defined in: [src/types/index.ts:645](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L645)

Configuration for the model's explicit thinking and reasoning capabilities.

#### Remarks

Enables control over the "chain-of-thought" generation process for complex logic, multi-step planning, and reasoning.
This feature is supported by Gemini 2.5 and Gemini 3 series models.

**Key Parameters:**
- `includeThoughts`: Determines whether to return the model's internal reasoning process in the response parts.
- `thinkingBudget`: (Gemini 2.5 series) The token budget allocated for reasoning. Setting this to `0` disables thinking to reduce latency (except on `gemini-2.5-pro`, which has a minimum budget of `128`).
- `thinkingLevel`: (Gemini 3 series) The level of reasoning depth (`'MINIMAL'`, `'LOW'`, `'MEDIUM'`, `'HIGH'`). Lower levels reduce latency and token usage for simpler tasks.

#### Example

```typescript
// For Gemini 3: Request low-level reasoning and return the thoughts in the response
thinkingConfig: {
  includeThoughts: true,
  thinkingLevel: 'LOW',
}

// For Gemini 2.5: Disable thinking completely to achieve lower latency
thinkingConfig: {
  thinkingBudget: 0,
}
```

#### Inherited from

[`UseStreamContentOptions`](UseStreamContentOptions.md).[`thinkingConfig`](UseStreamContentOptions.md#thinkingconfig)

***

### trigger?

> `optional` **trigger?**: `boolean`

Defined in: [src/types/index.ts:702](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L702)

Controls whether the stream query automatically starts.

#### Remarks

**When `true` (default):** Stream starts immediately
**When `false`:** Stream is prepared but doesn't start; can trigger manually

#### Default

```ts
true
```
