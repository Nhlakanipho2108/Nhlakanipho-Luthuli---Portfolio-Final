import { handleChat } from '../server/chatHandler.js'

export default async function chat(req, res) {
  const result = await handleChat(req.method, req.body)
  return res.status(result.statusCode).json(result.body)
}