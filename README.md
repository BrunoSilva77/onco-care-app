<div align="center">

<img src="public/assets/images/logo.png" alt="OncoCare" width="100" />

# OncoCare
### Cuidado que acolhe, tecnologia que aproxima.

*Uma plataforma digital completa para apoio a pacientes oncológicos e profissionais de saúde.*

<br />

[![React](https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)

</div>

---

## 🎯 Sobre o Projeto

O **OncoCare** nasceu da necessidade de aproximar pacientes em tratamento oncológico dos serviços de saúde e informações que precisam, de forma **acessível, segura e humana**.

A plataforma oferece:
- Acesso rápido a serviços médicos e informações de tratamento
- Comunicação facilitada com profissionais de saúde via telemedicina
- Suporte 24h via assistente de inteligência artificial especializado em oncologia
- Controle total do histórico e acompanhamento do tratamento

---

## 🔐 Autenticação

O fluxo de acesso foi projetado para ser **seguro e inclusivo**, integrando a identidade digital oficial do Governo Federal.

### Login
- Autenticação por e-mail e senha
- **Login com gov.br** — acesso imediato com sua conta do Governo Federal

### Cadastro em 2 Etapas
O usuário escolhe seu perfil e preenche informações específicas:

**Paciente** → Nome · CPF · Data de Nascimento · E-mail · Senha  
**Médico** → Nome · CRM · Especialidade · E-mail · Senha

Ambos os perfis também suportam o **Cadastro com gov.br**.

---

## 🏠 Home — Menu Giratório Interativo

A tela principal do OncoCare é o grande diferencial de experiência do usuário.

### Como funciona?

Uma **roleta animada** é fixada na lateral esquerda da tela, com dois ícones posicionados na borda do círculo: 🏠 **Casa** e ⚙️ **Configurações**.

Ao clicar em um ícone, o círculo **gira suavemente** até o ícone selecionado ficar centralizado. Em seguida, os botões do modo selecionado **surgem em cascata** — cada um deslizando e ganhando opacidade um após o outro, conectados ao ícone central por linhas pontilhadas.

---

### Modo 🏠 Home — Navegação Principal

| Botão | Destino | Descrição |
|---|---|---|
| **SINTOMAS** | `/sintomas` | Registro diário de sintomas |
| **TELEMEDICINA** | `/telemedicina` | Consulta online com médico |
| **EXAMES / CONSULTAS** | `/exames` | Histórico e agendamentos |
| **ACOMPANHAMENTO** | `/acompanhamento` | Evolução do tratamento |
| **BIBLIOTECA** | `/biblioteca` | Conteúdo educativo oncológico |

---

### Modo ⚙️ Configurações — Atalhos Rápidos

| Botão | Descrição |
|---|---|
| **MEU PERFIL** | Editar foto, nome e senha |
| **NOTIFICAÇÕES** | Alertas por app e SMS |
| **APARÊNCIA** | Ativar/desativar Modo Escuro |
| **SEGURANÇA** | Biometria (Face ID / Digital) |
| **SAIR DA CONTA** | Encerrar sessão |

---

## 🗺️ Mapa de Telas

| Rota | Tela |
|---|---|
| `/login` | Acesso com e-mail ou gov.br |
| `/cadastro` | Cadastro de Paciente ou Médico |
| `/home` | Dashboard com menu giratório |
| `/sintomas` | Registro de sintomas diários |
| `/telemedicina` | Teleconsultas médicas |
| `/exames` | Exames e consultas agendadas |
| `/acompanhamento` | Monitoramento do tratamento |
| `/biblioteca` | Artigos e informações de saúde |
| `/unidades` | Hospitais especializados próximos |
| `/farmacias` | Farmácias parceiras com desconto |
| `/planos` | Planos de assinatura OncoCare |
| `/assistente` | Chat com o OC IA |
| `/configuracoes` | Preferências e conta |

---

## 🤖 OC IA — Assistente de Oncologia

O **OC IA** é um assistente de chat integrado, treinado para responder dúvidas frequentes de pacientes oncológicos em **13 categorias**:

> Quimioterapia · Radioterapia · Sintomas · Medicamentos  
> Alimentação · Exames · Consultas · Emocional  
> Planos · Farmácias · Hospitais · Saudações · Agradecimentos

### Recursos do Chat
- 💡 **Chips de sugestão rápida** para iniciar uma conversa com um clique
- ⏳ **Indicador de digitação** — 3 bolinhas pulsantes enquanto a IA "pensa"
- ✨ Ícone de brilho em cada resposta do assistente
- 📜 Scroll automático para a última mensagem

---

## ⚙️ Configurações

A tela de configurações é organizada em seções com **toggles interativos** e ações diretas:

- 👤 **Minha Conta** — Editar perfil e alterar senha
- 🔔 **Notificações** — Liga/desliga alertas por App e SMS
- 🌙 **Aparência** — Alternância entre Modo Escuro e Claro
- 🔒 **Segurança** — Habilitar autenticação biométrica
- ℹ️ **Sobre** — Termos de uso e Central de ajuda
- 🚪 **Sair da Conta** — Botão destacado em vermelho

---

## 🎨 Design

O OncoCare adota um design **premium e acolhedor**, pensado para usuários que precisam de clareza e conforto visual:

- **Glassmorphism** — painéis translúcidos com blur e bordas suaves
- **Paleta pastel** — gradientes em roxo, azul e rosa que transmitem calma
- **Animações fluidas** — 100% CSS puro (`cubic-bezier`, `@keyframes`)
- **Mobile-first** — desenvolvido para telas de smartphone
- **Acessibilidade** — fontes legíveis, alto contraste e elementos bem espaçados

---

## 🛠️ Tecnologias

| Tecnologia | Versão | Função |
|---|---|---|
| React | 18 | Framework de interface |
| TypeScript | 5 | Tipagem e segurança |
| Vite | latest | Build e dev server |
| react-router-dom | 6 | Roteamento SPA |
| lucide-react | latest | Biblioteca de ícones |
| CSS Modular | — | Estilização por componente |

---

## 🚀 Como Executar

```bash
# Clone o repositório
git clone https://github.com/BrunoSilva77/onco-care-app.git

# Instale as dependências
cd onco-care-app
npm install

# Inicie o servidor local
npm run dev
```

Acesse em **http://localhost:5173**

---

## 🔮 Roadmap

- [ ] Integração real com autenticação gov.br (OAuth 2.0)
- [ ] OC IA conectado a uma API de LLM (Google Gemini / GPT)
- [ ] Backend com Node.js + PostgreSQL
- [ ] Notificações push para medicamentos e consultas
- [ ] Videochamada real na Telemedicina
- [ ] Dark Mode aplicado globalmente
- [ ] Publicação como PWA e nas lojas (Play Store / App Store)

---

<div align="center">

Desenvolvido por **Bruno Silva**

[![GitHub](https://img.shields.io/badge/GitHub-BrunoSilva77-181717?style=flat-square&logo=github)](https://github.com/BrunoSilva77)

<sub>Feito com 💜 para apoiar pacientes e profissionais de oncologia.</sub>

</div>
