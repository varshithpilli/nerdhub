import { Layout } from "./components/Layout"
import { ProjectCard } from "./components/ProjectCard"

const projects = [
  {
    name: "Calender Events",
    path: "project1",
    description: "A simple HTML + CSS calender with event managing."
  },
  {
    name: "Notes App",
    path: "project2",
    description: "A small React attempt to make a note taking app."
  },
  {
    name: "Quiz App",
    path: "project3",
    description: "A simple HTML + CSS static quiz app."
  },
]

export default function App() {
  return (
    <Layout>
      <div className="flex flex-col gap-4 w-full mx-auto
        max-w-[90%] sm:max-w-[85%] md:max-w-[75%] lg:max-w-[65%]">
        {projects.map((project) => (
          <ProjectCard
            key={project.path}
            {...project}
          />
        ))}
      </div>
    </Layout>
  )
}
