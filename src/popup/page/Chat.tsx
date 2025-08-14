import { Full } from "~popup/component/layout"

import { Content } from "~popup/component/layout"
import { useStorage } from "@plasmohq/storage/hook"
import { Btn } from "~popup/component/button"
import { useState } from "react"
import { message } from "~popup/message"
import { StringField } from "~popup/component/form"

const ChatTypeSelector = () => {
  const [chatType, setChatType] = useStorage("chatType", "normal")
  return (
    <div>
      <h1 className="text-xl font-bold mb-2">표시 방식</h1>
      <div className="flex gap-2 bg-gray-800 rounded-[12px] p-1 ">
        {/* <Btn
          label="nicovideo식"
          onClick={() => setChatType("nicovideo")}
          type={chatType === "nicovideo" ? "submit" : "option"}
        /> */}
        <Btn
          label="오른쪽에 표시"
          onClick={() => setChatType("normal")}
          type={chatType === "normal" ? "submit" : "option"}
        />
        <Btn
          label="표시하지 않기"
          onClick={() => setChatType("none")}
          type={chatType === "none" ? "submit" : "option"}
        />
      </div>
    </div>
  )
}

const TestChatSender = () => {
  const [text, setText] = useState("")

  const sendChat = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    message("chat/send", { text })
    setText("")
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-2">채팅 전송(beta)</h1>
      <form onSubmit={sendChat} className="flex flex-col gap-2">
        <StringField label="채팅 내용" value={text} setValue={setText} />
        <Btn label="전송" type="submit" />
      </form>
    </div>
  )
}

export default function ChatPopup() {
  const [room] = useStorage("room")
  return (
    <Full>
      <Content>
        <div className="flex flex-col gap-8">
          <ChatTypeSelector />
          {room && <TestChatSender />}
        </div>
      </Content>
    </Full>
  )
}