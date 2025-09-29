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
  const [chatSlow, setChatSlow] = useState("none")

  const handleInfoPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    message("page/newTab", {
      url: "https://ani.koder.page/guide"
    })
  }

  const handleReportPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    message("page/newTab", {
      url: "https://discord.gg/dq3UBQdkqe"
    })
  }

  const logTest = async () => {
    const res = await message("log/error", { text: `admin test ${count}` })
    setCount(count + 1)
  }

  return (
    <Full>
      <Content>
        <div className="flex flex-col gap-8 mb-8">
          <ChatAbility chatAble={chatAble} setChatAble={setChatAble} />
          <ChatSlow chatSlow={chatSlow} setChatSlow={setChatSlow} />
        </div>
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <Btn label="도움말" onClick={handleInfoPage} type="option" />
            <Btn
              label="오류제보/건의"
              onClick={handleReportPage}
              type="option"
            />
            <Btn
              label={isCanary ? "개발자 모드 끄기" : "개발자 모드"}
              onClick={() => setIsCanary(!isCanary)}
              type={isCanary ? "submit" : "option"}
            />
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

const ChatSlow = (props) => {
  const { chatSlow, setChatSlow } = props

  return (
    <div>
      <div>
        <h1 className="text-xl font-bold mb-2">슬로우 모드</h1>
      </div>
      <div className="flex gap-2 bg-gray-800 rounded-[12px] p-1 ">
        <Btn
          label="슬로우 없음"
          onClick={() => setChatSlow("none")}
          type={chatSlow === "none" ? "submit" : "option"}
        />
        <Btn
          label="슬로우 5초"
          onClick={() => setChatSlow("5")}
          type={chatSlow === "5" ? "submit" : "option"}
        />
        <Btn
          label="슬로우 15초"
          onClick={() => setChatSlow("15")}
          type={chatSlow === "15" ? "submit" : "option"}
        />
        <Btn
          label="슬로우 1분"
          onClick={() => setChatSlow("60")}
          type={chatSlow === "60" ? "submit" : "option"}
        />
      </div>
    </div>
  )
}