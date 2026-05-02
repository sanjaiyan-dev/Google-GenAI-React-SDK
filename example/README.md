# Example App — react-google-genai

This example application demonstrates how to use `react-google-genai` with Vite and React.

It includes:

- One-shot generation with `useGenerateContentMutate`
- Declarative generation with `useGenerateContentQuery`
- Streaming generation with `useStreamContentQuery`

## Setup

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Add your Gemini API key to `example/.env`:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

3. Install dependencies:

```bash
cd example
npm install
```

4. Start the example app:

```bash
npm run dev
```

## Notes

- The app is configured to use Vite and React 19.
- `VITE_GEMINI_API_KEY` is read from the Vite environment and passed to `GenAIProvider`.
- If you want to test the latest local version of the library while developing, you can install the local package from the root:

```bash
cd example
npm install ../
```

## Styling

The sample app uses minimal inline styling in `src/App.tsx` and the existing `App.css` file.
