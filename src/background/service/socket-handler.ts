import { roomModule } from "~background/service/room"
import { updateVideo } from "~background/video"
import type { RoomMetadata, VidData, Chat, UserInfo } from "~const"
import { Storage } from "@plasmohq/storage"
import { logModule } from "./log"
import { chatModule } from "./chat"
import { userModule } from "~background/user"

export const connectHandler = async (id: string) => {
  logModule.devLog("connect")
}

export const roomUpdateHandler = async (body: RoomMetadata) => {
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
  await userModule.set(null)
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

export const userHandler = async (data: UserInfo) => {
  logModule.devLog("userHandler")
  await userModule.set(data)
}