import { useState, useEffect } from "react"
import type { Log } from "~const"
import { useStorage } from "@plasmohq/storage/hook"

function LogElement(props: Log) {
  const { type, message } = props
  const match = {
    success: "bg-green-400",
    error: "bg-red-400"
  }

  return (
    <div className={`w-full rounded-xl shadow-lg ${match[type]} px-3 py-1`}>
      <p className="text-base font-bold">{message}</p>
    </div>
  )
}

export function LogRenderer() {
  const [logs, setLogs] = useState<Log[]>([])
  const [chatTime] = useStorage("chatTime")

  useEffect(() => {
    const messageListener = async (message: any) => {
      if (message?.action === "log" && message?.payload) {
        const newLog = message.payload as Log
        setLogs((prev) => [...prev, newLog])

        setTimeout(() => {
          setLogs((prev) => prev.filter((log) => log.time !== newLog.time))
        }, chatTime * 1000)
      }
    }

    chrome.runtime.onMessage.addListener(messageListener)
    return () => chrome.runtime.onMessage.removeListener(messageListener)
  }, [chatTime])

  return (
    <div className="fixed top-0 right-0 flex flex-col gap-2 items-center justify-center p-3">
      {logs.map((v: Log, i: number) => (
        <LogElement key={i} {...v} />
      ))}
    </div>
  )
}
