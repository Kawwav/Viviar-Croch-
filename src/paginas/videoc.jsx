import { useEffect, useRef, useState } from 'react'
import './videoc.css'

function ContatoVideo() {
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const [tocando, setTocando] = useState(false)
  const [progresso, setProgresso] = useState(0)
  const [mudo, setMudo] = useState(true)
  const [controlesVisiveis, setControlesVisiveis] = useState(false)
  const [pertoDoVideo, setPertoDoVideo] = useState(false)
  const esconderTimeoutRef = useRef(null)

  useEffect(() => {
    if (pertoDoVideo) return
    const elemento = containerRef.current
    if (!elemento) return

    const observador = new IntersectionObserver(
      (entradas) => {
        if (entradas[0]?.isIntersecting) {
          setPertoDoVideo(true)
          observador.disconnect()
        }
      },
      { rootMargin: '600px 0px' }
    )

    observador.observe(elemento)
    return () => observador.disconnect()
  }, [pertoDoVideo])

  const mostrarControles = () => {
    setControlesVisiveis(true)
    if (esconderTimeoutRef.current) clearTimeout(esconderTimeoutRef.current)
    esconderTimeoutRef.current = setTimeout(() => {
      setControlesVisiveis(false)
    }, 2500)
  }

  const esconderControles = () => {
    if (esconderTimeoutRef.current) clearTimeout(esconderTimeoutRef.current)
    setControlesVisiveis(false)
  }

  useEffect(() => {
    return () => {
      if (esconderTimeoutRef.current) clearTimeout(esconderTimeoutRef.current)
    }
  }, [])

  const alternarVideo = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video.play()
    } else {
      video.pause()
    }
  }

  const alternarMudo = (evento) => {
    evento.stopPropagation()
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setMudo(video.muted)
  }

  const atualizarProgresso = () => {
    const video = videoRef.current
    if (!video || !video.duration) return
    setProgresso((video.currentTime / video.duration) * 100)
  }

  const buscarNoVideo = (evento) => {
    const video = videoRef.current
    if (!video || !video.duration) return
    const barra = evento.currentTarget
    const retangulo = barra.getBoundingClientRect()
    const proporcao = (evento.clientX - retangulo.left) / retangulo.width
    video.currentTime = proporcao * video.duration
  }

  return (
    <section className="contato-video">
      <div
        ref={containerRef}
        className={`contato-video-container${
          tocando ? ' contato-video-container--tocando' : ''
        }${controlesVisiveis ? ' contato-video-container--controles' : ''}`}
        onMouseEnter={mostrarControles}
        onMouseMove={mostrarControles}
        onMouseLeave={esconderControles}
        onClick={mostrarControles}
        onTouchStart={mostrarControles}
      >
        <video
          ref={videoRef}
          className="contato-video-media"
          src={pertoDoVideo ? 'horizontal.mp4' : undefined}
          preload={pertoDoVideo ? 'metadata' : 'none'}
          loop
          muted={mudo}
          playsInline
          onClick={alternarVideo}
          onPlay={() => setTocando(true)}
          onPause={() => setTocando(false)}
          onTimeUpdate={atualizarProgresso}
        />

        <div className="contato-video-overlay">
          <p className="contato-video-legenda">feito no brasil</p>
          <h2 className="contato-video-titulo">feito à mão</h2>

          <button
            type="button"
            className="contato-video-play"
            onClick={alternarVideo}
            aria-label="Reproduzir vídeo"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>

        <div
          className="contato-video-player"
          onClick={(evento) => evento.stopPropagation()}
        >
          <button
            type="button"
            className="contato-video-player__botao"
            onClick={alternarVideo}
            aria-label={tocando ? 'Pausar vídeo' : 'Reproduzir vídeo'}
          >
            {tocando ? (
              <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                <rect x="5" y="4" width="5" height="16" rx="1" />
                <rect x="14" y="4" width="5" height="16" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <div className="contato-video-player__barra" onClick={buscarNoVideo}>
            <div
              className="contato-video-player__progresso"
              style={{ width: `${progresso}%` }}
            />
          </div>

          <button
            type="button"
            className="contato-video-player__botao"
            onClick={alternarMudo}
            aria-label={mudo ? 'Ativar som' : 'Silenciar vídeo'}
          >
            {mudo ? (
              <svg
                viewBox="0 0 24 24"
                width="13"
                height="13"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 5 6 9H2v6h4l5 4V5Z" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                width="13"
                height="13"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 5 6 9H2v6h4l5 4V5Z" />
                <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                <path d="M18.5 6a9 9 0 0 1 0 12" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  )
}

export default ContatoVideo
