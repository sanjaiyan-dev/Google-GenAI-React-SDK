[**react-google-genai**](../README.md)

***

[react-google-genai](../globals.md) / UseGenerateContentOptions

# Interface: UseGenerateContentOptions

Defined in: [src/types/index.ts:88](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L88)

Base options for content generation hooks.

## Properties

### maxOutputTokens?

> `optional` **maxOutputTokens?**: `number`

Defined in: [src/types/index.ts:101](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L101)

Maximum number of tokens to include in the output.

***

### model

> **model**: `string`

Defined in: [src/types/index.ts:93](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L93)

The Gemini model to use (e.g., 'gemini-2.0-flash').
See Google documentation for available models.

***

### onError?

> `optional` **onError?**: (`error`) => `void` \| `Promise`\<`void`\>

Defined in: [src/types/index.ts:113](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L113)

Optional callback function triggered when a generation request fails.
In `useGenerateContentMutate`, this is passed directly to the mutation.

#### Parameters

##### error

`Error`

The error object thrown during the request.

#### Returns

`void` \| `Promise`\<`void`\>

***

### systemInstruction?

> `optional` **systemInstruction?**: `string`

Defined in: [src/types/index.ts:97](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L97)

Optional system instruction to guide the model's behavior across all interactions.

***

### temperature?

> `optional` **temperature?**: `number`

Defined in: [src/types/index.ts:106](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L106)

Controls the randomness of the output.
Values range from 0 to 2. Lower values are more deterministic.
