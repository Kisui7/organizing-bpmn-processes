import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import Repository from "./pages/Repository";
import PrivateRoute from "./routes/PrivateRoute";
import Home from './pages/Home';
import './App.css';

// Criação do roteador com as rotas definidas
const router = createBrowserRouter([
  {
    element: (
      <>
        {/* Mostrar Header apenas se o usuário estiver logado */}
        {/* <Header />   */}
        <main>
          <Outlet />
        </main>
      </>
    ),
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/repositorio-de-processos',
        element: 
          <PrivateRoute>
            <Repository />
          </PrivateRoute>
      }
    ]
  }
]);

// Componente principal
function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
