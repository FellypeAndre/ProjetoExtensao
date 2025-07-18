import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Reclamacoes.css';
import logo from './components/logo_extensao.png';


const reclamacoesMock = [
  { id: 1, texto: 'Rua Pedro Alvares Cabral com Arvores quebrada', status: 'pendente' },
  { id: 2, texto: 'Rua Estevão Pinheiro com buraco enorme', status: 'atendido' },
  { id: 3, texto: 'Em frente a escola fulano de tal caiu uma arvore', status: 'pendente' },
  { id: 4, texto: 'Rua Pedro Alvares Cabral com Arvores quebrada', status: 'atendido' },
  { id: 5, texto: 'Rua Pedro Alvares Cabral com Arvores quebrada', status: 'pendente' }
];

export default function Reclamacoes() {
  const [filtro, setFiltro] = useState('');
  const [busca, setBusca] = useState('');

  const filtradas = reclamacoesMock.filter(r =>
    r.texto.toLowerCase().includes(busca.toLowerCase()) &&
    (filtro === '' || r.status === filtro)
  );

  return (
    <div className="tela-reclamacoes">
      <header className="header">
        <img src={logo} alt="Logo Ponta Porã" className="logo" />

        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/mapa">Mapa</Link>
          <Link to="/reclamacoes">Reclamações</Link>
          <Link to="/relatorios">Relatórios</Link>
        </nav>
        <button className="btn-sair">Sair</button>
      </header>

      <div className="main-content">
        <div className="filtro-container">
          <input
            type="text"
            placeholder="Digite aqui... Ex: Rua pedro alves 857"
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

      <footer className="footer">
        <img src={logo} alt="Logo Ponta Porã" className="logo-footer" />
      </footer>
    </div>
  );
}
