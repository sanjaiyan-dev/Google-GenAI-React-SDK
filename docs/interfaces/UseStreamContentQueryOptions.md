[**react-google-genai**](../README.md)

***

[react-google-genai](../globals.md) / UseStreamContentQueryOptions

# Interface: UseStreamContentQueryOptions

Defined in: [src/types/index.ts:606](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L606)

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

Defined in: [src/types/index.ts:636](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L636)

Configuration for caching chunk history.

#### Remarks

Controls how long completed chunks are cached. Note that active streams
are not cached; only completed stream results.

#### See

CacheConfig

***

### model

> **model**: `string`

Defined in: [src/types/index.ts:571](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L571)

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

Defined in: [src/types/index.ts:614](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L614)

The prompt for streaming content generation.

#### Remarks

Optional when used with `trigger: false` for manual triggering.
Changes to this prompt trigger a new stream.

***

### refetchMode?

> `optional` **refetchMode?**: `"append"` \| `"reset"` \| `"replace"`

Defined in: [src/types/index.ts:625](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L625)

Controls query refetch behavior during streaming.

#### Remarks

Configuration for when and how to refetch stream data. See TanStack Query docs
for available `refetchMode` options.

#### See

https://tanstack.com/query/v5/docs/reference/streamedQuery

***

### systemInstruction?

> `optional` **systemInstruction?**: `string`

Defined in: [src/types/index.ts:580](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L580)

Optional system instruction for the streaming session.

#### Remarks

Same behavior as [UseGenerateContentOptions.systemInstruction](UseGenerateContentOptions.md#systeminstruction).
Applies to all chunks received in this stream.

#### Inherited from

[`UseStreamContentOptions`](UseStreamContentOptions.md).[`systemInstruction`](UseStreamContentOptions.md#systeminstruction)

***

### temperature?

> `optional` **temperature?**: `number`

Defined in: [src/types/index.ts:589](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L589)

Sampling temperature for the streaming generation.

#### Remarks

Same range and behavior as [UseGenerateContentOptions.temperature](UseGenerateContentOptions.md#temperature).
Affects the randomness of each chunk generated.

#### Inherited from

[`UseStreamContentOptions`](UseStreamContentOptions.md).[`temperature`](UseStreamContentOptions.md#temperature)

***

### trigger?

> `optional` **trigger?**: `boolean`

Defined in: [src/types/index.ts:646](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L646)

Controls whether the stream query automatically starts.

#### Remarks

**When `true` (default):** Stream starts immediately
**When `false`:** Stream is prepared but doesn't start; can trigger manually

#### Default

```ts
true
```
