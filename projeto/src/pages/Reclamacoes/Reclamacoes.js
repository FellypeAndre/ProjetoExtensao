import React, { useState, useEffect } from 'react';
import './Reclamacoes.css';
// 1. REMOVIDO: O import do ReclamacaoForm não é mais necessário
// import ReclamacaoForm from '../../components/ReclamacaoForm/ReclamacaoForm';

export default function Reclamacoes() {
  // States para a lista
  const [reclamacoes, setReclamacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // States para os filtros
  const [filtro, setFiltro] = useState('');
  const [busca, setBusca] = useState('');

  // Função para buscar os dados da API
  const fetchReclamacoes = () => {
    setLoading(true);
    setError(null);
    
    const token = localStorage.getItem('userToken');
    if (!token) {
      setError('Você não está logado. Por favor, faça o login primeiro.');
      setLoading(false);
      return;
    }

    const apiUrl = 'http://localhost:8080/solicitacoes'; // URL da API de Reclamações

    fetch(apiUrl, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Falha ao buscar dados. Verifique seu token ou a API.');
        }
        return res.json();
      })
      .then(data => {
        setReclamacoes(data);
      })
      .catch(err => {
        setError(err.message);
        console.error("Erro ao buscar reclamações:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Buscar dados ao carregar a página pela primeira vez
  useEffect(() => {
    fetchReclamacoes();
  }, []); // O array vazio [] garante que rode apenas uma vez.

  // 2. REMOVIDO: A função handleFormSuccess não é mais necessária

  // Lógica de filtro (ajuste 'r.problema' se o nome do campo for outro)
  const filtradas = reclamacoes.filter(r =>
    (r.problema && r.problema.toLowerCase().includes(busca.toLowerCase())) &&
    (filtro === '' || r.status === filtro)
  );

  return (
    // 3. A classe 'tela-reclamacoes' será nosso container principal
    //    para controlar o layout estático e a rolagem
    <div className="tela-reclamacoes">
      
      {/* 4. REMOVIDO: O <ReclamacaoForm /> e o <hr /> foram excluídos */}

      {/* 5. O filtro agora é a parte estática superior */}
      <div className="filtro-container">
        <input
          type="text"
          placeholder="Buscar por descrição..."
          className="input-busca"
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />
        <select className="select-filtro" value={filtro} onChange={e => setFiltro(e.target.value)}>
          <option value="">Todos</option>
          <option value="PENDENTE">Pendente</option>
          <option value="EM_ANDAMENTO">Em Andamento</option>
          <option value="ATENDIDO">Atendido</option>
          {/* Adicione outros status se necessário */}
        </select>
      </div>

      {/* 6. Este wrapper vai conter a lista e permitir a rolagem */}
      <div className="lista-wrapper">
        {loading && <div className="loading-message">Carregando reclamações...</div>}
        {error && <div className="error-message">{error}</div>}
        
        {!loading && !error && (
          <div className="lista-reclamacoes">
            {filtradas.length === 0 ? (
              <div className="reclamacao-vazia">Nenhuma reclamação encontrada.</div>
            ) : (
              filtradas.map(rec => (
                <div key={rec.id} className="reclamacao-item">
                  <span className="reclamacao-texto">{rec.problema || 'Sem descrição'}</span>
                  <div className="reclamacao-acoes">
                    <button className="reclamacao-icon"></button>
                    <span className={`reclamacao-status status-${rec.status}`}>
                      {rec.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}