// import * as room from "./room"
// import * as validate from "./validate"
// import * as auth from "./auth"
import * as socket from "./service/socket"
import * as page from "./page"

export { socket, page }

import { Storage } from "@plasmohq/storage"

const storage = new Storage()
storage.watch({
  room: (c) => {
    chrome.action.setBadgeText({
      text: c.newValue ? "🔴" : ""
    })
  }
})

chrome.action.setBadgeText({
  text: ""
})

chrome.runtime.onInstalled.addListener(() => {
  // todo: 불필요한 값들 제거, user객체 하나로 합치기.
  storage.set("chatTime", 5)
  storage.set("chatType", "normal")
  storage.set("collapsed", true)
  storage.set("isCanary", false)
  storage.set("page", "main")
  storage.set("room", null)
  storage.set("userId", null)
  storage.set("userType", null)
  storage.set("username", null)
})