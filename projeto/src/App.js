import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importe suas páginas (componentes)
import Reclamacoes from './Reclamacoes';
import Relatorio from './components/Relatorio'; // Certifique-se de que o caminho está correto
// Importe também Home e Mapa quando os criar

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota para a página de Reclamações */}
        <Route path="/Reclamacoes" element={<Reclamacoes />} />

        {/* Rota para a página de Relatório */}
        <Route path="/form" element={<Relatorio />} />

        {/* Adicione rotas para Home e Mapa aqui */}
        {/* <Route path="/home" element={<Home />} /> */}
        {/* <Route path="/mapa" element={<Mapa />} /> */}

        {/* Redireciona a rota inicial "/" para "/reclamacoes" */}
        <Route path="/" element={<Navigate to="/reclamacoes" />} />
      </Routes>
    </Router>
  );
}

export default App;