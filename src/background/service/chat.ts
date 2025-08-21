import { Storage } from "@plasmohq/storage"
import type { Chat } from "~const"
const storage = new Storage()

export const chatModule = (() => {
  const render = async (input: Chat) => {
    const tab = await chrome.tabs.query({ active: true, currentWindow: true })
    await chrome.tabs.sendMessage(tab[0].id, { action: "chat", payload: input })
  }

  return {
    render
  }
})()