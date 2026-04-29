[**react-google-genai**](../README.md)

***

[react-google-genai](../globals.md) / UseInteractionBaseCreateHookMutate

# Interface: UseInteractionBaseCreateHookMutate

Defined in: [src/types/index.ts:265](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L265)

## Extends

- `UseInteractionBaseCreateHook`

## Properties

### api\_version?

> `optional` **api\_version?**: `string`

Defined in: [src/types/index.ts:259](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L259)

#### Inherited from

`UseInteractionBaseCreateHook.api_version`

***

### model

> **model**: `Model_2`

Defined in: [src/types/index.ts:260](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L260)

#### Inherited from

`UseInteractionBaseCreateHook.model`

***

### onCreateError?

> `optional` **onCreateError?**: (`error`) => `void` \| `Promise`\<`void`\>

Defined in: [src/types/index.ts:272](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L272)

Optional callback function triggered when a generation request fails.
In `useInteractionBaseMutate`, this is passed directly to the mutation.

#### Parameters

##### error

`Error`

The error object thrown during the request.

#### Returns

`void` \| `Promise`\<`void`\>

***

### onDeleteError?

> `optional` **onDeleteError?**: (`error`) => `void` \| `Promise`\<`void`\>

Defined in: [src/types/index.ts:279](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L279)

Optional callback function triggered when a deletion request fails.
In `useInteractionBaseMutate`, this is passed directly to the mutation.

#### Parameters

##### error

`Error`

The error object thrown during the request.

#### Returns

`void` \| `Promise`\<`void`\>

***

### systemInstruction?

> `optional` **systemInstruction?**: `string`

Defined in: [src/types/index.ts:261](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L261)

#### Inherited from

`UseInteractionBaseCreateHook.systemInstruction`

***

### temperature?

> `optional` **temperature?**: `number`

Defined in: [src/types/index.ts:262](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L262)

#### Inherited from

`UseInteractionBaseCreateHook.temperature`
