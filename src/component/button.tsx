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