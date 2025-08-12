// src/pages/Reclamacoes/Reclamacoes.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Reclamacoes.css';
// CORREÇÃO 1: Corrigido o caminho para a pasta de assets
import logo from '../../assets/images/logo_extensao.png';

// Este dado virá de uma API no futuro.
const reclamacoesMock = [
  { id: 1, texto: 'Rua Pedro Alvares Cabral com Arvores quebrada', status: 'pendente' },
  { id: 2, texto: 'Rua Estevão Pinheiro com buraco enorme', status: 'atendido' },
  { id: 3, texto: 'Em frente a escola fulano de tal caiu uma arvore', status: 'pendente' },
];

export default function Reclamacoes() {
  // OTIMIZAÇÃO 2: Prepara o state para receber dados de uma API
  const [reclamacoes, setReclamacoes] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [busca, setBusca] = useState('');

  // Hook para buscar os dados quando o componente for montado
  useEffect(() => {
    // Por enquanto, apenas carregamos os dados mockados.
    // No futuro, aqui você faria a chamada para sua API.
    // Ex: fetch('http://sua-api.com/reclamacoes').then(res => res.json()).then(data => setReclamacoes(data));
    setReclamacoes(reclamacoesMock);
  }, []); // O array vazio [] faz com que isso rode apenas uma vez.

  // Lógica de filtro permanece, agora usando o state 'reclamacoes'
  const filtradas = reclamacoes.filter(r =>
    r.texto.toLowerCase().includes(busca.toLowerCase()) &&
    (filtro === '' || r.status === filtro)
  );

  return (
    <div className="tela-reclamacoes">
      {/* SUGESTÃO: Este header deveria ser um componente reutilizável */}
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/mapa">Mapa</Link>
          <Link to="/reclamacoes">Reclamações</Link>
          {/* CORREÇÃO 2: Rota ajustada para ser consistente com App.js */}
          <Link to="/formulario">Relatórios</Link>
        </nav>
        <button className="btn-sair">Sair</button>
      </header>

      <div className="main-content">
        <div className="filtro-container">
          <input
            type="text"
            placeholder="Digite para buscar uma reclamação..."
            className="input-busca"
            value={busca}
            onChange={e => setBusca(e.target.value)}
          />
          <div className="filtro-wrapper">
            <span>Filtrar por</span>
            <select className="select-filtro" value={filtro} onChange={e => setFiltro(e.target.value)}>
              <option value="">Todos</option>
              <option value="pendente">Pendente</option>
              <option value="atendido">Atendido</option>
            </select>
          </div>
        </div>

        <div className="lista-reclamacoes">
          {filtradas.map(rec => (
            <div key={rec.id} className="reclamacao-item">
              <span className="reclamacao-texto">{rec.texto}</span>
              <div className="reclamacao-acoes">
                <button className="reclamacao-icon">📄</button>
                <span className={`reclamacao-status status-${rec.status}`}>
                  {rec.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

       
    </div>
  );
}