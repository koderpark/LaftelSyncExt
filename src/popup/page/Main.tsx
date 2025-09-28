import { sendToBackground } from "@plasmohq/messaging"
import { useState } from "react"
import { Content, Full } from "~component/layout"
import { PasswordField, StorageField, StringField } from "~component/form"
import { Btn, HeroBtn } from "~component/button"
import { LinkIcon } from "~component/linkicon"

import {
  HomeIcon,
  ChatIcon,
  DocumentIcon,
  CreateIcon,
  JoinIcon,
  BackIcon
} from "~component/icon"
import { message } from "~popup/message"
import packageJson from "../../../package.json"

export default function Main(props) {
  const [mode, setMode] = useState("index")
  return (
    <Full>
      <Content>
        <Header mode={mode} setMode={setMode} />
        <div className="flex flex-col gap-8 px-16 py-8 grow">
          {mode === "index" && <Index setMode={setMode} />}
          {mode === "create" && <CreateForm />}
          {mode === "join" && <JoinForm />}
        </div>
      </Content>
    </Full>
  )
}

function Header(props) {
  const { mode, setMode } = props
  const headerText = mode === "create" ? "방 생성하기" : "방에 참가하기"
  const isIndex = mode === "index"

  return (
    !isIndex && (
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => setMode("index")}>
          <BackIcon />
        </button>
        <h1 className="text-2xl font-bold">{headerText}</h1>
      </div>
    )
  )
}

function Index(props) {
  const { setMode } = props

  return (
    <div className="flex flex-col gap-8 grow">
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
        <StorageField label="사용자 이름" storageKey="username" />
        <p className="text-lg font-bold whitespace-nowrap">님 반갑습니다!</p>
      </div>
      <div className="grid grid-cols-2 gap-4 grow">
        <HeroBtn onClick={() => setMode("create")}>
          <CreateIcon />
          <p>방 생성하기</p>
        </HeroBtn>
        <HeroBtn onClick={() => setMode("join")}>
          <JoinIcon />
          <p>방 참가하기</p>
        </HeroBtn>
      </div>
    </div>
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
    <div className="flex flex-col grow">
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
    <div className="flex flex-col grow">
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