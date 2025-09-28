const ColorMap = {
  submit: "bg-indigo-500",
  option: "bg-gray-800"
}

const PaddingMap = {
  normal: "min-w-20",
  narrow: "px-2"
}

export function Btn({
  label,
  onClick,
  submit = true,
  type = "submit",
  padding = "normal"
}: {
  label: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  submit?: boolean
  type?: "submit" | "option"
  padding?: "normal" | "narrow"
}) {
  return (
    <button
      className={`text-white w-full py-2 rounded-lg block shadow-md ${ColorMap[type]} ${PaddingMap[padding]}`}
      onClick={onClick}
      type={submit ? "submit" : "button"}>
      {label}
    </button>
  )
} 

export function HeroBtn({
  children,
  onClick,
  type = "submit"
}: {
  children: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  type?: "submit" | "option"
}) {
  return (
    <button
      className="text-white w-full rounded-lg block shadow-md bg-indigo-500 text-xl font-bold flex gap-2 justify-center items-center"
      onClick={onClick}
      type={type === "submit" ? "submit" : "button"}>
      {children}
    </button>
  )
}