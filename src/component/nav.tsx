import { useStorage } from "@plasmohq/storage/hook"
import { PillBtn } from "~component/pill"
import {
  LuDoorOpen,
  LuLogOut,
  LuMessageSquare,
  LuSettings
} from "react-icons/lu"
import { message } from "~popup/message"
import { useEffect } from "react"

export default function Navbar() {
  const [page, setPage] = useStorage("page")
  const [room] = useStorage("room")
  const isLogin = page != "login"

  const exit = async () => {
    await message("room/exit")
  }

  useEffect(() => {
    setPage("main")
  }, [])

  return (
    <div>
      {isLogin && (
        <div className="w-40 h-full flex flex-col items-center justify-start bg-gray-800 text-white p-4 shadow-md gap-2">
          <PillBtn
            type={page == "main" ? "active" : "default"}
            onClick={() => setPage("main")}>
            <LuDoorOpen className="w-5 h-5" />
            <p className="text-sm">{room ? "방 설정" : "방 접속"}</p>
          </PillBtn>
          <PillBtn
            type={page == "chat" ? "active" : "default"}
            onClick={() => setPage("chat")}>
            <LuMessageSquare className="w-5 h-5" />
            <p className="text-sm">채팅</p>
          </PillBtn>
          <PillBtn
            type={page == "setting" ? "active" : "default"}
            onClick={() => setPage("setting")}>
            <LuSettings className="w-5 h-5" />
            <p className="text-sm">설정</p>
          </PillBtn>
          <PillBtn type={"danger"} onClick={() => exit()}>
            <LuLogOut className="w-5 h-5" />
            <p className="text-sm">나가기</p>
          </PillBtn>
        </div>
      )}
    </div>
  )
}
