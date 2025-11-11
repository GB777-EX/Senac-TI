# 🎨 Diagramas Visuais - Arquitetura do Sistema PI

## 1. Arquitetura Geral

```
┌─────────────────────────────────────────────────────────────────┐
│                    SISTEMA DE AUTENTICAÇÃO - PI                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    CAMADA DE APRESENTAÇÃO (HTML/CSS)            │
│                                                                   │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │   CADASTRO      │  │      LOGIN      │  │  RECUPERAÇÃO    │ │
│  │                 │  │                 │  │  DE SENHA       │ │
│  │ - Dados Pessoais│  │ - Email         │  │ - Email         │ │
│  │ - Confirmação   │  │ - Senha         │  │ - Código (6)    │ │
│  │ - Termos        │  │ - Lembrar-me    │  │ - Nova Senha    │ │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘ │
└───────────┼──────────────────────┼──────────────────┼───────────┘
            │                      │                  │
            ▼                      ▼                  ▼
┌─────────────────────────────────────────────────────────────────┐
│               CAMADA DE LÓGICA (JavaScript)                      │
│                                                                   │
│  ┌──────────────────┐ ┌──────────────────┐ ┌─────────────────┐ │
│  │ cadastro.js      │ │ login.js         │ │forgot-password.js│ │
│  │                  │ │                  │ │ reset-password.js│ │
│  │ - Validar campos │ │ - Autenticar     │ │                 │ │
│  │ - Salvar dados   │ │ - Gerenciar sessão│ │ - Gerar código │ │
│  │ - Redirecionar   │ │ - Verificar termos│ │ - Validar senha │ │
│  └────────┬─────────┘ └────────┬─────────┘ └────────┬────────┘ │
└───────────┼──────────────────────┼──────────────────┼───────────┘
            │                      │                  │
            └──────────────────────┼──────────────────┘
                                   ▼
┌─────────────────────────────────────────────────────────────────┐
│            CAMADA DE DADOS (localStorage Browser)                │
│                                                                   │
│  ┌────────────────┐ ┌────────────────┐ ┌──────────────────────┐ │
│  │ users          │ │ userLogins     │ │ resetPasswords       │ │
│  │                │ │                │ │                      │ │
│  │ Array de objetos│ │ {"email":"pass"}│ │ {"email":"newpass"} │ │
│  └────────────────┘ └────────────────┘ └──────────────────────┘ │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                   Dados de Sessão                           │ │
│  │  currentUser | savedEmail | rememberMe | resetUserEmail    │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Fluxo de Cadastro

```
┌──────────────────────────────────────────────────────────────┐
│              FLUXO: NOVO CADASTRO                            │
└──────────────────────────────────────────────────────────────┘

  ┌─────────────────────┐
  │   cadastro.html     │
  │  PASSO 1: Dados     │
  │  Pessoais           │
  └──────────┬──────────┘
             │ [Próximo]
             │ (Validar campos)
             ▼
  ┌─────────────────────┐
  │   cadastro.html     │
  │  PASSO 2:           │
  │  Confirmação +      │
  │  Termos             │
  └──────────┬──────────┘
             │ [Concluir]
             │ (Validar termos ✓)
             ▼
  ┌─────────────────────────────────────────────┐
  │        cadastro.js processa:                │
  │  1. Validar todos os campos                 │
  │  2. Validar termos obrigatório              │
  │  3. Salvar em localStorage.users            │
  │  4. Criar entrada em localStorage.userLogins│
  │  5. console.log("Cadastro realizado")       │
  └──────────┬──────────────────────────────────┘
             │
             ▼
  ✓ Alert: "Cadastro realizado com sucesso!"
             │
             │ (redirecionamento automático)
             ▼
  ┌─────────────────────┐
  │   Login.html        │
  │  (página de login)  │
  └─────────────────────┘

  💾 localStorage agora contém:
     - users: [{firstName, lastName, email, ...}]
     - userLogins: {"email": "senha123"}
```

---

## 3. Fluxo de Login

```
┌──────────────────────────────────────────────────────────────┐
│              FLUXO: LOGIN EXISTENTE                          │
└──────────────────────────────────────────────────────────────┘

  ┌──────────────────────────┐
  │    Login.html            │
  │  Email: _______________  │
  │  Senha: _______________  │
  │  ☐ Lembrar-me           │
  │  [ENTRAR]               │
  └──────────┬───────────────┘
             │
             ▼
  ┌──────────────────────────────────────────────┐
  │      login.js valida:                        │
  │  1. Email preenchido? ✓                      │
  │  2. Senha preenchida? ✓                      │
  │  3. Email válido (regex)? ✓                  │
  └──────────┬───────────────────────────────────┘
             │
             ▼
  ┌──────────────────────────────────────────────┐
  │      login.js busca em 3 locais:             │
  │  1. localStorage.userLogins (cadastro novo)  │
  │  2. localStorage.resetPasswords (resetada)   │
  │  3. Usuários padrão (teste)                  │
  │  🔍 users.find(u => u.email && u.password)  │
  └──────────┬───────────────────────────────────┘
             │
      ┌──────┴──────┐
      │             │
      ▼             ▼
  ✓ SIM         ✗ NÃO
  (encontrou)   (não encontrou)
      │             │
      ▼             ▼
  ┌─────────┐   ┌──────────────────┐
  │ "Lembrar-me"? │ ❌ Erro:           │
  │ ☑ SIM  → Salva│ Email ou senha    │
  │ email em      │ incorretos        │
  │ localStorage  │                  │
  │               │ Limpar senha     │
  │ ☐ NÃO  →      │                  │
  │ Remover       │ Focar no input   │
  │ localStorage  │                  │
  └─────┬─────────┘ └────────────────┘
        │
        ▼
  ┌──────────────────────────┐
  │ ✓ Login bem-sucedido!    │
  │ Salvar em:               │
  │ - localStorage.currentUser│
  │ - localStorage.savedEmail │
  │ - localStorage.rememberMe │
  └──────────┬───────────────┘
             │
             ▼
  ✓ Alert: "Bem-vindo, email@exemplo.com!"
```

---

## 4. Fluxo de Recuperação de Senha

```
┌──────────────────────────────────────────────────────────────┐
│         FLUXO: ESQUECI MINHA SENHA (4 PASSOS)                │
└──────────────────────────────────────────────────────────────┘

  PASSO 1: EMAIL
  ┌─────────────────────────────────┐
  │ "Qual é seu email?"             │
  │ Email: ___________________       │
  │ [ENVIAR CÓDIGO]                 │
  └──────────┬──────────────────────┘
             │
             ▼
  ┌─────────────────────────────────┐
  │ forgot-password.js:             │
  │ 1. Validar email (regex)        │
  │ 2. Gerar código aleatório       │
  │ 3. console.log(código)          │
  │ 4. Alert mostra o código        │
  │ 5. Salvar email em              │
  │    sessionStorage/var            │
  └──────────┬──────────────────────┘
             │
             ▼
  PASSO 2: CÓDIGO (6 dígitos)
  ┌─────────────────────────────────┐
  │ "Digite o código enviado"       │
  │ [0][0][0][0][0][0]              │
  │                                 │
  │ ⏱️ Reenviar em 60s              │
  │ [VERIFICAR CÓDIGO]              │
  └──────────┬──────────────────────┘
             │
      ┌──────┴──────┐
      │             │
      ▼             ▼
  ✓ CORRETO    ✗ ERRADO
  (123456)     (999999)
      │             │
      ▼             ▼
  Avançar      ❌ Erro:
  para Passo 3 Código inválido
             Tente novamente
                  │
                  └─→ [REENVIAR]
                     └─→ Novo código
  
             │
             ▼
  PASSO 3: NOVA SENHA
  ┌─────────────────────────────────┐
  │ "Defina sua nova senha"         │
  │                                 │
  │ Nova Senha: ___________  👁️     │
  │ Confirmar: ___________   👁️     │
  │                                 │
  │ 💪 ▓▓▓░░░░░░ Força: Média      │
  │                                 │
  │ [REDEFINIR SENHA]               │
  └──────────┬──────────────────────┘
             │
             ▼
  ┌─────────────────────────────────┐
  │ forgot-password.js valida:      │
  │ ✓ 8+ caracteres                 │
  │ ✓ Letra maiúscula (A-Z)         │
  │ ✓ Letra minúscula (a-z)         │
  │ ✓ Número (0-9)                  │
  │ ✓ Senhas coincidem              │
  └──────────┬──────────────────────┘
             │
      ┌──────┴──────┐
      │             │
      ▼             ▼
  ✓ VÁLIDA    ✗ INVÁLIDA
      │             │
      ▼             ▼
  Salvar em   ❌ Erro:
  localStorage- "Senha fraca"
  .reset...   - "Não coincidem"
             
      │
      ▼
  PASSO 4: SUCESSO
  ┌─────────────────────────────────┐
  │ ✓ Senha redefinida!             │
  │                                 │
  │ Você será redirecionado         │
  │ para Login em 3 segundos...     │
  │                                 │
  │ [IR PARA LOGIN]                 │
  └──────────┬──────────────────────┘
             │
             ▼
  ┌─────────────────────┐
  │    Login.html       │
  │ (com nova senha)    │
  └─────────────────────┘

  💾 localStorage agora contém:
     - resetPasswords: {"email": "NovaSenh@123"}
     - Próximo login funcionará com a nova senha
```

---

## 5. Estrutura do localStorage

```
┌─────────────────────────────────────────────────────────────┐
│            DADOS PERSISTIDOS NO NAVEGADOR                   │
│                  (localStorage do Browser)                  │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ 🔑 users                                                     │
│    Tipo: Array de Objetos                                    │
│    Criado: cadastro.js                                       │
│    Usado por: login.js                                       │
│                                                              │
│ [                                                            │
│   {                                                          │
│     firstName: "João",                                       │
│     lastName: "Silva",                                       │
│     cpf: "123.456.789-00",                                   │
│     email: "joao@email.com",                                 │
│     phone: "(11) 98765-4321",                                │
│     birthDate: "1990-05-15",                                 │
│     createdAt: "2025-11-11T10:30:45.123Z"                   │
│   }                                                          │
│ ]                                                            │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ 🔑 userLogins                                                │
│    Tipo: Objeto (Key-Value)                                 │
│    Criado: cadastro.js                                       │
│    Usado por: login.js                                       │
│                                                              │
│ {                                                            │
│   "joao@email.com": "senha123",                              │
│   "usuario@email.com": "123456",                             │
│   "teste@email.com": "senha123"                              │
│ }                                                            │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ 🔑 resetPasswords                                            │
│    Tipo: Objeto (Key-Value)                                 │
│    Criado: forgot-password.js                                │
│    Usado por: login.js                                       │
│                                                              │
│ {                                                            │
│   "joao@email.com": "NovaSenh@123",                           │
│   "usuario@email.com": "MinhaSenh@456"                        │
│ }                                                            │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ DADOS DE SESSÃO (Gerenciados por login.js)                  │
│                                                              │
│ 🔑 currentUser                                               │
│    Tipo: String                                              │
│    Valor: "joao@email.com"                                   │
│    Criado: login.js ao fazer login                           │
│                                                              │
│ 🔑 savedEmail                                                │
│    Tipo: String                                              │
│    Valor: "joao@email.com"                                   │
│    Criado: login.js se "Lembrar-me" ☑                        │
│                                                              │
│ 🔑 rememberMe                                                │
│    Tipo: String ("true" ou "false")                          │
│    Valor: "true"                                             │
│    Criado: login.js                                          │
│                                                              │
│ 🔑 resetUserEmail                                            │
│    Tipo: String                                              │
│    Valor: "joao@email.com"                                   │
│    Criado: forgot-password.js durante recuperação           │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ USUÁRIOS PADRÃO (Hardcoded em login.js)                      │
│                                                              │
│ usuario@email.com / 123456      ← Para teste                │
│ teste@email.com / senha123      ← Para teste                │
│ demo@email.com / demo1234       ← Para teste                │
└──────────────────────────────────────────────────────────────┘
```

---

## 6. Matriz de Dependências

```
┌──────────────────────────────────────────────────────────────┐
│         QUEM USA O QUÊ NO localStorage?                      │
└──────────────────────────────────────────────────────────────┘

                    ┌─────────────┐
                    │  localStorage│
                    └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
   ┌────────────┐  ┌────────────┐  ┌──────────────────┐
   │   cadastro │  │   login    │  │ forgot-password  │
   │     .js    │  │     .js    │  │ reset-password   │
   └────────────┘  └────────────┘  └──────────────────┘
        │ ESCREVE │ LÊ E ESCREVE│ ESCREVE
        │         │            │
    users         userLogins   resetPasswords
    userLogins    users        resetUserEmail
                  resetPasswords
                  currentUser
                  savedEmail
                  rememberMe

LEGENDA:
→ Seta para Escrever (criar/modificar dados)
← Seta para Ler (buscar dados)
```

---

## 7. Ciclo de Vida do Usuário

```
┌──────────────────────────────────────────────────────────────┐
│          JORNADA DO USUÁRIO NO SISTEMA                       │
└──────────────────────────────────────────────────────────────┘

  1️⃣  NÃO REGISTRADO
  ┌────────────────┐
  │  → cadastro.html
  │    [Cadastrar-se]
  └────────┬───────┘
           │

  2️⃣  REGISTRADO (Primeiro acesso)
  ┌────────────────┐
  │  → login.html
  │    Usar: senha123 (padrão)
  └────────┬───────┘
           │

  3️⃣  LOGADO (Sessão ativa)
  ┌────────────────┐
  │  ✓ currentUser salvo
  │  ✓ Sistema funcional
  │
  │  [Lembrar-me?]
  │  ☑ → savedEmail salvo
  │  ☐ → removido localStorage
  └────────┬───────┘
           │

  4️⃣  ESQUECEU SENHA
  ┌────────────────┐
  │  → forgot-password.html
  │    [Esqueci a senha]
  │    Email → Código → Nova Senha
  └────────┬───────┘
           │

  5️⃣  SENHA REDEFINIDA
  ┌────────────────┐
  │  Nova senha salva em
  │  resetPasswords
  │  → login.html
  │    Usar: nova senha
  └────────┬───────┘
           │

  6️⃣  LOGADO NOVAMENTE
  ┌────────────────┐
  │  ✓ Sistema funcional
  │  ✓ Senha atualizada
  └────────────────┘
```

---

## 8. Tabela de Transições

```
┌───────────────────────────────────────────────────────────────┐
│              NAVEGAÇÃO ENTRE PÁGINAS                          │
└───────────────────────────────────────────────────────────────┘

DE                    │ AÇÃO              │ PARA
────────────────────────────────────────────────────────────────
cadastro.html         │ [Próximo/Concluir]│ Login.html
Login.html            │ [Esqueci senha]   │ forgot-password.html
Login.html            │ [Cadastre-se]     │ cadastro.html (não impl.)
────────────────────────────────────────────────────────────────
forgot-password.html  │ [Voltar ao Login] │ Login.html
(Passo 1)             │                   │
────────────────────────────────────────────────────────────────
forgot-password.html  │ [Usar outro email]│ forgot-password.html
(Passo 2)             │                   │ (Passo 1)
────────────────────────────────────────────────────────────────
forgot-password.html  │ [Voltar ao Login] │ Login.html
(Passo 3)             │                   │
────────────────────────────────────────────────────────────────
forgot-password.html  │ [Sucesso]         │ Login.html
(Passo 4)             │ (automático)      │ (após 3s)
────────────────────────────────────────────────────────────────
```

---

## 9. Fluxograma Completo

```
                        ┌─────────────────┐
                        │  PÁGINA INICIAL │
                        └────────┬────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                        │
              Novo usuário            Usuário existente
                    │                        │
                    ▼                        ▼
            ┌────────────────┐      ┌──────────────┐
            │ CADASTRO.HTML  │      │ LOGIN.HTML   │
            └────────┬───────┘      └──────┬───────┘
                     │                     │
        ┌────────────┴─────────────┐       │
        │                          │       │
      PASSO 1                    PASSO 2 │ Esqueci senha?
        │                        (Confirmação)
        │                          │       │
        ├───────────────────────────┘       ▼
        │                        ┌─────────────────────┐
        ▼                        │ FORGOT-PASSWORD.HTML│
    ✓ Dados salvos              └──────────┬──────────┘
      em localStorage                      │
        │                    ┌─────────────┼─────────────┐
        │                    │             │             │
        │                 PASSO 1       PASSO 2       PASSO 3
        │                  (Email)      (Código)    (Nova Senha)
        │                    │             │             │
        │                    └─────────────┼─────────────┘
        │                                  │
        │                              PASSO 4
        │                             (Sucesso)
        │                                  │
        │ Redirecionamento               │
        │ automático                      │
        └────────────────┬────────────────┘
                         │
                         ▼
                  ┌─────────────┐
                  │ LOGIN.HTML  │
                  │ com nova    │
                  │ senha ✓     │
                  └─────────────┘
```

---

**Diagramas v1.0 | 11/11/2025**
