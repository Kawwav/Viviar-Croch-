import { useEffect, useRef } from 'react'
import './sobre.css'

const ativo = (caminho) => `${import.meta.env.BASE_URL}${caminho.replace(/^\//, '')}`

const blocos = [
  {
    etiqueta: 'desde quando',
    titulo: 'Começamos em 2019',
    texto:
      'Tudo começou numa mesa de cozinha, com retalhos guardados havia meses e a vontade de fazer alguma coisa com as próprias mãos. A primeira bolsa nasceu sem pressa nenhuma e foi vendida ainda no primeiro fim de semana, pra uma vizinha que parou só pra perguntar onde a gente tinha comprado aquilo.',
  },
  {
    etiqueta: 'nossa história',
    titulo: 'Feito à mão, pensado com carinho',
    texto:
      'Começamos numa mesa pequena, cortando tecido e testando formas até achar o equilíbrio certo entre delicadeza e resistência. Cada peça que sai daqui carrega um pouco desse cuidado do começo.',
  },
  {
    etiqueta: 'materiais',
    titulo: 'Tecidos escolhidos com atenção',
    texto:
      'Usamos forros reforçados e costuras duplas justamente nos pontos que mais sofrem no dia a dia, pra bolsa aguentar o tranco sem perder a forma.',
  },
  {
    etiqueta: 'processo',
    titulo: 'Produção em pequenos lotes',
    texto:
      'Preferimos produzir menos e com mais atenção. Cada peça é única e passa por uma revisão cuidadosa antes de chegar até você.',
  },
  {
    etiqueta: 'compromisso',
    titulo: 'Atemporal por escolha',
    texto:
      'Nada aqui segue tendência de temporada. Pensamos em cores, formas e acabamentos que duram tanto no guarda-roupa quanto no uso do dia a dia.',
  },
  {
    etiqueta: 'feiras',
    titulo: 'Presentes nas principais feiras',
    texto:
      'Já estivemos na Feira de Artesanato de Curitiba (2021), no Bazar de Design (2022) e na ArteSã (2023), e voltamos de cada uma delas com o caderninho de encomendas cheio e muita vontade de fazer mais.',
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
          <img
            src={ativo('/croche.webp')}
            alt="Bolsa em destaque"
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>
    </div>
  )
}

export default Sobre
