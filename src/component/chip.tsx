export type Color =
  | "primary"
  | "red"
  | "yellow"
  | "green"
  | "sky"
  | "blue"
  | "violet"
  | "slate"
  | "gray"

export const wrapperMap: Record<Color, string> = {
  primary: "bg-gray-50 border-gray-300",
  red: "bg-red-200 border-red-300",
  yellow: "bg-yellow-200 border-yellow-300",
  green: "bg-green-200 border-green-300",
  sky: "bg-sky-200 border-sky-300",
  blue: "bg-blue-200 border-blue-300",
  violet: "bg-violet-200 border-violet-300",
  slate: "bg-slate-200 border-slate-300",
  gray: "bg-gray-200 border-gray-300"
}

export type ChipProps = {
  text: string
  icon?: React.ReactNode
  color?: Color
}

export const Chip = ({ text, icon, color = "primary" }: ChipProps) => {
  return (
    <div
      className={`${wrapperMap[color]} border px-1.5 rounded-md flex items-center gap-1 w-fit text-black text-black`}>
      {icon && <span className="size-4">{icon}</span>}
      <p className="text-sm">{text}</p>
    </div>
  )
}