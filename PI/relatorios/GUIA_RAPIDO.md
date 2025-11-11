# 🎯 Guia Rápido - Sistema de Autenticação PI

## 📌 Arquitetura Simplificada

```
┌─────────────────────────────────────────────────────────┐
│                   APLICAÇÃO PI                          │
│                                                          │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────┐   │
│  │   CADASTRO   │───→│    LOGIN     │───→│ DASHBOARD│   │
│  │  cadastro/   │    │  Login/      │    │          │   │
│  └──────────────┘    └──────────────┘    └──────────┘   │
│       ↓                     ↑                             │
│   Salva dados         ┌─────┴──────────────┐             │
│   em localStorage     │                    │             │
│                       v                    v             │
│              ┌──────────────────────────────┐            │
│              │  ESQUECI MINHA SENHA         │            │
│              │  forgot-password/            │            │
│              └──────────────────────────────┘            │
│                   ↓         ↓         ↓                  │
│              (Email → Código → Senha Nova)              │
│                                                          │
│         💾 localStorage (Dados Persistentes)            │
└─────────────────────────────────────────────────────────┘
```

---

## 🗄️ Dados no localStorage

| Chave | O quê | Exemplo |
|-------|-------|---------|
| `users` | Array de usuários cadastrados | `[{firstName, lastName, email, ...}]` |
| `userLogins` | Email → Senha de usuários | `{"joao@email.com": "senha123"}` |
| `resetPasswords` | Senhas redefinidas | `{"joao@email.com": "NovaSenh@123"}` |
| `currentUser` | Usuário logado | `"joao@email.com"` |
| `savedEmail` | Email para "Lembrar-me" | `"joao@email.com"` |
| `rememberMe` | Flag de "Lembrar-me" | `"true"` / `"false"` |
| `resetUserEmail` | Email em processo de reset | `"joao@email.com"` |

---

## 📍 Estrutura de Pastas

```
PI/
├── Cadastro/
│   ├── cadastro.html          ← Página de cadastro
│   ├── cadastro.js            ← Lógica de cadastro
│   ├── cadastro.css           ← Estilos
│   ├── backend/
│   │   ├── package.json
│   │   └── server.js          ← Backend (não implementado)
│   └── Login/
│       ├── Login.html         ← Página de login
│       ├── login.js           ← Lógica de login
│       ├── login.css          ← Estilos
│       ├── forgot-password.html   ← Recuperação de senha
│       ├── forgot-password.js     ← Lógica de recuperação
│       ├── forgot-password.css    ← Estilos
│       ├── reset-password.html    ← Redefinição (DEPRECATED)
│       ├── reset-password.js      ← Redefinição (DEPRECATED)
│       └── reset-password.css     ← Estilos
└── RELATORIO_CORRECOES.md     ← Este relatório

```

---

## 🔄 Fluxos Principais

### 1. **Novo Usuário - Cadastro**

```
CADASTRO.HTML
├─ Passo 1: Dados Pessoais
│  ├─ Primeiro Nome
│  ├─ Sobrenome
│  ├─ CPF
│  ├─ Email
│  ├─ Telefone
│  └─ Data de Nascimento
│
├─ Passo 2: Confirmação
│  ├─ Revisão dos dados
│  └─ Aceitar Termos ✓
│
└─ CONCLUIR CADASTRO
   └─ cadastro.js processa:
      1. Valida termos (obrigatório)
      2. Salva em localStorage.users
      3. Cria entrada em localStorage.userLogins ("senha123")
      4. Redireciona → LOGIN.HTML
```

### 2. **Usuário Existente - Login**

```
LOGIN.HTML
├─ Email: usuario@email.com
├─ Senha: (senha do cadastro ou redefinida)
├─ ☐ Lembrar-me
├─ [Esqueci a senha] ← Link
│
└─ [ENTRAR]
   └─ login.js valida:
      1. Email e senha
      2. Busca em localStorage.users
      3. Verifica em localStorage.userLogins
      4. Se "Lembrar-me" ☑, salva email
      5. Salva em localStorage.currentUser
      6. ✓ Login bem-sucedido!
```

### 3. **Recuperação de Senha**

```
FORGOT-PASSWORD.HTML
│
├─ PASSO 1: Email
│  └─ Insira email cadastrado
│     └─ [ENVIAR CÓDIGO]
│
├─ PASSO 2: Código (6 dígitos)
│  ├─ Digite código recebido (gerado aleatoriamente)
│  ├─ Não tem código? [REENVIAR] (60s timer)
│  └─ [VERIFICAR CÓDIGO]
│
├─ PASSO 3: Nova Senha
│  ├─ Nova Senha (mín. 8 caracteres, maiúscula, número)
│  ├─ Confirmar Senha
│  ├─ 💪 Indicador de força (fraca/média/forte)
│  └─ [REDEFINIR SENHA]
│
└─ PASSO 4: Sucesso
   └─ "Senha redefinida com sucesso!"
      └─ Redireciona → LOGIN.HTML
         └─ Nova senha agora funciona!
```

---

## 🧪 Testando o Sistema

### Teste 1: Cadastro Completo
```javascript
1. Abra: file:///C:/.../cadastro.html
2. Preencha TODOS os campos obrigatórios
3. Passo 2: Aceite os termos ✓
4. Clique [Concluir]
5. ✓ Redirecionado para LOGIN.HTML
6. Verifique no DevTools: localStorage.users, localStorage.userLogins
```

### Teste 2: Login com Novo Usuário
```javascript
1. Você será redirecionado para LOGIN.HTML
2. Email: (o que você cadastrou)
3. Senha: "senha123" (padrão)
4. Clique [ENTRAR]
5. ✓ "Bem-vindo, seu@email.com!"
```

### Teste 3: Recuperação de Senha
```javascript
1. Em LOGIN.HTML, clique "Esqueci a senha"
2. Email: (o que você cadastrou)
3. [ENVIAR CÓDIGO]
4. ✓ Alert mostra código (ex: "123456")
5. Digite o código nos 6 campos
6. [VERIFICAR CÓDIGO]
7. Nova Senha: "MinhaSenh@123" (ex)
8. Confirmar: "MinhaSenh@123"
9. [REDEFINIR SENHA]
10. ✓ Redirecionado para LOGIN.HTML
11. Tente login com a nova senha
```

### Teste 4: Lembrar-me
```javascript
1. Em LOGIN.HTML
2. Marque ☑ "Lembrar-me"
3. Faça login
4. Feche e abra o navegador
5. ✓ Email pré-preenchido
```

---

## 🔐 Padrões de Senha

### Senha Válida
- ✓ Mínimo 8 caracteres
- ✓ Contém letra maiúscula (A-Z)
- ✓ Contém letra minúscula (a-z)
- ✓ Contém número (0-9)

### Exemplos
```
✓ Validas:
  - Abc12345
  - SenhaForte123
  - MinhaS3nh@
  
✗ Inválidas:
  - abc12345        (sem maiúscula)
  - ABC12345        (sem minúscula)
  - AbcDefgh        (sem número)
  - Abc123          (apenas 6 caracteres)
```

---

## 🚨 Erros Comuns e Soluções

| Erro | Causa | Solução |
|------|-------|---------|
| "Email ou senha incorretos" | Email não cadastrado ou senha errada | Faça cadastro novo ou use usuário teste |
| "Código inválido" | Código errado ou expirado | Use o código mostrado no alert |
| "As senhas não coincidem" | Confirmar ≠ Nova Senha | Redigite e confirme corretamente |
| "Já cadastrado" | Email já existe | Use outro email para novo cadastro |
| localStorage vazio | Dados não salvos | Abra DevTools → Application → localStorage |

---

## 🧠 Lógica de Prioridade (login.js)

```javascript
initializeUsers() busca credenciais em ordem:

1. localStorage.users (Cadastro novo)
2. localStorage.userLogins (Senha padrão de cadastro)
3. localStorage.resetPasswords (Senha redefinida)
4. Usuários padrão (Teste)

Resultado: Array único 'users' com todas as credenciais
```

---

## 💾 Dados de Teste Pré-carregados

```javascript
// Em login.js - Usuários disponíveis por padrão:
usuario@email.com / 123456
teste@email.com / senha123
demo@email.com / demo1234
```

---

## 🔗 Links de Navegação

| De | Para | Link |
|----|------|------|
| cadastro.html | login.html | Redirecionamento automático após sucesso |
| login.html | cadastro.html | "Cadastre-se" (não implementado, volte manualmente) |
| login.html | forgot-password.html | "Esqueci a senha" |
| forgot-password.html | login.html | "Voltar ao Login" ou após sucesso (automático) |

---

## 📞 Contato Rápido

**Para dúvidas ou problemas:**
1. Abra o **DevTools** (F12)
2. Vá em **Console** para ver mensagens de erro
3. Vá em **Application → localStorage** para ver dados salvos
4. Verifique a **Network** para ver requisições

---

**Versão:** 1.0  
**Última Atualização:** 11/11/2025  
**Status:** ✅ Funcional
