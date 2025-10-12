import { useEffect, useRef, useState } from "react"
import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"
import type { Chat, RoomMetadata } from "~const"
import { StringField } from "~component/form"
import { Btn } from "~component/button"
import { message } from "~popup/message"
import { CreateIcon } from "~component/icon"
import "./scroll.css"
import "../style.css"

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
  const chatRef = useRef<HTMLDivElement>(null)
  const [text, setText] = useState("")
  const [chat] = useStorage({
    key: "chat",
    instance: new Storage({
      area: "local"
    })
  })

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollIntoView({ behavior: "instant" })
    }
  }, [chat])

  const sendChat = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    message("chat/send", { text })
    setText("")
  }

  return (
    <div className="bg-gray-950 p-4 flex flex-col gap-4 h-screen w-full text-white">
      <h1 className="text-3xl font-bold">채팅 패널</h1>
      <div className="flex flex-col gap-2 grow w-full bg-gray-900 rounded-[12px] p-4 overflow-y-scroll">
        {chat &&
          chat.map((v: Chat, i: number) => <ChatElement key={i} {...v} />)}
        <div ref={chatRef}></div>
      </div>
      <form
        onSubmit={sendChat}
        className="flex gap-2 bg-gray-900 rounded-[12px] p-1 w-full h-12">
        <StringField label="채팅 내용" value={text} setValue={setText} />
        <Btn label="전송" type="submit" padding="small" />
      </form>
    </div>
  )
}

export function FallbackPage() {
  return (
    <div className="bg-gray-950 p-4 h-screen w-full text-white flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4">
        <CreateIcon className="w-8 h-8 text-gray-300" />
      </div>
      <h2 className="text-xl font-bold mb-2">채팅방에 접속하지 않았습니다</h2>
      <p className="text-gray-400">팝업에서 채팅방을 생성하거나 참가해보세요</p>
      <p className="text-gray-400 mb-6">
        채팅방에 참가하면 다른 사람들과 실시간으로 대화할 수 있습니다
      </p>
      <button
        onClick={() => chrome.action.openPopup()}
        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors">
        팝업 열기
      </button>
    </div>
  )
}

export function EntryPoint() {
  const [room] = useStorage<RoomMetadata | null>("room", null)

  return (
    <>
      {!room && <FallbackPage />}
      {room && <IndexSidePanel />}
    </>
  )
}

export default EntryPoint