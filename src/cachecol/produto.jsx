import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../componentes/header.jsx'
import { produtos } from './produtos.js'
import './produto.css'

const LABEL_DISPONIBILIDADE = {
  estoque: 'em estoque',
  encomenda: 'sob encomenda',
}

const caracteristicasPadrao = [
  { icone: 'cachecol', texto: 'Cachecol de crochê' },
  { icone: 'fio', texto: 'Fio 100% lã' },
  { icone: 'mao', texto: 'Feito à mão' },
  { icone: 'calendario', texto: 'Sob encomenda' },
]

const icones = {
  cachecol: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M4 5c4 2 4 6 1 8-2 1.5-2 4 0 6" />
      <path d="M20 5c-4 2-4 6-1 8 2 1.5 2 4 0 6" />
      <path d="M6 4.5c2 1 4 1 6 0M18 4.5c-2 1-4 1-6 0" />
    </svg>
  ),
  fio: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="12" cy="12" r="8" />
      <path d="M6 8c3 2 3 6 0 8M18 8c-3 2-3 6 0 8M9 5c1.5 3.5 1.5 10.5 0 14M15 5c-1.5 3.5-1.5 10.5 0 14" />
    </svg>
  ),
  mao: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M8 13V6a1.5 1.5 0 0 1 3 0v5" />
      <path d="M11 11V4.5a1.5 1.5 0 0 1 3 0V11" />
      <path d="M14 11.5V5.5a1.5 1.5 0 0 1 3 0V13" />
      <path d="M17 9.5a1.5 1.5 0 0 1 3 0V14c0 4-2.5 7-6.5 7h-1C9 21 7 19 6 17l-2.2-4a1.4 1.4 0 0 1 2.3-1.5L8 14" />
    </svg>
  ),
  calendario: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="3.5" y="5" width="17" height="16" rx="1.5" />
      <path d="M8 3v4M16 3v4M3.5 10h17" />
    </svg>
  ),
}

function ProdutoCachecol() {
  const { slug } = useParams()
  const produto = produtos.find((item) => item.slug === slug)
  const [imagemAtiva, setImagemAtiva] = useState(0)
  const [maisInfoAberto, setMaisInfoAberto] = useState(false)

  if (!produto) {
    return (
      <>
        <Header visivel={true} corFundo="#fff" />
        <section className="cachecolproduto-nao-encontrado">
          <p>Esse cachecol não foi encontrado.</p>
          <Link to="/cachecol" className="cachecolproduto-voltar">
            voltar para acessórios
          </Link>
        </section>
      </>
    )
  }

  const caracteristicas = produto.caracteristicas ?? caracteristicasPadrao

  return (
    <>
      <Header visivel={true} corFundo="#fff" />

      <section className="cachecolproduto-topo">
        <div className="cachecolproduto">
          <div className="cachecolproduto-galeria">
            <div className="cachecolproduto-miniaturas">
              {produto.imagens.map((imagem, indice) => (
                <button
                  key={imagem}
                  type="button"
                  className={`cachecolproduto-miniatura${
                    indice === imagemAtiva ? ' ativa' : ''
                  }`}
                  onClick={() => setImagemAtiva(indice)}
                  aria-label={`ver foto ${indice + 1} de ${produto.nome}`}
                >
                  <img src={imagem} alt="" />
                </button>
              ))}
            </div>

            <div className="cachecolproduto-imagem-principal">
              <img src={produto.imagens[imagemAtiva]} alt={produto.nome} />
            </div>
          </div>

          <div className="cachecolproduto-info">
            <div className="cachecolproduto-etiqueta-linha">
              <p className="cachecolproduto-etiqueta">peça artesanal</p>
              {produto.disponibilidade && (
                <span
                  className={`cachecolproduto-disponibilidade cachecolproduto-disponibilidade--${produto.disponibilidade}`}
                >
                  {LABEL_DISPONIBILIDADE[produto.disponibilidade]}
                </span>
              )}
            </div>
            <h1 className="cachecolproduto-nome">{produto.nome}</h1>
            <p className="cachecolproduto-preco">
              {produto.precoAntigo && (
                <span className="cachecolproduto-preco-antigo">{produto.precoAntigo}</span>
              )}
              {produto.preco}
            </p>

            <hr className="cachecolproduto-divisor" />

            <p className="cachecolproduto-descricao">{produto.descricao}</p>
            <a href="#contato" className="cachecolproduto-contato">
              entrar em contato
            </a>

            <p className="cachecolproduto-aviso">
              Todos os nossos cachecóis são feitos sob encomenda com fios
              selecionados — por isso não vendemos diretamente pelo site.
            </p>

            <div className="cachecolproduto-caracteristicas">
              {caracteristicas.map((item) => (
                <div className="cachecolproduto-caracteristica" key={item.texto}>
                  <span className="cachecolproduto-caracteristica-icone">
                    {icones[item.icone]}
                  </span>
                  <span>{item.texto}</span>
                </div>
              ))}
            </div>

            <div className="cachecolproduto-mais-info">
              <button
                type="button"
                className="cachecolproduto-mais-info-botao"
                onClick={() => setMaisInfoAberto((aberto) => !aberto)}
                aria-expanded={maisInfoAberto}
              >
                mais informações
                <svg
                  className={`cachecolproduto-mais-info-seta${
                    maisInfoAberto ? ' aberta' : ''
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>

              {maisInfoAberto && (
                <div className="cachecolproduto-mais-info-conteudo">
                  <div className="cachecolproduto-detalhe">
                    <h2 className="cachecolproduto-detalhe-titulo">materiais utilizados</h2>
                    <p className="cachecolproduto-detalhe-texto">{produto.materiais}</p>
                  </div>
                  <div className="cachecolproduto-detalhe">
                    <h2 className="cachecolproduto-detalhe-titulo">como lavar</h2>
                    <p className="cachecolproduto-detalhe-texto">{produto.comoLavar}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProdutoCachecol