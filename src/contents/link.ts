import type { PlasmoCSConfig } from "plasmo";
import { sendToBackground } from "@plasmohq/messaging"

export const config: PlasmoCSConfig = {
  matches: ["https://ani.koder.page/invite/*"]
}

// Extract UUID from URLs like: https://canary.koder.page/room/{uuid}
const extractRoomUuidFromLocation = (loc: Location): string | null => {
  // Capture the first path segment after /room/
  const match = loc.pathname.match(/\/invite\/([^\/?#]+)/)
  return match ? match[1] : null
}

const handleLocationForRoomUuid = () => {
  const uuid = extractRoomUuidFromLocation(window.location)
  if (!uuid) return
  alert(uuid)
  sendToBackground({
    name: "room",
    body: { msg: "join_link", uuid }
  })
}

// Run immediately for the initial page
handleLocationForRoomUuid()