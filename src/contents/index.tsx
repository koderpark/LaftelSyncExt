import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import cssText from "data-text:../style.css"
import { sendToBackground } from "@plasmohq/messaging"
import { parseVideo } from "./parse"

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
  return (
    <div>
      <Parser />
    </div>
  )
}

const Parser = () => {
  const vid = document.querySelector("video")

  vid?.addEventListener("canplay", parseVideo)
  vid?.addEventListener("ratechange", parseVideo)
  vid?.addEventListener("pause", parseVideo)
  vid?.addEventListener("play", parseVideo)

  return (<div>Parser</div>)
}