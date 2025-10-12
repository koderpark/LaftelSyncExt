import { Full } from "~component/layout"

import { Content } from "~component/layout"
import { useStorage } from "@plasmohq/storage/hook"
import { Btn } from "~component/button"
import { useState } from "react"
import { message } from "~popup/message"
import { StringField } from "~component/form"

const ChatTypeSelector = () => {
  const [chatType, setChatType] = useStorage("chatType", "normal")

  const sidebarOpen = async () => {
    setChatType("none")
    await chrome.sidePanel.open({
      windowId: (await chrome.windows.getCurrent()).id
    })
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-2">표시 방식</h1>
      <div className="grid grid-cols-3 gap-2">
        <div className="flex gap-2 bg-gray-800 rounded-[12px] p-1 col-span-1">
          <Btn label="사이드바 표시" onClick={sidebarOpen} type="option" />
        </div>
        <div className="flex gap-2 bg-gray-800 rounded-[12px] p-1 col-span-2">
          <Btn
            label="화면 안에 표시"
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
    </div>
  )
}

const ChatTimeSelector = () => {
  const [chatTime, setChatTime] = useStorage("chatTime", 5)
  return (
    <div>
      <h1 className="text-xl font-bold mb-2">채팅 표시 시간</h1>
      <div className="flex gap-2 bg-gray-800 rounded-[12px] p-1 ">
        <Btn
          padding="narrow"
          label="3초"
          onClick={() => setChatTime(3)}
          type={chatTime === 3 ? "submit" : "option"}
        />
        <Btn
          padding="narrow"
          label="5초"
          onClick={() => setChatTime(5)}
          type={chatTime === 5 ? "submit" : "option"}
        />
        <Btn
          padding="narrow"
          label="10초"
          onClick={() => setChatTime(10)}
          type={chatTime === 10 ? "submit" : "option"}
        />
        <Btn
          padding="narrow"
          label="20초"
          onClick={() => setChatTime(20)}
          type={chatTime === 20 ? "submit" : "option"}
        />
      </div>
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
          <ChatTimeSelector />
        </div>
      </Content>
    </Full>
  )
}
