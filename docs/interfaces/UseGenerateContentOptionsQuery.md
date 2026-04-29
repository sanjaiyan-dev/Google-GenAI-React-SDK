[**react-google-genai**](../README.md)

***

[react-google-genai](../globals.md) / UseGenerateContentOptionsQuery

# Interface: UseGenerateContentOptionsQuery

Defined in: [src/types/index.ts:120](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L120)

Specific options for the `useGenerateContentQuery` hook.
Inherits model configuration from UseGenerateContentOptions but includes query-specific settings.

## Extends

- `Omit`\<[`UseGenerateContentOptions`](UseGenerateContentOptions.md), `"onError"`\>

## Properties

### cacheConfig?

> `optional` **cacheConfig?**: `CacheConfig`

Defined in: [src/types/index.ts:124](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L124)

Configuration for TanStack Query's caching behavior.

***

### maxOutputTokens?

> `optional` **maxOutputTokens?**: `number`

Defined in: [src/types/index.ts:101](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L101)

Maximum number of tokens to include in the output.

#### Inherited from

[`UseGenerateContentOptions`](UseGenerateContentOptions.md).[`maxOutputTokens`](UseGenerateContentOptions.md#maxoutputtokens)

***

### model

> **model**: `string`

Defined in: [src/types/index.ts:93](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L93)

The Gemini model to use (e.g., 'gemini-2.0-flash').
See Google documentation for available models.

#### Inherited from

[`UseGenerateContentOptions`](UseGenerateContentOptions.md).[`model`](UseGenerateContentOptions.md#model)

***

### prompt

> **prompt**: `string`

Defined in: [src/types/index.ts:122](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L122)

The input prompt for the generation. Changes to this prompt will trigger a new fetch.

***

### retryCount?

> `optional` **retryCount?**: `number`

Defined in: [src/types/index.ts:135](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L135)

Number of retry attempts if the fetch fails.

#### Default

```ts
3
```

***

### systemInstruction?

> `optional` **systemInstruction?**: `string`

Defined in: [src/types/index.ts:97](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L97)

Optional system instruction to guide the model's behavior across all interactions.

#### Inherited from

[`UseGenerateContentOptions`](UseGenerateContentOptions.md).[`systemInstruction`](UseGenerateContentOptions.md#systeminstruction)

***

### temperature?

> `optional` **temperature?**: `number`

Defined in: [src/types/index.ts:106](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L106)

Controls the randomness of the output.
Values range from 0 to 2. Lower values are more deterministic.

#### Inherited from

[`UseGenerateContentOptions`](UseGenerateContentOptions.md).[`temperature`](UseGenerateContentOptions.md#temperature)

***

### trigger?

> `optional` **trigger?**: `boolean`

Defined in: [src/types/index.ts:130](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L130)

If false, the query will not automatically execute.
Useful for manual triggers or waiting for other data.

#### Default

```ts
true
```
