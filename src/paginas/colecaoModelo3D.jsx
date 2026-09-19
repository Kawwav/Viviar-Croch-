import { forwardRef, useEffect, useRef, useImperativeHandle } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const RECORTE_VISIVEL = 'inset(0% 0% 0% 0%)'

// Este componente concentra toda a dependência de three.js/GLTFLoader/
// OrbitControls. Por ser carregado via lazy() em colecao.jsx, esse peso só
// entra no navegador quando a seção "Deixe do seu jeito" está perto de
// aparecer na tela — por isso ele recebe props (visivelInicial,
// interativaInicial, modeloInicial) para se configurar sozinho assim que
// monta, sem depender de chamadas externas cronometradas pelo componente pai.
const CamadaModelo3D = forwardRef(function CamadaModelo3D(
  { className, style, titulo, visivelInicial = true, interativaInicial = true, modeloInicial },
  refExterna
) {
  const containerRef = useRef(null)
  const estadoRef = useRef(null)

  const carregarModeloInterno = (estado, url, aoTerminar) => {
    estado.carregador.load(
      url,
      (gltf) => {
        const antigo = estado.modeloAtual
        const modelo = gltf.scene
        modelo.traverse((filho) => {
          if (filho.isMesh) {
            filho.castShadow = true
            filho.receiveShadow = false
          }
        })
        const caixa = new THREE.Box3().setFromObject(modelo)
        const centro = caixa.getCenter(new THREE.Vector3())
        const tamanho = caixa.getSize(new THREE.Vector3())
        const raio = Math.max(tamanho.x, tamanho.y, tamanho.z) / 2 || 1
        modelo.position.sub(centro) // centraliza o modelo na origem
        const baseY = caixa.min.y - centro.y
        estado.sombraChao.position.y = baseY - raio * 0.01
        const alcanceSombra = raio * 2.2
        estado.luzPrincipal.shadow.camera.left = -alcanceSombra
        estado.luzPrincipal.shadow.camera.right = alcanceSombra
        estado.luzPrincipal.shadow.camera.top = alcanceSombra
        estado.luzPrincipal.shadow.camera.bottom = -alcanceSombra
        estado.luzPrincipal.shadow.camera.updateProjectionMatrix()
        const fovRad = (estado.camera.fov * Math.PI) / 180
        const distancia = (raio / Math.sin(fovRad / 2)) * 1.35
        estado.controles.target.set(0, 0, 0)
        estado.controles.minDistance = distancia * 0.28
        estado.controles.maxDistance = distancia * 3.2
        if (!antigo) {
          const direcao = estado.camera.position.clone().normalize()
          estado.camera.position.copy(direcao.multiplyScalar(distancia))
        }
        estado.controles.update()

        estado.cena.add(modelo)
        estado.modeloAtual = modelo
        estado.distanciaBase = distancia
        if (antigo) estado.cena.remove(antigo)
        aoTerminar && aoTerminar()
      },
      undefined,
      (erro) => console.error('falha ao carregar modelo 3d:', erro)
    )
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const cena = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
    camera.position.set(0, 0.15, 3.2)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.setClearColor(0x000000, 0)
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.display = 'block'
    container.appendChild(renderer.domElement)

    const controles = new OrbitControls(camera, renderer.domElement)
    controles.target.set(0, 0, 0)
    controles.enableDamping = true
    controles.dampingFactor = 0.08
    controles.autoRotate = interativaInicial
    controles.autoRotateSpeed = 1.3

    controles.enablePan = false
    controles.enableZoom = true
    controles.zoomSpeed = 1.1
    controles.rotateSpeed = 0.9
    controles.minDistance = 1.8
    controles.maxDistance = 5
    controles.enabled = interativaInicial // só a camada da frente recebe interação
    controles.update()

    const bloquearScrollDaPagina = (evento) => {
      evento.preventDefault()
      evento.stopPropagation()
    }
    container.addEventListener('wheel', bloquearScrollDaPagina, { passive: false })

    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    cena.add(new THREE.AmbientLight(0xffffff, 1.1))
    const luzPrincipal = new THREE.DirectionalLight(0xffffff, 1.4)
    luzPrincipal.position.set(3, 4, 5)
    luzPrincipal.castShadow = true
    luzPrincipal.shadow.mapSize.set(1024, 1024)
    luzPrincipal.shadow.camera.near = 0.1
    luzPrincipal.shadow.camera.far = 20
    luzPrincipal.shadow.camera.left = -3
    luzPrincipal.shadow.camera.right = 3
    luzPrincipal.shadow.camera.top = 3
    luzPrincipal.shadow.camera.bottom = -3
    luzPrincipal.shadow.bias = -0.0008
    luzPrincipal.shadow.radius = 6
    cena.add(luzPrincipal)
    const luzPreenchimento = new THREE.DirectionalLight(0xffffff, 0.6)
    luzPreenchimento.position.set(-4, -1.5, -3)
    cena.add(luzPreenchimento)
    const sombraChao = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 20),
      new THREE.ShadowMaterial({ opacity: 0.32 })
    )
    sombraChao.rotation.x = -Math.PI / 2
    sombraChao.receiveShadow = true
    cena.add(sombraChao)

    const redimensionar = () => {
      const largura = container.clientWidth || 1
      const altura = container.clientHeight || 1
      camera.aspect = largura / altura
      camera.updateProjectionMatrix()
      renderer.setSize(largura, altura, false)
    }
    redimensionar()
    const observador = new ResizeObserver(redimensionar)
    observador.observe(container)

    let quadro = null
    const animar = () => {
      controles.update()
      renderer.render(cena, camera)
      quadro = requestAnimationFrame(animar)
    }
    animar()

    estadoRef.current = {
      cena,
      camera,
      renderer,
      controles,
      carregador: new GLTFLoader(),
      modeloAtual: null,
      sombraChao,
      luzPrincipal,
    }

    // estado inicial de exibição/interação, definido pelas props — cada
    // camada se configura sozinha assim que monta, então funciona
    // independentemente de quando (ou o quanto adiado) ela é montada.
    container.style.clipPath = RECORTE_VISIVEL
    container.style.opacity = visivelInicial ? '1' : '0'

    if (modeloInicial) {
      carregarModeloInterno(estadoRef.current, modeloInicial)
    }

    return () => {
      cancelAnimationFrame(quadro)
      observador.disconnect()
      container.removeEventListener('wheel', bloquearScrollDaPagina)
      controles.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
      estadoRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useImperativeHandle(refExterna, () => ({
    carregarModelo(url, aoTerminar) {
      const estado = estadoRef.current
      if (!estado) return
      carregarModeloInterno(estado, url, aoTerminar)
    },

    obterElemento() {
      return containerRef.current
    },
    definirRecorte(valorClipPath) {
      if (containerRef.current) containerRef.current.style.clipPath = valorClipPath
    },
    definirZIndex(z) {
      if (containerRef.current) containerRef.current.style.zIndex = z
    },

    definirVisivel(visivel) {
      if (containerRef.current) containerRef.current.style.opacity = visivel ? '1' : '0'
    },
    definirInterativa(ativa) {
      const estado = estadoRef.current
      if (!estado) return
      estado.controles.enabled = ativa
      estado.controles.autoRotate = ativa
    },
    lerOrbita() {
      const estado = estadoRef.current
      if (!estado) return null
      const deslocamento = estado.camera.position.clone().sub(estado.controles.target)
      const esferica = new THREE.Spherical().setFromVector3(deslocamento)
      return { theta: esferica.theta, phi: esferica.phi, radius: esferica.radius }
    },
    aplicarOrbita(orbita) {
      const estado = estadoRef.current
      if (!estado || !orbita) return
      const esferica = new THREE.Spherical(orbita.radius, orbita.phi, orbita.theta)
      const posicao = new THREE.Vector3().setFromSpherical(esferica).add(estado.controles.target)
      estado.camera.position.copy(posicao)
      estado.controles.update()
    },
  }))

  return (
    <div
      ref={containerRef}
      className={className}
      style={style}
      role="img"
      aria-label={titulo}
    />
  )
})

export default CamadaModelo3D
