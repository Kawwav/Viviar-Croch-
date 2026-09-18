import { useState } from 'react'
import { Link } from 'react-router-dom'
import ContatoVideo from '../paginas/videoc'
import './footer.css'

function Footer() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [mensagem, setMensagem] = useState('')

  const formatarTelefone = (valor) => {
    const numeros = valor.replace(/\D/g, '').slice(0, 11)

    if (numeros.length <= 2) {
      return numeros.replace(/^(\d*)/, '($1')
    }
    if (numeros.length <= 6) {
      return numeros.replace(/^(\d{2})(\d*)/, '($1) $2')
    }
    if (numeros.length <= 10) {
      return numeros.replace(/^(\d{2})(\d{4})(\d*)/, '($1) $2-$3')
    }
    return numeros.replace(/^(\d{2})(\d{5})(\d*)/, '($1) $2-$3')
  }

  const enviar = (evento) => {
    evento.preventDefault()
  }

  return (
    <>
      <ContatoVideo />

      <footer className="site-footer" id="contato">
        <div className="footer-container">
          <div className="footer-esquerda">
            <div className="footer-logos">
              <img src="/viviart.png" alt="Vivi Art" className="footer-logo" />
              <img src="/croche.png" alt="Crochê" className="footer-logo" />
            </div>

            <div className="footer-colunas">
              <div className="footer-coluna">
                <p className="footer-coluna__titulo">Loja</p>
                <nav className="footer-links">
                  <Link to="/">Início</Link>
                  <Link to="/bolsas">Bolsas</Link>
                  <Link to="/cachecol">Cachecol</Link>
                  <a href="#sobre">Sobre</a>
                </nav>
              </div>

              <div className="footer-coluna">
                <p className="footer-coluna__titulo">Informações</p>
                <nav className="footer-links">
                  <a href="#sobre">Sobre nós</a>
                  <a href="#contato">Fale conosco</a>
                  <a href="#">Perguntas frequentes</a>
                  <a href="#">Cuidados com a peça</a>
                </nav>
              </div>
            </div>

            <div className="footer-social">
              <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2c-2.72 0-3.06.01-4.12.06-1.06.05-1.79.22-2.43.47-.66.26-1.22.6-1.77 1.16a4.9 4.9 0 0 0-1.16 1.77c-.25.64-.42 1.37-.47 2.43C2 8.94 2 9.28 2 12s.01 3.06.06 4.12c.05 1.06.22 1.79.47 2.43.26.66.6 1.22 1.16 1.77.55.56 1.11.9 1.77 1.16.64.25 1.37.42 2.43.47C8.94 22 9.28 22 12 22s3.06-.01 4.12-.06c1.06-.05 1.79-.22 2.43-.47.66-.26 1.22-.6 1.77-1.16.56-.55.9-1.11 1.16-1.77.25-.64.42-1.37.47-2.43.05-1.06.06-1.4.06-4.12s-.01-3.06-.06-4.12c-.05-1.06-.22-1.79-.47-2.43a4.9 4.9 0 0 0-1.16-1.77 4.9 4.9 0 0 0-1.77-1.16c-.64-.25-1.37-.42-2.43-.47C15.06 2.01 14.72 2 12 2Zm0 1.8c2.67 0 2.99.01 4.04.06.98.04 1.51.21 1.86.35.47.18.8.4 1.15.75.35.35.57.68.75 1.15.14.35.31.88.35 1.86.05 1.05.06 1.37.06 4.04s-.01 2.99-.06 4.04c-.04.98-.21 1.51-.35 1.86-.18.47-.4.8-.75 1.15-.35.35-.68.57-1.15.75-.35.14-.88.31-1.86.35-1.05.05-1.37.06-4.04.06s-2.99-.01-4.04-.06c-.98-.04-1.51-.21-1.86-.35-.47-.18-.8-.4-1.15-.75-.35-.35-.57-.68-.75-1.15-.14-.35-.31-.88-.35-1.86C3.81 14.99 3.8 14.67 3.8 12s.01-2.99.06-4.04c.04-.98.21-1.51.35-1.86.18-.47.4-.8.75-1.15.35-.35.68-.57 1.15-.75.35-.14.88-.31 1.86-.35C9.01 3.81 9.33 3.8 12 3.8Zm0 3.25a4.95 4.95 0 1 0 0 9.9 4.95 4.95 0 0 0 0-9.9Zm0 8.16a3.21 3.21 0 1 1 0-6.42 3.21 3.21 0 0 1 0 6.42Zm5.14-8.36a1.16 1.16 0 1 1-2.31 0 1.16 1.16 0 0 1 2.31 0Z" />
                </svg>
              </a>
              <a href="#" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.47 14.38c-.29-.15-1.7-.84-1.97-.93-.26-.1-.46-.15-.65.15-.2.29-.75.93-.92 1.13-.17.19-.34.22-.63.07-.29-.15-1.22-.45-2.32-1.43-.86-.76-1.44-1.71-1.6-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.2.05-.36-.02-.51-.07-.15-.65-1.57-.9-2.15-.24-.57-.48-.49-.65-.5h-.56c-.19 0-.51.08-.78.36-.26.29-1.02 1-1.02 2.42s1.05 2.8 1.19 3c.15.19 2.06 3.14 4.99 4.4.7.3 1.24.48 1.66.61.7.22 1.34.19 1.84.12.56-.08 1.7-.7 1.94-1.37.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.34ZM12.03 2C6.5 2 2 6.48 2 12c0 1.86.51 3.6 1.4 5.09L2 22l5.05-1.33A9.94 9.94 0 0 0 12.03 22C17.55 22 22 17.52 22 12S17.55 2 12.03 2Zm0 18.13c-1.62 0-3.13-.44-4.42-1.2l-.32-.19-3 .79.8-2.92-.2-.3A8.08 8.08 0 0 1 3.91 12c0-4.48 3.65-8.13 8.12-8.13 4.47 0 8.12 3.65 8.12 8.13 0 4.48-3.65 8.13-8.12 8.13Z" />
                </svg>
              </a>
            </div>

            <p className="footer-copy">© {new Date().getFullYear()} Vivi Art Crochê</p>
          </div>

          <div className="footer-direita">
            <form className="contato-container" onSubmit={enviar}>
              <p className="contato-frase">
                Olá! Meu nome é{' '}
                <input
                  type="text"
                  className="contato-campo"
                  placeholder="digite seu nome…"
                  value={nome}
                  onChange={(evento) => setNome(evento.target.value)}
                  size={nome ? nome.length + 1 : 15}
                />
                , esse é meu e-mail{' '}
                <input
                  type="email"
                  className="contato-campo"
                  placeholder="digite seu e-mail…"
                  value={email}
                  onChange={(evento) => setEmail(evento.target.value)}
                  size={email ? email.length + 1 : 18}
                />
              </p>

              <p className="contato-frase">
                e o meu telefone é{' '}
                <input
                  type="tel"
                  className="contato-campo"
                  placeholder="digite seu telefone"
                  value={telefone}
                  onChange={(evento) => setTelefone(formatarTelefone(evento.target.value))}
                  inputMode="numeric"
                  maxLength={15}
                  size={telefone ? telefone.length + 1 : 17}
                />
                .
              </p>

              <p className="contato-frase contato-frase--espacada">
                E estou procurando por
              </p>

              <textarea
                className="contato-mensagem"
                placeholder="uma peça personalizada, uma dúvida, uma parceria…"
                value={mensagem}
                onChange={(evento) => setMensagem(evento.target.value)}
                rows={1}
              />

              <hr className="contato-divisor" />

              <div className="contato-rodape">
                <div className="contato-termos">
                  <p>
                    Ao clicar no botão, você concorda com os{' '}
                    <a href="#">Termos de Uso</a> e a{' '}
                    <a href="#">Política de Privacidade</a>.
                  </p>
                  <button type="submit" className="contato-botao">
                    enviar
                  </button>
                </div>

                <div className="contato-info">
                  <div>
                    <p className="contato-info__label">telefone</p>
                    <p className="contato-info__valor">(00) 00000-0000</p>
                  </div>
                  <div>
                    <p className="contato-info__label">e-mail</p>
                    <p className="contato-info__valor">contato@viviartcroche.com</p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer