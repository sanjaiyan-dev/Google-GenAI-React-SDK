[**react-google-genai**](../README.md)

***

[react-google-genai](../globals.md) / FunctionHandler

# Type Alias: FunctionHandler

> **FunctionHandler** = (`args`) => `Promise`\<`unknown`\> \| `unknown`

Defined in: [src/types/index.ts:1022](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L1022)

Function signature for a custom function implementation callable by the model.

When you declare a function tool to the model, you must provide a handler with this signature
to process when the model decides to call that function.

## Parameters

### args

`Record`\<`string`, `unknown`\>

The arguments passed by the model, mapped from the tool definition

## Returns

`Promise`\<`unknown`\> \| `unknown`

The result of the function, can be Promise or sync

## Remarks

**Argument mapping:**
- Arguments come as a Record (object/dict) keyed by parameter name
- Parameter names and types are defined in the Tool schema
- The handler is responsible for type safety or validation

**Async handling:**
- Handler can return a Promise for async operations
- SDK handles both sync and async returns
- Error throwing is supported (caught and passed back to model)

**Return value handling:**
- Return value is passed back to the model
- Model can see function results and respond appropriately
- Serializable types are recommended (strings, numbers, objects)

## Example

```typescript
const handler: FunctionHandler = async (args) => {
  const { city, unit } = args as { city: string; unit: 'C' | 'F' };
  const temp = await fetchWeather(city, unit);
  return { temperature: temp, unit };
};
```

## See

 - UseFunctionCallingOptions for usage in hooks
 - Tool for tool/function schema definition
