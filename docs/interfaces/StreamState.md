[**react-google-genai**](../README.md)

***

[react-google-genai](../globals.md) / StreamState

# Interface: StreamState

Defined in: [src/types/index.ts:177](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L177)

Represents the reactive state of an active stream.

## Properties

### chunks

> **chunks**: `string`[]

Defined in: [src/types/index.ts:179](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L179)

Array of all text chunks received so far.

***

### error

> **error**: `Error` \| `null`

Defined in: [src/types/index.ts:185](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L185)

Error object if the stream fails.

***

### fullText

> **fullText**: `string`

Defined in: [src/types/index.ts:181](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L181)

The concatenated full text from all chunks.

***

### isStreaming

> **isStreaming**: `boolean`

Defined in: [src/types/index.ts:183](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L183)

True while the stream is actively receiving data.
