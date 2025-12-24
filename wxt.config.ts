import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',
  modules: ['@wxt-dev/module-svelte', '@wxt-dev/auto-icons'],
  vite: () => ({
    plugins: [tailwindcss()],
  }),
  manifest: {
    name: 'Breach Tab',
    description: 'Simple New Tab, open the page to a simple window',
    permissions: ['storage', 'tabs'],
    chrome_url_overrides: {
      newtab: 'newtab/index.html',
    },
  },
});
