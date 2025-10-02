import { Storage } from "@plasmohq/storage"
import type { RoomMetadata } from "~const"
import { socketModule } from "./socket"
import { logModule } from "./log"

const storage = new Storage()

export const roomModule = (() => {
  const create = async (name: string, password?: string) => {
    if (name === "") {
      logModule.log("error", "방 이름은 비어있을 수 없습니다.")
      return
    }
    await socketModule.connectHost(name, password)
  }

  const join = async (roomId: string, password?: string) => {
    if (roomId === "" || isNaN(Number(roomId))) {
      logModule.log("error", "방 번호는 숫자여야 합니다.")
      return
    }
    await socketModule.connectPeer(roomId, password) // Todo: connect failed fallback
  }

  const joinLink = async (uuid: string) => {
    if (uuid === "") {
      logModule.log("error", "잘못된 링크입니다.")
      return
    }
    await socketModule.connectLink(uuid)
  }

  const exit = async () => {
    await socketModule.disconnect()
    await storage.set("room", null)
  }

  const update = async (room: RoomMetadata) => {
    if (room === null) return exit()
    await storage.set("room", room)
  }

  const kick = async (id: string) => {
    await socketModule.send("room/kick", { userId: id })
  }

  const link = async () => {
    return await socketModule.sendRes("room/link", null)
  }

  return {
    create,
    join,
    joinLink,
    exit,
    update,
    kick,
    link
  }
})()
