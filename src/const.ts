import { Storage } from "@plasmohq/storage"

const storage = new Storage()

export const getUrl = async () => {
  const isCanary = await storage.get("isCanary")

  if (isCanary) return process.env.PLASMO_PUBLIC_BE_CANARY!
  return process.env.PLASMO_PUBLIC_BE_PUBLIC!
}

export interface VidData {
  url: string
  speed: number
  time: number
  isPaused: boolean
}

export interface User {
  id: number
  createdAt: Date
  name: string
  room?: RoomMetadata
  host?: RoomMetadata
}

export interface UserInfo {
  id: string
  createdAt: Date
  name: string
  roomId: number
  isHost: boolean
}

export interface Log {
  type: "success" | "error" | "warning"
  message: string
  time: Date
}

export interface RoomMetadata {
  id: number
  name: string
  host: string
  user: {
    id: string
    name: string
    isHost: boolean
  }[]
}

export interface Chat {
  senderId: string
  senderName: string
  message: string
}

export type Page = "login" | "main" | "room" | "setting" | "chat"
