import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import cssText from "data-text:../style.css"
import { parseVideo } from "./parse"
import { useStorage } from "@plasmohq/storage/hook"
import { Parser, NotParsing } from "./component/status"
import type { Chat } from "~background/const"
import { ChatElement, ChatSender, Chatting } from "~contents/component/chatting"

export const config: PlasmoCSConfig = {
  matches: ["https://laftel.net/*"]
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => ({
  element: document.querySelector(`#root-video-fullscreen`),
  insertPosition: "afterbegin"
})

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText.replaceAll(":root", ":host(plasmo-csui)")
  return style
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.msg == "parse") parseVideo()
})

export default function Injected() {
  const [room] = useStorage("room")
  const [chatType] = useStorage("chatType")
  const [chat] = useStorage<Chat[]>("chat")

  return (
    <div>
      {room ? <Parser /> : <NotParsing />}
      {room && <Chatting />}
    </div>
  )
}