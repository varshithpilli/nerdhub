import { CardHeader, CardTitle, CardDescription } from "./ui/card"
import SpotlightCard from '../components/SpotlightCard';

interface ProjectCardProps {
  name: string
  description: string
  path: string
}

export function ProjectCard({ name, description, path }: ProjectCardProps) {
  return (

<SpotlightCard
  className="custom-spotlight-card rounded-sm bg-[#0F0F0F] cursor-target"
  spotlightColor="rgba(25, 25, 25, 1)"
>
  <a href={`${path}`} target="_blank" rel="noopener noreferrer" className="cursor-none">
    <CardHeader>
      <CardTitle className="text-xl sm:text-2xl text-white group-hover:text-gray-200 asset-regular">
        {name}
      </CardTitle>
      <CardDescription className="text-gray-400 group-hover:text-gray-300 playfair-display">
        {description}
      </CardDescription>
    </CardHeader>
  </a>
</SpotlightCard>

  )
}
