import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import cssText from "data-text:../style.css"
import { LuMessageSquare } from "react-icons/lu"
import { useEffect } from "react"
import { useStorage } from "@plasmohq/storage/hook"
import type { Chat } from "~background/const"

export const config: PlasmoCSConfig = {
  matches: ["*://laftel.net/*"]
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => ({
  element: document.querySelector(`#root-video-fullscreen`),
  insertPosition: "afterbegin"
})

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText.replaceAll(":root", ":host(plasmo-csui)")
  return style
}

const ChatElement = (props: Chat) => {
  const { senderName, message } = props
  return (
    <div className="rounded-[12px] p-2 border border-gray-800 self-end w-fit">
      {senderName}: {message}
    </div>
  )
}

const Chatting = () => {
  const [chat] = useStorage<Chat[]>("chat")

  // todo : suppress keypress event (fullscreen, etc)
  return (
    <div className="absolute top-4 right-4 flex flex-col gap-4">
      <div className="rounded-[12px] h-10 p-1 flex gap-2 border border-gray-800 w-fit self-end">
        <input
          className="h-8 text-white bg-transparent border-none outline-none"
          placeholder="채팅 내용을 입력"
        />
        <LuMessageSquare size={32} />
      </div>
      {chat && chat.map((v: Chat, i: number) => <ChatElement key={i} {...v} />)}
    </div>
  )
}

export default Chatting