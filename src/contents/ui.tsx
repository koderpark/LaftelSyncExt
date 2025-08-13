import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import cssText from "data-text:../style.css"
import { useState } from "react"
import { useStorage } from "@plasmohq/storage/hook"
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

export const config: PlasmoCSConfig = {
  matches: ["*://laftel.net/*"]
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => ({
  element: document.querySelector(`#root-video-fullscreen #video-controls-below > div:nth-child(2) > div:nth-child(2)`),
  insertPosition: "afterbegin"
});

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText.replaceAll(":root", ":host(plasmo-csui)")
  return style
}


const CollapsedBtn = () => {
  const [collapsed, setCollapsed] = useStorage("collapsed", false)
  return (
    <div className="size-8 flex items-center justify-center">
      <button className="size-full bg-transparent border-none cursor-pointer" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? <IoChevronBack size={32}/> : <IoChevronForward size={32}/>}
      </button>
    </div>
  )
}

const Controller = () => {
  const [collapsed] = useStorage("collapsed", false)

  return (
    <div className="p-2 m-4 rounded-[1rem] flex gap-2 bg-gray-100 text-black">
      {!collapsed && (
        <div>
          <input type="text" className="bg-transparent border-none outline-none text-white" />
          <p>Hello World!!!! i am not collapsed</p>
        </div>
      )}
      <CollapsedBtn/>
    </div>
  )
}

const testText = () => {
  return (
    <div className="flex w-full justify-center">
      <div className="bg-white rounded-lg text-black">
        <p>Lorem ipsum dolor sit amet</p>
      </div>
    </div>
  )
}
export default testText