export type Color =
  | "primary"
  | "red"
  | "yellow"
  | "green"
  | "sky"
  | "blue"
  | "indigo"
  | "slate"
  | "gray"

export const wrapperMap: Record<Color, string> = {
  primary: "bg-gray-500 border-gray-600",
  red: "bg-red-500 border-red-600",
  yellow: "bg-yellow-500 border-yellow-600",
  green: "bg-green-500 border-green-600",
  sky: "bg-sky-500 border-sky-600",
  blue: "bg-blue-500 border-blue-600",
  indigo: "bg-indigo-500 border-indigo-600",
  slate: "bg-slate-500 border-slate-600",
  gray: "bg-gray-500 border-gray-600"
}

export type ChipProps = {
  text: string
  icon?: React.ReactNode
  color?: Color
}

export const Chip = ({ text, icon, color = "primary" }: ChipProps) => {
  return (
    <div
      className={`${wrapperMap[color]} text-white border px-1.5 rounded-md flex items-center gap-1 w-fit text-black text-black`}>
      {icon && <span className="size-4">{icon}</span>}
      <p className="text-sm">{text}</p>
    </div>
  )
}