import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTransicao } from './TransicaoCortina.jsx'
import './header.css'

const ativo = (caminho) => `${import.meta.env.BASE_URL}${caminho.replace(/^\//, '')}`

const MODEL_VIEWER_SRC =
  'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js'

export default function Header({ visivel = false, corFundo, onBuscar }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [buscaAberta, setBuscaAberta] = useState(false)
  const [buscaValor, setBuscaValor] = useState('')

  const buscaInputRef = useRef(null)
  const { irComCortina } = useTransicao()
  const navigate = useNavigate()
  const location = useLocation()

  const irParaSecao = (id) => (evento) => {
    evento.preventDefault()
    if (location.pathname === '/') {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      navigate('/', { state: { scrollTo: id } })
    }
  }

  useEffect(() => {
    if (document.querySelector(`script[src="${MODEL_VIEWER_SRC}"]`)) return
    const script = document.createElement('script')
    script.type = 'module'
    script.src = MODEL_VIEWER_SRC
    document.head.appendChild(script)
  }, [])

  useEffect(() => {
    if (buscaAberta) buscaInputRef.current?.focus()
  }, [buscaAberta])

  const links = [
    { label: 'Bolsas', to: '/bolsas' },
    { label: 'Acessórios', to: '/cachecol' },
    { label: 'Sobre', scrollId: 'sobre' },
    { label: 'Contato', scrollId: 'contato' },
  ]

  const closeMenu = () => setMenuOpen(false)

  const alternarBusca = () => {
    setBuscaAberta((aberta) => {
      if (aberta) setBuscaValor('')
      return !aberta
    })
  }

  const enviarBusca = (evento) => {
    evento.preventDefault()
    onBuscar?.(buscaValor.trim())
  }

  return (
    <header
      className={`site-header ${visivel ? 'site-header--visivel' : ''}`}
      style={corFundo ? { backgroundColor: corFundo } : undefined}
    >
      <div className="site-header__inner">
        <button
          className={`site-header__toggle ${menuOpen ? 'is-open' : ''}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          aria-controls="site-nav"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav
          id="site-nav"
          className="site-header__nav"
          aria-label="Navegação principal"
        >
          <ul>
            {links.map((link) => (
              <li key={link.to ?? link.scrollId}>
                {link.to ? (
                  <Link
                    to={link.to}
                    onClick={irComCortina(link.to, link.label)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={`/#${link.scrollId}`}
                    onClick={irParaSecao(link.scrollId)}
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <a className="site-header__logo" href="/" aria-label="Página inicial">
          <img src={ativo('/logopreta.png')} alt="Logo" />
        </a>

        <div className="site-header__spacer">
          <div className="site-header__acoes">
            <form
              className={`site-header__busca${
                buscaAberta ? ' site-header__busca--aberta' : ''
              }`}
              onSubmit={enviarBusca}
              role="search"
            >
              <input
                ref={buscaInputRef}
                type="search"
                className="site-header__busca-input"
                placeholder="buscar peças…"
                value={buscaValor}
                onChange={(evento) => setBuscaValor(evento.target.value)}
                aria-hidden={!buscaAberta}
                tabIndex={buscaAberta ? 0 : -1}
              />
              <button
                type={buscaAberta ? 'submit' : 'button'}
                className="site-header__icone-botao"
                onClick={!buscaAberta ? alternarBusca : undefined}
                aria-label={buscaAberta ? 'Buscar' : 'Abrir busca'}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
              {buscaAberta && (
                <button
                  type="button"
                  className="site-header__icone-botao site-header__busca-fechar"
                  onClick={alternarBusca}
                  aria-label="Fechar busca"
                >
                  ×
                </button>
              )}
            </form>

            <div className="site-header__model" aria-hidden="true">
              <model-viewer
                className="site-header__model-viewer"
                src={ativo('/logo.glb')}
                alt="Logo 3D Viviart Crochê"
                auto-rotate
                rotation-per-second="24deg"
                disable-zoom
                disable-pan
                interaction-prompt="none"
                camera-orbit="0deg 75deg auto"
                shadow-intensity="0"
                exposure="1"
              ></model-viewer>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`site-header__overlay ${menuOpen ? 'is-open' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      ></div>

      <nav
        className={`site-header__drawer ${menuOpen ? 'is-open' : ''}`}
        aria-label="Navegação principal (mobile)"
        aria-hidden={!menuOpen}
      >
        <button
          className="site-header__drawer-close"
          onClick={closeMenu}
          aria-label="Fechar menu"
        >
          ×
        </button>

        <form
          className="site-header__drawer-busca"
          onSubmit={(evento) => {
            enviarBusca(evento)
            closeMenu()
          }}
          role="search"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="search"
            placeholder="buscar peças…"
            value={buscaValor}
            onChange={(evento) => setBuscaValor(evento.target.value)}
          />
        </form>

        <ul>
          {links.map((link) => (
            <li key={link.to ?? link.scrollId}>
              {link.to ? (
                <Link
                  to={link.to}
                  onClick={(evento) => {
                    irComCortina(link.to, link.label)(evento)
                    closeMenu()
                  }}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  href={`/#${link.scrollId}`}
                  onClick={(evento) => {
                    irParaSecao(link.scrollId)(evento)
                    closeMenu()
                  }}
                >
                  {link.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}