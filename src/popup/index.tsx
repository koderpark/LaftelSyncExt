import "../style.css"

import { useContext, useEffect, useState } from "react"
import { sendToBackground } from "@plasmohq/messaging"
import { useStorage } from "@plasmohq/storage/hook"
import { Full } from "~component/layout"

import Main from "~popup/page/Main"
import RoomPopup from "~popup/page/Room"

import Header from "~component/header"
import Navbar from "~component/nav"
import ChatPopup from "./page/Chat"
import { LogRenderer } from "./log"

import AdminPopup from "./page/Admin"

export default function Index() {
  const [page] = useStorage("page", "main")
  const [room] = useStorage("room", null)

  return (
    <div className="w-[540px] h-[360px] p-0">
      <Full>
        <LogRenderer />
        {room === null && <Main />}
        {room !== null && (
          <div className="grow flex">
            <Navbar />
            {page == "main" && <RoomPopup />}
            {page == "chat" && <ChatPopup />}
            {page == "admin" && <AdminPopup />}
          </div>
        )}
      </Full>
    </div>
  )
}