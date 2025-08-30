import { sendToBackground } from "@plasmohq/messaging"
import { useEffect } from "react"

export const Parser = () => {
  useEffect(() => {
    const vid = document.querySelector("video")
    vid?.addEventListener("canplay", parseVideo)
    vid?.addEventListener("ratechange", parseVideo)
    vid?.addEventListener("pause", parseVideo)
    vid?.addEventListener("play", parseVideo)
    setInterval(parseVideo, 30000)
  }, [])

  return (
    <div className="bg-green-500 absolute top-2 left-2 size-2 rounded-full"></div>
  )
}

export const NotParsing = () => {
  return (
    <div className="bg-red-500 absolute top-2 left-2 size-2 rounded-full"></div>
  )
}

const parseVideo = async () => {
  const video = document.querySelector("video")
  if (!video) return

  const titleBox = document.querySelector(
    "#root > div:nth-child(2) > div > div:nth-child(2) > div"
  )

  const title = titleBox?.querySelector("a")?.textContent
  const episode = titleBox?.querySelector(
    "div div div:first-child"
  )?.textContent

  const url = window.location.href
  const speed = video.playbackRate
  const time = video.currentTime
  const isPaused = video.paused

  console.log("parsing", { title, episode, url, speed, time, isPaused })

  const res = await sendToBackground({
    name: "video",
    body: {
      msg: "update",
      data: { title, episode, url, speed, time, isPaused }
    }
  })
}
