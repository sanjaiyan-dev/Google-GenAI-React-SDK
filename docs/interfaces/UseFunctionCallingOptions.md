[**react-google-genai**](../README.md)

***

[react-google-genai](../globals.md) / UseFunctionCallingOptions

# Interface: UseFunctionCallingOptions

Defined in: [src/types/index.ts:242](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L242)

Configuration for integrating function calling into a model interaction.

## Properties

### handlers

> **handlers**: `Record`\<`string`, [`FunctionHandler`](../type-aliases/FunctionHandler.md)\>

Defined in: [src/types/index.ts:250](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L250)

A mapping of function names to their local Javascript implementations.

***

### model

> **model**: `string`

Defined in: [src/types/index.ts:244](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L244)

Gemini model name.

***

### systemInstruction?

> `optional` **systemInstruction?**: `string`

Defined in: [src/types/index.ts:252](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L252)

Optional system instructions.

***

### temperature?

> `optional` **temperature?**: `number`

Defined in: [src/types/index.ts:254](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L254)

Sampling temperature.

***

### tools

> **tools**: [`Tool`](Tool.md)[]

Defined in: [src/types/index.ts:246](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L246)

List of tool declarations (functions) the model can invoke.
