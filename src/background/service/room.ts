import { Storage } from "@plasmohq/storage"
import type { Room } from "../const"
import { socketModule } from "./socket"

const storage = new Storage()

export const roomModule = (() => {
  const create = async (name: string, password?: string) => {
    await socketModule.connectHost(name, password)
  }

  const join = async (roomId: string, password?: string) => {
    await socketModule.connectPeer(roomId, password)
  }

  const exit = async () => {
    await socketModule.disconnect()
    await storage.set("room", null)
  }

  const update = async (room: Room) => {
    if (room === null) return exit()
    await storage.set("room", room)
  }

  const kick = async (id: string) => {
    await socketModule.send("room/kick", { userId: id })
  }

  return {
    create,
    join,
    exit,
    update,
    kick
  }
})()
