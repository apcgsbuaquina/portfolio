const resources = [
  {
    title: 'w3schools',
    url: 'https://www.w3schools.com/',
    note: 'Reference guide for web development standards, syntax, and tutorials.',
  },
  {
    title: 'github',
    url: 'https://github.com/',
    note: 'Hosting the source code, version history, and frontend architecture for this project.',
  },
  {
    title: 'Gemini',
    url: 'https://gemini.google.com/',
    note: 'AI assistant used for brainstorming ideas, debugging code, and generating content drafts.',
  },
  {
    title: 'GitHub Copilot',
    url: 'https://github.com/features/copilot',
    note: 'AI pair programming tool used for code suggestions, feature implementation, and debugging.',
  },
  {
    title: 'Tailwind CSS',
    url: 'https://tailwindcss.com/',
    note: 'Utility-first CSS framework used for styling the retro desktop interface.',
  },
  {
    title: 'React',
    url: 'https://react.dev/',
    note: 'JavaScript library for building the interactive UI components and window system.',
  },
  {
    title: 'Vite',
    url: 'https://vite.dev/',
    note: 'Next-generation build tool providing fast development server and optimized production builds.',
  },
  {
    title: 'Vercel',
    url: 'https://vercel.com/',
    note: 'Cloud platform for deploying the site and running serverless functions for the Spotify API.',
  },
  {
    title: 'Spotify Web API',
    url: 'https://developer.spotify.com/documentation/web-api',
    note: 'API used to fetch recently played tracks for the desktop widget.',
  },
  {
    title: 'Google Fonts',
    url: 'https://fonts.google.com/',
    note: 'Source for VT323 and Press Start 2P retro pixel fonts.',
  },
]

export default function BlogContent() {
  return (
    <>
      <h2 className="font-pixel text-sm font-bold mb-4 text-retro-text-dark [text-shadow:1px_1px_0_rgba(0,0,0,0.2)] tracking-wide">
        Resources Used
      </h2>
      <div className="flex flex-col gap-3">
        {resources.map((resource, i) => (
          <div
            key={i}
            className={`font-retro py-3 bg-transparent ${
              i < resources.length - 1 ? 'border-b border-retro-border-dark' : ''
            }`}
          >
            <strong className="font-pixel block text-[9px] font-bold mb-2">
              {resource.title}
            </strong>
            <a
              href={resource.url}
              target="_blank"
              rel="noreferrer"
              className="font-retro text-sm underline opacity-90 break-all"
            >
              {resource.url}
            </a>
            <p className="font-retro text-sm font-normal opacity-80">
              {resource.note}
            </p>
          </div>
        ))}
      </div>
    </>
  )
}
