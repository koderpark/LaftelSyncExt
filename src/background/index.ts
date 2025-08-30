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

const valueBuild = {
  chatTime: 5,
  chatType: "normal",
  collapsed: true,
  isCanary: false,
  page: "main",
  room: null,
  user: null,
  username: null
}

const valueTest = {
  chatTime: 5,
  chatType: "normal",
  collapsed: true,
  isCanary: true,
  page: "main",
  room: null,
  user: null,
  username: "test_user"
}

chrome.runtime.onInstalled.addListener(() => {
  let current
  if (process.env.NODE_ENV === "development") current = valueTest
  else current = valueBuild

  for (const key in current) storage.set(key, current[key])
})