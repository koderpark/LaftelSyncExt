import { useContext, useEffect } from "react"
import { Content, Full } from "~component/layout"
import { sendToBackground } from "@plasmohq/messaging"
import { useStorage } from "@plasmohq/storage/hook"
import { Btn } from "~component/button"
import { LuUser, LuCrown } from "react-icons/lu"
import { message } from "~popup/message"
import type { RoomMetadata, UserInfo } from "~const"
import { Chip } from "~component/chip"

export default function RoomPopup(props) {
  const [room] = useStorage<RoomMetadata | null>("room")
  const [user] = useStorage<UserInfo | null>("user")

  const share = async () => {
    await message("log/error", { text: "현재 미구현 기능입니다." })
    //todo: implement share feature
  }

  return (
    <Full>
      <Content>
        <div className="flex flex-col mb-4">
          <h1 className="text-xl font-bold mb-1">{room?.name}</h1>
          <p className="text-sm font-normal">접속 번호 : {room?.id}</p>
        </div>
        <div className="grow flex flex-col p-3 bg-gray-50 rounded-lg text-gray-950 mb-4 border border-gray-300">
          <p className="font-bold text-gray-950 text-xl mb-2">접속자</p>
          <div className="flex flex-col gap-2">
            {room?.user?.length == 0 && <p>방 접속자가 없습니다.</p>}
            {room?.user && room.user.map((peer) => Peer(peer, user))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Btn label="방 공유하기" onClick={share} type="submit" />
        </div>
      </Content>
    </Full>
  )
}

function Peer(peer: RoomMetadata["user"][number], user: UserInfo | null) {
  const isMe = peer.id === user?.id
  const isHost = user?.isHost

  const kickHandler = () => {
    message("room/kick", {
      id: peer.id
    })
  }

  const name = peer.name + (peer.isHost ? " (나)" : "")
  const icon = peer.isHost ? (
    <LuCrown className="size-full" />
  ) : (
    <LuUser className="size-full" />
  )

  return (
    <div
      key={peer.id}
      className="flex flex-row gap-2 rounded-md justify-between">
      <Chip text={name} icon={icon} />
      {!isMe && isHost && (
        <button onClick={kickHandler}>
          <Chip text="강퇴" color="red" />
        </button>
      )}
    </div>
  )
}