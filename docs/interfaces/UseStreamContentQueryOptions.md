[**react-google-genai**](../README.md)

***

[react-google-genai](../globals.md) / UseStreamContentQueryOptions

# Interface: UseStreamContentQueryOptions

Defined in: [src/types/index.ts:162](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L162)

Options for streaming content generation.

## Extends

- [`UseStreamContentOptions`](UseStreamContentOptions.md)

## Properties

### cacheConfig?

> `optional` **cacheConfig?**: `CacheConfig`

Defined in: [src/types/index.ts:165](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L165)

***

### model

> **model**: `string`

Defined in: [src/types/index.ts:155](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L155)

Gemini model name.

#### Inherited from

[`UseStreamContentOptions`](UseStreamContentOptions.md).[`model`](UseStreamContentOptions.md#model)

***

### prompt?

> `optional` **prompt?**: `string`

Defined in: [src/types/index.ts:163](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L163)

***

### refetchMode?

> `optional` **refetchMode?**: `"append"` \| `"reset"` \| `"replace"`

Defined in: [src/types/index.ts:164](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L164)

***

### systemInstruction?

> `optional` **systemInstruction?**: `string`

Defined in: [src/types/index.ts:157](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L157)

Optional system prompt.

#### Inherited from

[`UseStreamContentOptions`](UseStreamContentOptions.md).[`systemInstruction`](UseStreamContentOptions.md#systeminstruction)

***

### temperature?

> `optional` **temperature?**: `number`

Defined in: [src/types/index.ts:159](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L159)

Sampling temperature.

#### Inherited from

[`UseStreamContentOptions`](UseStreamContentOptions.md).[`temperature`](UseStreamContentOptions.md#temperature)

***

### trigger?

> `optional` **trigger?**: `boolean`

Defined in: [src/types/index.ts:171](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L171)

If false, the query will not automatically execute.
Useful for manual triggers or waiting for other data.

#### Default

```ts
true
```
