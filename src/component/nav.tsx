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
  const [user] = useStorage("user")

  const isHost = user?.isHost

  const exit = async () => {
    await message("room/exit")
  }

  useEffect(() => {
    setPage("main")
  }, [])

  return (
    <div className="w-48 h-full flex flex-col items-center justify-between bg-gray-800 text-white p-4 shadow-md gap-2">
      <div className="flex flex-col gap-2 w-full">
        <PillBtn
          type={page == "main" ? "active" : "default"}
          onClick={() => setPage("main")}>
          <LuDoorOpen className="w-5 h-5" />
          <p className="text-sm">방 설정</p>
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
        {isHost && (
          <PillBtn
            type={page == "admin" ? "active" : "default"}
            onClick={() => setPage("admin")}>
            <LuSettings className="w-5 h-5" />
            <p className="text-sm">방 설정</p>
          </PillBtn>
        )}
      </div>
      <PillBtn type="danger" onClick={() => exit()}>
        <LuLogOut className="w-5 h-5" />
        <p className="text-sm">나가기</p>
      </PillBtn>
    </div>
  )
}
