import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Development API middleware to run /api/contact locally without needing Vercel CLI
function apiDevPlugin() {
  return {
    name: 'api-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const parsedUrl = req.url ? req.url.split('?')[0] : '';
        if (parsedUrl === '/api/contact') {
          if (req.method === 'OPTIONS') {
            res.statusCode = 200;
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
            res.end();
            return;
          }

          if (req.method === 'POST') {
            let rawBody = '';
            req.on('data', chunk => { rawBody += chunk; });
            req.on('end', async () => {
              try {
                req.body = rawBody ? JSON.parse(rawBody) : {};
              } catch {
                req.body = rawBody;
              }

              // Augment res with express-like status and json helpers
              res.status = (code) => {
                res.statusCode = code;
                return res;
              };
              res.json = (data) => {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
                return res;
              };

              try {
                const { default: handler } = await server.ssrLoadModule('/api/contact.ts');
                await handler(req, res);
              } catch (err) {
                console.error('[Dev API] Handler error:', err);
                res.status(500).json({ success: false, error: 'Internal server error in development' });
              }
            });
            return;
          }
        }
        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), apiDevPlugin()],
  server: {
    port: 5173,
    host: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          vendor: ['react', 'react-dom', 'lucide-react', 'canvas-confetti']
        }
      }
    }
  }
});
