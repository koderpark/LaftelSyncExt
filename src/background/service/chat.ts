import { Storage } from "@plasmohq/storage"
import type { Chat } from "~const"
const storage = new Storage({ area: "local" })

export const chatModule = (() => {
  const render = async (input: Chat) => {
    const chat = (await storage.get<Chat[]>("chat")) || []
    await storage.set("chat", [...chat, input])

    const tab = await chrome.tabs.query({ active: true, currentWindow: true })
    await chrome.tabs.sendMessage(tab[0].id, { action: "chat", payload: input })
  }

  const clear = async () => {
    await storage.set("chat", [])
  }

  return {
    render,
    clear
  }
})()