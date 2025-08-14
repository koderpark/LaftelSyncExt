import { Storage } from "@plasmohq/storage"
import type { Chat } from "../const"
const storage = new Storage()

export const chatModule = (() => {
  const get = async (): Promise<Chat[]> => {
    return (await storage.get("chat")) || []
  }

  const set = async (input: Chat[]) => {
    await storage.set("chat", input)
  }

  const render = async (input: Chat) => {
    const list = await get()
    list.push(input)
    await set(list)

    setTimeout(async () => {
      const list = await get()
      list.shift()
      await set(list)
    }, 5000) // todo: render timeout customize
  }

  return {
    render
  }
})()