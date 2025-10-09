import { useState } from "react"
import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"
import type { Chat } from "~const"

function IndexSidePanel() {
  const [data, setData] = useState("")

  const [chat] = useStorage({
    key: "chat",
    instance: new Storage({
      area: "local"
    })
  })

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16
      }}>
      <h2>
        Welcome to your
        <a href="https://www.plasmo.com" target="_blank">
          {" "}
          Plasmo
        </a>{" "}
        Extension!
      </h2>
      <input onChange={(e) => setData(e.target.value)} value={data} />
      <a href="https://docs.plasmo.com" target="_blank">
        View Docs
      </a>
      {chat && chat.map((v: Chat, i: number) => <div key={i}>{v.message}</div>)}
    </div>
  )
}

export default IndexSidePanel