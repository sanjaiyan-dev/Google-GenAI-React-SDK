import { useState } from 'react';
import {
  GenAIProvider,
  useGenerateContentMutate,
  useGenerateContentQuery,
  useModelInfo,
  useStreamContent,
} from 'react-google-genai';
import './App.css';
import type { Interactions } from '@google/genai';

function ExampleApp() {
  const [prompt, setPrompt] = useState('Write a short cultural description about a thirukural.');
  const [queryInput, setQueryInput] = useState(
    'Compose a tweet discussing Tamil Siddhar medicine and the traditional Tamil perspective on cosmology.',
  );
  const [queryPrompt, setQueryPrompt] = useState('');
  const [streamInput, setStreamInput] = useState(
    'Explain the difference between React state and props.',
  );
  const [modelInfo, setModelInfo] = useState<Interactions.Model>('');
  const [modelInfoInput, setModelInfoInput] = useState<Interactions.Model>('');

  const generateMutation = useGenerateContentMutate({
    model: 'gemini-2.5-flash',
    temperature: 0.7,
  });

  const modelInformation = useModelInfo(modelInfo);

  const queryResult = useGenerateContentQuery({
    model: 'gemini-2.5-flash',
    prompt: queryPrompt,
    temperature: 0.2,
    trigger: Boolean(queryPrompt.trim()),
    retryCount: 1,
  });

  const streaming = useStreamContent({
    model: 'gemini-2.5-flash',
  });

  return (
    <main style={{ padding: '24px', fontFamily: 'system-ui, sans-serif', color: '#111' }}>
      <h1>React Google GenAI Example</h1>
      <p style={{ maxWidth: 640, lineHeight: 1.7 }}>
        This example shows how to use <code>useGenerateContentMutate</code>,{' '}
        <code>useGenerateContentQuery</code>, and
        <code>useStreamContentQuery</code> from{' '}
        <code>
          <b>react-google-genai</b>
        </code>
        .
      </p>

      <section style={{ marginTop: 32, borderTop: '1px solid #ddd', paddingTop: 32 }}>
        <h2>One-shot generation</h2>
        <p>Generate text on demand using a mutation-style hook.</p>
        <textarea
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          rows={4}
          style={{
            width: '100%',
            padding: 12,
            borderRadius: 10,
            border: '1px solid #ccc',
            marginBottom: 12,
          }}
        />
        <button
          type="button"
          onClick={() => generateMutation.generate(prompt)}
          disabled={generateMutation.isPending}
          style={{
            padding: '10px 16px',
            borderRadius: 8,
            border: 'none',
            backgroundColor: '#2563eb',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          {generateMutation.isPending ? 'Generating…' : 'Generate text'}
        </button>
        {generateMutation.isError && (
          <p style={{ marginTop: 12, color: '#b91c1c' }}>
            Error: {generateMutation.error?.message}
          </p>
        )}
        {generateMutation.text && (
          <div style={{ marginTop: 16, padding: 16, borderRadius: 10, backgroundColor: '#f3f4f6' }}>
            <strong>Result:</strong>
            <p style={{ color: '#000' }}>{generateMutation.text}</p>
          </div>
        )}
      </section>

      <section style={{ marginTop: 32, borderTop: '1px solid #ddd', paddingTop: 32 }}>
        <h2>Declarative query generation</h2>
        <p>
          Use <code>useGenerateContentQuery</code> for cache-aware, query-style generation.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <input
            value={queryInput}
            onChange={(event) => setQueryInput(event.target.value)}
            placeholder="Enter a prompt for query generation"
            style={{ flex: '1 1 300px', padding: 12, borderRadius: 10, border: '1px solid #ccc' }}
          />
          <button
            type="button"
            onClick={() => setQueryPrompt(queryInput.trim())}
            disabled={!queryInput.trim()}
            style={{
              padding: '10px 16px',
              borderRadius: 8,
              border: 'none',
              backgroundColor: '#0f766e',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            Run query
          </button>
        </div>
        {queryPrompt && (
          <button
            type="button"
            onClick={() => queryResult.refetch()}
            disabled={queryResult.isPending}
            style={{
              marginTop: 12,
              padding: '8px 14px',
              borderRadius: 8,
              border: '1px solid #0f766e',
              background: '#ffffff',
              color: '#0f766e',
            }}
          >
            Refresh result
          </button>
        )}
        {queryResult.isError && (
          <p style={{ marginTop: 12, color: '#b91c1c' }}>Error: {queryResult.error?.message}</p>
        )}
        {queryResult.text && (
          <div
            style={{
              marginTop: 16,
              padding: 16,
              borderRadius: 10,
              backgroundColor: '#eef2ff',
              color: '#000',
            }}
          >
            <strong>Query result:</strong>
            <p style={{ color: '#000' }}>{queryResult.text}</p>
          </div>
        )}
      </section>

      <section style={{ marginTop: 32, borderTop: '1px solid #ddd', paddingTop: 32 }}>
        <h2>Streaming generation</h2>
        <p>
          Use <code>useStreamContent</code> for real-time streamed responses.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <input
            value={streamInput}
            onChange={(event) => setStreamInput(event.target.value)}
            placeholder="Enter a prompt for streaming"
            style={{ flex: '1 1 300px', padding: 12, borderRadius: 10, border: '1px solid #ccc' }}
          />
          <button
            type="button"
            onClick={() => {
              streaming.stream(streamInput.trim());
            }}
            disabled={!streamInput.trim()}
            style={{
              padding: '10px 16px',
              borderRadius: 8,
              border: 'none',
              backgroundColor: '#7c3aed',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            Start stream
          </button>
        </div>
        <div
          style={{
            marginTop: 16,
            padding: 16,
            borderRadius: 10,
            backgroundColor: '#f8fafc',
            minHeight: 140,
          }}
        >
          {JSON.stringify(streaming)}
          {streaming.isStreaming && <p>Streaming response…</p>}
          {streaming.error && <p style={{ color: '#b91c1c' }}>Error: {streaming.error?.message}</p>}
          <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>
            {streaming.fullText || 'No streamed content yet.'}
          </pre>
        </div>
      </section>

      <section style={{ marginTop: 32, borderTop: '1px solid #ddd', paddingTop: 32 }}>
        <h2>Information about Gemini Models</h2>
        <p>
          Use <code>useModelInfo</code> for cache-aware fetching of model information.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <input
            value={modelInfoInput}
            onChange={(event) => setModelInfoInput(event.target.value)}
            placeholder="Enter a name of the gemini models (gemini-2.5-flash)"
            style={{ flex: '1 1 300px', padding: 12, borderRadius: 10, border: '1px solid #ccc' }}
          />
          <button
            type="button"
            onClick={() => setModelInfo(modelInfoInput.trim())}
            disabled={!modelInfoInput.trim()}
            style={{
              padding: '10px 16px',
              borderRadius: 8,
              border: 'none',
              backgroundColor: '#0f766e',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            Fetch Model Info
          </button>
        </div>
        {modelInformation.isLoading && <p>Loading...</p>}
        {modelInformation.isSuccess && (
          <button
            type="button"
            onClick={() => modelInformation.refetch()}
            disabled={modelInformation.isPending}
            style={{
              marginTop: 12,
              padding: '8px 14px',
              borderRadius: 8,
              border: '1px solid #0f766e',
              background: '#ffffff',
              color: '#0f766e',
            }}
          >
            Refresh result
          </button>
        )}
        {modelInformation.isError && (
          <p style={{ marginTop: 12, color: '#b91c1c' }}>Error: {queryResult.error?.message}</p>
        )}
        {modelInformation.data && (
          <div style={{ marginTop: 16, padding: 16, borderRadius: 10, backgroundColor: '#eef2ff' }}>
            <strong>Model info:</strong>
            <p style={{ color: '#000', textWrap: 'pretty' }}>
              {JSON.stringify(modelInformation.data)}
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

function App() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    return (
      <main style={{ padding: '32px', fontFamily: 'system-ui, sans-serif' }}>
        <h1>Example App</h1>
        <p>
          Please add <code>VITE_GEMINI_API_KEY</code> to <code>example/.env</code> and restart the
          dev server.
        </p>
      </main>
    );
  }

  return (
    <GenAIProvider apiKey={apiKey}>
      <ExampleApp />
    </GenAIProvider>
  );
}

export default App;
