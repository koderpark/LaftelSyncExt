import { Storage } from "@plasmohq/storage"
const storage = new Storage()

export const logModule = (() => {
  const log = async (type: "success" | "error", msg: string) => {
    chrome.runtime.sendMessage({
      action: "log",
      payload: {
        type,
        message: msg,
        time: new Date()
      }
    })
  }

  const devLog = async (msg: string) => {
    const isCanary = await storage.get("isCanary")
    if (!isCanary) return
    await log("success", msg)
  }

  return {
    log,
    devLog
  }
})()
