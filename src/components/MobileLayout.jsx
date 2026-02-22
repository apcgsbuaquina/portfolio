import { useState, useEffect } from 'react'
import WelcomeContent from './windows/WelcomeContent'
import AboutContent from './windows/AboutContent'
import ProjectsContent from './windows/ProjectsContent'
import SkillsContent from './windows/SkillsContent'
import ContactContent from './windows/ContactContent'
import BlogContent from './windows/BlogContent'
import GalleryContent from './windows/GalleryContent'

const sections = [
  { id: 'welcome', icon: '★', title: 'Gian Ace Buaquiña' },
  { id: 'about', icon: '★', title: 'About Me' },
  { id: 'projects', icon: '★', title: 'Projects' },
  { id: 'skills', icon: '★', title: 'Skills' },
  { id: 'gallery', icon: '★', title: 'Gallery' },
  { id: 'contact', icon: '★', title: 'Contact' },
  { id: 'blog', icon: '★', title: 'Blog' },
]

function MobileMenuBar() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
      setTime(timeString)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="sticky top-0 left-0 w-full h-[44px] bg-retro-beige border-b-[3px] border-retro-border-dark flex justify-between items-center px-4 z-[1000] shadow-[0_2px_4px_rgba(0,0,0,0.3)] font-pixel">
      <span className="font-bold text-[9px] text-retro-text-dark [text-shadow:1px_1px_0_rgba(255,255,255,0.3)]">
        Gian Ace Buaquiña
      </span>
      <span className="text-[7px] text-retro-text-dark font-bold [text-shadow:1px_1px_0_rgba(255,255,255,0.3)]">
        {time}
      </span>
    </div>
  )
}

function MobileCard({ icon, title, children }) {
  return (
    <div
      className="bg-retro-light border-[3px] border-retro-border-dark border-t-retro-border-light border-l-retro-border-light shadow-retro-focus animate-window-open"
    >
      {/* Title Bar */}
      <div className="titlebar-highlight h-[30px] bg-gradient-to-b from-[#9d8a6f] to-retro-dark border-b-2 border-retro-border-dark flex items-center px-2.5 select-none relative shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
        <div className="flex items-center gap-2 text-retro-text-light [text-shadow:1px_1px_0_rgba(0,0,0,0.5)]">
          <span className="text-xs [filter:drop-shadow(1px_1px_0_rgba(0,0,0,0.5))]">
            {icon}
          </span>
          <span className="font-pixel text-[8px] font-bold">{title}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 bg-retro-light">
        {children}
      </div>
    </div>
  )
}

export default function MobileLayout() {
  const handleExplore = () => {
    const aboutSection = document.getElementById('mobile-section-about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const contentMap = {
    welcome: <WelcomeContent onExplore={handleExplore} />,
    about: <AboutContent />,
    projects: <ProjectsContent isMaximized={false} />,
    skills: <SkillsContent />,
    contact: <ContactContent />,
    blog: <BlogContent />,
    gallery: <GalleryContent isMaximized={false} />,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-retro-dark to-retro-border-dark">
      <MobileMenuBar />

      <div className="mobile-scroll-container flex flex-col gap-4 p-4 pb-8">
        {sections.map((section) => (
          <div key={section.id} id={`mobile-section-${section.id}`}>
            <MobileCard icon={section.icon} title={section.title}>
              {contentMap[section.id]}
            </MobileCard>
          </div>
        ))}

        {/* Footer */}
        <div className="text-center py-4">
          <p className="font-pixel text-[7px] text-retro-text-light opacity-60">
            © 2026 Gian Ace Buaquiña · retroOS
          </p>
        </div>
      </div>
    </div>
  )
}
