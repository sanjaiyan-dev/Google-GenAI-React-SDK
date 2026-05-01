[**react-google-genai**](../README.md)

***

[react-google-genai](../globals.md) / useInteractionBaseMutate

# Function: useInteractionBaseMutate()

> **useInteractionBaseMutate**(`options`): `object`

Defined in: [src/hooks/interactions/useInteractionBase.ts:35](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/hooks/interactions/useInteractionBase.ts#L35)

## Parameters

### options

[`UseInteractionBaseCreateHookMutate`](../interfaces/UseInteractionBaseCreateHookMutate.md)

## Returns

`object`

### create

> **create**: `object`

#### create.data

> **data**: \{ `response`: [`GenerateContentResponse`](../interfaces/GenerateContentResponse.md); `text`: `string`; \} \| `null`

The raw result from the Gemini API. Defaults to null if no data.

#### create.error

> **error**: `Error` \| `null` = `mutationCreate.error`

The error object if the request failed.

#### create.generate

> **generate**: `UseMutateFunction`\<\{ `response`: [`GenerateContentResponse`](../interfaces/GenerateContentResponse.md); `text`: `string`; \}, `Error`, `string`, `unknown`\> = `mutationCreate.mutate`

Function to trigger the generation.

##### Param

The input text for the model.

#### create.generateAsync

> **generateAsync**: `UseMutateAsyncFunction`\<\{ `response`: [`GenerateContentResponse`](../interfaces/GenerateContentResponse.md); `text`: `string`; \}, `Error`, `string`, `unknown`\> = `mutationCreate.mutateAsync`

Async version of generate that returns a Promise.

##### Param

The input text for the model.

#### create.isError

> **isError**: `boolean` = `mutationCreate.isError`

Boolean state indicating if the last request failed.

#### create.isPending

> **isPending**: `boolean` = `mutationCreate.isPending`

Boolean state indicating if the request is currently in flight.

#### create.isSuccess

> **isSuccess**: `boolean` = `mutationCreate.isSuccess`

Boolean state indicating if the last request was successful.

#### create.reset

> **reset**: () => `void` = `mutationCreate.reset`

Function to reset the mutation state to its initial values.

##### Returns

`void`

#### create.status

> **status**: `"error"` \| `"idle"` \| `"pending"` \| `"success"` = `mutationCreate.status`

The current status of the mutation ('idle' | 'pending' | 'error' | 'success').

#### create.text

> **text**: `string`

Convenience field containing only the text part of the response.

#### create.variables

> **variables**: `string` \| `undefined` = `mutationCreate.variables`

The prompt string used for the current/last generation.

### delete

> **delete**: `object`

#### delete.data

> **data**: \{ \} \| `null`

The raw result from the Gemini API. Defaults to null if no data.

#### delete.delete

> **delete**: `UseMutateFunction`\<`unknown`, `Error`, \{ `interactionDeleteParams?`: `InteractionDeleteParams`; `interactionID`: `string`; \}, `unknown`\> = `mutationDelete.mutate`

Function to delete an interaction.

##### Param

The ID of the interaction to delete

##### Param

Optional delete parameters

#### delete.deleteAsync

> **deleteAsync**: `UseMutateAsyncFunction`\<`unknown`, `Error`, \{ `interactionDeleteParams?`: `InteractionDeleteParams`; `interactionID`: `string`; \}, `unknown`\> = `mutationDelete.mutateAsync`

Async version of delete that returns a Promise.

##### Param

The ID of the interaction to delete

##### Param

Optional delete parameters

#### delete.error

> **error**: `Error` \| `null` = `mutationDelete.error`

The error object if the request failed.

#### delete.isError

> **isError**: `boolean` = `mutationDelete.isError`

Boolean state indicating if the last request failed.

#### delete.isPending

> **isPending**: `boolean` = `mutationDelete.isPending`

Boolean state indicating if the request is currently in flight.

#### delete.isSuccess

> **isSuccess**: `boolean` = `mutationDelete.isSuccess`

Boolean state indicating if the last request was successful.

#### delete.reset

> **reset**: () => `void` = `mutationDelete.reset`

Function to reset the mutation state to its initial values.

##### Returns

`void`

#### delete.status

> **status**: `"error"` \| `"idle"` \| `"pending"` \| `"success"` = `mutationDelete.status`

The current status of the mutation ('idle' | 'pending' | 'error' | 'success').

#### delete.variables

> **variables**: \{ `interactionDeleteParams?`: `InteractionDeleteParams`; `interactionID`: `string`; \} \| `undefined` = `mutationDelete.variables`

The prompt string used for the current/last generation.
