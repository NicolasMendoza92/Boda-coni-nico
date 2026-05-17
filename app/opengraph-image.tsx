import { ImageResponse } from 'next/og'

// Metadata de la imagen
export const alt = 'Coni & Nico · Nuestra Boda · 15 de Agosto 2026'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

// Cargar la fuente Cormorant Garamond desde Google Fonts
async function loadFont() {
  const res = await fetch(
    'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&display=swap',
    { headers: { 'User-Agent': 'Mozilla/5.0' } }
  )
  const css = await res.text()
  const url = css.match(/src: url\((.+?)\) format/)?.[1]
  if (!url) throw new Error('No se pudo extraer la URL de la fuente')
  const fontRes = await fetch(url)
  return fontRes.arrayBuffer()
}

export default async function OpengraphImage() {
  const font = await loadFont()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f8f5f2',
          fontFamily: '"Cormorant Garamond"',
          position: 'relative',
        }}
      >
        {/* Marco dorado */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            left: 40,
            right: 40,
            bottom: 40,
            border: '2px solid #c9a46c',
            display: 'flex',
          }}
        />

        {/* Anillos entrelazados (SVG) */}
        <svg
          width="160"
          height="90"
          viewBox="0 0 160 90"
          style={{ marginBottom: 30 }}
        >
          <circle cx="55" cy="45" r="32" fill="none" stroke="#c9a46c" strokeWidth="4" />
          <circle cx="105" cy="45" r="32" fill="none" stroke="#c9a46c" strokeWidth="4" />
        </svg>

        {/* Etiqueta superior */}
        <div
          style={{
            fontSize: 26,
            color: '#7a5c3e',
            letterSpacing: 8,
            textTransform: 'uppercase',
            marginBottom: 20,
          }}
        >
          Nos Casamos
        </div>

        {/* Nombres */}
        <div
          style={{
            fontSize: 140,
            color: '#7a5c3e',
            fontWeight: 400,
            lineHeight: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 30,
          }}
        >
          <span style={{ fontStyle: 'italic' }}>Coni</span>
          <span style={{ color: '#c9a46c', fontWeight: 300 }}>&</span>
          <span style={{ fontStyle: 'italic' }}>Nico</span>
        </div>

        {/* Línea divisoria */}
        <div
          style={{
            width: 120,
            height: 1,
            backgroundColor: '#c9a46c',
            margin: '36px 0 28px',
          }}
        />

        {/* Fecha y lugar */}
        <div
          style={{
            fontSize: 32,
            color: '#7a5c3e',
            letterSpacing: 2,
          }}
        >
          15 · Agosto · 2026
        </div>
        <div
          style={{
            fontSize: 24,
            color: '#7a5c3e',
            opacity: 0.7,
            marginTop: 12,
            letterSpacing: 3,
            textTransform: 'uppercase',
          }}
        >
          Yerba Buena · Tucumán
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Cormorant Garamond',
          data: font,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  )
}