import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import cssText from "data-text:../style.css"
import { HiOutlineChatAlt } from "react-icons/hi";

export const config: PlasmoCSConfig = {
  matches: ["*://laftel.net/player/*"]
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => ({
  element: document.querySelector(
    `#root-video-fullscreen #video-controls-below > div:nth-child(2) > div:nth-child(2)`
  ),
  insertPosition: "afterbegin"
})

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText.replaceAll(":root", ":host(plasmo-csui)")
  return style
}

const Chatting = () => { // todo: f키 fullscreen event suppress
  return (
    <div className="flex w-full justify-center">
      <div className="rounded-[12px] h-10 p-1 flex gap-2 border border-gray-800">
        <input className="h-8 text-white bg-transparent border-none outline-none" placeholder="채팅 내용을 입력" />
        <HiOutlineChatAlt size={32} />
      </div>
    </div>
  )
}

export default Chatting