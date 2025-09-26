import { Content, Full } from "~component/layout"
import { Btn } from "~component/button"
import packageJson from "../../../package.json"
import { message } from "~popup/message"
import { StringField } from "~component/form"
import { useState, useEffect } from "react"
import { useStorage } from "@plasmohq/storage/hook"
import icon from "data-base64:assets/icon.png"
import { Storage } from "@plasmohq/storage"

export default function SettingPopup(props) {
  const [count, setCount] = useState(0)
  const [isCanary, setIsCanary] = useStorage("isCanary")

  const handleInfoPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    message("page/newTab", {
      url: "https://github.com/koderpark/ani-relayer"
    })
  }

  const handleReportPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    message("page/newTab", {
      url: "https://discord.gg/dq3UBQdkqe"
    })
  }

  const logTest = async () => {
    const res = await message("log/error", { text: `hello world ${count}` })
    setCount(count + 1)
  }

  const [usernameState, setUsernameState] = useState("")
  const storage = new Storage()

  const setUsername = (username: string) => {
    setUsernameState(username)
    storage.set("username", username)
  }

  useEffect(() => {
    storage.get("username").then((username) => {
      setUsernameState(username)
    })
  }, [])

  return (
    <Full>
      <Content>
        <Full>
          <div className="flex self-center h-32 w-32 mb-4">
            <img
              src={icon}
              alt="logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex self-center">
            <p className="text-gray-400 text-md">
              Ani Relayer v{packageJson.version}
            </p>
          </div>
        </Full>
        <div className="flex flex-col gap-2">
          <StringField
            value={usernameState}
            setValue={setUsername}
            label="사용자 이름"
          />
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

            <Btn label="Test" onClick={logTest} />
          </div>
        </div>
      </Content>
    </Full>
  )
}
