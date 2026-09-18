import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'
import Header from './componentes/header.jsx'
import { TransicaoProvider } from './componentes/TransicaoCortina.jsx'
import Comeco from './paginas/comeco.jsx'
import Colecao from './paginas/colecao.jsx'
import Sobre from './paginas/sobre.jsx'
import Combinacao from './paginas/combinacao.jsx'
import Bolsas from './bolsas/bolsas.jsx'
import ProdutoBolsa from './bolsas/produto.jsx'
import Cachecol from './cachecol/cachecol.jsx'
import ScrollToTop from './componentes/ScrollToTop.jsx'
import Footer from './componentes/footer.jsx'
gsap.registerPlugin(ScrollTrigger)

// git add . 
//git commit -m ""  
//git branch -M main


function Home() {
  const [headerVisivel, setHeaderVisivel] = useState(false)
  const [corHeader, setCorHeader] = useState(null)
  const sobreRef = useRef(null)
  const contatoRef = useRef(null)
  const lenisRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    if (!headerVisivel) return
    const alvo = location.state?.scrollTo
    if (!alvo) return

    const elemento = document.getElementById(alvo)
    if (!elemento) return

    if (lenisRef.current?.scrollTo) {
      lenisRef.current.scrollTo(elemento)
    } else {
      elemento.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [headerVisivel, location.state])

  useLayoutEffect(() => {
    document.body.style.overflow = headerVisivel ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [headerVisivel])

  useEffect(() => {
    if (headerVisivel) {
      lenisRef.current?.start()
    }
  }, [headerVisivel])

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    })
    lenisRef.current = lenis
    lenis.stop()
    const atualizarCorHeader = () => {
      const headerEl = document.querySelector('.site-header')
      const alturaHeader = headerEl?.offsetHeight ?? 80

      const topoSobre = sobreRef.current?.getBoundingClientRect().top ?? Infinity
      const topoContato = contatoRef.current?.getBoundingClientRect().top ?? Infinity

      setCorHeader((corAtual) => {
        if (topoContato <= alturaHeader) return '#fdfbf7'
        if (topoSobre <= alturaHeader) return '#fff'
        return null
      })
    }

    lenis.on('scroll', () => {
      ScrollTrigger.update()
      atualizarCorHeader()
    })

    atualizarCorHeader()

    const atualizar = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(atualizar)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(atualizar)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <Header visivel={headerVisivel} corFundo={corHeader} />
      <Comeco onExpansaoCompleta={setHeaderVisivel} />
      <Colecao />
      <div className="sobreposicao">
        <div className="combinacao-wrapper">
          <Combinacao />
        </div>
        <div ref={sobreRef} id="sobre">
          <Sobre />
        </div>
      </div>
      <div ref={contatoRef}>
        <Footer />
      </div>
    </>
  )
}

function App() {
  return (
    <BrowserRouter basename="/Viviar-Croch-">
      <ScrollToTop />
      <TransicaoProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bolsas" element={<Bolsas />} />
          <Route path="/bolsas/:slug" element={<ProdutoBolsa />} />
          <Route path="/cachecol" element={<Cachecol />} />
        </Routes>
      </TransicaoProvider>
    </BrowserRouter>
  )
}

export default App