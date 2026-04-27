import { useGenAIContext } from '../context/GenAIContext.js';
import type { GoogleGenAI } from '../types/index.js';

/**
 * Returns the underlying GoogleGenAI client instance.
 * Must be used inside a <GenAIProvider>.
 */
export function useGenAIClient(): GoogleGenAI {
  return useGenAIContext().client;
}
