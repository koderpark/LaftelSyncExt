import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import cssText from "data-text:../style.css"
import { LuMessageSquare, LuSend } from "react-icons/lu"
import { useEffect, useState } from "react"
import { useStorage } from "@plasmohq/storage/hook"
import { message } from "~popup/message"
import type { Chat, Log } from "~const"

const ChatWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="rounded-[8px] p-2 border border-gray-700/50 bg-gray-900/50 self-end w-fit font-semibold text-xl text-gray-50">
      {children}
    </div>
  )
}

export const ChatElement = (props: Chat) => {
  const { senderName, message } = props
  return (
    <ChatWrapper>
      <span className="text-gray-400">{senderName} : </span>
      <span>{message}</span>
    </ChatWrapper>
  )
}

export const ChatSender = () => {
  const [text, setText] = useState("")
  const [collapsed, setCollapsed] = useStorage("collapsed", true)

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
      <div className="flex gap-4">
        {!collapsed && (
          <form onSubmit={sendChat} className="flex gap-4">
            <input
              className="ps-0.5 text-white bg-transparent border-none outline-none placeholder:text-white w-[15rem]"
              placeholder="채팅 내용을 입력"
              onKeyDown={suppress}
              onKeyUp={suppress}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button type="submit" className="cursor-pointer">
              <LuSend size={28} />
            </button>
          </form>
        )}
        <LuMessageSquare
          size={28}
          onClick={() => setCollapsed(!collapsed)}
          className="cursor-pointer"
        />
      </div>
    </ChatWrapper>
  )
}

export const Chatting = () => {
  const [chatType] = useStorage("chatType")
  const [chatTime] = useStorage("chatTime")
  const [chat, setChat] = useState<Chat[]>([])

  useEffect(() => {
    const messageListener = async (message: any) => {
      if (message?.action === "chat" && message?.payload) {
        const newChat = message.payload as Chat
        setChat((prev) => [...prev, newChat])

        setTimeout(() => {
          setChat((prev) => prev.filter((chat) => chat !== newChat))
        }, chatTime * 1000)
      }
    }

    chrome.runtime.onMessage.addListener(messageListener)
    return () => chrome.runtime.onMessage.removeListener(messageListener)
  }, [chatTime])

  return (
    <div className="absolute top-6 right-6 flex flex-col gap-3">
      <ChatSender />
      {chatType !== "none" &&
        chat &&
        chat.map((v: Chat, i: number) => <ChatElement key={i} {...v} />)}
    </div>
  )
}