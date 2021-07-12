/** @type {import('@sveltejs/kit').Config} */
import node from '@sveltejs/adapter-node';
import path from 'path';

const config = {
  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    adapter: node({ out: 'build-node' }),
    ssr: true,
    hydrate: true,
    vite: {
      build: {
        rollupOptions: {
          output: {
            intro: 'if(exports === undefined){var exports ={}; var self = {}}',
          },
        },
      },
      resolve: {
        alias: {
          './runtimeConfig': './runtimeConfig.browser',
          $static: path.resolve('./static'),
          $stores: path.resolve('./src/stores'),
          $components: path.resolve('./src/components'),
          $helpers: path.resolve('./src/helpers'),
          $graphql: path.resolve('./src/graphql'),
          $data: path.resolve('./src/data'),
        },
      },
    },
  },
};

export default config;
