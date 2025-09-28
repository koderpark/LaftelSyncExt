import { Tooltip } from "./tooltip";

export function LinkIcon({ text, link, Icon }) {
  return (
    <Tooltip content={text}>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <Icon />
      </a>
    </Tooltip>
  )
}