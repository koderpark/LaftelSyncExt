import { sendToBackground } from "@plasmohq/messaging"
import { useContext, useState } from "react"
import { Content, Full } from "~component/layout"
import { PasswordField, StorageField, StringField } from "~component/form"
import { Btn } from "~component/button"
import { Tooltip } from "~component/tooltip"
import { HomeIcon, ChatIcon, DocumentIcon } from "~component/icon"
import { message } from "~popup/message"
import packageJson from "../../../package.json"

export default function Main(props) {
  const [mode, setMode] = useState("index")
  return (
    <Full>
      <Content>
        {mode === "index" && <Index setMode={setMode} />}
        {mode === "create" && <CreateForm />}
        {mode === "join" && <JoinForm />}
      </Content>
    </Full>
  )
}

function LinkIcon({ text, link, Icon }) {
  return (
    <Tooltip content={text}>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <Icon />
      </a>
    </Tooltip>
  )
}

function Index(props) {
  const { setMode } = props

  return (
    <div className="flex flex-col gap-8 px-16 py-8">
      <div className="flex flex-col gap-1">
        <p className="text-4xl font-bold">Ani-relayer</p>
        <div className="flex items-center gap-2">
          <p className="text-base font-bold text-gray-400">
            현재 버전: v{packageJson.version}
          </p>
          <LinkIcon
            text="홈페이지"
            link="https://ani.koder.page/"
            Icon={HomeIcon}
          />
          <LinkIcon
            text="문의 및 건의"
            link="https://discord.gg/dq3UBQdkqe"
            Icon={ChatIcon}
          />
          <LinkIcon
            text="사용법"
            link="https://ani.koder.page/guide"
            Icon={DocumentIcon}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <StorageField label="사용자 이름" storageKey="username" />
        </div>
        <p className="text-lg font-bold whitespace-nowrap">님 반갑습니다!</p>
      </div>
      <div className="grid grid-cols-2 gap-2 grow">
        <Btn
          label="방 생성하기"
          onClick={() => setMode("create")}
          type="submit"
        />
        <Btn
          label="방 참가하기"
          onClick={() => setMode("join")}
          type="submit"
        />
      </div>
    </div>
  )
}

export function MainPopup(props) {
  const [mode, setMode] = useState("create")
  return (
    <Full>
      <Content>
        <Full>
          {mode === "create" && <CreateForm />}
          {mode === "join" && <JoinForm />}
        </Full>
        <div className="flex flex-col gap-8">
          <div className="flex gap-2 bg-gray-800 rounded-[12px] p-1 ">
            <Btn
              label="방 생성하기"
              onClick={() => setMode("create")}
              type={mode === "create" ? "submit" : "option"}
            />
            <Btn
              label="방에 참여하기"
              onClick={() => setMode("join")}
              type={mode === "join" ? "submit" : "option"}
            />
          </div>
        </div>
      </Content>
    </Full>
  )
}

function JoinForm() {
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")

  const submitJoin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    message("room/join", { roomId: id, password })
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-bold mb-2">방에 참가하기</h1>
      <form onSubmit={submitJoin} className="flex gap-2">
        <div className="flex flex-col gap-2 grow">
          <StringField label="방 접속 번호" value={id} setValue={setId} />
          <PasswordField
            label="방 비밀번호 (optional)"
            value={password}
            setValue={setPassword}
          />
        </div>
        <div className="flex">
          <Btn label="참가" type="submit" />
        </div>
      </form>
    </div>
  )
}

function CreateForm() {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  const submitJoin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    message("room/create", { name, password })
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-bold mb-2">방 생성하기</h1>
      <form onSubmit={submitJoin} className="flex gap-2">
        <div className="flex flex-col gap-2 grow">
          <StringField label="방 이름" value={name} setValue={setName} />
          <PasswordField
            label="방 비밀번호 (optional)"
            value={password}
            setValue={setPassword}
          />
        </div>
        <div className="flex">
          <Btn label="생성" type="submit" />
        </div>
      </form>
    </div>
  )
}