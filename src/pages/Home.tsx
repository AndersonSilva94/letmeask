import { FormEvent, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useHistory } from 'react-router-dom';

// import { auth, firebase } from '../services/firebase';
import { database } from '../services/firebase';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button'

import '../styles/auth.scss'
// webpack (Module Bundler) -> pega a extensão do arquivo e configura de forma predeterminada como cada um será lido no código

export function Home() {
  const history = useHistory(); // o hook tem que acontecer dentro do componente, pois faz uso de informações do contexto do componente
  const [roomCode, setRoomCode] = useState('')
  const { user, signInWithGoogle } = useAuth();

  async function handleCreateRoom(){
    if(!user) {
      await signInWithGoogle();
    }

    history.push('/rooms/new')
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') return;

    const roomRef = await database.ref(`rooms/${roomCode}`).get(); // pega o id específico da sala

    if (!roomRef.exists()) { // caso a sala não exista
      alert('Room does not exists');
      return;
    }

    if (roomRef.val().endedAt) {
      alert('Room already closed');
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">Ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input 
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}