import axios from "axios";
import { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import "../static/Login.css";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://backend-southstar.onrender.com/login",
        {
          name,
          password,
        }
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
    <>
      <div className="login">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <h1>Entre no SouthStar</h1>
            <div className="input-field">
              <input
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FaUser className="icon" />
            </div>
            <div className="input-field">
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FaLock className="icon" />
            </div>
            <div className="recall-forget">
              <label>
                <input type="checkbox" />
                Lembre de mim
              </label>
              <a href="/forgot-password">Esqueceu a senha?</a>
            </div>
            <button type="submit">Entrar</button>
            <div className="signup-link">
              <p>
                Não tem uma conta? <a href="/register">Registrar</a>
              </p>
            </div>
            {message && <p>{message}</p>}
          </form>
        </div>
      </div>
    </>
  );
}
