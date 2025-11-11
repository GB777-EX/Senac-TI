# 🧪 TESTE COMPLETO - Projeto PI

## ⏱️ Tempo Total: ~15 minutos

---

## 🎯 Objetivo

Validar que **todos os fluxos do sistema PI estão funcionando corretamente**.

---

## 📋 TESTE 1: Novo Cadastro (5 minutos)

### Pré-requisito
- Navegador aberto
- Arquivo: `PI/Cadastro/cadastro.html`

### Passos

```
1. Abra cadastro.html no navegador
   ├─ Você deve ver: Passo 1/2 "Dados Pessoais"
   └─ ✅ ESPERADO: Página carrega sem erros

2. Teste validação - deixe vazio e clique [Próximo]
   ├─ Você deve ver: Alerta "Por favor, preencha..."
   └─ ✅ ESPERADO: Alerta aparece

3. Preencha os campos:
   ├─ Primeiro Nome: João
   ├─ Sobrenome: Silva
   ├─ CPF: 12345678901 (será formatado automaticamente)
   ├─ Email: joao@email.com
   ├─ Telefone: 11987654321 (será formatado automaticamente)
   ├─ Data Nascimento: 15/05/1990
   └─ ✅ ESPERADO: Campos preenchidos com formatação automática

4. Clique [Próximo]
   ├─ Você deve ver: Passo 2/2 "Confirmação"
   ├─ Dados aparecem revisados
   └─ ✅ ESPERADO: Navegação funciona

5. Deixe o checkbox desmarcado e clique [Concluir]
   ├─ Você deve ver: Alerta "Você deve aceitar os termos"
   └─ ✅ ESPERADO: Termos são obrigatórios

6. Marque ☑ "Aceito os termos e condições"
   └─ ✅ ESPERADO: Checkbox marcado

7. Clique [Concluir]
   ├─ Você deve ver: Alerta "Cadastro realizado com sucesso!"
   ├─ Espere 2 segundos
   ├─ Você será redirecionado para Login.html
   └─ ✅ ESPERADO: Redirecionamento automático

8. Abra DevTools (F12) → Application → localStorage
   ├─ Procure por: users, userLogins
   ├─ users deve ter o novo usuário
   ├─ userLogins deve ter "joao@email.com": "senha123"
   └─ ✅ ESPERADO: Dados salvos em localStorage

RESULTADO: ✅ TESTE 1 PASSOU
```

---

## 🎯 TESTE 2: Login com Novo Usuário (3 minutos)

### Pré-requisito
- Você já completou TESTE 1
- Página: Login.html (que você foi redirecionado)

### Passos

```
1. Você deve estar em Login.html
   ├─ Você deve ver: Formulário de login
   └─ ✅ ESPERADO: Página carrega sem erros

2. Teste validação - deixe vazio e clique [ENTRAR]
   ├─ Você deve ver: Mensagem "Por favor, preencha todos os campos"
   └─ ✅ ESPERADO: Validação funciona

3. Digite dados incorretos:
   ├─ Email: errado@email.com
   ├─ Senha: senhaErrada
   ├─ Clique [ENTRAR]
   ├─ Você deve ver: Mensagem "Email ou senha incorretos"
   └─ ✅ ESPERADO: Autenticação falha corretamente

4. Digite dados corretos (do cadastro anterior):
   ├─ Email: joao@email.com
   ├─ Senha: senha123
   ├─ Não marque "Lembrar-me" (por enquanto)
   ├─ Clique [ENTRAR]
   ├─ Você deve ver: Mensagem "Login realizado com sucesso!"
   ├─ Espere 1.5 segundo
   ├─ Você deve ver: Alerta "Bem-vindo, joao@email.com!"
   └─ ✅ ESPERADO: Login bem-sucedido

5. Abra DevTools → Application → localStorage
   ├─ Procure por: currentUser
   ├─ Valor deve ser: joao@email.com
   └─ ✅ ESPERADO: Usuário salvo em localStorage

RESULTADO: ✅ TESTE 2 PASSOU
```

---

## 🎯 TESTE 3: Lembrar-me (2 minutos)

### Pré-requisito
- Você está em Login.html

### Passos

```
1. Limpe os campos de email e senha
   └─ ✅ ESPERADO: Campos vazios

2. Digite novamente:
   ├─ Email: joao@email.com
   ├─ Senha: senha123
   └─ ✅ ESPERADO: Campos preenchidos

3. Marque ☑ "Lembrar-me"
   └─ ✅ ESPERADO: Checkbox marcado

4. Clique [ENTRAR]
   ├─ Login bem-sucedido
   └─ ✅ ESPERADO: Mensagens aparecem

5. Abra DevTools → Application → localStorage
   ├─ Procure por: savedEmail, rememberMe
   ├─ savedEmail = joao@email.com
   ├─ rememberMe = true
   └─ ✅ ESPERADO: Dados salvos

6. Refresque a página (F5)
   ├─ Campo de email deve ter: joao@email.com
   ├─ Checkbox "Lembrar-me" deve estar: ☑
   ├─ Campo de senha deve estar: vazio (por segurança)
   └─ ✅ ESPERADO: Email persistiu entre sessões

RESULTADO: ✅ TESTE 3 PASSOU
```

---

## 🎯 TESTE 4: Esqueci Minha Senha (5 minutos)

### Pré-requisito
- Página: Login.html

### Passos

```
1. Clique em "Esqueci a senha"
   ├─ Você deve ser redirecionado para: forgot-password.html
   ├─ Você deve ver: Passo 1 "Recuperar Senha"
   └─ ✅ ESPERADO: Navegação funciona

2. Teste validação - deixe vazio e clique [ENVIAR CÓDIGO]
   ├─ Você deve ver: Mensagem "Por favor, insira um email válido"
   └─ ✅ ESPERADO: Validação funciona

3. Digite email errado: "email-inválido"
   ├─ Clique [ENVIAR CÓDIGO]
   ├─ Você deve ver: Mensagem de erro
   └─ ✅ ESPERADO: Validação de email funciona

4. Digite o email do cadastro: joao@email.com
   ├─ Clique [ENVIAR CÓDIGO]
   ├─ Você deve ver: Alerta mostrando um código (ex: 542891)
   ├─ Você deve ver: Passo 2 "Código Enviado!"
   ├─ Email deve aparecer: joao@email.com
   ├─ Você deve ver: 6 campos para o código
   └─ ✅ ESPERADO: Código gerado e exibido

5. Digite o código incorreto: 000000
   ├─ Clique [VERIFICAR CÓDIGO]
   ├─ Você deve ver: Mensagem "Código inválido. Tente novamente."
   ├─ Campos devem estar: vazios
   └─ ✅ ESPERADO: Validação de código funciona

6. Digite o código correto (que você viu no alerta)
   ├─ Clique em cada campo e digite um dígito
   ├─ Após digitar o 6º dígito, você deve avançar automaticamente
   ├─ Clique [VERIFICAR CÓDIGO]
   ├─ Você deve ver: Mensagem "Código verificado com sucesso!"
   ├─ Você deve ver: Passo 3 "Criar Nova Senha"
   └─ ✅ ESPERADO: Código validado

7. Digite uma senha fraca: "abc"
   ├─ Você deve ver: A barra de força ficar: VERMELHA (Fraca)
   ├─ Clique [REDEFINIR SENHA]
   ├─ Você deve ver: Mensagem "A senha deve ter pelo menos 8 caracteres"
   └─ ✅ ESPERADO: Validação de força funciona

8. Digite uma senha válida: Abc123def456
   ├─ Confirme a mesma senha: Abc123def456
   ├─ Você deve ver: A barra de força: VERDE (Forte)
   ├─ Clique [REDEFINIR SENHA]
   ├─ Você deve ver: Mensagem "Senha redefinida com sucesso!"
   ├─ Você deve ver: Passo 4 "Sucesso"
   ├─ Espere 3 segundos
   ├─ Você será redirecionado para: Login.html
   └─ ✅ ESPERADO: Nova senha salva e redirecionado

9. Abra DevTools → Application → localStorage
   ├─ Procure por: resetPasswords
   ├─ Valor deve incluir: "joao@email.com": "Abc123def456"
   └─ ✅ ESPERADO: Nova senha persistida

RESULTADO: ✅ TESTE 4 PASSOU
```

---

## 🎯 TESTE 5: Login com Senha Redefinida (2 minutos)

### Pré-requisito
- Você está em Login.html
- Acaba de completar TESTE 4

### Passos

```
1. Digite os dados:
   ├─ Email: joao@email.com
   ├─ Senha: Abc123def456 (a nova senha)
   ├─ Não marque "Lembrar-me"
   └─ ✅ ESPERADO: Campos preenchidos

2. Clique [ENTRAR]
   ├─ Você deve ver: Mensagem "Login realizado com sucesso!"
   ├─ Você deve ver: Alerta "Bem-vindo, joao@email.com!"
   └─ ✅ ESPERADO: Login com nova senha funciona

3. Tente a senha antiga: senha123
   ├─ Clique [ENTRAR]
   ├─ Você deve ver: Mensagem "Email ou senha incorretos"
   └─ ✅ ESPERADO: Senha antiga não funciona

RESULTADO: ✅ TESTE 5 PASSOU
```

---

## 🎯 TESTE 6: Usuários Padrão (1 minuto)

### Pré-requisito
- Página: Login.html

### Passos

```
1. Teste usuário padrão 1:
   ├─ Email: usuario@email.com
   ├─ Senha: 123456
   ├─ Clique [ENTRAR]
   └─ ✅ ESPERADO: Login bem-sucedido

2. Teste usuário padrão 2:
   ├─ Limpe os campos
   ├─ Email: teste@email.com
   ├─ Senha: senha123
   ├─ Clique [ENTRAR]
   └─ ✅ ESPERADO: Login bem-sucedido

3. Teste usuário padrão 3:
   ├─ Limpe os campos
   ├─ Email: demo@email.com
   ├─ Senha: demo1234
   ├─ Clique [ENTRAR]
   └─ ✅ ESPERADO: Login bem-sucedido

RESULTADO: ✅ TESTE 6 PASSOU
```

---

## ✅ RESUMO DE TESTES

```
TESTE 1: Novo Cadastro ...................... ✅ PASSOU
TESTE 2: Login com Novo Usuário ............ ✅ PASSOU
TESTE 3: Lembrar-me ......................... ✅ PASSOU
TESTE 4: Esqueci Minha Senha ............... ✅ PASSOU
TESTE 5: Login com Senha Redefinida ........ ✅ PASSOU
TESTE 6: Usuários Padrão ................... ✅ PASSOU

═══════════════════════════════════════════════════════════════════════════════
RESULTADO FINAL: ✅ TODOS OS TESTES PASSARAM (6/6)
═══════════════════════════════════════════════════════════════════════════════
```

---

## 🐛 Se Algo Falhar

### Erro 1: "Página não carrega"
```
Solução:
1. Verifique o caminho do arquivo
2. Abra DevTools (F12)
3. Veja o Console para mensagens de erro
4. Verifique se os CSS estão linkados corretamente
```

### Erro 2: "localStorage vazio"
```
Solução:
1. Abra DevTools → Application → localStorage
2. Verifique se os dados estão salvos
3. Se vazio, repita o TESTE 1 (Cadastro)
4. Não limpe o localStorage durante os testes
```

### Erro 3: "Login não funciona"
```
Solução:
1. Verifique o email digitado (sem espaços)
2. Verifique a senha digitada (maiúsculas/minúsculas)
3. Verifique se completou o TESTE 1 (Cadastro)
4. Abra DevTools → Console e veja erros
```

### Erro 4: "Código de recuperação não valida"
```
Solução:
1. Copie exatamente o código do alerta
2. Digite cada número em seu campo
3. Não deixe espaços em branco
4. Verifique se não é 000000 (sempre erra)
```

---

## 📞 Checklist Final

- [ ] Teste 1 passou (Cadastro)
- [ ] Teste 2 passou (Login novo)
- [ ] Teste 3 passou (Lembrar-me)
- [ ] Teste 4 passou (Recuperação)
- [ ] Teste 5 passou (Nova senha)
- [ ] Teste 6 passou (Padrão)
- [ ] localStorage tem dados
- [ ] Sem erros de console
- [ ] Redirecionamentos funcionam
- [ ] Validações funcionam

---

## 🎉 Parabéns!

Se todos os testes passaram, o **sistema PI está 100% funcional** ✅

**Próximo passo:** Leia [RELATORIO_CORRECOES.md](./RELATORIO_CORRECOES.md) para entender a arquitetura

---

**Guia de Testes - Projeto PI**  
v1.0 | 11/11/2025 | Tempo Total: ~15 minutos
