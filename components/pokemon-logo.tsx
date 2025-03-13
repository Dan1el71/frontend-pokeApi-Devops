import Image from "next/image"

interface PokemonLogoProps {
  className?: string
}

export function PokemonLogo({ className = "" }: PokemonLogoProps) {
  return (
    <div className={className}>
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dise%C3%B1o%20sin%20t%C3%ADtulo%20%2848%29-O5yh9yIvSnyGDqYMyKg9kWZiraillk.png"
        alt="Pokemon Logo"
        width={200}
        height={200}
        className="object-contain"
      />
    </div>
  )
}

