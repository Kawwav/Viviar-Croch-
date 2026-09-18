import { useEffect, useRef, useState } from 'react'
import './combinacao.css'

const DURACAO_TRANSICAO = 1000 // cobre os 0.9s de animação + 0.08s de atraso na entrada

const ativo = (caminho) => `${import.meta.env.BASE_URL}${caminho.replace(/^\//, '')}`

const looks = [
  {
    imagem: ativo('/combinacao/combinacao1.webp'),
    produto: {
      nome: 'Bolsa Girassol Marfim',
      preco: 'R$ 180,00',
      imagem: ativo('/bolsas/bolsa1.webp'),
    },
  },
  {
    imagem: ativo('/combinacao/combinacao2.webp'),
    produto: {
      nome: 'Bolsa Tiracolo Petróleo',
      preco: 'R$ 210,00',
      imagem: ativo('/bolsas/bolsa2.webp'),
    },
  },
]

function Combinacao() {
  const [indice, setIndice] = useState(0)
  const [indiceAnterior, setIndiceAnterior] = useState(null)
  const timeoutRef = useRef(null)

  const { imagem, produto } = looks[indice]
  const lookAnterior = indiceAnterior !== null ? looks[indiceAnterior] : null

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const mudarPara = (novoIndice) => {
    if (novoIndice === indice) return
    setIndiceAnterior(indice) 
    setIndice(novoIndice)
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setIndiceAnterior(null)
    }, DURACAO_TRANSICAO)
  }

  const anterior = () => {
    mudarPara((indice - 1 + looks.length) % looks.length)
  }

  const proximo = () => {
    mudarPara((indice + 1) % looks.length)
  }

  return (
    <>
      <section className="combinacao">
        <button
          type="button"
          className="combinacao-seta combinacao-seta--esquerda"
          onClick={anterior}
          aria-label="Look anterior"
        >
          &#8249;
        </button>

        <div className="combinacao-central">
          <h2 className="combinacao-titulo">Possíveis combinações</h2>

          <div className="combinacao-conteudo">
            <div className="combinacao-imagem">
              {lookAnterior && (
                <div
                  className="combinacao-imagem__camada combinacao-camada--saindo"
                  key={`saindo-${lookAnterior.imagem}`}
                >
                  <img src={lookAnterior.imagem} alt="Combinação de produtos" />
                </div>
              )}
              <div
                className="combinacao-imagem__camada combinacao-camada--entrando"
                key={`entrando-${imagem}`}
              >
                <img src={imagem} alt="Combinação de produtos" />
              </div>
            </div>

            <div className="combinacao-produto">
              <div className="combinacao-produto__imagem">
                {lookAnterior && (
                  <div
                    className="combinacao-produto__imagem__camada combinacao-camada--saindo"
                    key={`saindo-${lookAnterior.produto.nome}`}
                  >
                    <img
                      src={lookAnterior.produto.imagem}
                      alt={lookAnterior.produto.nome}
                    />
                  </div>
                )}
                <div
                  className="combinacao-produto__imagem__camada combinacao-camada--entrando"
                  key={`entrando-${produto.nome}`}
                >
                  <img src={produto.imagem} alt={produto.nome} />
                </div>
              </div>
              <h3 className="combinacao-produto__nome" key={`nome-${produto.nome}`}>
                {produto.nome}
              </h3>
              <p className="combinacao-produto__preco" key={`preco-${produto.nome}`}>
                {produto.preco}
              </p>
              <a href="#" className="combinacao-produto__botao">
                ver produto
              </a>

              <div className="combinacao-bolinhas">
                {looks.map((look, indiceLook) => (
                  <button
                    key={look.produto.nome}
                    type="button"
                    className={`combinacao-bolinha${
                      indiceLook === indice ? ' ativa' : ''
                    }`}
                    aria-label={`Ir para o look ${indiceLook + 1}`}
                    onClick={() => mudarPara(indiceLook)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="combinacao-seta combinacao-seta--direita"
          onClick={proximo}
          aria-label="Próximo look"
        >
          &#8250;
        </button>
      </section>
    </>
  )
}

export default Combinacao