[**react-google-genai**](../README.md)

***

[react-google-genai](../globals.md) / GenerateContentResponse

# Interface: GenerateContentResponse

Defined in: node\_modules/@google/genai/dist/genai.d.ts:4611

Response message for PredictionService.GenerateContent.

## Properties

### automaticFunctionCallingHistory?

> `optional` **automaticFunctionCallingHistory?**: `Content`[]

Defined in: node\_modules/@google/genai/dist/genai.d.ts:4622

The history of automatic function calling.

***

### candidates?

> `optional` **candidates?**: `Candidate`[]

Defined in: node\_modules/@google/genai/dist/genai.d.ts:4616

Response variations returned by the model.

***

### createTime?

> `optional` **createTime?**: `string`

Defined in: node\_modules/@google/genai/dist/genai.d.ts:4619

Timestamp when the request is made to the server.

***

### modelStatus?

> `optional` **modelStatus?**: `ModelStatus`

Defined in: node\_modules/@google/genai/dist/genai.d.ts:4632

Output only. The current model status of this model. This field is not supported in Vertex AI.

***

### modelVersion?

> `optional` **modelVersion?**: `string`

Defined in: node\_modules/@google/genai/dist/genai.d.ts:4624

Output only. The model version used to generate the response.

***

### promptFeedback?

> `optional` **promptFeedback?**: `GenerateContentResponsePromptFeedback`

Defined in: node\_modules/@google/genai/dist/genai.d.ts:4626

Output only. Content filter results for a prompt sent in the request. Note: Sent only in the first stream chunk. Only happens when no candidates were generated due to content violations.

***

### responseId?

> `optional` **responseId?**: `string`

Defined in: node\_modules/@google/genai/dist/genai.d.ts:4628

Output only. response_id is used to identify each response. It is the encoding of the event_id.

***

### sdkHttpResponse?

> `optional` **sdkHttpResponse?**: `HttpResponse`

Defined in: node\_modules/@google/genai/dist/genai.d.ts:4613

Used to retain the full HTTP response.

***

### usageMetadata?

> `optional` **usageMetadata?**: `GenerateContentResponseUsageMetadata`

Defined in: node\_modules/@google/genai/dist/genai.d.ts:4630

Usage metadata about the response(s).

## Accessors

### codeExecutionResult

#### Get Signature

> **get** **codeExecutionResult**(): `string` \| `undefined`

Defined in: node\_modules/@google/genai/dist/genai.d.ts:4759

Returns the first code execution result from the first candidate in the response.

##### Remarks

If there are multiple candidates in the response, the code execution result from
the first one will be returned.
If there are no code execution result in the response, undefined will be returned.

##### Example

```ts
const response = await ai.models.generateContent({
  model: 'gemini-2.0-flash',
  contents:
    'What is the sum of the first 50 prime numbers? Generate and run code for the calculation, and make sure you get all 50.'
  config: {
    tools: [{codeExecution: {}}],
  },
});

console.debug(response.codeExecutionResult);
```

##### Returns

`string` \| `undefined`

***

### data

#### Get Signature

> **get** **data**(): `string` \| `undefined`

Defined in: node\_modules/@google/genai/dist/genai.d.ts:4666

Returns the concatenation of all inline data parts from the first candidate
in the response.

##### Remarks

If there are multiple candidates in the response, the inline data from the
first one will be returned. If there are non-inline data parts in the
response, the concatenation of all inline data parts will be returned, and
a warning will be logged.

##### Returns

`string` \| `undefined`

***

### executableCode

#### Get Signature

> **get** **executableCode**(): `string` \| `undefined`

Defined in: node\_modules/@google/genai/dist/genai.d.ts:4736

Returns the first executable code from the first candidate in the response.

##### Remarks

If there are multiple candidates in the response, the executable code from
the first one will be returned.
If there are no executable code in the response, undefined will be
returned.

##### Example

```ts
const response = await ai.models.generateContent({
  model: 'gemini-2.0-flash',
  contents:
    'What is the sum of the first 50 prime numbers? Generate and run code for the calculation, and make sure you get all 50.'
  config: {
    tools: [{codeExecution: {}}],
  },
});

console.debug(response.executableCode);
```

##### Returns

`string` \| `undefined`

***

### functionCalls

#### Get Signature

> **get** **functionCalls**(): `FunctionCall`[] \| `undefined`

Defined in: node\_modules/@google/genai/dist/genai.d.ts:4712

Returns the function calls from the first candidate in the response.

##### Remarks

If there are multiple candidates in the response, the function calls from
the first one will be returned.
If there are no function calls in the response, undefined will be returned.

##### Example

```ts
const controlLightFunctionDeclaration: FunctionDeclaration = {
  name: 'controlLight',
  parameters: {
  type: Type.OBJECT,
  description: 'Set the brightness and color temperature of a room light.',
  properties: {
    brightness: {
      type: Type.NUMBER,
      description:
        'Light level from 0 to 100. Zero is off and 100 is full brightness.',
    },
    colorTemperature: {
      type: Type.STRING,
      description:
        'Color temperature of the light fixture which can be `daylight`, `cool` or `warm`.',
    },
  },
  required: ['brightness', 'colorTemperature'],
 };
 const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: 'Dim the lights so the room feels cozy and warm.',
    config: {
      tools: [{functionDeclarations: [controlLightFunctionDeclaration]}],
      toolConfig: {
        functionCallingConfig: {
          mode: FunctionCallingConfigMode.ANY,
          allowedFunctionNames: ['controlLight'],
        },
      },
    },
  });
 console.debug(JSON.stringify(response.functionCalls));
```

##### Returns

`FunctionCall`[] \| `undefined`

***

### text

#### Get Signature

> **get** **text**(): `string` \| `undefined`

Defined in: node\_modules/@google/genai/dist/genai.d.ts:4655

Returns the concatenation of all text parts from the first candidate in the response.

##### Remarks

If there are multiple candidates in the response, the text from the first
one will be returned.
If there are non-text parts in the response, the concatenation of all text
parts will be returned, and a warning will be logged.
If there are thought parts in the response, the concatenation of all text
parts excluding the thought parts will be returned.

##### Example

```ts
const response = await ai.models.generateContent({
  model: 'gemini-2.0-flash',
  contents:
    'Why is the sky blue?',
});

console.debug(response.text);
```

##### Returns

`string` \| `undefined`
