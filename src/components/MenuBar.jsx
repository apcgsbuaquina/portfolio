import { useState, useEffect, useRef } from 'react'

const openItems = [
  { id: 'about', label: 'About Me' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'blog', label: 'Blog' },
  { id: 'guestbook', label: 'Guestbook' },
]

export default function MenuBar({ openWindow }) {
  const [time, setTime] = useState('')
  const [activeMenu, setActiveMenu] = useState(null)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveMenu(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleOpen = (id) => {
    setActiveMenu(null)
    openWindow(id)
  }

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
      const dateString = now.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
      setTime(`${dateString} | ${timeString}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-[30px] bg-retro-beige border-b-[3px] border-retro-border-dark flex justify-between items-center px-4 z-[1000] shadow-[0_2px_4px_rgba(0,0,0,0.3)] font-pixel text-[8px]">
      {/* Left Section */}
      <div className="flex items-center gap-4" ref={menuRef}>
        <span className="font-bold text-[9px] text-retro-text-dark [text-shadow:1px_1px_0_rgba(255,255,255,0.3)] mr-2.5">
          Gian Ace Buaquiña
        </span>

        {/* File Menu */}
        <div className="relative">
          <span
            onClick={() => setActiveMenu(activeMenu === 'file' ? null : 'file')}
            className={`text-retro-text-dark cursor-pointer px-2 py-1 border transition-all duration-100 select-none ${
              activeMenu === 'file'
                ? 'bg-retro-dark text-retro-text-light border-retro-border-dark shadow-retro-inset'
                : 'border-transparent hover:bg-retro-light hover:border-retro-border-dark hover:shadow-retro-inset'
            }`}
          >
            File
          </span>
          {activeMenu === 'file' && (
            <div className="absolute top-full left-0 mt-[2px] bg-retro-beige border-2 border-t-retro-border-light border-l-retro-border-light border-b-retro-border-dark border-r-retro-border-dark shadow-retro-outset z-[2000] min-w-[160px]">
              <div className="px-3 py-1.5 text-[7px] text-retro-text-dark opacity-60 border-b border-retro-border-dark font-bold tracking-widest">
                OPEN
              </div>
              {openItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleOpen(item.id)}
                  className="px-4 py-1.5 text-[8px] text-retro-text-dark cursor-pointer hover:bg-retro-dark hover:text-retro-text-light select-none"
                >
                  {item.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Help Menu */}
        <div className="relative">
          <span
            onClick={() => setActiveMenu(activeMenu === 'help' ? null : 'help')}
            className={`text-retro-text-dark cursor-pointer px-2 py-1 border transition-all duration-100 select-none ${
              activeMenu === 'help'
                ? 'bg-retro-dark text-retro-text-light border-retro-border-dark shadow-retro-inset'
                : 'border-transparent hover:bg-retro-light hover:border-retro-border-dark hover:shadow-retro-inset'
            }`}
          >
            Help
          </span>
          {activeMenu === 'help' && (
            <div className="absolute top-full left-0 mt-[2px] bg-retro-beige border-2 border-t-retro-border-light border-l-retro-border-light border-b-retro-border-dark border-r-retro-border-dark shadow-retro-outset z-[2000] min-w-[160px]">
              <div
                onClick={() => handleOpen('contact')}
                className="px-4 py-1.5 text-[8px] text-retro-text-dark cursor-pointer hover:bg-retro-dark hover:text-retro-text-light select-none"
              >
                Contact Me
              </div>
            </div>
          )}
        </div>

        <span className="text-[#4a7c3f] text-[10px] ml-1">▲</span>
      </div>

      {/* Right Section */}
      <div className="flex items-center text-retro-text-dark text-[7px]">
        <span className="[text-shadow:1px_1px_0_rgba(255,255,255,0.3)]">
          Welcome to my profile |{' '}
          <span className="font-bold">{time}</span>
        </span>
      </div>
    </div>
  )
}
