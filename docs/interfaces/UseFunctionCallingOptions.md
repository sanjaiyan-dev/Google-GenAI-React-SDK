[**react-google-genai**](../README.md)

***

[react-google-genai](../globals.md) / UseFunctionCallingOptions

# Interface: UseFunctionCallingOptions

Defined in: [src/types/index.ts:1080](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L1080)

Configuration for integrating function calling into a model interaction.

Function calling enables the Gemini model to request that specific functions
be executed on the client, enabling workflows where the model can interact
with external tools, databases, or computations.

## Remarks

**Function calling flow:**
1. User sends prompt to model with available tools/functions declared
2. Model decides if it needs to call any functions
3. SDK calls the corresponding handler function
4. Handler result is sent back to model
5. Model continues generation with function results
6. Process repeats until model finishes response

**Common use cases:**
- Weather app: User asks "What's the weather?" → Model calls weather function
- Calculator: User asks "What's 2+2?" → Model calls calculate function
- Data lookup: User asks for user info → Model calls database query function
- API integration: Model calls external APIs on demand

**Restrictions:**
- Tool names must be valid identifiers
- Handler must be provided for every declared tool
- Function results should be serializable

## Example

```typescript
const tools: Tool[] = [{
  name: 'get_weather',
  description: 'Get weather for a city',
  parameters: {
    type: 'OBJECT',
    properties: {
      city: { type: 'STRING', description: 'City name' },
      unit: { type: 'STRING', enum: ['C', 'F'] }
    }
  }
}];

const useFunctionCalling = useFunctionCallingHook({
  model: 'gemini-2.0-flash',
  tools,
  handlers: {
    get_weather: async (args) => {
      const { city, unit } = args;
      return await fetchWeather(city, unit);
    }
  }
});
```

## See

 - Tool for schema definition
 - FunctionHandler for handler implementation

## Properties

### handlers

> **handlers**: `Record`\<`string`, [`FunctionHandler`](../type-aliases/FunctionHandler.md)\>

Defined in: [src/types/index.ts:1131](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L1131)

Mapping of function/tool names to their implementation handlers.

#### Remarks

Must provide a handler for every tool declared in `tools`.
If a tool is declared but no handler exists, an error will be thrown when
the model tries to invoke it.

**Key requirements:**
- Keys must exactly match tool names
- Handlers have [FunctionHandler](../type-aliases/FunctionHandler.md) signature
- Handlers should handle errors gracefully
- Return values should be serializable

#### Example

```typescript
handlers: {
  get_weather: async (args) => {  },
  search_web: async (args) => {  },
  calculate: (args) => { }
}
```

***

### model

> **model**: `string`

Defined in: [src/types/index.ts:1090](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L1090)

The Gemini model to use for this function calling session.

#### Remarks

Not all models support function calling equally. Ensure your model supports
the features you need. See Google documentation for model capabilities.

Generally supported: gemini-2.0-flash, gemini-1.5-flash, gemini-1.5-pro

***

### systemInstruction?

> `optional` **systemInstruction?**: `string`

Defined in: [src/types/index.ts:1144](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L1144)

Optional system instructions for the function calling session.

#### Remarks

Same behavior as [UseGenerateContentOptions.systemInstruction](UseGenerateContentOptions.md#systeminstruction).

Useful for guiding the model's function calling behavior:
- "Prefer calling search_web when you don't know something"
- "Always validate input with search_web before responding"
- "Call function X for this type of query"

***

### temperature?

> `optional` **temperature?**: `number`

Defined in: [src/types/index.ts:1154](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L1154)

Sampling temperature for function calling responses.

#### Remarks

Same behavior as [UseGenerateContentOptions.temperature](UseGenerateContentOptions.md#temperature).

Lower temperatures are recommended for function calling to improve consistency.

***

### tools

> **tools**: [`Tool`](Tool.md)[]

Defined in: [src/types/index.ts:1106](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L1106)

List of tool/function declarations available to the model.

#### Remarks

These define the interface the model can request. Each tool must have:
- `name`: Unique identifier (matches handler key)
- `description`: What the function does (for model understanding)
- `parameters`: JSON schema describing input parameters

The model reads these descriptions to understand when and how to call functions.
More detailed descriptions lead to better function calling decisions.

#### See

Tool for detailed schema structure
