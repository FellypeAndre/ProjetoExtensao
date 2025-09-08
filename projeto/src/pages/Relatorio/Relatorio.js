// src/pages/Relatorio/Relatorio.js

import React, { useState } from 'react';
import './relatorio.css';

// Componente da página de geração de relatório, agora focado apenas em sua responsabilidade.
const Relatorio = () => {
  const initialState = {
    dataInicio: '',
    dataFim: '',
    bairro: '',
    tipo: 'buraco',
    status: 'em_andamento',
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormData(initialState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados do Relatório:', formData);
    alert('Relatório gerado! Verifique o console para ver os dados (F12).');
  };

  // O return agora contém APENAS o conteúdo principal desta página.
  return (
    <main className="main-content-relatorio"> {/* Use uma classe específica se precisar */}
      <form className="formulario" onSubmit={handleSubmit}>
        <h1 className="titulo">Gerar Relatório de Reclamações</h1>

        {/* Data de Início e Fim */}
        <div className="campo-wrapper">
          <div className="campo">
            <label htmlFor="dataInicio">
              Início
              <input
                type="date"
                id="dataInicio"
                name="dataInicio"
                value={formData.dataInicio}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="campo">
            <label htmlFor="dataFim">
              Final
              <input
                type="date"
                id="dataFim"
                name="dataFim"
                value={formData.dataFim}
                onChange={handleChange}
              />
            </label>
          </div>
        </div>

        {/* Bairro */}
        <div className="campo">
          <label htmlFor="bairro">
            Bairro
            <input
              type="text"
              id="bairro"
              name="bairro"
              placeholder="Digite o bairro"
              value={formData.bairro}
              onChange={handleChange}
            />
          </label>
        </div>

        {/* Tipo e Status (agrupados para melhor layout) */}
        <div className="campo-wrapper">
            <div className="campo">
                <label htmlFor="tipo">
                Tipo
                <select id="tipo" name="tipo" value={formData.tipo} onChange={handleChange}>
                    <option value="buraco">Buraco na rua</option>
                    <option value="lixo">Acúmulo de lixo</option>
                    <option value="iluminacao">Iluminação pública</option>
                </select>
                </label>
            </div>
            <div className="campo">
                <label htmlFor="status">
                Status
                <select id="status" name="status" value={formData.status} onChange={handleChange}>
                    <option value="pendente">Pendente</option>
                    <option value="em_andamento">Em andamento</option>
                    <option value="resolvido">Resolvido</option>
                </select>
                </label>
            </div>
        </div>

        <div className="botoes">
          <button type="button" onClick={handleReset} className="btn-amarelo">
            Limpar Filtro
          </button>
          <button type="submit" className="btn-verde">
            Gerar Relatório
          </button>
        </div>
      </form>
    </main>
  );
};

export default Relatorio;