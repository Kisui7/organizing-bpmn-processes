import "./Header.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header className="header">
        <div className="logo">
          <h1>SouthStar</h1>
        </div>
        <div className="links-nav">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/cadastro">Cadastro</Link>
        </div>
      </header>
    </>
  );
}
