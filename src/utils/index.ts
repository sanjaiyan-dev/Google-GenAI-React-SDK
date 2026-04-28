import type { GenerateContentResponse, Part } from '@google/genai';

/**
 * Safely extract text from a GenerateContentResponse.
 * Returns empty string if no text parts exist.
 */
export function extractText(response: GenerateContentResponse): string {
  return response.text ?? '';
}

/**
 * Extract all text parts from a content part array.
 */
export function extractTextFromParts(parts: Part[]): string {
  'use memo';
  return parts
    .filter((p) => typeof p.text === 'string')
    .map((p) => p.text ?? '')
    .join('');
}

/**
 * Create a simple text prompt content array.
 */
export function textPrompt(text: string) {
  return [{ text }];
}

/**
 * Create a multimodal prompt with text and an inline image (base64).
 */
export function imagePrompt(text: string, base64Data: string, mimeType: string = 'image/jpeg') {
  return [{ text }, { inlineData: { data: base64Data, mimeType } }];
}
