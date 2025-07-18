import React, { useState } from 'react';
import './Relatorio.css'; // Criaremos este arquivo a seguir
import { FiLogOut } from 'react-icons/fi'; // Ícone para o botão Sair

// Componente da página de geração de relatório
const Relatorio = () => {
  // Estado inicial do formulário
  const initialState = {
    dataInicio: '',
    dataFim: '',
    bairro: '',
    tipo: 'buraco',
    status: 'em_andamento',
  };

  // Cria um estado para gerenciar os dados do formulário
  const [formData, setFormData] = useState(initialState);

  // Função para lidar com mudanças em QUALQUER campo do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Função para "limpar" o formulário, resetando o estado
  const handleReset = () => {
    setFormData(initialState);
  };

  // Função para "enviar" o formulário
  const handleSubmit = (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    console.log('Dados do Relatório:', formData);
    alert('Relatório gerado! Verifique o console para ver os dados (F12).');
    // Aqui você adicionaria a lógica para enviar os dados para um backend ou gerar um PDF
  };

  return (
    <div className="tela-relatorio">
      <header className="header">
        {/* Substitua o src pela imagem do seu projeto */}
        <img src="/logo_extensao.png" alt="Logo Prefeitura Ponta Porã" className="logo" />
        <button className="btn-sair">
          <FiLogOut size={20} style={{ marginRight: '8px' }} />
          Sair
        </button>
      </header>

      <nav className="navbar">
        <a href="/home">Home</a>
        <a href="/mapa">Mapa</a>
        <a href="/reclamacoes">Reclamações</a>
        <a href="/relatorio" className="active">Relatório</a>
      </nav>

      <main className="main-content">
        <form className="formulario" onSubmit={handleSubmit}>
          <h1 className="titulo">Gerar Relatório de Reclamações</h1>

          {/* Data de Início */}
          <div className="campo-wrapper">
            <div className="campo">
              <label htmlFor="dataInicio">
                <span className="icone">Início</span>
                <input
                  type="date"
                  id="dataInicio"
                  name="dataInicio"
                  value={formData.dataInicio}
                  onChange={handleChange}
                />
              </label>
            </div>

            {/* Data Final */}
            <div className="campo">
              <label htmlFor="dataFim">
                <span className="icone">Final</span>
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
              <span className="rotulo">Bairro</span>
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

          {/* Tipo de Reclamação */}
          <div className="campo">
            <label htmlFor="tipo">
              <span className="rotulo">Tipo</span>
              <select id="tipo" name="tipo" value={formData.tipo} onChange={handleChange}>
                <option value="buraco">Buraco na rua</option>
                <option value="lixo">Acúmulo de lixo</option>
                <option value="iluminacao">Iluminação pública</option>
              </select>
            </label>
          </div>

          {/* Status */}
          <div className="campo">
            <label htmlFor="status">
              <span className="rotulo">Status</span>
              <select id="status" name="status" value={formData.status} onChange={handleChange}>
                <option value="pendente">Pendente</option>
                <option value="em_andamento">Em andamento</option>
                <option value="resolvido">Resolvido</option>
              </select>
            </label>
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

      <footer className="footer">
        <img src="/logo_extensao.png" alt="Prefeitura de Ponta Porã" className="logo-footer" />
      </footer>
    </div>
  );
};

export default Relatorio;