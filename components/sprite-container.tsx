interface SpriteContainerProps {
  children: React.ReactNode
  label: string
}

const SpriteContainer = ({ children, label }: SpriteContainerProps) => (
  <div className="flex flex-col items-center">
    <div className="relative w-20 h-20 md:w-24 md:h-24 bg-white rounded-lg shadow-2xs">
      {children}
    </div>
    <span className="text-xs md:text-sm text-gray-500 mt-1">{label}</span>
  </div>
)

export default SpriteContainer
