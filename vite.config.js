import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiKey = env.VITE_AVIATIONSTACK_API_KEY || ''

  return {
    plugins: [vue()],
    server: {
      proxy: {
        '/api/aviation': {
          target: 'http://api.aviationstack.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/aviation/, '/v1'),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq, req) => {
              if (!apiKey) return
              const url = new URL(req.url || '', 'http://localhost')
              if (!url.searchParams.has('access_key')) {
                url.searchParams.set('access_key', apiKey)
                proxyReq.path = `${url.pathname}${url.search}`
              }
            })
          },
        },
      },
    },
    test: {
      environment: 'jsdom',
    },
  }
})
