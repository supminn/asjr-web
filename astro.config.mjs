import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://asjr.github.io', // Or 'https://your-username.github.io/your-repo-name'
  base: '/asjr-web', // Only if deploying to a project page (e.g., your-username.github.io/your-repo-name)
  output: 'static',
  outDir: './docs',
});
