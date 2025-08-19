import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import cssText from "data-text:../style.css"
import { LuMessageSquare, LuSend } from "react-icons/lu"
import { useEffect, useState } from "react"
import { useStorage } from "@plasmohq/storage/hook"
import type { Chat } from "~background/const"
import { message } from "~popup/message"

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

const ChatWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="rounded-[12px] p-2 border border-gray-500/50 bg-gray-900/50 self-end w-fit">
      {children}
    </div>
  )
}

const ChatElement = (props: Chat) => {
  const { senderName, message } = props
  return (
    <ChatWrapper>
      {senderName}: {message}
    </ChatWrapper>
  )
}

const ChatSender = () => {
  const [text, setText] = useState("")
  const [collapsed, setCollapsed] = useStorage("collapsed", true)
  const [room] = useStorage("room")

  const suppress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation()
  }

  const sendChat = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    message("chat/send", { text })
    setText("")
  }

  return (
    <ChatWrapper>
      <div className="flex gap-4 h-8">
        {!collapsed && (
          <form onSubmit={sendChat} className="flex gap-4">
            <input
              className="h-8 ps-1 text-white bg-transparent border-none outline-none placeholder:text-white w-[15rem]"
              placeholder="채팅 내용을 입력"
              onKeyDown={suppress}
              onKeyUp={suppress}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button type="submit" className="cursor-pointer">
              <LuSend size={32} />
            </button>
          </form>
        )}
        <LuMessageSquare
          size={32}
          onClick={() => setCollapsed(!collapsed)}
          className="cursor-pointer"
        />
      </div>
    </ChatWrapper>
  )
}

const Chatting = () => {
  const [chat] = useStorage<Chat[]>("chat")
  const [chatType] = useStorage("chatType")
  const [room] = useStorage("room")

  // todo : suppress keypress event (fullscreen, etc)
  return (
    <div className="absolute top-4 right-4 flex flex-col gap-4">
      {room && <ChatSender />}
      {chatType !== "none" &&
        chat &&
        chat.map((v: Chat, i: number) => <ChatElement key={i} {...v} />)}
    </div>
  )
}

export default Chatting