import { useEffect, useRef } from 'react'
import { asset } from '../utils/asset.js'
import './sobre.css'

const blocos = [
  {
    etiqueta: 'desde quando',
    titulo: 'Começamos em [ANO]',
    texto:
      '[Conte aqui como e quando tudo começou — a primeira peça, a primeira venda, o que te fez dar o primeiro passo.]',
  },
  {
    etiqueta: 'nossa história',
    titulo: 'Feito à mão, pensado com carinho',
    texto:
      'Começamos em uma mesa pequena, cortando tecido e testando formas até encontrar o equilíbrio certo entre delicadeza e resistência. Cada peça carrega esse cuidado do início.',
  },
  {
    etiqueta: 'materiais',
    titulo: 'Tecidos escolhidos com atenção',
    texto:
      'Trabalhamos com forros reforçados e costuras duplas nos pontos de maior uso, garantindo que a bolsa acompanhe o dia a dia sem perder a forma.',
  },
  {
    etiqueta: 'processo',
    titulo: 'Produção em pequenos lotes',
    texto:
      'Preferimos produzir menos e com mais atenção. Isso significa peças únicas, revisadas item a item antes de chegarem até você.',
  },
  {
    etiqueta: 'compromisso',
    titulo: 'Atemporal por escolha',
    texto:
      'Nada aqui segue tendência de temporada. Cores, formas e acabamentos são pensados para durar — no guarda-roupa e no uso.',
  },
  {
    etiqueta: 'feiras',
    titulo: 'Presentes nas principais feiras',
    texto:
      '[Liste as feiras de que já participaram, por exemplo: Feira X (2022), Feira Y (2023), Feira Z (2024).]',
  },
]

function Sobre() {
  const wrapperRef = useRef(null)
  const trilhoRef = useRef(null)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)')

    const aoRolar = () => {
      const wrapper = wrapperRef.current
      const trilho = trilhoRef.current
      if (!wrapper || !trilho) return

      if (!mq.matches) {
        trilho.style.transform = ''
        return
      }

      const rect = wrapper.getBoundingClientRect()
      const total = wrapper.offsetHeight - window.innerHeight
      const andado = total > 0 ? Math.min(Math.max(-rect.top / total, 0), 1) : 0
      trilho.style.transform = `translateX(-${andado * (blocos.length - 1) * 100}vw)`
    }

    aoRolar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    window.addEventListener('resize', aoRolar)
    return () => {
      window.removeEventListener('scroll', aoRolar)
      window.removeEventListener('resize', aoRolar)
    }
  }, [])

  return (
    <div
      className="sobre-wrapper"
      ref={wrapperRef}
      style={{ '--blocos': blocos.length }}
    >
      <section className="sobre">
        <div className="sobre-conteudo" ref={trilhoRef}>
          {blocos.map((bloco) => (
            <div className="sobre-bloco" key={bloco.titulo}>
              <p className="sobre-etiqueta">{bloco.etiqueta}</p>
              <h2 className="sobre-titulo">{bloco.titulo}</h2>
              <p className="sobre-texto">{bloco.texto}</p>
            </div>
          ))}
        </div>

        <div className="sobre-imagem">
          <img src={asset('croche.webp')} alt="Bolsa em destaque" />
        </div>
      </section>
    </div>
  )
}

export default Sobre