import { useState, useEffect } from 'react'

const API_URL = 'https://guestbook-backend-lake.vercel.app/guestbook'

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function GuestbookContent() {
  const [entries, setEntries] = useState([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setEntries(data)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load entries.')
        setLoading(false)
      })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      })
      if (!res.ok) throw new Error('Failed to submit')
      const newEntry = await res.json()
      setEntries((prev) => [newEntry, ...prev])
      setName('')
      setMessage('')
    } catch {
      setError('Failed to submit entry. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <h2 className="font-pixel text-sm font-bold mb-4 text-retro-text-dark [text-shadow:1px_1px_0_rgba(0,0,0,0.2)] tracking-wide">
        Guestbook
      </h2>
      <p className="font-retro text-base font-normal leading-none mb-3 text-retro-text-dark">
        Leave a message! Sign the guestbook and say hello.
      </p>

      {/* Sign Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="bg-retro-light p-3 border-2 border-t-retro-border-light border-l-retro-border-light border-b-retro-border-dark border-r-retro-border-dark shadow-retro-outset">
          <label className="font-pixel block text-[9px] font-bold mb-2 text-retro-text-dark">
            Name:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={50}
            placeholder="Your name"
            className="w-full mb-3 px-2 py-1.5 font-retro text-sm text-retro-text-dark bg-retro-beige border-2 border-t-retro-border-dark border-l-retro-border-dark border-b-retro-border-light border-r-retro-border-light shadow-retro-inset outline-none focus:outline-2 focus:outline-retro-border-dark focus:outline-offset-1 placeholder:text-retro-dark/50"
          />

          <label className="font-pixel block text-[9px] font-bold mb-2 text-retro-text-dark">
            Message:
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            maxLength={500}
            rows={3}
            placeholder="Write something..."
            className="w-full mb-3 px-2 py-1.5 font-retro text-sm text-retro-text-dark bg-retro-beige border-2 border-t-retro-border-dark border-l-retro-border-dark border-b-retro-border-light border-r-retro-border-light shadow-retro-inset outline-none resize-none focus:outline-2 focus:outline-retro-border-dark focus:outline-offset-1 placeholder:text-retro-dark/50 window-scrollbar"
          />

          <button
            type="submit"
            disabled={submitting}
            className="retro-btn font-pixel text-[8px] py-2.5 px-5 bg-retro-beige text-retro-text-dark cursor-pointer uppercase relative overflow-hidden
              border-[3px] border-t-retro-border-dark border-l-retro-border-dark border-b-retro-border-light border-r-retro-border-light
              shadow-retro-outset [text-shadow:1px_1px_0_rgba(255,255,255,0.3)]
              transition-all duration-100
              hover:bg-retro-light hover:shadow-retro-hover hover:-translate-y-px
              active:shadow-retro-inset active:translate-x-px active:translate-y-px
              focus:outline-2 focus:outline-retro-border-dark focus:outline-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-retro-outset"
          >
            {submitting ? 'Signing...' : '✎ Sign Guestbook'}
          </button>
        </div>
      </form>

      {/* Error */}
      {error && (
        <div className="mb-3 p-2 bg-red-100 border-2 border-t-retro-border-light border-l-retro-border-light border-b-retro-border-dark border-r-retro-border-dark">
          <p className="font-retro text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Entries */}
      <div className="font-retro">
        <strong className="font-pixel block text-[9px] font-bold mb-2.5 text-retro-text-dark">
          Recent Entries:
        </strong>

        {loading ? (
          <p className="font-retro text-sm text-retro-text-dark animate-pulse">
            Loading entries...
          </p>
        ) : entries.length === 0 ? (
          <p className="font-retro text-sm text-retro-text-dark opacity-60">
            No entries yet. Be the first to sign!
          </p>
        ) : (
          <div className="max-h-48 overflow-y-auto window-scrollbar space-y-2">
            {entries.map((entry, i) => (
              <div
                key={entry.id || i}
                className={`p-2.5 border-2 border-t-retro-border-light border-l-retro-border-light border-b-retro-border-dark border-r-retro-border-dark ${
                  i % 2 === 0 ? 'bg-retro-light' : 'bg-retro-beige/50'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-pixel text-[8px] font-bold text-retro-text-dark [text-shadow:1px_1px_0_rgba(0,0,0,0.1)]">
                    {entry.name}
                  </span>
                  <span className="font-retro text-xs text-retro-dark opacity-70 shrink-0 ml-2">
                    {entry.created_at ? formatDate(entry.created_at) : ''}
                  </span>
                </div>
                <p className="font-retro text-sm text-retro-text-dark leading-snug break-words">
                  {entry.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
