[**react-google-genai**](../README.md)

***

[react-google-genai](../globals.md) / UseInteractionBaseCreateHookQuery

# Interface: UseInteractionBaseCreateHookQuery

Defined in: [src/types/index.ts:1305](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L1305)

Options for query-based Interactions API operations.

Extends UseInteractionBaseCreateHook with query-specific settings.
Use this for declarative interaction control via the `useInteractionBaseCreateQuery` hook.

## Remarks

**Query workflow:**
- Hook automatically creates interaction with provided prompt
- Results are cached based on model and prompt
- Refetch triggers when prompt changes
- Can be conditionally triggered

**Compared to mutation:**
- Query auto-triggers based on dependencies
- Automatic caching and refetch management
- Better for reactive/declarative code

## See

useInteractionBaseCreateQuery for hook implementation

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

### cacheConfig?

> `optional` **cacheConfig?**: `CacheConfig`

Defined in: [src/types/index.ts:1326](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L1326)

Configuration for caching interaction results.

#### Remarks

Controls how long interaction responses are cached and when they're
considered stale. See CacheConfig for detailed explanation.

#### See

CacheConfig

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

### prompt

> **prompt**: `string` \| `TextContent` \| `ImageContent` \| `AudioContent` \| `DocumentContent` \| `VideoContent` \| `ThoughtContent` \| `FunctionCallContent` \| `CodeExecutionCallContent` \| `URLContextCallContent` \| `MCPServerToolCallContent` \| `GoogleSearchCallContent` \| `FileSearchCallContent` \| `GoogleMapsCallContent` \| `FunctionResultContent` \| `CodeExecutionResultContent` \| `URLContextResultContent` \| `GoogleSearchResultContent` \| `MCPServerToolResultContent` \| `FileSearchResultContent` \| `GoogleMapsResultContent` \| `Content_2`[] \| `Turn`[]

Defined in: [src/types/index.ts:1315](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L1315)

The initial prompt for creating the interaction.

#### Remarks

Sent with the interaction creation request. Changes to this prompt
create a new interaction (with new query key and cache entry).

Extracted from Interactions.create input parameter type.

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

***

### trigger?

> `optional` **trigger?**: `boolean`

Defined in: [src/types/index.ts:1339](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L1339)

Controls whether the interaction query automatically executes.

#### Remarks

**When true (default):** Query runs immediately
**When false:** Query is prepared but doesn't run; can trigger manually

Useful for waiting on other dependencies before creating interaction.

#### Default

```ts
true
```
