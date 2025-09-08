import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// --- CORREÇÃO NOS CAMINHOS ---
// O './' no início significa "a partir desta mesma pasta" (no caso, a pasta 'src')
import Layout from './components/Layout/Layout'; 
import Reclamacoes from './pages/Reclamacoes/Reclamacoes';
import Relatorio from './pages/Relatorio/Relatorio';

function App() {
  return (
    <Router>
      <Routes>
        {/* A rota principal agora renderiza o Layout */}
        <Route path="/" element={<Layout />}>
          {/* As rotas filhas serão renderizadas dentro do <Outlet /> do Layout */}
          {/* O redirect agora usa 'index' para a rota pai */}
          <Route index element={<Navigate to="/reclamacoes" />} />
          <Route path="/reclamacoes" element={<Reclamacoes />} />
          <Route path="/formulario" element={<Relatorio />} />
          {/* Adicione outras rotas aqui, como /home e /mapa */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;