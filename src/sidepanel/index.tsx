import { useState } from "react"
import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"
import type { Chat } from "~const"
import "../style.css"
import { StringField } from "~component/form"
import { Btn } from "~component/button"
import { message } from "~popup/message"

const ChatWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="rounded-[12px] px-2 py-1 border border-gray-200 bg-gray-100 self-end w-fit font-semibold text-base text-black">
      {children}
    </div>
  )
}

export const ChatElement = (props: Chat) => {
  const { senderName, message } = props
  return (
    <ChatWrapper>
      <span className="text-gray-500">{senderName} : </span>
      <span>{message}</span>
    </ChatWrapper>
  )
}

function IndexSidePanel() {
  const [text, setText] = useState("")
  const [chat] = useStorage({
    key: "chat",
    instance: new Storage({
      area: "local"
    })
  })

  const sendChat = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    message("chat/send", { text })
    setText("")
  }

  return (
    <div className="bg-gray-700 p-4 flex flex-col gap-4 h-screen w-full text-white">
      <h1 className="text-3xl font-bold">채팅 패널</h1>
      <div className="flex flex-col gap-2 grow w-full bg-gray-800 rounded-[12px] p-4 overflow-y-scroll">
        {chat &&
          chat.map((v: Chat, i: number) => <ChatElement key={i} {...v} />)}
      </div>
      <form
        onSubmit={sendChat}
        className="flex gap-2 bg-gray-800 rounded-[12px] p-1 w-full h-16">
        <StringField label="채팅 내용" value={text} setValue={setText} />
        <Btn label="전송" type="submit" padding="small" />
      </form>
    </div>
  )
}

export default IndexSidePanel