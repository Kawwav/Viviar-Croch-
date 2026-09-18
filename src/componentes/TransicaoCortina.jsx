import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import '../paginas/colecao.css'

const TransicaoContext = createContext(null)

export function TransicaoProvider({ children }) {
  const navigate = useNavigate()
  const cortinaRef = useRef(null)
  const cortinaTextoRef = useRef(null)
  const transicionandoRef = useRef(false)
  const [textoCortina, setTextoCortina] = useState('')

  useEffect(() => {
    gsap.set(cortinaRef.current, { rotation: -4, xPercent: -130 })
    gsap.set(cortinaTextoRef.current, { opacity: 0, rotation: -14, scale: 0.9 })
  }, [])

  const irComCortina = (destino, rotulo) => (evento) => {
    evento?.preventDefault()
    if (transicionandoRef.current) return
    transicionandoRef.current = true
    setTextoCortina(rotulo)

    gsap
      .timeline({
        delay: 0.2,
        defaults: { ease: 'sine.inOut' },
        onComplete: () => {
          transicionandoRef.current = false
          gsap.set(cortinaRef.current, { xPercent: -130 })
          gsap.set(cortinaTextoRef.current, {
            opacity: 0,
            rotation: -14,
            scale: 0.9,
          })
        },
      })
      .to(cortinaRef.current, { xPercent: 0, duration: 1.5 })
      .to(
        cortinaTextoRef.current,
        { opacity: 1, rotation: 0, scale: 1, duration: 1.15, ease: 'power2.out' },
        '<+=0.35'
      )
      .to({}, { duration: 0.45 })
      .call(() => navigate(destino))
      .to(cortinaRef.current, { xPercent: 130, duration: 1.5 })
  }

  return (
    <TransicaoContext.Provider value={{ irComCortina }}>
      {children}
      <div className="colecao-cortina" aria-hidden="true">
        <div className="colecao-cortina-retangulo" ref={cortinaRef}>
          <span className="colecao-cortina-texto" ref={cortinaTextoRef}>
            {textoCortina}
          </span>
        </div>
      </div>
    </TransicaoContext.Provider>
  )
}

export function useTransicao() {
  const contexto = useContext(TransicaoContext)
  if (!contexto) {
    throw new Error('useTransicao precisa ser usado dentro de <TransicaoProvider>')
  }
  return contexto
}