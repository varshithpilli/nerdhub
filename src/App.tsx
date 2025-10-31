import { Layout } from "./components/Layout"
import { ProjectCard } from "./components/ProjectCard"
import { useState } from "react";
import { projects } from './projects'
import Squares from './components/Squares';
import ScrollVelocity from './components/ScrollVelocity';
import TargetCursor from './components/TargetCursor';

export default function App() {
  const [showVideo, setShowVideo] = useState(false);
  return (
    <>
    <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
      />
      <div className="min-h-screen w-full bg-[#000000] relative">
        <div className="fixed inset-0 opacity-30 pointer-events-none"
        />

        <Layout>
      <div className="flex flex-col gap-4 w-full mx-auto max-w-[90%] sm:max-w-[85%] md:max-w-[75%] lg:max-w-[65%] z-999">
        
        <div
          className="h-[20vh]"
          onClick={() => setShowVideo(true)}
        >
          {showVideo ? (
            <video
              src="Rick_Astley.mp4"
              autoPlay
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          ) : (
            <Squares
              speed={0.5}
              squareSize={40}
              direction="diagonal"
              borderColor="#fff"
              hoverFillColor="#222"
            />
          )}
        </div>

        {projects.map((project) => (
          <ProjectCard key={project.path} {...project} />
        ))}

      </div>
    </Layout>

  <ScrollVelocity
  texts={['Nerdhub', 'Varzone']} 
  className="custom-scroll-text mb-3"
/>

      </div >
    </>
  )
}