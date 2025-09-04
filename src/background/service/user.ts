import { Storage } from "@plasmohq/storage"
import type { UserInfo } from "~const"

const storage = new Storage()

export const userModule = (() => {
  const get = async () => {
    return await storage.get("user")
  }

  const set = async (data: UserInfo) => {
    await storage.set("user", data)
  }

  return {
    get,
    set
  }
})()
