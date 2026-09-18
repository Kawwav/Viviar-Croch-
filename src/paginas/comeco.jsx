import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useTransicao } from '../componentes/TransicaoCortina.jsx'
import './comeco.css'

const ativo = (caminho) => `${import.meta.env.BASE_URL}${caminho.replace(/^\//, '')}`

const imagens = [ativo('/fundo1.webp'), ativo('/fundo2.webp')]

function Comeco({ onExpansaoCompleta }) {
  const [atual, setAtual] = useState(0)
  const [expandiuCompleto, setExpandiuCompleto] = useState(false)
  const comecoRef = useRef(null)
  const caixaRef = useRef(null)
  const { irComCortina } = useTransicao()

  useEffect(() => {
    const temporizador = setTimeout(() => {
      setAtual((indice) => (indice + 1) % imagens.length)
    }, 5000)

    return () => clearTimeout(temporizador)
  }, [atual])

  useEffect(() => {
    const prefereReduzido = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const jaExpandiu = sessionStorage.getItem('comeco-expandido') === 'true'

    const contexto = gsap.context(() => {
      if (prefereReduzido || jaExpandiu) {
        gsap.set(caixaRef.current, {
          width: '100vw',
          height: '100vh',
          borderRadius: '0px',
        })
        sessionStorage.setItem('comeco-expandido', 'true')
        onExpansaoCompleta?.(true)
        setExpandiuCompleto(true)
        return
      }

      gsap.set(caixaRef.current, {
        width: '38vw',
        height: '55vh',
        borderRadius: '1.5rem',
      })

      gsap.to(caixaRef.current, {
        width: '100vw',
        height: '100vh',
        borderRadius: '0px',
        duration: 2.4,
        ease: 'power2.inOut',
        onComplete: () => {
          sessionStorage.setItem('comeco-expandido', 'true')
          onExpansaoCompleta?.(true)
          setExpandiuCompleto(true)
        },
      })
    }, comecoRef)

    return () => contexto.revert()
  }, [onExpansaoCompleta])

  return (
    <section className="comeco" ref={comecoRef}>
      <div className="comeco-caixa" ref={caixaRef}>
          {imagens.map((imagem, indice) => (
            <div
              key={imagem}
              className="comeco-fundo"
              style={{
                backgroundImage: `url(${imagem})`,
                opacity: indice === atual ? 1 : 0,
              }}
            />
          ))}

          <div
            className={`comeco-moldura${
              expandiuCompleto ? ' comeco-moldura--visivel' : ''
            }`}
          >
            <div className="comeco-texto">
              <span>CONHEÇA</span>
              <span>NOSSA</span>
              <span>COLEÇÃO</span>
            </div>

            <div className="comeco-botoes">
              <Link
                to="/bolsas"
                className="comeco-botao"
                onClick={irComCortina('/bolsas', 'BOLSAS')}
              >
                BOLSAS
              </Link>
              <Link
                to="/cachecol"
                className="comeco-botao"
                onClick={irComCortina('/cachecol', 'ACESSÓRIOS')}
              >
                ACESSÓRIOS
              </Link>
            </div>
          </div>

          <div className="comeco-bolinhas">
            {imagens.map((imagem, indice) => (
              <button
                key={imagem}
                type="button"
                className={`comeco-bolinha${indice === atual ? ' ativa' : ''}`}
                aria-label={`Ir para imagem ${indice + 1}`}
                onClick={() => setAtual(indice)}
              >
                {indice === atual && (
                  <svg key={atual} className="comeco-progresso" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="8" />
                  </svg>
                )}
              </button>
            ))}
          </div>
      </div>
    </section>
  )
}

export default Comeco