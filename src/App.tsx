
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Configuracoes from './pages/Configuracoes';
import Home from './pages/Home';
import Sintomas from './pages/Sintomas';
import Telemedicina from './pages/Telemedicina';
import Exames from './pages/Exames';
import Acompanhamento from './pages/Acompanhamento';
import Biblioteca from './pages/Biblioteca';
import AssistenteIA from './pages/AssistenteIA';
import Unidades from './pages/Unidades';
import Farmacias from './pages/Farmacias';
import Planos from './pages/Planos';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sintomas" element={<Sintomas />} />
        <Route path="/telemedicina" element={<Telemedicina />} />
        <Route path="/exames" element={<Exames />} />
        <Route path="/acompanhamento" element={<Acompanhamento />} />
        <Route path="/biblioteca" element={<Biblioteca />} />
        <Route path="/assistente" element={<AssistenteIA />} />
        <Route path="/unidades" element={<Unidades />} />
        <Route path="/farmacias" element={<Farmacias />} />
        <Route path="/planos" element={<Planos />} />
        {/* Default route redirects to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
