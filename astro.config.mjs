import { defineConfig } from 'astro/config';
import copy from 'rollup-plugin-copy';
import { fileURLToPath } from 'url';
import path from 'path';
import { rewriteDynamicImportsRollup } from './config/dynamicImportPlugin.js';

// Get the path to the icons package
const getAssetsFolder = (manifestEntryPoint) =>
  path.dirname(fileURLToPath(import.meta.resolve(manifestEntryPoint)));

const iconsDistFolder = getAssetsFolder(
  '@momentum-design/icons/dist/manifest.json'
);

export default defineConfig({
  site: 'https://air-hackathon-asjr.github.io',
  base: '/asjr-web/',
  output: 'static',
  outDir: './docs',
  vite: {
    build: {
      rollupOptions: {
        plugins: [
          rewriteDynamicImportsRollup({ packageName: 'icons' }),
          copy({
            targets: [
              {
                src: path.join(iconsDistFolder, '/svg/*.svg'),
                dest: 'docs/icons',
              },
              {
                src: path.join(iconsDistFolder, '/svg/*.svg'),
                dest: 'public/icons',
              },
            ],
          }),
        ],
      },
    },
  },
});
