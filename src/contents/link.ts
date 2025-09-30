import type { PlasmoCSConfig } from "plasmo";

export const config: PlasmoCSConfig = {
  matches: ["https://canary.koder.page/*"]
}


// Extract UUID from URLs like: https://canary.koder.page/room/{uuid}
const extractRoomUuidFromLocation = (loc: Location): string | null => {
  // Capture the first path segment after /room/
  const match = loc.pathname.match(/\/room\/([^\/?#]+)/)
  return match ? match[1] : null
}

const handleLocationForRoomUuid = () => {
  const uuid = extractRoomUuidFromLocation(window.location)
  if (!uuid) return
  alert(uuid)
}

// Run immediately for the initial page
handleLocationForRoomUuid()


