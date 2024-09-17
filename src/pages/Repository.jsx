import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import "../static/Repository.css";

export default function Repository() {
  const navigate = useNavigate();
  const [processos, setProcessos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const handleGetProcessos = async () => {
    setLoading(true);
    const authToken = localStorage.getItem("authToken");

    try {
      const response = await fetch('https://backend-southstar.onrender.com/processos', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      const data = await response.json();
      setProcessos(data);
      setError(null);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar processos:", error.message);
      setError("Erro ao buscar processos");
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    const authToken = localStorage.getItem("authToken");
    setLoading(true);
    setError("");
    setProcessos([]);

    try {
      const response = await fetch(`https://backend-southstar.onrender.com/processos/${searchTerm}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      const data = await response.json();
      setProcessos(data);
      setError(null);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar processos:", error.message);
      setError("Nenhum processo encontrado.");
      setLoading(false);
    }
  };

  const buttonsList = [{ nome: "Sair", handleClick: handleLogout }];

  return (
    <>
      <header>
        <div className="repository-logo">
          <h1>ProcessSync</h1>
        </div>
        {buttonsList.map((button) => (
          <Header key={button.nome} item={button} />
        ))}
      </header>

      <div className="repository-search-box">
        <input 
          type="text" 
          className="repository-search-txt" 
          placeholder="Buscar" 
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <button className="repository-search-button" aria-label="Buscar" onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      <h1 className="repository-page-title">Repositório de Processos</h1>
      <div className="repository-button">
        <button onClick={handleGetProcessos} className="repository-todos-os-processos">
          Todos os Processos
        </button>
      </div>
      
      <div className="repository-processos-list">
        {loading && <p>Carregando...</p>}
        {error && <p className="repository-error-message">{error}</p>}
        {processos.length > 0 ? (
          <div className="repository-processos-cards">
            {processos.map((processo) => (
              <div className="repository-processo-card" key={processo.id}>
                <h2>{processo.nome}</h2>
                <p><strong>Número:</strong> {processo.numero}</p>
                <p><strong>Descrição:</strong> {processo.descricao}</p>
                <p><strong>Data:</strong> {processo.data}</p>
              </div>
            ))}
          </div>
        ) : (
          !loading
        )}
      </div>
    </>
  );
}
