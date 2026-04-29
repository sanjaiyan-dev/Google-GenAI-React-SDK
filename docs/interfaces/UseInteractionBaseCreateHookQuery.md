[**react-google-genai**](../README.md)

***

[react-google-genai](../globals.md) / UseInteractionBaseCreateHookQuery

# Interface: UseInteractionBaseCreateHookQuery

Defined in: [src/types/index.ts:281](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L281)

## Extends

- `UseInteractionBaseCreateHook`

## Properties

### api\_version?

> `optional` **api\_version?**: `string`

Defined in: [src/types/index.ts:259](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L259)

#### Inherited from

`UseInteractionBaseCreateHook.api_version`

***

### cacheConfig?

> `optional` **cacheConfig?**: `CacheConfig`

Defined in: [src/types/index.ts:283](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L283)

***

### model

> **model**: `Model_2`

Defined in: [src/types/index.ts:260](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L260)

#### Inherited from

`UseInteractionBaseCreateHook.model`

***

### prompt

> **prompt**: `string` \| `TextContent` \| `ImageContent` \| `AudioContent` \| `DocumentContent` \| `VideoContent` \| `ThoughtContent` \| `FunctionCallContent` \| `CodeExecutionCallContent` \| `URLContextCallContent` \| `MCPServerToolCallContent` \| `GoogleSearchCallContent` \| `FileSearchCallContent` \| `GoogleMapsCallContent` \| `FunctionResultContent` \| `CodeExecutionResultContent` \| `URLContextResultContent` \| `GoogleSearchResultContent` \| `MCPServerToolResultContent` \| `FileSearchResultContent` \| `GoogleMapsResultContent` \| `Content_2`[] \| `Turn`[]

Defined in: [src/types/index.ts:282](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L282)

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

***

### trigger?

> `optional` **trigger?**: `boolean`

Defined in: [src/types/index.ts:289](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L289)

If false, the query will not automatically execute.
Useful for manual triggers or waiting for other data.

#### Default

```ts
true
```
