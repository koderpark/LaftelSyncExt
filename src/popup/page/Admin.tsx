import { Content, Full } from "~component/layout"
import { Btn } from "~component/button"
import packageJson from "../../../package.json"
import { message } from "~popup/message"
import icon from "data-base64:assets/icon.png"
import { useStorage } from "@plasmohq/storage/hook"
import { useState } from "react"

export default function AdminPopup(props) {
  const [count, setCount] = useState(0)
  const [isCanary, setIsCanary] = useStorage("isCanary")

  const [chatAble, setChatAble] = useState(false)

  const share = async () => {
    const ret = await message("room/link", null)
    try {
      await window.navigator.clipboard.writeText(ret)
      message("log/success", { text: `클립보드 복사 성공` })
    } catch (error) {
      message("log/error", { text: `클립보드 복사 실패: ${error}` })
      message("log/error", { text: `직접 링크를 복사해주세요` })
      message("log/error", { text: ret })
    }
  }

  const logTest = async () => {
    const res = await message("log/error", { text: `admin test ${count}` })
    setCount(count + 1)
  }

  return (
    <Full>
      <Content>
        {/* <div className="flex flex-col gap-8 mb-8">
          <ChatAbility chatAble={chatAble} setChatAble={setChatAble} />
        </div> */}
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <Btn label="방 공유하기" onClick={share} type="submit" />
            <Btn label="Admin Test" onClick={logTest} />
          </div>
        </div>
      </Content>
    </Full>
  )
}

const ChatAbility = (props) => {
  const { chatAble, setChatAble } = props

  return (
    <div>
      <h1 className="text-xl font-bold mb-2">채팅 허가 설정</h1>
      <div className="flex gap-2 bg-gray-800 rounded-[12px] p-1 ">
        <Btn
          label="채팅 허용하기"
          onClick={() => setChatAble(true)}
          type={chatAble ? "submit" : "option"}
        />
        <Btn
          label="채팅 금지하기"
          onClick={() => setChatAble(false)}
          type={chatAble ? "option" : "submit"}
        />
      </div>
    </div>
  )
} 