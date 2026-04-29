[**react-google-genai**](../README.md)

***

[react-google-genai](../globals.md) / UseStreamContentHook

# Interface: UseStreamContentHook

Defined in: [src/types/index.ts:191](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L191)

Return type for the `useStreamContent` hook.

## Extends

- [`UseStreamContentOptions`](UseStreamContentOptions.md)

## Properties

### model

> **model**: `string`

Defined in: [src/types/index.ts:155](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L155)

Gemini model name.

#### Inherited from

[`UseStreamContentOptions`](UseStreamContentOptions.md).[`model`](UseStreamContentOptions.md#model)

***

### onError

> **onError**: `Promise`\<`void`\>

Defined in: [src/types/index.ts:193](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L193)

Promise that resolves when the stream completes or rejects on error.

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
