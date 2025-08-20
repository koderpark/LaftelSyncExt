import { roomModule } from "~background/service/room"
import { updateVideo } from "~background/video"
import type { Room, VidData, Chat } from "~background/const"
import { Storage } from "@plasmohq/storage"
import { logModule } from "./log"
import { chatModule } from "./chat"

const storage = new Storage()

export const connectHandler = async (id: string) => {
  logModule.devLog("connect")
  await storage.set("userId", id)
}

export const roomUpdateHandler = async (body: Room) => {
  logModule.devLog("roomUpdateHandler")
  await roomModule.update(body)
}

export const videoUpdateHandler = (data: VidData) => {
  logModule.devLog("videoUpdateHandler")
  logModule.devLog(JSON.stringify(data))
  updateVideo(data)
}

export const disconnectHandler = async () => {
  logModule.devLog("disconnect")
  await storage.set("userId", null)
  await roomModule.exit()
}

export const chatUpdateHandler = async (data: Chat) => {
  logModule.devLog("chatUpdateHandler")
  await chatModule.render(data)
}

export const connectErrorHandler = async () => {
  logModule.log("error", "서버 접속 실패, 개발자에게 문의해주세요")
  await roomModule.exit()
}