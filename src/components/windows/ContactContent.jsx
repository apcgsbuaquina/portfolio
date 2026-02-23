const contacts = [
  { label: 'Email', href: 'mailto:gsbuaquina@gmail.com', text: 'gsbuaquina@gmail.com' },
  { label: 'GitHub', href: 'https://github.com/apcgsbuaquina', text: 'github.com/apcgsbuaquina' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/gian-ace-buaqui%C3%B1a-67b9a0321/', text: 'linkedin.com/in/gian-ace-buaquiña' },
  { label: 'Instagram', href: 'https://instagram.com/totallynotgiann', text: '@totallynotgiann' },
]

export default function ContactContent() {
  return (
    <>
      <h2 className="font-pixel text-sm font-bold mb-4 text-retro-text-dark [text-shadow:1px_1px_0_rgba(0,0,0,0.2)] tracking-wide">
        Get In Touch
      </h2>
      <div className="my-5">
        {contacts.map((contact, i) => (
          <div
            key={contact.label}
            className={`font-retro text-sm font-normal py-2.5 mb-2.5 bg-transparent ${
              i < contacts.length - 1 ? 'border-b border-retro-border-dark' : ''
            }`}
          >
            <strong className="font-pixel font-bold">{contact.label}:</strong>{' '}
            <a
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-retro-text-dark underline hover:opacity-70 transition-opacity break-all"
            >
              {contact.text}
            </a>
          </div>
        ))}
      </div>
    </>
  )
}
