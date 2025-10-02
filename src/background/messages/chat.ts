import type { PlasmoMessaging } from "@plasmohq/messaging"
import { socketModule } from "~background/service/socket"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { msg } = req.body
  if (msg == "send") sendHandler(req, res)
}

const sendHandler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { text } = req.body
  if (text) await socketModule.send("chat", text)
  res.send(true)
}

export default handler
