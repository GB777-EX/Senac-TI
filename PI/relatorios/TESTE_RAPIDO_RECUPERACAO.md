# 🧪 TESTE RÁPIDO - Recuperação de Senha (CORRIGIDA)

## ⏱️ Tempo: ~5 minutos

---

## 🎯 Objetivo

Verificar se o fluxo de "Esqueci Minha Senha" está funcionando **totalmente** (sem erros).

---

## 📋 PRÉ-REQUISITO

✅ Tenha um usuário cadastrado (se não tiver, faça teste de Cadastro primeiro)

Exemplo:
```
Email: joao@email.com
Senha: senha123
```

---

## 🚀 PASSO A PASSO

### PASSO 1: Abrir DevTools
```
1. Abra seu navegador
2. Pressione F12 ou Ctrl+Shift+I
3. Vá para a aba "Console"
4. (Deixe aberto enquanto testa)
```

### PASSO 2: Iniciar Fluxo de Recuperação
```
1. Em Login.html, clique "Esqueci a senha"
2. Você deve ver no console:
   === FORGOT-PASSWORD.JS INICIALIZADO ===
   Email Form: ✓ Encontrado
   Code Form: ✓ Encontrado
   Password Form: ✓ Encontrado
   Code Digits: ✓ Encontrados 6 campos
   =====================================
   
   ✅ SE VIR ISSO: Sistema inicializou corretamente
   ❌ SE VIR ERROS: Há um problema com o HTML
```

### PASSO 3: Testar Email
```
1. Deixe o campo de email vazio
2. Clique [ENVIAR CÓDIGO]
3. Você deve ver mensagem: "Por favor, insira um email válido"
4. ✅ Se viu: Validação de email funciona

5. Digite email: joao@email.com
6. Clique [ENVIAR CÓDIGO]
7. Você deve ver um ALERTA com um código (ex: 542891)
8. COPIE ESTE CÓDIGO!
9. O console deve mostrar: "Código enviado para joao@email.com: 542891"
10. ✅ Se viu: Email funciona
```

### PASSO 4: Testar Código
```
1. Você deve estar na tela "Código Enviado!"
2. Digite um código ERRADO: 000000
3. Clique [VERIFICAR CÓDIGO]
4. Você deve ver mensagem: "❌ Código inválido. Tente novamente."
5. ✅ Se viu: Validação de código funciona

6. Agora digite o código CORRETO (que você copiou)
   - Exemplo: Se o alerta mostrou 542891, digite:
     [5] [4] [2] [8] [9] [1]
7. Clique [VERIFICAR CÓDIGO]
8. Você deve ver: "✓ Código verificado com sucesso!"
9. Após 1.5 segundo, você deve ir para "Criar Nova Senha"
10. ✅ Se viu: Código funciona!

DEBUGGING:
- Se não avançar, abra o console e veja:
  Código inserido: (deve mostrar 542891)
  Código esperado: (deve mostrar 542891)
```

### PASSO 5: Testar Nova Senha
```
1. Você deve estar em "Criar Nova Senha"
2. Digite uma senha FRACA: abc

3. Você deve ver a barra de força: 🔴 Senha Fraca
4. Clique [REDEFINIR SENHA]
5. Você deve ver: "❌ A senha deve ter pelo menos 8 caracteres"
6. ✅ Se viu: Validação funciona

7. Agora teste com senha sem maiúscula: abc12345
8. Clique [REDEFINIR SENHA]
9. Você deve ver: "❌ A senha deve conter: maiúsculas, minúsculas e números"
10. ✅ Se viu: Força de senha funciona

11. Digite uma senha VÁLIDA: Abc123xyz
    Digite confirmação: Abc123xyz
12. A barra de força deve ficar: 🟢 Senha Forte
13. Clique [REDEFINIR SENHA]
14. Você deve ver: "✓ Senha redefinida com sucesso!"
15. Após 3 segundos, você será redirecionado para Login.html
16. ✅ Se tudo isso aconteceu: FLUXO COMPLETO FUNCIONANDO!

VERIFICAR CONSOLE:
- Validação de senha: {length: true, lowercase: true, uppercase: true, number: true}
- Senha validada com sucesso! Salvando para: joao@email.com
- ✓ Senha redefinida com sucesso para: joao@email.com
- Redirecionando para Login.html...
```

### PASSO 6: Testar Login com Nova Senha
```
1. Você está em Login.html
2. Digite:
   Email: joao@email.com
   Senha: Abc123xyz (a nova senha)
3. Clique [ENTRAR]
4. Você deve ver: "Login realizado com sucesso!"
5. ✅ SE ISSO ACONTECEU: TUDO ESTÁ FUNCIONANDO!

❌ SE ISSO NÃO ACONTECER:
   - Abra DevTools → Application → localStorage
   - Procure por: resetPasswords
   - Deve conter: "joao@email.com": "Abc123xyz"
   - Se não estiver lá, o localStorage não salvou
```

---

## 📊 RESULTADO

### ✅ TODOS OS TESTES PASSARAM?

```
Parabéns! O fluxo de recuperação está 100% funcional!

✅ Email validado
✅ Código gerado e validado
✅ Nova senha validada
✅ Força de senha funciona
✅ localStorage salva dados
✅ Login funciona com nova senha
✅ Sem erros de console
```

### ❌ ALGUM TESTE FALHOU?

```
Verifique o console para mensagens de erro:

1. F12 → Console
2. Procure por linhas vermelhas (erros)
3. Leia a mensagem de erro
4. Avise a causa específica do problema

Erros comuns:
- "codeDigits.map is not a function" → CORRIGIDO ✅
- Campos não preenchidos → Validação funciona ✅
- Senha não salva → Verifique localStorage
- Não avança de passo → Veja console para erros
```

---

## 🔍 CHECKLIST DE VALIDAÇÃO

- [ ] Inicialização sem erros
- [ ] Validação de email funciona
- [ ] Código é gerado
- [ ] Código inválido é rejeitado
- [ ] Código válido é aceito
- [ ] Avança para "Criar Nova Senha"
- [ ] Validação de força funciona
- [ ] Senhas diferentes são rejeitadas
- [ ] Senha válida é salva
- [ ] Login funciona com nova senha
- [ ] Sem erros de console

**Se todos marcados ✓ → SUCESSO! 🎉**

---

**Guia de Teste Rápido**  
v1.0 (CORRIGIDA) | Data: 11/11/2025
