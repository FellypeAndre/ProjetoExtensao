// src/components/Layout/Layout.js

import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import logo from '../../assets/images/logo_extensao.png'; // Caminho correto
import './Layout.css'; // Crie um CSS para o layout

const Layout = () => {
  return (
    <div className="app-container">
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
        <nav className="navbar">
          {/* Use <Link> para navegação interna! */}
          <Link to="/home">Home</Link>
          <Link to="/mapa">Mapa</Link>
          <Link to="/reclamacoes">Reclamações</Link>
          <Link to="/formulario">Relatório</Link>
        </nav>
        <button className="btn-sair">Sair</button>
      </header>

      <main className="main-container">
        {/* <Outlet /> é o espaço onde o React Router renderizará a página da rota atual */}
        <Outlet />
      </main>

      <footer className="footer">
        <img src={logo} alt="Logo" className="logo-footer" />
      </footer>
    </div>
  );
};

export default Layout;