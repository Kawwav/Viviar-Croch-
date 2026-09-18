import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../componentes/header.jsx'
import { produtos } from './produtos.js'
import './bolsas.css'

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

function Bolsas() {
  const [filtroDisponibilidade, setFiltroDisponibilidade] = useState('todos')
  const [ordenacao, setOrdenacao] = useState('relevancia')
  const [ordenarAberto, setOrdenarAberto] = useState(false)
  const ordenarRef = useRef(null)

  // fecha o dropdown de ordenação ao clicar fora dele
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

      <section className="bolsas-hero">
        <div className="bolsas-hero-imagem">
          <img src="/bolsas/1.jpg" alt="Coleção de bolsas" />
        </div>
        <div className="bolsas-hero-escurecido" />
        <div className="bolsas-hero-conteudo">
          <h1 className="bolsas-hero-titulo">bolsas</h1>
          <p className="bolsas-hero-descricao">
            Com design moderno e atemporal, nossas bolsas são feitas com
            materiais de alta qualidade para garantir durabilidade. Seja
            para o dia a dia ou para uma ocasião especial, nossa coleção
            oferece uma variedade de tamanhos e estilos para cada gosto e
            necessidade.
          </p>
        </div>
      </section>

      <section className="bolsas-lista">
        <div className="bolsas-barra">
          <div className="bolsas-barra-visualizacao">
            <button type="button" className="bolsas-icone" aria-label="grade pequena">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <rect x="3" y="3" width="8" height="8" />
                <rect x="13" y="3" width="8" height="8" />
                <rect x="3" y="13" width="8" height="8" />
                <rect x="13" y="13" width="8" height="8" />
              </svg>
            </button>
            <button type="button" className="bolsas-icone ativo" aria-label="grade grande">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <rect x="3" y="3" width="5" height="5" />
                <rect x="9.5" y="3" width="5" height="5" />
                <rect x="16" y="3" width="5" height="5" />
                <rect x="3" y="9.5" width="5" height="5" />
                <rect x="9.5" y="9.5" width="5" height="5" />
                <rect x="16" y="9.5" width="5" height="5" />
              </svg>
            </button>
            <button type="button" className="bolsas-icone" aria-label="lista">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>

          <p className="bolsas-contagem">{produtosFiltrados.length} produtos</p>

          <div className="bolsas-barra-direita">
            <div className="bolsas-filtro-rapido">
              {[
                { valor: 'todos', label: 'todos' },
                { valor: 'estoque', label: 'em estoque' },
                { valor: 'encomenda', label: 'sob encomenda' },
              ].map((opcao) => (
                <button
                  key={opcao.valor}
                  type="button"
                  className={`bolsas-filtro-rapido-botao${
                    filtroDisponibilidade === opcao.valor ? ' ativo' : ''
                  }`}
                  onClick={() => setFiltroDisponibilidade(opcao.valor)}
                >
                  {opcao.label}
                </button>
              ))}
            </div>

            <div className="bolsas-ordenar" ref={ordenarRef}>
              <button
                type="button"
                className={`bolsas-barra-botao${
                  ordenacao !== 'relevancia' ? ' ativo' : ''
                }`}
                onClick={() => setOrdenarAberto((aberto) => !aberto)}
                aria-expanded={ordenarAberto}
                aria-haspopup="listbox"
              >
                {labelOrdenacaoAtual}
                <svg
                  className={`bolsas-ordenar-seta${
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
                <ul className="bolsas-ordenar-menu" role="listbox">
                  {OPCOES_ORDENACAO.map((opcao) => (
                    <li key={opcao.valor}>
                      <button
                        type="button"
                        className={`bolsas-ordenar-opcao${
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
          <p className="bolsas-vazio">
            Nenhuma bolsa encontrada com esse filtro no momento.
          </p>
        ) : (
          <div className="bolsas-grade">
            {produtosFiltrados.map((produto) => (
              <Link
                to={`/bolsas/${produto.slug}`}
                className="bolsas-item"
                key={produto.slug}
              >
                {produto.precoAntigo && (
                  <span className="bolsas-tag bolsas-tag-promocao">promoção</span>
                )}
                <span
                  className={`bolsas-tag bolsas-tag-disponibilidade bolsas-tag-disponibilidade--${produto.disponibilidade}`}
                >
                  {LABEL_DISPONIBILIDADE[produto.disponibilidade]}
                </span>
                <div className="bolsas-imagem">
                  <img
                    src={produto.imagens[0]}
                    alt={produto.nome}
                    className="bolsas-imagem-principal"
                  />
                  {produto.imagens[1] && (
                    <img
                      src={produto.imagens[1]}
                      alt={`${produto.nome} - vista lateral`}
                      className="bolsas-imagem-lado"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <h3 className="bolsas-nome">{produto.nome}</h3>
                <p className="bolsas-preco">
                  {produto.precoAntigo && (
                    <span className="bolsas-preco-antigo">{produto.precoAntigo}</span>
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

export default Bolsas