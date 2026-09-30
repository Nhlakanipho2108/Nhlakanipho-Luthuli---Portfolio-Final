import { defineConfig } from 'vite'
import { loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
	const serverEnv = loadEnv(mode, process.cwd(), '')
	if (serverEnv.OPENAI_API_KEY) process.env.OPENAI_API_KEY = serverEnv.OPENAI_API_KEY
	if (serverEnv.OPENAI_MODEL) process.env.OPENAI_MODEL = serverEnv.OPENAI_MODEL

	return {
		plugins: [
			vue(),
			{
				name: 'portfolio-assistant-api',
				configureServer(server) {
					server.middlewares.use('/api/chat', async (request, response) => {
						const { handleChat } = await import('./server/chatHandler.js')
						let body = {}

						if (request.method === 'POST') {
							try {
								let rawBody = ''
								for await (const chunk of request) {
									rawBody += chunk
									if (rawBody.length > 24000) {
										response.writeHead(413, { 'Content-Type': 'application/json' })
										response.end(JSON.stringify({ error: 'Message is too large.' }))
										return
									}
								}
								body = rawBody ? JSON.parse(rawBody) : {}
							} catch {
								response.writeHead(400, { 'Content-Type': 'application/json' })
								response.end(JSON.stringify({ error: 'Request body must be valid JSON.' }))
								return
							}
						}

						const result = await handleChat(request.method, body)
						response.writeHead(result.statusCode, { 'Content-Type': 'application/json' })
						response.end(JSON.stringify(result.body))
					})
				},
			},
		],
		publicDir: 'public',
	}
})
