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
  { icone: 'bolsa', texto: 'Bolsa de crochê' },
  { icone: 'fio', texto: 'Fio 100% algodão' },
  { icone: 'mao', texto: 'Feito à mão' },
  { icone: 'calendario', texto: 'Sob encomenda' },
]

const icones = {
  bolsa: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M6 8h12l1 13H5L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
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

function ProdutoBolsa() {
  const { slug } = useParams()
  const produto = produtos.find((item) => item.slug === slug)
  const [imagemAtiva, setImagemAtiva] = useState(0)
  const [maisInfoAberto, setMaisInfoAberto] = useState(false)

  if (!produto) {
    return (
      <>
        <Header visivel={true} corFundo="#fff" />
        <section className="produto-nao-encontrado">
          <p>Essa bolsa não foi encontrada.</p>
          <Link to="/bolsas" className="produto-voltar">
            voltar para bolsas
          </Link>
        </section>
      </>
    )
  }

  const caracteristicas = produto.caracteristicas ?? caracteristicasPadrao

  return (
    <>
      <Header visivel={true} corFundo="#fff" />

      <section className="produto-topo">
        <div className="produto">
          <div className="produto-galeria">
            <div className="produto-miniaturas">
              {produto.imagens.map((imagem, indice) => (
                <button
                  key={imagem}
                  type="button"
                  className={`produto-miniatura${
                    indice === imagemAtiva ? ' ativa' : ''
                  }`}
                  onClick={() => setImagemAtiva(indice)}
                  aria-label={`ver foto ${indice + 1} de ${produto.nome}`}
                >
                  <img src={imagem} alt="" />
                </button>
              ))}
            </div>

            <div className="produto-imagem-principal">
              <img src={produto.imagens[imagemAtiva]} alt={produto.nome} />
            </div>
          </div>

          <div className="produto-info">
            <div className="produto-etiqueta-linha">
              <p className="produto-etiqueta">peça artesanal</p>
              {produto.disponibilidade && (
                <span
                  className={`produto-disponibilidade produto-disponibilidade--${produto.disponibilidade}`}
                >
                  {LABEL_DISPONIBILIDADE[produto.disponibilidade]}
                </span>
              )}
            </div>
            <h1 className="produto-nome">{produto.nome}</h1>
            <p className="produto-preco">
              {produto.precoAntigo && (
                <span className="produto-preco-antigo">{produto.precoAntigo}</span>
              )}
              {produto.preco}
            </p>

            <hr className="produto-divisor" />

            <p className="produto-descricao">{produto.descricao}</p>
            <a href="#contato" className="produto-contato">
              entrar em contato
            </a>

            <p className="produto-aviso">
              Todas as nossas bolsas são 100% personalizáveis e feitas sob
              encomenda — por isso não vendemos diretamente pelo site.
            </p>

            <div className="produto-caracteristicas">
              {caracteristicas.map((item) => (
                <div className="produto-caracteristica" key={item.texto}>
                  <span className="produto-caracteristica-icone">
                    {icones[item.icone]}
                  </span>
                  <span>{item.texto}</span>
                </div>
              ))}
            </div>

            <div className="produto-mais-info">
              <button
                type="button"
                className="produto-mais-info-botao"
                onClick={() => setMaisInfoAberto((aberto) => !aberto)}
                aria-expanded={maisInfoAberto}
              >
                mais informações
                <svg
                  className={`produto-mais-info-seta${
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
                <div className="produto-mais-info-conteudo">
                  <div className="produto-detalhe">
                    <h2 className="produto-detalhe-titulo">materiais utilizados</h2>
                    <p className="produto-detalhe-texto">{produto.materiais}</p>
                  </div>
                  <div className="produto-detalhe">
                    <h2 className="produto-detalhe-titulo">como lavar</h2>
                    <p className="produto-detalhe-texto">{produto.comoLavar}</p>
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

export default ProdutoBolsa