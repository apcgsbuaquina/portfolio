import { useState } from 'react'

const projects = [
  {
    image: '/images/projects/mindle.png',
    title: 'Mindle',
    description:
      'This is the first ever project I have contributed on, this stone paved the way for many more projects to come. Anyway, it\'s a simple mental health tracker I built on my first year.',
  },
  {
    image: '/images/projects/emailCleaner.png',
    title: 'Email Cleaner',
    description:
      'It is a tool that lets you scan your emails and gives you the option to delete duplicates or spam emails. This was a fun experience working on backend logic for the first time.',
  },
  {
    image: '/images/projects/ctrlAltElite.png',
    title: 'Ctrl Alt Elite',
    description:
      'An e-commerce platform built on outsyystems, integrated with a database for order management.',
  },
]

function ProjectImage({ src, title }) {
  const [hasError, setHasError] = useState(false)
  const showImage = Boolean(src) && !hasError

  return (
    <div className="w-full max-w-[320px] h-[180px] mb-3 bg-retro-beige border-2 border-retro-border-dark flex items-center justify-center overflow-hidden">
      {showImage ? (
        <img
          src={src}
          alt={title}
          className="w-full h-full object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <span className="text-retro-text-dark/70 font-pixel text-[8px]">IMAGE PLACEHOLDER</span>
      )}
    </div>
  )
}

export default function ProjectsContent({ isMaximized }) {
  return (
    <>
      <h2 className="font-pixel text-sm font-bold mb-4 text-retro-text-dark [text-shadow:1px_1px_0_rgba(0,0,0,0.2)] tracking-wide">
        My Projects
      </h2>
      <div className={`flex flex-wrap gap-4 ${!isMaximized ? 'justify-center' : ''}`}>
        {projects.map((project) => (
          <div
            key={project.title}
            className="w-full sm:w-[320px] max-w-full bg-retro-light p-3 border-2 border-t-retro-border-light border-l-retro-border-light border-b-retro-border-dark border-r-retro-border-dark shadow-retro-outset"
          >
            <ProjectImage src={project.image} title={project.title} />

            <h3 className="font-pixel block text-[9px] font-bold mb-2 text-retro-text-dark">
              {project.title}
            </h3>

            <p className="font-retro text-sm leading-4 font-normal opacity-80 text-retro-text-dark">
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </>
  )
}
