import { defineConfig } from 'astro/config';
import copy from 'rollup-plugin-copy';
import { fileURLToPath } from 'url';
import path from 'path';
// import storyblok from '@storyblok/astro';

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
  integrations: [
    // Temporarily disabled Storyblok integration due to import issue
    // Will re-enable once we resolve the module import
    /* storyblok({
      accessToken: import.meta.env.STORYBLOK_TOKEN,
      apiOptions: {},
      components: {
        blog_post: 'storyblok/BlogPost',
        blog_listing: 'storyblok/BlogListing',
      },
    }) */
  ],
});
