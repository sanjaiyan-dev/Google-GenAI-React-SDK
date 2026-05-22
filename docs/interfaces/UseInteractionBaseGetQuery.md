[**react-google-genai**](../README.md)

***

[react-google-genai](../globals.md) / UseInteractionBaseGetQuery

# Interface: UseInteractionBaseGetQuery

Defined in: [src/types/index.ts:1398](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L1398)

## Properties

### cacheConfig

> **cacheConfig**: `CacheConfig`

Defined in: [src/types/index.ts:1417](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L1417)

Configuration for caching the retrieved interaction details.

#### Remarks

Controls how long the interaction data remains in the cache and when
a refetch should be triggered. See CacheConfig for a detailed explanation.

#### See

CacheConfig

***

### client\_id

> **client\_id**: `string`

Defined in: [src/types/index.ts:1406](https://github.com/sanjaiyan-dev/Google-GenAI-React-SDK/blob/main/src/types/index.ts#L1406)

The unique identifier of the interaction.

#### Remarks

This corresponds to the `Interaction.id` and is used to pinpoint the
specific interaction to be retrieved.
