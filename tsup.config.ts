import { defineConfig } from 'tsup';
import babel from 'esbuild-plugin-babel';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: {
    compilerOptions: {
      ignoreDeprecations: '6.0',
    },
  },
  sourcemap: true,
  clean: true,
  treeshake: true,
  splitting: false,
  external: ['react', 'react-dom', '@tanstack/react-query'],
  esbuildPlugins: [
    babel({
      filter: /\.tsx?$/,
      config: {
        presets: [['@babel/preset-react', { runtime: 'automatic' }], '@babel/preset-typescript'],
        plugins: [['babel-plugin-react-compiler', { target: '18' }]],
      },
    }) as any, // eslint-disable-line @typescript-eslint/no-explicit-any
  ],
  banner: {
    js: '"use client";',
  },
});
