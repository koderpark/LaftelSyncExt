import { sendToBackground } from "@plasmohq/messaging"

export const parseVideo = async () => {
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
