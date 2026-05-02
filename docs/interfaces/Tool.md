[**react-google-genai**](../README.md)

***

[react-google-genai](../globals.md) / Tool

# Interface: Tool

Defined in: node\_modules/@google/genai/dist/genai.d.ts:10478

Tool details of a tool that the model may use to generate a response.

## Properties

### codeExecution?

> `optional` **codeExecution?**: `ToolCodeExecution`

Defined in: node\_modules/@google/genai/dist/genai.d.ts:10493

Optional. CodeExecution tool type. Enables the model to execute code as part of generation.

***

### computerUse?

> `optional` **computerUse?**: `ComputerUse`

Defined in: node\_modules/@google/genai/dist/genai.d.ts:10484

Optional. Tool to support the model interacting directly with the
computer. If enabled, it automatically populates computer-use specific
Function Declarations.

***

### enterpriseWebSearch?

> `optional` **enterpriseWebSearch?**: `EnterpriseWebSearch`

Defined in: node\_modules/@google/genai/dist/genai.d.ts:10495

Optional. Tool to support searching public web data, powered by Vertex AI Search and Sec4 compliance. This field is not supported in Gemini API.

***

### fileSearch?

> `optional` **fileSearch?**: `FileSearch`

Defined in: node\_modules/@google/genai/dist/genai.d.ts:10486

Optional. FileSearch tool type. Tool to retrieve knowledge from Semantic Retrieval corpora. This field is not supported in Vertex AI.

***

### functionDeclarations?

> `optional` **functionDeclarations?**: `FunctionDeclaration`[]

Defined in: node\_modules/@google/genai/dist/genai.d.ts:10497

Optional. Function tool type. One or more function declarations to be passed to the model along with the current user query. Model may decide to call a subset of these functions by populating FunctionCall in the response. User should provide a FunctionResponse for each function call in the next turn. Based on the function responses, Model will generate the final response back to the user. Maximum 512 function declarations can be provided.

***

### googleMaps?

> `optional` **googleMaps?**: `GoogleMaps`

Defined in: node\_modules/@google/genai/dist/genai.d.ts:10491

Optional. Tool that allows grounding the model's response with
geospatial context related to the user's query.

***

### googleSearch?

> `optional` **googleSearch?**: `GoogleSearch`

Defined in: node\_modules/@google/genai/dist/genai.d.ts:10488

Optional. GoogleSearch tool type. Tool to support Google Search in Model. Powered by Google.

***

### googleSearchRetrieval?

> `optional` **googleSearchRetrieval?**: `GoogleSearchRetrieval`

Defined in: node\_modules/@google/genai/dist/genai.d.ts:10499

Optional. Specialized retrieval tool that is powered by Google Search.

***

### mcpServers?

> `optional` **mcpServers?**: `McpServer`[]

Defined in: node\_modules/@google/genai/dist/genai.d.ts:10505

Optional. MCP Servers to connect to. This field is not supported in Vertex AI.

***

### parallelAiSearch?

> `optional` **parallelAiSearch?**: `ToolParallelAiSearch`

Defined in: node\_modules/@google/genai/dist/genai.d.ts:10501

Optional. If specified, Vertex AI will use Parallel.ai to search for information to answer user queries. The search results will be grounded on Parallel.ai and presented to the model for response generation. This field is not supported in Gemini API.

***

### retrieval?

> `optional` **retrieval?**: `Retrieval`

Defined in: node\_modules/@google/genai/dist/genai.d.ts:10480

Optional. Retrieval tool type. System will always execute the provided retrieval tool(s) to get external knowledge to answer the prompt. Retrieval results are presented to the model for generation. This field is not supported in Gemini API.

***

### urlContext?

> `optional` **urlContext?**: `UrlContext`

Defined in: node\_modules/@google/genai/dist/genai.d.ts:10503

Optional. Tool to support URL context retrieval.
