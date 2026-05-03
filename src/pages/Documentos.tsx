import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import { FileText, Download, Plus, Search, FolderOpen } from 'lucide-react';
import '../styles/Documentos.css';

const Documentos: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'carteirinha' | 'exames'>('carteirinha');

  const examesSalvos = [
    { id: 1, nome: 'Hemograma Completo', data: '10/05/2026', size: '2.4 MB' },
    { id: 2, nome: 'Ressonância Magnética', data: '15/04/2026', size: '15.8 MB' },
    { id: 3, nome: 'Laudo Biópsia', data: '02/03/2026', size: '1.1 MB' }
  ];

  return (
    <div className="page-container">
      <TopBar title="Meus Documentos" />
      
      <div className="documentos-content">
        {/* Tabs */}
        <div className="docs-tabs">
          <button 
            className={`doc-tab ${activeTab === 'carteirinha' ? 'active' : ''}`}
            onClick={() => setActiveTab('carteirinha')}
          >
            Carteirinha
          </button>
          <button 
            className={`doc-tab ${activeTab === 'exames' ? 'active' : ''}`}
            onClick={() => setActiveTab('exames')}
          >
            Cofre de Exames
          </button>
        </div>

        {/* Tab Content: Carteirinha */}
        {activeTab === 'carteirinha' && (
          <div className="carteirinha-tab fade-in">
            <div className="digital-card">
              <div className="card-header">
                <img src="/assets/images/logo.png" alt="Logo" className="card-logo" />
                <span className="card-type">Premium</span>
              </div>
              <div className="card-body">
                <div className="card-info">
                  <span className="card-label">Beneficiário</span>
                  <h3 className="card-name">Michael Cuccione</h3>
                </div>
                <div className="card-info">
                  <span className="card-label">Código OncoCare</span>
                  <p className="card-number">9876 5432 1098 7654</p>
                </div>
                <div className="card-footer-row">
                  <div className="card-info">
                    <span className="card-label">Validade</span>
                    <p className="card-validity">12/28</p>
                  </div>
                  <div className="card-info">
                    <span className="card-label">Estágio</span>
                    <p className="card-stage">III</p>
                  </div>
                </div>
              </div>
              {/* Fake QR Code using CSS/SVG for aesthetics */}
              <div className="card-qr">
                <div className="qr-placeholder">QR</div>
              </div>
            </div>
            
            <p className="card-helper-text">
              Apresente este cartão digital nas unidades e farmácias parceiras para agilizar seu atendimento e garantir descontos.
            </p>
          </div>
        )}

        {/* Tab Content: Exames */}
        {activeTab === 'exames' && (
          <div className="exames-tab fade-in">
            <div className="exames-actions">
              <div className="docs-search-bar">
                <Search size={18} className="search-icon" />
                <input type="text" placeholder="Buscar exame..." />
              </div>
              <button className="btn-add-doc" onClick={() => alert('Abrindo explorador de arquivos...')}>
                <Plus size={20} />
              </button>
            </div>

            <div className="docs-list">
              {examesSalvos.map(doc => (
                <div key={doc.id} className="doc-item">
                  <div className="doc-icon-wrapper">
                    <FileText size={24} className="doc-icon" />
                  </div>
                  <div className="doc-info">
                    <h4>{doc.nome}</h4>
                    <p>{doc.data} • {doc.size}</p>
                  </div>
                  <button className="doc-download-btn" onClick={() => alert(`Baixando ${doc.nome}...`)}>
                    <Download size={20} />
                  </button>
                </div>
              ))}
            </div>

            <div className="docs-empty-state" style={{ display: examesSalvos.length === 0 ? 'flex' : 'none' }}>
              <FolderOpen size={48} className="empty-icon" />
              <p>Nenhum exame armazenado ainda.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Documentos;
