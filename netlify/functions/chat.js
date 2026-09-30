import { handleChat } from '../../server/chatHandler.js'

export async function handler(event) {
  let body = {}
  try {
    body = event.body ? JSON.parse(event.body) : {}
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Request body must be valid JSON.' }) }
  }

  const result = await handleChat(event.httpMethod, body)
  return {
    statusCode: result.statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(result.body),
  }
}