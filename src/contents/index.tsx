import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import cssText from "data-text:../style.css"
import { useStorage } from "@plasmohq/storage/hook"
import { Parser, NotParsing } from "./inserts/status"
import { Chatting } from "~contents/inserts/chatting"

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

export default function Injected() {
  const [room] = useStorage("room")

  return (
    <div>
      {room ? <Parser /> : <NotParsing />}
      {room && <Chatting />}
    </div>
  )
}