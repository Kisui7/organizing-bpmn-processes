// Login.js
import axios from "axios";
import { useState } from "react";
import "../static/Login.css";
import copy from '../assets/copy.svg';

export default function Login({ setView }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://backend-southstar.onrender.com/login",
        { name, password }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        "Erro ao fazer login: " +
        (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="entry">
      <div className="left-container"> 
        <h1>ProcessSync</h1>
        <h2>O ProcessSync ajuda você a padronizar e <br />organizar os processos BPMN da sua empresa.</h2>
        <img src={copy} alt="" className="animated"/>
      </div>
      <div className="right-container">
        <div className="card-container">
          <h1>Entrar</h1>
          <form onSubmit={handleSubmit}>
            <div className="textfield">
              <label htmlFor="usuario">Usuário</label>
              <input
                type="text"
                name="usuario"
                placeholder="Usuário"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="textfield">
              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                name="senha"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="button-right-container">ENTRAR</button>
            <button onClick={() => setView("recovey")} className="viewStatus">Esqueceu a senha?</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
}
