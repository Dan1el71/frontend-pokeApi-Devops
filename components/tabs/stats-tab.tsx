import { getTypeBackground } from '@/lib/const'
import { Gauge, Heart, Shield, Swords, Target, Zap } from 'lucide-react'

interface StatsTabProps {
  stats: PokemonStat[]
  bgColor: string
}
const StatsTab = ({ stats, bgColor }: StatsTabProps) => {
  const getStatIcon = (statName: string) => {
    switch (statName) {
      case 'PS':
        return <Heart className="w-4 h-4" />
      case 'Ataque':
        return <Swords className="w-4 h-4" />
      case 'Defensa':
        return <Shield className="w-4 h-4" />
      case 'Atq. Esp':
        return <Zap className="w-4 h-4" />
      case 'Def. Esp':
        return <Target className="w-4 h-4" />
      case 'Velocidad':
        return <Gauge className="w-4 h-4" />
      default:
        return null
    }
  }
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {stats.map((stat: any) => (
          <div key={stat.name} className="bg-gray-50 p-3 md:p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                {getStatIcon(stat.name)}
              </div>
              <h3 className="text-sm md:text-base font-medium">{stat.name}</h3>
            </div>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-3 md:h-4 mr-2">
                <div
                  className="h-3 md:h-4 rounded-full"
                  style={{
                    width: `${Math.min(100, (stat.value / 255) * 100)}%`,
                    backgroundColor: bgColor,
                  }}
                ></div>
              </div>
              <span className="font-medium text-sm md:text-base">
                {stat.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
        <h3 className="font-medium text-gray-900 mb-2 md:mb-3">
          Total de Estadísticas
        </h3>
        <div className="text-xl md:text-2xl font-bold">
          {stats.reduce(
            (total: number, stat: any) => total + stat.value,
            0
          )}
        </div>
      </div>
    </div>
  )
}
export default StatsTab
