
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Configuracoes from './pages/Configuracoes';
import Home from './pages/Home';
import Sintomas from './pages/Sintomas';
import Telemedicina from './pages/Telemedicina';
import ChatTelemedicina from './pages/ChatTelemedicina';
import ChamadaVideoTelemedicina from './pages/ChamadaVideoTelemedicina';
import Exames from './pages/Exames';
import Acompanhamento from './pages/Acompanhamento';
import Biblioteca from './pages/Biblioteca';
import AssistenteIA from './pages/AssistenteIA';
import Unidades from './pages/Unidades';
import Farmacias from './pages/Farmacias';
import Planos from './pages/Planos';
import PlanosDisponiveis from './pages/PlanosDisponiveis';
import MeuPerfil from './pages/MeuPerfil';
import Notificacoes from './pages/Notificacoes';
import Aparencia from './pages/Aparencia';
import Seguranca from './pages/Seguranca';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sintomas" element={<Sintomas />} />
          <Route path="/telemedicina" element={<Telemedicina />} />
          <Route path="/telemedicina/chat" element={<ChatTelemedicina />} />
          <Route path="/telemedicina/video" element={<ChamadaVideoTelemedicina />} />
          <Route path="/exames" element={<Exames />} />
          <Route path="/acompanhamento" element={<Acompanhamento />} />
          <Route path="/biblioteca" element={<Biblioteca />} />
          <Route path="/assistente" element={<AssistenteIA />} />
          <Route path="/unidades" element={<Unidades />} />
          <Route path="/farmacias" element={<Farmacias />} />
          <Route path="/planos" element={<Planos />} />
          <Route path="/planos-disponiveis" element={<PlanosDisponiveis />} />
          <Route path="/meu-perfil" element={<MeuPerfil />} />
          <Route path="/notificacoes" element={<Notificacoes />} />
          <Route path="/aparencia" element={<Aparencia />} />
          <Route path="/seguranca" element={<Seguranca />} />
          {/* Default route redirects to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
