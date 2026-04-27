# OncoCare — Documentação Técnica

Aplicação web mobile-first para suporte a pacientes oncológicos e profissionais de saúde, desenvolvida com **Vite + React + TypeScript**.

---

## Stack Tecnológica

| Tecnologia | Versão | Uso |
|---|---|---|
| Vite | latest | Build tool e dev server |
| React | 18 | Framework de UI (SPA) |
| TypeScript | 5 | Tipagem estática |
| react-router-dom | 6 | Roteamento client-side |
| lucide-react | latest | Ícones SVG |
| CSS Modular | — | Estilização (um `.css` por página/componente) |

Sem uso de Tailwind, Bootstrap ou bibliotecas de componentes. Todo o design foi implementado em CSS puro com glassmorphism, gradientes e animações via `@keyframes`.

---

## Estrutura de Pastas

```
onco-care-app/
├── public/
│   └── assets/
│       └── images/
│           ├── logo.png          # Logo circular do OncoCare
│           ├── login_bg.png      # Fundo da tela de login
│           └── gov_icon.png      # Ícone do gov.br
├── src/
│   ├── App.tsx                   # Definição de todas as rotas
│   ├── main.tsx                  # Entry point
│   ├── index.css                 # Reset e variáveis globais
│   ├── components/
│   │   ├── TopBar.tsx / .css     # Barra superior reutilizável (título + voltar)
│   │   ├── DropdownMenu.tsx / .css  # Menu suspenso (Home → Configurações)
│   │   └── FloatingAssistant.tsx / .css
│   └── pages/
│       ├── Login.tsx / .css
│       ├── Cadastro.tsx / .css
│       ├── Home.tsx / .css
│       ├── Sintomas.tsx / .css
│       ├── Telemedicina.tsx / .css
│       ├── Exames.tsx / .css
│       ├── Acompanhamento.tsx / .css
│       ├── Biblioteca.tsx / .css
│       ├── Unidades.tsx / .css
│       ├── Farmacias.tsx / .css
│       ├── Planos.tsx / .css
│       ├── AssistenteIA.tsx / .css
│       └── Configuracoes.tsx / .css
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Rotas Registradas (`App.tsx`)

```tsx
<Routes>
  <Route path="/"               element={<Navigate to="/login" />} />
  <Route path="/login"          element={<Login />} />
  <Route path="/cadastro"       element={<Cadastro />} />
  <Route path="/home"           element={<Home />} />
  <Route path="/sintomas"       element={<Sintomas />} />
  <Route path="/telemedicina"   element={<Telemedicina />} />
  <Route path="/exames"         element={<Exames />} />
  <Route path="/acompanhamento" element={<Acompanhamento />} />
  <Route path="/biblioteca"     element={<Biblioteca />} />
  <Route path="/unidades"       element={<Unidades />} />
  <Route path="/farmacias"      element={<Farmacias />} />
  <Route path="/planos"         element={<Planos />} />
  <Route path="/assistente"     element={<AssistenteIA />} />
  <Route path="/configuracoes"  element={<Configuracoes />} />
</Routes>
```

---

## Implementações Técnicas por Módulo

### Login (`/login`)

- Logo circular com recorte CSS via `overflow: hidden` + `object-position: top` para eliminar área indesejada da imagem sem edição externa
- `mix-blend-mode: multiply` aplicado na imagem para integração com o fundo
- Botão **gov.br** com ícone local (`/assets/images/gov_icon.png`) — sem dependência de URL externa
- Links "Esqueceu a senha?" e "Cadastre-se!" posicionados dentro do `<form>`, entre o botão "Entrar" e o divisor "OU"
- Container com `min-height: 100vh` + `overflow-y: auto` para permitir scroll em telas menores

---

### Cadastro (`/cadastro`)

Estado interno com 3 etapas controlado por `useState`:

```tsx
type Step = 'selecao' | 'paciente' | 'medico';
const [step, setStep] = useState<Step>('selecao');
```

- **Etapa `selecao`**: dois cards clicáveis (Paciente / Médico) que alteram o `step`
- **Etapa `paciente`**: campos CPF e Data de Nascimento
- **Etapa `medico`**: campos CRM e Especialidade
- Campos comuns (Nome, E-mail, Senha) presentes em ambos os formulários
- Botão "Voltar" navega entre etapas antes de retornar ao `/login`

---

### Home — Menu Giratório (`/home`)

Implementação mais complexa do projeto. Usa `useState<'home' | 'settings'>` para controlar qual modo está ativo.

#### Estrutura HTML da roleta

```tsx
<div className="half-circle">                         {/* meia-lua visível */}
  <div className={`inner-half-circle spinning-wheel ${activeMenu}`}>
    {/* Círculo completo que gira */}
    <div className="wheel-icon pos-home" onClick={() => setActiveMenu('home')}>
      {/* ícone Casa */}
    </div>
    <div className="wheel-icon pos-settings" onClick={() => setActiveMenu('settings')}>
      {/* ícone Engrenagem */}
    </div>
  </div>
</div>
```

#### Mecânica de rotação (CSS)

O círculo completo (280×280px) fica deslocado para a esquerda (`left: -80px`) de forma que apenas a metade direita é visível. A rotação move os ícones para a posição central:

```css
.spinning-wheel.home     { transform: rotate(0deg);   }
.spinning-wheel.settings { transform: rotate(-45deg); }
```

Os ícones aplicam contra-rotação para ficarem sempre upright:

```css
.spinning-wheel.settings .pos-home,
.spinning-wheel.settings .pos-settings {
  transform: rotate(45deg);
}
```

#### Posicionamento dos ícones na borda do círculo

Os ícones são posicionados com `position: absolute` usando coordenadas calculadas a partir do centro do círculo (140, 140) e raio de 120px:

```
left = 140 + 120 * cos(ângulo°) - 24   (24 = metade da largura do ícone)
top  = 140 + 120 * sin(ângulo°) - 24
```

- `pos-home` → ângulo 0° → `left: 206px; top: 116px`
- `pos-settings` → ângulo 45° → `left: 174px; top: 194px`

#### Animação de cascata dos botões

Cada botão usa a classe `seq-N` que adiciona um `animation-delay` crescente:

```css
@keyframes slideInCascata {
  from { opacity: 0; transform: translateX(-30px); }
  to   { opacity: 1; transform: translateX(0); }
}

.seq-1 { animation-delay: 0.1s; }
.seq-2 { animation-delay: 0.2s; }
/* ... até seq-5 */
```

#### Linhas pontilhadas

Desenhadas via `::before` com `radial-gradient` e ângulos individuais calculados para cada botão apontar para o ícone central:

```css
.menu-item-wrapper.seq-1::before { width: 129px; transform: rotate(-55deg); }
.menu-item-wrapper.seq-3::before { width: 74px;  transform: rotate(0deg);   }
.menu-item-wrapper.seq-5::before { width: 129px; transform: rotate(55deg);  }
```

#### `pointer-events` para evitar bloqueio de cliques

O container dos botões fica "por cima" da roleta, então:

```css
.menu-items-container { pointer-events: none; }  /* container invisível passa cliques */
.menu-item-wrapper    { pointer-events: auto; }   /* restaura nos botões reais */
.half-circle          { z-index: 50; }            /* garante que a roleta esteja na frente */
```

---

### OC IA — Motor de Respostas (`/assistente`)

Sem API externa. Lógica local de matching por palavras-chave:

```tsx
const RESPOSTAS = [
  { keywords: ['sintoma', 'dor', 'náusea', ...], response: '...' },
  { keywords: ['quimio', 'quimioterapia'],        response: '...' },
  // 13 categorias no total
];

function getResponse(text: string): string {
  const lower = text.toLowerCase();
  for (const item of RESPOSTAS) {
    if (item.keywords.some(kw => lower.includes(kw))) {
      return item.response;
    }
  }
  return RESPOSTA_PADRAO;
}
```

Delay artificial de 1.2s com `setTimeout` simula tempo de processamento. `isTyping` state controla o indicador de digitação (3 `<span>` animados via `@keyframes blink`).

Auto-scroll implementado com `useRef` + `useEffect`:

```tsx
const messagesEndRef = useRef<HTMLDivElement>(null);
useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [chat, isTyping]);
```

---

### Configurações (`/configuracoes`)

Toggles implementados com `<input type="checkbox">` customizado via CSS (sem biblioteca), usando o padrão:

```html
<label class="toggle-switch">
  <input type="checkbox" class="toggle-input" checked={state} onChange={...} />
  <span class="toggle-slider"></span>
</label>
```

O estado de cada toggle é gerenciado por `useState` individual:

```tsx
const [notificacoesApp, setNotificacoesApp] = useState(true);
const [biometria, setBiometria]             = useState(true);
const [modoEscuro, setModoEscuro]           = useState(false);
```

---

## Design System

Todas as páginas seguem o mesmo padrão visual:

| Elemento | Especificação |
|---|---|
| Fundo da Home | `linear-gradient(180deg, #fcebfa, #e0cbf3, #c8def9)` |
| Cards/painéis | `background: rgba(255,255,255,0.85)` + `border-radius: 20px` |
| Botão primário (Entrar) | Gradiente `#a580ff → #5eb8ff` |
| Botão gov.br | `#1351b4` (cor oficial do Governo Federal) |
| Botão logout | `rgba(255, 75, 75, 0.1)` com borda vermelha |
| Pílulas Home | `rgba(220, 215, 250, 0.9)` (roxo pastel) |
| Pílulas Config | `rgba(210, 230, 255, 0.9)` (azul pastel) |
| Cor roxa principal | `#8a63e5` |
| Fonte | Sistema (sem Google Fonts externo) |

---

## Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento (porta 5173)
npm run build    # Gera bundle otimizado em /dist
npm run preview  # Visualiza o build de produção localmente
```

---

## Como Executar

```bash
git clone https://github.com/BrunoSilva77/onco-care-app.git
cd onco-care-app
npm install
npm run dev
```

Acesse: `http://localhost:5173`

---

## Pendências e Próximos Passos

| Item | Descrição |
|---|---|
| Autenticação real | Integrar gov.br via OAuth 2.0 |
| Backend | API REST com Node.js + PostgreSQL |
| OC IA com LLM | Conectar a API do Google Gemini ou equivalente |
| Dark Mode global | Aplicar tema escuro via CSS custom properties |
| Notificações push | Lembretes de medicamentos via service worker |
| Telemedicina real | Integração com SDK de videochamada |
| PWA | Manifest + service worker para instalação no celular |
