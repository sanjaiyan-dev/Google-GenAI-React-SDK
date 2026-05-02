[**react-google-genai**](../README.md)

***

[react-google-genai](../globals.md) / GoogleGenAI

# Interface: GoogleGenAI

Defined in: node\_modules/@google/genai/dist/genai.d.ts:5361

The Google GenAI SDK.

## Remarks

Provides access to the GenAI features through either the [Gemini API](https://cloud.google.com/vertex-ai/docs/reference/rest)
or the [Vertex AI API](https://cloud.google.com/vertex-ai/docs/reference/rest).

The GoogleGenAIOptions.vertexai value determines which of the API services to use.

When using the Gemini API, a GoogleGenAIOptions.apiKey must also be set,
when using Vertex AI GoogleGenAIOptions.project and GoogleGenAIOptions.location must also be set.

## Examples

Initializing the SDK for using the Gemini API:
```ts
import {GoogleGenAI} from '@google/genai';
const ai = new GoogleGenAI({apiKey: 'GEMINI_API_KEY'});
```

Initializing the SDK for using the Vertex AI API:
```ts
import {GoogleGenAI} from '@google/genai';
const ai = new GoogleGenAI({
  vertexai: true,
  project: 'PROJECT_ID',
  location: 'PROJECT_LOCATION'
});
```

## Properties

### apiClient

> `protected` `readonly` **apiClient**: `ApiClient`

Defined in: node\_modules/@google/genai/dist/genai.d.ts:5362

***

### authTokens

> `readonly` **authTokens**: `Tokens`

Defined in: node\_modules/@google/genai/dist/genai.d.ts:5374

***

### batches

> `readonly` **batches**: `Batches`

Defined in: node\_modules/@google/genai/dist/genai.d.ts:5369

***

### caches

> `readonly` **caches**: `Caches`

Defined in: node\_modules/@google/genai/dist/genai.d.ts:5371

***

### chats

> `readonly` **chats**: `Chats`

Defined in: node\_modules/@google/genai/dist/genai.d.ts:5370

***

### files

> `readonly` **files**: `Files`

Defined in: node\_modules/@google/genai/dist/genai.d.ts:5372

***

### fileSearchStores

> `readonly` **fileSearchStores**: `FileSearchStores`

Defined in: node\_modules/@google/genai/dist/genai.d.ts:5376

***

### live

> `readonly` **live**: `Live`

Defined in: node\_modules/@google/genai/dist/genai.d.ts:5368

***

### models

> `readonly` **models**: `Models`

Defined in: node\_modules/@google/genai/dist/genai.d.ts:5367

***

### operations

> `readonly` **operations**: `Operations`

Defined in: node\_modules/@google/genai/dist/genai.d.ts:5373

***

### tunings

> `readonly` **tunings**: `Tunings`

Defined in: node\_modules/@google/genai/dist/genai.d.ts:5375

***

### vertexai

> `readonly` **vertexai**: `boolean`

Defined in: node\_modules/@google/genai/dist/genai.d.ts:5364

## Accessors

### interactions

#### Get Signature

> **get** **interactions**(): `Interactions`

Defined in: node\_modules/@google/genai/dist/genai.d.ts:5381

##### Returns

`Interactions`

***

### webhooks

#### Get Signature

> **get** **webhooks**(): `Webhooks`

Defined in: node\_modules/@google/genai/dist/genai.d.ts:5382

##### Returns

`Webhooks`
