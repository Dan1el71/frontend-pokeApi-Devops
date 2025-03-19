interface MovesTabProps {
  moves: PokemonMoves[]
}

const MovesTab = ({ moves }: MovesTabProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
      {moves.map(({ name }, index: number) => (
        <div key={index} className="bg-gray-50 p-2 md:p-3 rounded-lg">
          <span className="capitalize text-sm md:text-base">
            {name.replace('-', ' ')}
          </span>
        </div>
      ))}
    </div>
  )
}
export default MovesTab
