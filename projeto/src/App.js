import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// --- Páginas ---
// Importa os componentes que funcionam como páginas completas da aplicação.
import Reclamacoes from './pages/Reclamacoes';
import Relatorio from './pages/Relatorio';
// import Home from './pages/Home/Home'; // Descomente quando criar a página Home
// import Mapa from './pages/Mapa/Mapa';   // Descomente quando criar a página Mapa

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota para a página de Reclamações */}
        <Route path="/reclamacoes" element={<Reclamacoes />} />

        {/* Rota para a página de Relatório/Formulário */}
        <Route path="/formulario" element={<Relatorio />} />

        {/* Rotas para futuras páginas */}
        {/* <Route path="/home" element={<Home />} /> */}
        {/* <Route path="/mapa" element={<Mapa />} /> */}

        {/* Rota padrão: redireciona da raiz para a página de reclamações */}
        <Route path="/" element={<Navigate to="/reclamacoes" />} />
      </Routes>
    </Router>
  );
}

export default App;