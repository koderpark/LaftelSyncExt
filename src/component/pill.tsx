export function Pill(props) {
  return (
    <div className="flex items-center justify-center rounded-full bg-indigo-500 py-2 px-4 font-bold">
      {props.children}
    </div>
  )
}

export function PillBtn(props) {
  const { children, onClick, type } = props

  const typeClassMap = {
    danger: "bg-red-600 hover:bg-red-500",
    active: "bg-indigo-500",
    default: "bg-gray-900 hover:bg-gray-800"
  }

  const typeClass = typeClassMap[type] ?? typeClassMap.default

  return (
    <div
      className={`flex w-full items-center justify-start rounded-full ${typeClass} py-2 pe-4 ps-3 font-bold cursor-pointer shadow-md flex-row gap-1 text-white transition-colors`}
      onClick={onClick}>
      {children}
    </div>
  )
}
