import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  lazy,
  Suspense,
} from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTransicao } from '../componentes/TransicaoCortina.jsx'
import './colecao.css'

gsap.registerPlugin(ScrollTrigger)

const CamadaModelo3D = lazy(() => import('./colecaoModelo3D.jsx'))
const PERSONALIZAR_ROOT_MARGIN = '600px 0px'

const ativo = (caminho) => `${import.meta.env.BASE_URL}${caminho.replace(/^\//, '')}`

const produtos = {
  bolsas: [
    {
      nome: 'Bolsa Girassol Marfim',
      preco: 'R$ 180,00',
      imagem: ativo('/bolsas/bolsa1.webp'),
    },
    {
      nome: 'Bolsa Tiracolo Petróleo',
      preco: 'R$ 210,00',
      imagem: ativo('/bolsas/bolsa2.webp'),
    },
    {
      nome: 'Bolsa Estruturada Café',
      preco: 'R$ 195,00',
      imagem: ativo('/bolsas/bolsa3.webp'),
    },
    {
      nome: 'Bolsa Transversal Marfim',
      preco: 'R$ 165,00',
      imagem: ativo('/bolsas/bolsa4.webp'),
    },
  ],
  acessorios: [
    {
      nome: 'Cachecol Girassol Marfim',
      preco: 'R$ 90,00',
      imagem: ativo('/cachecol/cachecol1.webp'),
    },
    {
      nome: 'Cachecol Xadrez Petróleo',
      preco: 'R$ 95,00',
      imagem: ativo('/cachecol/cachecol2.webp'),
    },
    {
      nome: 'Cachecol Trançado Café',
      preco: 'R$ 85,00',
      imagem: ativo('/cachecol/cachecol3.webp'),
    },
    {
      nome: 'Cachecol Listrado Trigo',
      preco: 'R$ 80,00',
      imagem: ativo('/cachecol/cachecol4.webp'),
    },
  ],
}

const modelosPersonalizar = [
  {
    nome: 'clássica',
    cores: [
      {
        id: 'classica-azul',
        nome: 'azul',
        modelo: ativo('/bolsas/bolsaazul.glb'),
        corClara: '#5bb8d9',
        corEscura: '#161a4a',
      },
      {
        id: 'classica-rosa',
        nome: 'rosa',
        modelo: ativo('/bolsas/bolsarosa.glb'),
        corClara: '#f472b6',
        corEscura: '#8a0e4a',
      },
      {
        id: 'classica-amarelo',
        nome: 'amarelo',
        modelo: ativo('/bolsas/bolsaamarela.glb'),
        corClara: '#e6d35c',
        corEscura: '#5c4e12',
      },
      {
        id: 'classica-vermelho',
        nome: 'vermelho',
        modelo: ativo('/bolsas/bolsavermelha.glb'),
        corClara: '#e2665f',
        corEscura: '#6b1420',
      },
    ],
  },
  {
    nome: 'trançada',
    cores: [
      {
        id: 'trancada-azul',
        nome: 'azul',
        modelo: ativo('/bolsas/bolsa1azul.glb'),
        corClara: '#5bb8d9',
        corEscura: '#161a4a',
      },
      {
        id: 'trancada-verde-terracota',
        nome: 'verde terracota',
        modelo: ativo('/bolsas/bolsa2verdeterracota.glb'),
        corClara: '#9caf6b',
        corEscura: '#7a3e26',
      },
      {
        id: 'trancada-rosa-vinho',
        nome: 'rosa vinho',
        modelo: ativo('/bolsas/bolsa3rosavinho.glb'),
        corClara: '#c96b86',
        corEscura: '#5c1230',
      },
      {
        id: 'trancada-rosa-pink',
        nome: 'rosa pink',
        modelo: ativo('/bolsas/bolsa4rosapink.glb'),
        corClara: '#f24fa0',
        corEscura: '#8a0e57',
      },
    ],
  },
]

const fraseEsquerda = 'FEITO PRA DURAR'
const fraseDireita = 'ELEGANTE, ATEMPORAL E FUNCIONAL'
const repeticoes = Array.from({ length: 8 })
const obterImagemLado = (imagem) => {
  const corresponde = imagem.match(/^(.*)bolsa(\d+)\.webp$/)
  if (!corresponde) return null
  return `${corresponde[1]}lado${corresponde[2]}.webp`
}
function Colecao() {
  const [categoria, setCategoria] = useState('bolsas')
  const { irComCortina } = useTransicao()
  const secaoRef = useRef(null)
  const gradeRef = useRef(null)
  const jaEntrouRef = useRef(false)
  const abasRef = useRef(null)
  const bolsasAbaRef = useRef(null)
  const acessoriosAbaRef = useRef(null)
  const [indicador, setIndicador] = useState({ largura: 0, deslocamento: 0 })
  const [arrastando, setArrastando] = useState(false)
  const [animando, setAnimando] = useState(false)
  const arrasteRef = useRef({ inicioX: 0, scrollInicio: 0, moveu: false })
  const [podeVoltar, setPodeVoltar] = useState(false)
  const [podeAvancar, setPodeAvancar] = useState(true)
  const camadaRefs = [useRef(null), useRef(null)]
  const personalizarRef = useRef(null)
  const [personalizarVisivel, setPersonalizarVisivel] = useState(false)
  const [produtoAtual, setProdutoAtual] = useState(0)
  const [coresPorCamada, setCoresPorCamada] = useState([
    modelosPersonalizar[0].cores[1],
    modelosPersonalizar[0].cores[1],
  ])
  const [frente, setFrente] = useState(0)
  const [corSelecionada, setCorSelecionada] = useState(modelosPersonalizar[0].cores[1])
  const transicionandoRef = useRef(false)
  const pendenteRef = useRef(null)
  const coresListaRef = useRef(null)
  const corNomeRef = useRef(null)
  const deveAnimarEntradaCoresRef = useRef(false)
  const RECORTE_VISIVEL = 'inset(0% 0% 0% 0%)'
  const INCLINACAO_DIAGONAL = 26
  const ATRASO_INICIO_TRANSICAO_PECA = 0.12 
  const DURACAO_SLIDE = 0.75
  const EASE_SLIDE = 'sine.inOut' 
  const DURACAO_ONDA_SAIDA = 0.35
  const DURACAO_ONDA_ENTRADA = 0.45
  const STAGGER_ONDA = 0.05
  const ATRASO_ENTRE_ONDA_SAIDA_E_TROCA = 0.22 
  const recorteDiagonal = (progresso) => {
    const total = 100 + INCLINACAO_DIAGONAL
    const yEsquerda = 100 - progresso * total
    const yDireita = (100 + INCLINACAO_DIAGONAL) * (1 - progresso)
    return `polygon(0% 0%, 100% 0%, 100% ${yDireita.toFixed(2)}%, 0% ${yEsquerda.toFixed(2)}%)`
  }

  const iniciarWipe = (indiceTras) => {
    const indiceFrente = indiceTras === 0 ? 1 : 0
    const camadaFrente = camadaRefs[indiceFrente].current
    const camadaTras = camadaRefs[indiceTras].current
    if (!camadaFrente || !camadaTras) return
    camadaFrente.definirInterativa(false)
    const orbitaAtual = camadaFrente.lerOrbita()
    camadaTras.aplicarOrbita(orbitaAtual)
    camadaTras.definirVisivel(true)

    const elementoFrente = camadaFrente
    gsap.to(
      {},
      {
        duration: 0.9,
        ease: 'power3.inOut',
        onUpdate: function () {
          elementoFrente.definirRecorte(recorteDiagonal(this.progress()))
        },
        onComplete: () => {
          camadaFrente.definirInterativa(false)
          camadaFrente.definirRecorte(RECORTE_VISIVEL) 
          camadaFrente.definirVisivel(false) 
          camadaFrente.definirZIndex(1)
          camadaTras.definirZIndex(2)
          camadaTras.definirInterativa(true)
          setFrente(indiceTras)
          transicionandoRef.current = false
          pendenteRef.current = null
        },
      }
    )
  }

  const iniciarSlide = (indiceTras, direcao) => {
    const indiceFrente = indiceTras === 0 ? 1 : 0
    const camadaFrente = camadaRefs[indiceFrente].current
    const camadaTras = camadaRefs[indiceTras].current
    if (!camadaFrente || !camadaTras) return

    const elementoFrente = camadaFrente.obterElemento()
    const elementoTras = camadaTras.obterElemento()
    if (!elementoFrente || !elementoTras) return
    camadaFrente.definirRecorte(RECORTE_VISIVEL)
    camadaTras.definirRecorte(RECORTE_VISIVEL)
    camadaFrente.definirInterativa(false)
    camadaTras.definirInterativa(false)
    camadaTras.definirZIndex(2)
    camadaFrente.definirZIndex(1)
    camadaTras.definirVisivel(true)

    gsap.set(elementoTras, { xPercent: direcao === 1 ? -100 : 100 })
    gsap.set(elementoFrente, { xPercent: 0 })

    gsap.timeline({
      defaults: { duration: DURACAO_SLIDE, ease: EASE_SLIDE },
      onComplete: () => {
        camadaFrente.definirVisivel(false) 
        gsap.set(elementoFrente, { xPercent: 0 }) 
        camadaTras.definirInterativa(true)
        setFrente(indiceTras)
        transicionandoRef.current = false
        pendenteRef.current = null
      },
    })
      .to(elementoFrente, { xPercent: direcao === 1 ? 100 : -100 }, 0)
      .to(elementoTras, { xPercent: 0 }, 0)
  }

  const animarOndaTrocaDePeca = (novaCor, novoProdutoIndex) => {
    const botoesSaindo = coresListaRef.current
      ? Array.from(coresListaRef.current.children)
      : []
    const nomeSaindo = corNomeRef.current

    gsap.to(botoesSaindo, {
      y: 40,
      opacity: 0,
      duration: DURACAO_ONDA_SAIDA,
      ease: 'sine.in',
      stagger: STAGGER_ONDA,
    })
    if (nomeSaindo) {
      gsap.to(nomeSaindo, {
        y: 40,
        opacity: 0,
        duration: DURACAO_ONDA_SAIDA * 0.85,
        ease: 'sine.in',
      })
    }

    deveAnimarEntradaCoresRef.current = true
    gsap.delayedCall(ATRASO_ENTRE_ONDA_SAIDA_E_TROCA, () => {
      setCorSelecionada(novaCor)
      setProdutoAtual(novoProdutoIndex)
    })
  }

  const trocarPeca = (novaCor, novoProdutoIndex, opcoes = {}) => {
    const { modo = 'cor', direcaoSlide = 1 } = opcoes
    if (novaCor.id === corSelecionada.id || transicionandoRef.current) return
    transicionandoRef.current = true

    const indiceTras = frente === 0 ? 1 : 0

    const concluir = () => {
      if (modo === 'peca') {
        gsap.delayedCall(ATRASO_INICIO_TRANSICAO_PECA, () => {
          animarOndaTrocaDePeca(novaCor, novoProdutoIndex)
          iniciarSlide(indiceTras, direcaoSlide)
        })
      } else {
        setCorSelecionada(novaCor)
        setProdutoAtual(novoProdutoIndex)
        iniciarWipe(indiceTras)
      }
    }

    if (coresPorCamada[indiceTras].id === novaCor.id) {
      concluir()
      return
    }

    pendenteRef.current = { indiceTras, corId: novaCor.id }
    setCoresPorCamada((atual) => {
      const copia = [...atual]
      copia[indiceTras] = novaCor
      return copia
    })

    const camadaTras = camadaRefs[indiceTras].current
    camadaTras?.carregarModelo(novaCor.modelo, () => {
      const pendente = pendenteRef.current
      if (!pendente || pendente.indiceTras !== indiceTras || pendente.corId !== novaCor.id) {
        return 
      }
      concluir()
    })
  }

  const trocarCor = (novaCor) => trocarPeca(novaCor, produtoAtual)
  const trocarProduto = (direcao) => {
    const total = modelosPersonalizar.length
    const novoIndex = (produtoAtual + direcao + total) % total
    const peca = modelosPersonalizar[novoIndex]
    const novaCor = peca.cores[1] ?? peca.cores[0]
    trocarPeca(novaCor, novoIndex, { modo: 'peca', direcaoSlide: direcao })
  }
  useLayoutEffect(() => {
    if (!deveAnimarEntradaCoresRef.current) return
    deveAnimarEntradaCoresRef.current = false

    const botoesEntrando = coresListaRef.current
      ? Array.from(coresListaRef.current.children)
      : []
    const nomeEntrando = corNomeRef.current

    gsap.set(botoesEntrando, { y: 40, opacity: 0 })
    gsap.to(botoesEntrando, {
      y: 0,
      opacity: 1,
      duration: DURACAO_ONDA_ENTRADA,
      ease: 'sine.out',
      stagger: STAGGER_ONDA,
    })
    if (nomeEntrando) {
      gsap.set(nomeEntrando, { y: 40, opacity: 0 })
      gsap.to(nomeEntrando, {
        y: 0,
        opacity: 1,
        duration: DURACAO_ONDA_ENTRADA * 0.85,
        ease: 'sine.out',
        delay: 0.15,
      })
    }
  }, [produtoAtual])

  useEffect(() => {
    if (personalizarVisivel) return
    const elemento = personalizarRef.current
    if (!elemento) return

    const observador = new IntersectionObserver(
      (entradas) => {
        if (entradas[0]?.isIntersecting) {
          setPersonalizarVisivel(true)
          observador.disconnect()
        }
      },
      { rootMargin: PERSONALIZAR_ROOT_MARGIN }
    )

    observador.observe(elemento)
    return () => observador.disconnect()
  }, [personalizarVisivel])

  useLayoutEffect(() => {
    const atualizarIndicador = () => {
      const abas = abasRef.current
      const botaoAtivo =
        categoria === 'bolsas' ? bolsasAbaRef.current : acessoriosAbaRef.current
      if (!abas || !botaoAtivo) return

      const boundsAbas = abas.getBoundingClientRect()
      const boundsBotao = botaoAtivo.getBoundingClientRect()

      setIndicador({
        largura: boundsBotao.width,
        deslocamento: boundsBotao.left - boundsAbas.left,
      })
    }

    atualizarIndicador()
    window.addEventListener('resize', atualizarIndicador)
    return () => window.removeEventListener('resize', atualizarIndicador)
  }, [categoria])

  useEffect(() => {
    const secao = secaoRef.current
    const grade = gradeRef.current
    if (!secao || !grade) return

    const imagens = grade.querySelectorAll('.colecao-imagem')
    const textos = grade.querySelectorAll(
      '.colecao-tag, .colecao-nome, .colecao-preco'
    )

    const contexto = gsap.context(() => {
      gsap.set(imagens, { clipPath: 'inset(100% 0% 0% 0%)' })
      gsap.set(textos, { opacity: 0, y: 22, filter: 'blur(4px)' })

      const anima = () => {
        gsap.to(imagens, {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.12,
        })
        gsap.to(textos, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'power2.out',
          stagger: 0.05,
          delay: 0.15,
        })
      }

      if (jaEntrouRef.current) {
        anima()
      } else {
        ScrollTrigger.create({
          trigger: secao,
          start: 'top 82%',
          once: true,
          onEnter: () => {
            jaEntrouRef.current = true
            anima()
          },
        })
      }
    }, secao)

    return () => contexto.revert()
  }, [categoria])

  const atualizarSetas = () => {
    const grade = gradeRef.current
    if (!grade) return
    const folga = 4
    setPodeVoltar(grade.scrollLeft > folga)
    setPodeAvancar(grade.scrollLeft < grade.scrollWidth - grade.clientWidth - folga)
  }

  useEffect(() => {
    const grade = gradeRef.current
    if (!grade) return
    grade.scrollTo({ left: 0 })
    atualizarSetas()
  }, [categoria])

  const iniciarArraste = (clienteX) => {
    const grade = gradeRef.current
    if (!grade) return
    arrasteRef.current = {
      inicioX: clienteX,
      scrollInicio: grade.scrollLeft,
      moveu: false,
    }
    setArrastando(true)
  }

  const moverArraste = (clienteX) => {
    const grade = gradeRef.current
    if (!grade || !arrastando) return
    const distancia = clienteX - arrasteRef.current.inicioX
    if (Math.abs(distancia) > 4) arrasteRef.current.moveu = true
    grade.scrollLeft = arrasteRef.current.scrollInicio - distancia
    atualizarSetas()
  }

  const finalizarArraste = () => setArrastando(false)

  const suavizar = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

  const rolarGrade = (direcao) => {
    const grade = gradeRef.current
    if (!grade) return
    const item = grade.querySelector('.colecao-item')
    const distancia = item ? item.getBoundingClientRect().width + 24 : grade.clientWidth * 0.6
    const inicio = grade.scrollLeft
    const alvo = inicio + direcao * distancia
    const duracao = 900
    let tempoInicio = null

    const passo = (tempoAtual) => {
      if (tempoInicio === null) tempoInicio = tempoAtual
      const decorrido = tempoAtual - tempoInicio
      const progresso = Math.min(decorrido / duracao, 1)
      grade.scrollLeft = inicio + (alvo - inicio) * suavizar(progresso)
      atualizarSetas()
      if (progresso < 1) {
        requestAnimationFrame(passo)
      } else {
        setAnimando(false)
      }
    }

    setAnimando(true)
    requestAnimationFrame(passo)
  }

  return (
    <>
      <section className="colecao" ref={secaoRef}>
      <p className="colecao-etiqueta">mais vendidos</p>

      <div className="colecao-abas" ref={abasRef}>
        <button
          type="button"
          ref={bolsasAbaRef}
          className={`colecao-aba${categoria === 'bolsas' ? ' ativa' : ''}`}
          onClick={() => setCategoria('bolsas')}
        >
          bolsas
        </button>
        <button
          type="button"
          ref={acessoriosAbaRef}
          className={`colecao-aba${categoria === 'acessorios' ? ' ativa' : ''}`}
          onClick={() => setCategoria('acessorios')}
        >
          acessórios
        </button>
        <span
          className="colecao-aba-indicador"
          style={{
            width: `${indicador.largura}px`,
            transform: `translateX(${indicador.deslocamento}px)`,
          }}
        />
      </div>

      <div className="colecao-grade-wrapper">
        <div
          className={`colecao-grade${arrastando ? ' arrastando' : ''}${animando ? ' animando' : ''}`}
          ref={gradeRef}
          onMouseDown={(e) => iniciarArraste(e.clientX)}
          onMouseMove={(e) => moverArraste(e.clientX)}
          onMouseUp={finalizarArraste}
          onMouseLeave={finalizarArraste}
          onTouchStart={(e) => iniciarArraste(e.touches[0].clientX)}
          onTouchMove={(e) => moverArraste(e.touches[0].clientX)}
          onTouchEnd={finalizarArraste}
          onScroll={atualizarSetas}
        >
          {produtos[categoria].map((produto) => {
            const imagemLado = obterImagemLado(produto.imagem)
            return (
              <div className="colecao-item" key={produto.nome}>
                <span className="colecao-tag">{produto.etiqueta ?? '\u00A0'}</span>
                <div className="colecao-imagem">
                  <img
                    src={produto.imagem}
                    alt={produto.nome}
                    draggable="false"
                    className="colecao-imagem-principal"
                    loading="lazy"
                    decoding="async"
                  />
                  {imagemLado && (
                    <img
                      src={imagemLado}
                      alt={`${produto.nome} - vista lateral`}
                      draggable="false"
                      className="colecao-imagem-lado"
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                </div>
                <h3 className="colecao-nome">{produto.nome}</h3>
                <p className="colecao-preco">{produto.preco}</p>
              </div>
            )
          })}
        </div>

        <div className="colecao-setas">
          <button
            type="button"
            className={`colecao-arraste${podeVoltar ? '' : ' apagado'}`}
            onClick={() => rolarGrade(-1)}
            disabled={!podeVoltar}
            aria-label="ver anteriores"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#08060d" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <button
            type="button"
            className={`colecao-arraste${podeAvancar ? '' : ' apagado'}`}
            onClick={() => rolarGrade(1)}
            disabled={!podeAvancar}
            aria-label="ver próximas"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#08060d" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>

      {categoria === 'bolsas' ? (
        <Link
          to="/bolsas"
          className="colecao-botao"
          onClick={irComCortina('/bolsas', 'bolsas')}
        >
          ver todas as bolsas
        </Link>
      ) : (
        <Link
          to="/cachecol"
          className="colecao-botao"
          onClick={irComCortina('/cachecol', 'acessórios')}
        >
          ver todas as acessórios
        </Link>
      )}


      <div className="colecao-faixa">
        <div className="faixa-linha faixa-esquerda">
          <div className="faixa-trilha">
            {repeticoes.map((_, indice) => (
              <span className="faixa-item" key={`esq-a-${indice}`}>
                <span className="faixa-texto">{fraseEsquerda}</span>
                <img src={ativo('/bolsas/bolsa1.webp')} alt="" className="faixa-imagem" loading="lazy" decoding="async" />
              </span>
            ))}
            {repeticoes.map((_, indice) => (
              <span className="faixa-item" key={`esq-b-${indice}`} aria-hidden="true">
                <span className="faixa-texto">{fraseEsquerda}</span>
                <img src={ativo('/bolsas/bolsa2.webp')} alt="" className="faixa-imagem" loading="lazy" decoding="async" />
              </span>
            ))}
          </div>
        </div>

        <div className="faixa-linha faixa-direita">
          <div className="faixa-trilha">
            {repeticoes.map((_, indice) => (
              <span className="faixa-item" key={`dir-a-${indice}`}>
                <span className="faixa-texto">{fraseDireita}</span>
                <img src={ativo('/bolsas/bolsa2.webp')} alt="" className="faixa-imagem" loading="lazy" decoding="async" />
              </span>
            ))}
            {repeticoes.map((_, indice) => (
              <span className="faixa-item" key={`dir-b-${indice}`} aria-hidden="true">
                <span className="faixa-texto">{fraseDireita}</span>
                <img src={ativo('/bolsas/bolsa2.webp')} alt="" className="faixa-imagem" loading="lazy" decoding="async" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="colecao-personalizar" ref={personalizarRef}>
        <div className="colecao-personalizar-texto">
          <h2 className="personalizar-titulo">Deixe do seu jeito</h2>
          <p className="personalizar-subtitulo">escolha sua cor</p>

          <div className="personalizar-cores" ref={coresListaRef}>
            {modelosPersonalizar[produtoAtual].cores.map((cor) => (
              <button
                key={cor.id}
                type="button"
                className={`personalizar-cor${
                  cor.id === corSelecionada.id ? ' ativa' : ''
                }`}
                style={{
                  background: `linear-gradient(to bottom, ${cor.corClara} 50%, ${cor.corEscura} 50%)`,
                }}
                onClick={() => trocarCor(cor)}
                aria-label={`Cor ${cor.nome}`}
              />
            ))}
          </div>

          <p className="personalizar-cor-nome" ref={corNomeRef}>{corSelecionada.nome}</p>
        </div>

        <div className="personalizar-carrossel">
          <button
            type="button"
            className="personalizar-seta personalizar-seta-esquerda"
            onClick={() => trocarProduto(-1)}
            aria-label="peça anterior"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#08060d" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>

          <div className="personalizar-modelo-wrapper" data-lenis-prevent-wheel>
            {personalizarVisivel ? (
              <Suspense fallback={<div className="personalizar-modelo-carregando" />}>
                {[0, 1].map((indice) => (
                  <CamadaModelo3D
                    key={indice}
                    ref={camadaRefs[indice]}
                    className="personalizar-modelo"
                    style={{ zIndex: indice === frente ? 2 : 1 }}
                    titulo={`Bolsa de crochê ${modelosPersonalizar[produtoAtual].nome} na cor ${coresPorCamada[indice].nome}`}
                    visivelInicial={indice === frente}
                    interativaInicial={indice === frente}
                    modeloInicial={corSelecionada.modelo}
                  />
                ))}
              </Suspense>
            ) : (
              <div className="personalizar-modelo-carregando" />
            )}
          </div>

          <button
            type="button"
            className="personalizar-seta personalizar-seta-direita"
            onClick={() => trocarProduto(1)}
            aria-label="próxima peça"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#08060d" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>

          <p className="personalizar-peca-nome">{modelosPersonalizar[produtoAtual].nome}</p>
        </div>
      </div>
    </section>
    </>
  )
}

export default Colecao
