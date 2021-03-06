import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button } from '../components/Button'

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
// import googleIconImg from '../assets/images/google-icon.svg';
import '../styles/auth.scss'
import { database } from '../services/firebase';
// webpack (Module Bundler) -> pega a extensão do arquivo e configura de forma predeterminada como cada um será lido no código

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') return; //verifico se o nome da sala é vazio (o trim tira qualquer espaçamento existente)

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id, // a interrogação serve para dizer que o usuário pode estar undefined
    });

    history.push(`/rooms/${firebaseRoom.key}`);
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
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
              type="text"
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
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