import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../componentes/header.jsx'
import { produtos } from './produtos.js'
import './cachecol.css'

const ativo = (caminho) => `${import.meta.env.BASE_URL}${caminho.replace(/^\//, '')}`

const LABEL_DISPONIBILIDADE = {
  estoque: 'em estoque',
  encomenda: 'sob encomenda',
}

const OPCOES_ORDENACAO = [
  { valor: 'relevancia', label: 'relevância' },
  { valor: 'preco-crescente', label: 'preço: menor para maior' },
  { valor: 'preco-decrescente', label: 'preço: maior para menor' },
  { valor: 'nome-az', label: 'nome: A-Z' },
  { valor: 'nome-za', label: 'nome: Z-A' },
]

const paraNumero = (precoTexto) =>
  Number(precoTexto.replace(/[^\d,]/g, '').replace(',', '.')) || 0

function Cachecol() {
  const [filtroDisponibilidade, setFiltroDisponibilidade] = useState('todos')
  const [ordenacao, setOrdenacao] = useState('relevancia')
  const [ordenarAberto, setOrdenarAberto] = useState(false)
  const ordenarRef = useRef(null)

  useEffect(() => {
    const aoClicarFora = (evento) => {
      if (ordenarRef.current && !ordenarRef.current.contains(evento.target)) {
        setOrdenarAberto(false)
      }
    }
    document.addEventListener('mousedown', aoClicarFora)
    return () => document.removeEventListener('mousedown', aoClicarFora)
  }, [])

  const produtosFiltrados = useMemo(() => {
    const base =
      filtroDisponibilidade === 'todos'
        ? produtos
        : produtos.filter(
            (produto) => produto.disponibilidade === filtroDisponibilidade
          )

    const lista = [...base]

    switch (ordenacao) {
      case 'preco-crescente':
        return lista.sort((a, b) => paraNumero(a.preco) - paraNumero(b.preco))
      case 'preco-decrescente':
        return lista.sort((a, b) => paraNumero(b.preco) - paraNumero(a.preco))
      case 'nome-az':
        return lista.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
      case 'nome-za':
        return lista.sort((a, b) => b.nome.localeCompare(a.nome, 'pt-BR'))
      default:
        return lista
    }
  }, [filtroDisponibilidade, ordenacao])

  const escolherOrdenacao = (valor) => {
    setOrdenacao(valor)
    setOrdenarAberto(false)
  }

  const labelOrdenacaoAtual =
    OPCOES_ORDENACAO.find((opcao) => opcao.valor === ordenacao)?.label ??
    'ordenar por'

  return (
    <>
      <Header visivel={true} corFundo="#fff" />

      <section className="cachecol-hero">
        <div className="cachecol-hero-imagem">
          <img src={ativo('/cachecol/hero-cachecol.webp')} alt="Coleção de cachecóis" />
        </div>
        <div className="cachecol-hero-escurecido" />
        <div className="cachecol-hero-conteudo">
          <h1 className="cachecol-hero-titulo">acessórios</h1>
          <p className="cachecol-hero-descricao">
            Feitos à mão com fios selecionados, nossos cachecóis unem
            conforto e delicadeza em cada ponto. Perfeitos para os dias
            mais frios, eles trazem um toque artesanal e atemporal para
            qualquer look.
          </p>
        </div>
      </section>

      <section className="cachecol-lista">
        <div className="cachecol-barra">
          <div className="cachecol-barra-visualizacao">
            <button type="button" className="cachecol-icone" aria-label="grade pequena">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <rect x="3" y="3" width="8" height="8" />
                <rect x="13" y="3" width="8" height="8" />
                <rect x="3" y="13" width="8" height="8" />
                <rect x="13" y="13" width="8" height="8" />
              </svg>
            </button>
            <button type="button" className="cachecol-icone ativo" aria-label="grade grande">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <rect x="3" y="3" width="5" height="5" />
                <rect x="9.5" y="3" width="5" height="5" />
                <rect x="16" y="3" width="5" height="5" />
                <rect x="3" y="9.5" width="5" height="5" />
                <rect x="9.5" y="9.5" width="5" height="5" />
                <rect x="16" y="9.5" width="5" height="5" />
              </svg>
            </button>
            <button type="button" className="cachecol-icone" aria-label="lista">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>

          <p className="cachecol-contagem">{produtosFiltrados.length} produtos</p>

          <div className="cachecol-barra-direita">
            <div className="cachecol-filtro-rapido">
              {[
                { valor: 'todos', label: 'todos' },
                { valor: 'estoque', label: 'em estoque' },
                { valor: 'encomenda', label: 'sob encomenda' },
              ].map((opcao) => (
                <button
                  key={opcao.valor}
                  type="button"
                  className={`cachecol-filtro-rapido-botao${
                    filtroDisponibilidade === opcao.valor ? ' ativo' : ''
                  }`}
                  onClick={() => setFiltroDisponibilidade(opcao.valor)}
                >
                  {opcao.label}
                </button>
              ))}
            </div>

            <div className="cachecol-ordenar" ref={ordenarRef}>
              <button
                type="button"
                className={`cachecol-barra-botao${
                  ordenacao !== 'relevancia' ? ' ativo' : ''
                }`}
                onClick={() => setOrdenarAberto((aberto) => !aberto)}
                aria-expanded={ordenarAberto}
                aria-haspopup="listbox"
              >
                {labelOrdenacaoAtual}
                <svg
                  className={`cachecol-ordenar-seta${
                    ordenarAberto ? ' aberta' : ''
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {ordenarAberto && (
                <ul className="cachecol-ordenar-menu" role="listbox">
                  {OPCOES_ORDENACAO.map((opcao) => (
                    <li key={opcao.valor}>
                      <button
                        type="button"
                        className={`cachecol-ordenar-opcao${
                          opcao.valor === ordenacao ? ' ativa' : ''
                        }`}
                        role="option"
                        aria-selected={opcao.valor === ordenacao}
                        onClick={() => escolherOrdenacao(opcao.valor)}
                      >
                        {opcao.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {produtosFiltrados.length === 0 ? (
          <p className="cachecol-vazio">
            Nenhum cachecol encontrado com esse filtro no momento.
          </p>
        ) : (
          <div className="cachecol-grade">
            {produtosFiltrados.map((produto) => (
              <Link
                to={`/cachecol/${produto.slug}`}
                className="cachecol-item"
                key={produto.slug}
              >
                {produto.precoAntigo && (
                  <span className="cachecol-tag cachecol-tag-promocao">promoção</span>
                )}
                <span
                  className={`cachecol-tag cachecol-tag-disponibilidade cachecol-tag-disponibilidade--${produto.disponibilidade}`}
                >
                  {LABEL_DISPONIBILIDADE[produto.disponibilidade]}
                </span>
                <div className="cachecol-imagem">
                  <img
                    src={produto.imagens[0]}
                    alt={produto.nome}
                    className="cachecol-imagem-principal"
                  />
                  {produto.imagens[1] && (
                    <img
                      src={produto.imagens[1]}
                      alt={`${produto.nome} - vista lateral`}
                      className="cachecol-imagem-lado"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <h3 className="cachecol-nome">{produto.nome}</h3>
                <p className="cachecol-preco">
                  {produto.precoAntigo && (
                    <span className="cachecol-preco-antigo">{produto.precoAntigo}</span>
                  )}
                  {produto.preco}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  )
}

export default Cachecol