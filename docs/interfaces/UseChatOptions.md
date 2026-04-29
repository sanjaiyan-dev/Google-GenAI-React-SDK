[**react-google-genai**](../README.md)

***

[react-google-genai](../globals.md) / UseChatOptions

# Interface: UseChatOptions

Defined in: [src/types/index.ts:218](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L218)

Configuration options for the `useChat` hook.

## Properties

### model

> **model**: `string`

Defined in: [src/types/index.ts:220](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L220)

Gemini model name.

***

### streaming?

> `optional` **streaming?**: `boolean`

Defined in: [src/types/index.ts:229](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L229)

Whether to stream responses back from the model.

#### Default

```ts
true
```

***

### systemInstruction?

> `optional` **systemInstruction?**: `string`

Defined in: [src/types/index.ts:222](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L222)

Initial system instructions for the chat model.

***

### temperature?

> `optional` **temperature?**: `number`

Defined in: [src/types/index.ts:224](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L224)

Sampling temperature.
