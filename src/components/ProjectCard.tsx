import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card"

interface ProjectCardProps {
  name: string
  description: string
  path: string
}

export function ProjectCard({ name, description, path }: ProjectCardProps) {
  return (
    <a href={`/${path}/index.html`} target="_blank" rel="noopener noreferrer">
    <Card className="w-full transition-all duration-300 
      hover:bg-zinc-800/50 bg-zinc-900 
      border-zinc-800 hover:border-zinc-700
      cursor-pointer group rounded-[4px]">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl text-white group-hover:text-gray-200">
          {name}
        </CardTitle>
        <CardDescription className="text-gray-400 group-hover:text-gray-300">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
    </a>
  )
}
