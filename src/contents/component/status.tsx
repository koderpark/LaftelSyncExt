import { parseVideo } from "~contents/parse"

export const Parser = () => {
  const vid = document.querySelector("video")

  vid?.addEventListener("canplay", parseVideo)
  vid?.addEventListener("ratechange", parseVideo)
  vid?.addEventListener("pause", parseVideo)
  vid?.addEventListener("play", parseVideo)

  return (
    <div className="bg-green-500 absolute top-2 left-2 size-2 rounded-full"></div>
  )
}

export const NotParsing = () => {
  return (
    <div className="bg-red-500 absolute top-2 left-2 size-2 rounded-full"></div>
  )
}