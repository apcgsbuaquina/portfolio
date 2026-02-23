// Vercel Serverless Function — /api/spotify
// Returns the user's recently played Spotify tracks.

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN

const TOKEN_URL = 'https://accounts.spotify.com/api/token'
const RECENTLY_PLAYED_URL =
  'https://api.spotify.com/v1/me/player/recently-played?limit=5'

async function getAccessToken() {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN,
    }),
  })

  if (!res.ok) {
    throw new Error(`Token refresh failed: ${res.status}`)
  }

  return res.json()
}

export default async function handler(req, res) {
  // CORS headers for local dev
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=30')

  try {
    const { access_token } = await getAccessToken()

    const spotifyRes = await fetch(RECENTLY_PLAYED_URL, {
      headers: { Authorization: `Bearer ${access_token}` },
    })

    if (!spotifyRes.ok) {
      return res.status(spotifyRes.status).json({
        error: 'Spotify API error',
        status: spotifyRes.status,
      })
    }

    const data = await spotifyRes.json()

    const tracks = data.items.map((item) => ({
      title: item.track.name,
      artist: item.track.artists.map((a) => a.name).join(', '),
      album: item.track.album.name,
      albumArt: item.track.album.images[2]?.url || item.track.album.images[0]?.url,
      url: item.track.external_urls.spotify,
      playedAt: item.played_at,
    }))

    return res.status(200).json({ tracks })
  } catch (err) {
    console.error('Spotify API error:', err)
    return res.status(500).json({ error: 'Failed to fetch recently played' })
  }
}
