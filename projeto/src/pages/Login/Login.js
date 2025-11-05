import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const loginData = {
      cpf: cpf,
      password: password
    };

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        // Se a resposta for bem-sucedida (status 2xx)
        const token = await response.text(); // O backend envia o token como texto puro

        // --- MUDANÇA PRINCIPAL AQUI ---
        // Salvamos o token no localStorage do navegador
        localStorage.setItem('userToken', token); 
        
        console.log('Login bem-sucedido! Token salvo.');
        alert('Login realizado com sucesso!');
        
        // Redireciona o usuário para a página de reclamações
        navigate('/reclamacoes'); 

      } else {
        // Se a resposta for um erro (status 4xx ou 5xx)
        const errorData = await response.text();
        console.error('Falha no login:', errorData);
        setError('CPF ou senha inválidos. Tente novamente.');
      }
    } catch (err) {
      console.error('Erro de rede ou ao conectar com a API:', err);
      setError('Não foi possível conectar ao servidor. Verifique sua conexão.');
    }
  };

  return (
    // ... seu formulário JSX continua o mesmo ...
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        
        <div className="form-group">
          <label htmlFor="cpf">CPF</label>
          <input
            type="text"
            id="cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        {error && <p className="error-message">{error}</p>}
        
        <button type="submit" className="login-button">Entrar</button>
      </form>
    </div>
  );
};

export default Login;