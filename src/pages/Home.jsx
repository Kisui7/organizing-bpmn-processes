// Home.js
import { useState } from 'react';
import Login from '../components/Login';
import Recovery from '../components/Recovery';
import Cadastro from '../components/Cadastro';
import '../static/Home.css';

export default function Home() {
  const [view, setView] = useState("login");

  return (
    <div className="main-container">
      <div className="content">
        {view === "login" && <Login setView={setView} />}
        {view === "recovey" && <Recovery setView={setView} />}
        {view === "cadastro" && <Cadastro setView={setView} />}
      </div>
    </div>
  );
}
