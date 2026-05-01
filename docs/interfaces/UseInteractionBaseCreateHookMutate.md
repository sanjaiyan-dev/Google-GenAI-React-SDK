[**react-google-genai**](../README.md)

***

[react-google-genai](../globals.md) / UseInteractionBaseCreateHookMutate

# Interface: UseInteractionBaseCreateHookMutate

Defined in: [src/types/index.ts:1241](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L1241)

Options for mutation-based Interactions API operations.

Extends UseInteractionBaseCreateHook with mutation-specific error handling.
Use this for imperative interaction control via the `useInteractionBaseMutate` hook.

## Remarks

**Mutation workflow:**
- Call `create.generate(prompt)` to create an interaction and send initial message
- Call `delete.delete(interactionID)` to delete an interaction when done
- Error handlers are invoked if operations fail

**Error handling:**
- `onCreateError`: Triggered when generation/creation fails
- `onDeleteError`: Triggered when deletion fails

## See

useInteractionBaseMutate for hook implementation

## Extends

- `UseInteractionBaseCreateHook`

## Properties

### api\_version?

> `optional` **api\_version?**: `string`

Defined in: [src/types/index.ts:1190](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L1190)

API version for the Interactions endpoint.

#### Remarks

Specifies which version of the Interactions API to use.
Leave empty or omit to use the default version.

Extracted from the Interactions.create parameters type.

#### Inherited from

`UseInteractionBaseCreateHook.api_version`

***

### model

> **model**: `Model_2`

Defined in: [src/types/index.ts:1201](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L1201)

The model to use for this interaction.

#### Remarks

Must be a valid Vertex AI model identifier.
Examples: 'gemini-2.0-flash', 'gemini-1.5-pro'

Extracted from Interactions.Model type from @google/genai

#### Inherited from

`UseInteractionBaseCreateHook.model`

***

### onCreateError?

> `optional` **onCreateError?**: (`error`) => `void` \| `Promise`\<`void`\>

Defined in: [src/types/index.ts:1261](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L1261)

Optional callback for generation/creation request failures.

#### Parameters

##### error

`Error`

The error object from the failed request

#### Returns

`void` \| `Promise`\<`void`\>

#### Remarks

Invoked when `create.generate` or `create.generateAsync` fails.
Can perform side effects like error logging, analytics, or cleanup.

Can be async for awaiting cleanup operations.

#### Example

```typescript
onCreateError: async (error) => {
  console.error('Failed to create interaction:', error);
  await reportToSentry(error);
}
```

***

### onDeleteError?

> `optional` **onDeleteError?**: (`error`) => `void` \| `Promise`\<`void`\>

Defined in: [src/types/index.ts:1282](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L1282)

Optional callback for deletion request failures.

#### Parameters

##### error

`Error`

The error object from the failed request

#### Returns

`void` \| `Promise`\<`void`\>

#### Remarks

Invoked when `delete.delete` or `delete.deleteAsync` fails.
Can perform side effects like error logging or retry logic.

Can be async for awaiting cleanup operations.

#### Example

```typescript
onDeleteError: async (error) => {
  console.error('Failed to delete interaction:', error);
  // Retry or log for manual cleanup
}
```

***

### systemInstruction?

> `optional` **systemInstruction?**: `string`

Defined in: [src/types/index.ts:1212](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L1212)

System instructions for the interaction session.

#### Remarks

Same semantics as other system instruction fields.
Applied to the entire interaction conversation.

Extracted from Interactions.create parameter type.

#### Inherited from

`UseInteractionBaseCreateHook.systemInstruction`

***

### temperature?

> `optional` **temperature?**: `number`

Defined in: [src/types/index.ts:1220](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L1220)

Sampling temperature for interaction responses.

#### Remarks

Same behavior as temperature in other options types.

#### Inherited from

`UseInteractionBaseCreateHook.temperature`
