import axios from "axios";
import { useState } from "react";
import "../static/ForgotPassword.css";

export default function ForgotPassword() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://backend-southstar.onrender.com/forgot-password",
        {
          name,
        }
      );
      setMessage(`Senha: ${response.data.password}`);
    } catch (error) {
      setMessage(
        "Erro ao recuperar senha: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <>
      <div className="forgot-password">
        <h2>Esqueceu a Senha</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <button type="submit">Recuperar Senha</button>
          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </>
  );
}
