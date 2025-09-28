import { useState, type ReactNode } from "react"

interface TooltipProps {
  children: ReactNode
  content: string
}

export function Tooltip({ 
  children, 
  content
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  const handleMouseEnter = () => {
    setIsVisible(true)
  }

  const handleMouseLeave = () => {
    setIsVisible(false)
  }


  return (
    <div 
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div className="absolute z-50 top-full left-1/2 transform -translate-x-1/2 mt-2 transition-all duration-200 ease-in-out">
          <div className="bg-black text-white text-xs px-1.5 py-1 rounded-md shadow-lg whitespace-nowrap">
            {content}
          </div>
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-4 border-l-transparent border-r-transparent border-t-transparent border-b-black"></div>
        </div>
      )}
    </div>
  )
}
