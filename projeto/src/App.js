import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// --- Páginas e Layouts ---
import Layout from './components/Layout/Layout'; 
import Reclamacoes from './pages/Reclamacoes/Reclamacoes';
// import Relatorio from './pages/Relatorio/Relatorio'; // Removido
import Login from './pages/Login/Login';           

function App() {
  return (
    <Router>
      <Routes>
        {/* ROTA PÚBLICA: A página de login fica fora do layout principal */}
        <Route path="/login" element={<Login />} />

        {/* ROTAS PROTEGIDAS: Usam o Layout com menu e rodapé */}
        <Route path="/" element={<Layout />}>
          
          {/* Rota da página de Reclamações */}
          <Route path="/reclamacoes" element={<Reclamacoes />} />
          
          {/* Rota de Relatório removida */}
          {/* <Route path="/formulario" element={<Relatorio />} /> */}
          
          {/* Rota padrão: redireciona da raiz para a página de login */}
          <Route index element={<Navigate to="/login" />} /> 
        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;