import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { Button } from '../components/Button'
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
// import googleIconImg from '../assets/images/google-icon.svg';
import '../styles/auth.scss'
import { TestContext } from '../App';
// webpack (Module Bundler) -> pega a extensão do arquivo e configura de forma predeterminada como cada um será lido no código

export function NewRoom() {
  const { value, setValue } = useContext(TestContext)
  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <h1>{value}</h1>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
          <form>
            <input 
              type="text"
              placeholder="Nome da sala"
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
            </p>
        </div>
      </main>
    </div>
  )
}