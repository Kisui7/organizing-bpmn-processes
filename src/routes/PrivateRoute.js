import { useNavigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const authToken = localStorage.getItem('authToken');  // Recupera o token de autenticação


  return authToken ? children : navigate('/');
}
