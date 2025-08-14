import { Full } from "~popup/component/layout"

import { Content } from "~popup/component/layout"
import { useStorage } from "@plasmohq/storage/hook"
import { Btn } from "~popup/component/button"

const ChatTypeSelector = () => {
  const [chatType, setChatType] = useStorage("chatType", "nicovideo")
  return (
    <div>
      <h1 className="text-xl font-bold mb-2">표시 방식</h1>
      <div className="flex gap-2 bg-gray-800 rounded-[12px] p-1 ">
        <Btn
          label="nicovideo식"
          onClick={() => setChatType("nicovideo")}
          type={chatType === "nicovideo" ? "submit" : "option"}
        />
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

export default function ChatPopup() {
  return (
    <Full>
      <Content>
        <div className="flex flex-col gap-8">
          <ChatTypeSelector />
        </div>
      </Content>
    </Full>
  )
}