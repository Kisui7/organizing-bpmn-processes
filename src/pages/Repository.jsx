import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from "react";
import Header from "../components/Header";
import "../static/Repository.css";

export default function Repository() {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      // Se o usuário não estiver logado, redireciona para a página de login
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    // Remove o token de autenticação do localStorage
    localStorage.removeItem("authToken");
    // Redireciona para a página de login
    navigate("/");
  };

  const buttonsList = [{ nome: "Sair", handleClick: handleLogout }];

  return (
    <>
      <header className="header">
        {buttonsList.map((button) => (
          <Header key={button.nome} item={button} />
        ))}
        <div className="logo">
          <h1>SouthStar</h1>
        </div>
      </header>
      <div className="search-box">
        <input
          type="text"
          className="search-txt"
          name=""
          placeholder="Search"
        />
        <a href="#" className="search-button">
          <FontAwesomeIcon icon={faSearch} />
        </a>
      </div>
    </>
  );
}
