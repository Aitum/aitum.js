import { defineConfig } from 'tsup';

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  clean: true,
  dts: true,
  entry: {
    index: 'src/index.ts',
    interfaces: 'src/interfaces/index.ts',
    inputs: 'src/inputs/index.ts',
    enums: 'src/enums/index.ts',
    classes: 'src/classes/index.ts'
  },
  format: ['cjs', 'esm'],
  minify: isProduction,
  outDir: 'lib',
  sourcemap: false,
  splitting: false,
});
