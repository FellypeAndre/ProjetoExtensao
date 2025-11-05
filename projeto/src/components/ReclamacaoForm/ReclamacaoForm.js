import React, { useState } from 'react';
import './ReclamacaoForm.css';

const ReclamacaoForm = ({ onSuccess }) => { 
  // States para todos os campos do formulário
  const [problema, setProblema] = useState('');
  const [detalhes, setDetalhes] = useState('');
  const [tipoProblema, setTipoProblema] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [cep, setCep] = useState('');
  
  // 1. ADICIONADO STATE PARA O STATUS (com valor padrão 'pendente')
  const [status, setStatus] = useState('PENDENTE'); 
  
  const [midias, setMidias] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleFileChange = (event) => {
    setMidias(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const token = localStorage.getItem('userToken');
    if (!token) {
      setError('Você não está logado. Faça o login para enviar uma reclamação.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    // Adicionar os dados de texto ao FormData
    formData.append('problema', problema);
    formData.append('detalhes', detalhes);
    formData.append('tipo_problema', tipoProblema);
    formData.append('rua', rua);
    formData.append('bairro', bairro);
    formData.append('cep', cep);
    formData.append('data_inicio', new Date().toISOString().split('T')[0]);
    
    // 2. O VALOR DO STATUS AGORA VEM DO STATE
    formData.append('status', status); 

    if (midias.length === 0) {
        setError('Você precisa anexar pelo menos um arquivo de mídia.');
        setLoading(false);
        return;
    }
    
    for (let i = 0; i < midias.length; i++) {
      formData.append('midias', midias[i]);
    }

    try {
      const response = await fetch('http://localhost:8080/solicitacoes', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Falha ao enviar: ${response.status} - ${errorData}`);
      }

      setSuccess('Reclamação enviada com sucesso!');
      
      if (onSuccess) {
        onSuccess();
      }
      
      // Limpar o formulário
      setProblema('');
      setDetalhes('');
      setTipoProblema('');
      setRua('');
      setBairro('');
      setCep('');
      setStatus('pendente'); // 3. ADICIONADO RESET DO STATUS
      setMidias([]);
      event.target.reset();

    } catch (err) {
      console.error('Erro ao enviar formulário:', err);
      setError(err.message || 'Erro ao enviar a reclamação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="reclamacao-form" onSubmit={handleSubmit}>
      <h2>Abrir Nova Reclamação</h2>
      
      {error && <div className="form-error">{error}</div>}
      {success && <div className="form-success">{success}</div>}

      <div className="form-group-inline">
        <div className="form-group" style={{ flex: 2 }}>
          <label htmlFor="tipoProblema">Tipo do Problema</label>
          <input
            type="text"
            id="tipoProblema"
            value={tipoProblema}
            onChange={(e) => setTipoProblema(e.target.value)}
            required
          />
        </div>

        {/* 4. ADICIONADO CAMPO DE SELECT PARA STATUS */}
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="status">Status</label>
          <select 
            id="status" 
            value={status} 
            onChange={(e) => setStatus(e.target.value)} 
            required
          >
            <option value="PENDENTE">PENDENTE</option>
            <option value="ATENDIDO">ATENDIDO</option>
            {/* Adicione outros status se a sua API permitir */}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="problema">Descrição Curta (Problema)</label>
        <input
          type="text"
          id="problema"
          value={problema}
          onChange={(e) => setProblema(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="detalhes">Detalhes (O que aconteceu?)</label>
        <textarea
          id="detalhes"
          value={detalhes}
          onChange={(e) => setDetalhes(e.target.value)}
          required
        />
      </div>

      <div className="form-group-inline">
        <div className="form-group" style={{ flex: 2 }}>
          <label htmlFor="rua">Rua</label>
          <input
            type="text"
            id="rua"
            value={rua}
            onChange={(e) => setRua(e.target.value)}
            required
          />
        </div>
        <div className="form-group" style={{ flex: 1.5 }}>
          <label htmlFor="bairro">Bairro</label>
          <input
            type="text"
            id="bairro"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
            required
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="cep">CEP</label>
          <input
            type="text"
            id="cep"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="midias">Fotos / Vídeos</label>
        <input
          type="file"
          id="midias"
          onChange={handleFileChange}
          multiple
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar Reclamação'}
      </button>
    </form>
  );
};

export default ReclamacaoForm;