// Elementos do DOM
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const rememberMeCheckbox = document.getElementById('rememberMe');

// Dados de usuários simulados (em produção seria uma API)
let users = [
    { email: 'usuario@email.com', password: '123456' },
    { email: 'teste@email.com', password: 'senha123' },
    { email: 'demo@email.com', password: 'demo1234' }
];

// Carregar dados salvos ao abrir a página
window.addEventListener('DOMContentLoaded', () => {
    loadSavedCredentials();
    loadResetPasswords();
});

// Carregar senhas redefinidas do localStorage
function loadResetPasswords() {
    const resetPasswords = localStorage.getItem('resetPasswords');
    if (resetPasswords) {
        const passwords = JSON.parse(resetPasswords);
        // Atualizar a senha dos usuários
        Object.keys(passwords).forEach(email => {
            const userIndex = users.findIndex(u => u.email === email);
            if (userIndex !== -1) {
                users[userIndex].password = passwords[email];
            } else {
                // Se o usuário não existe, criar um novo
                users.push({ email: email, password: passwords[email] });
            }
        });
    }
}

// Função para carregar credenciais salvas
function loadSavedCredentials() {
    const savedEmail = localStorage.getItem('savedEmail');
    const savedRememberMe = localStorage.getItem('rememberMe');

    if (savedEmail && savedRememberMe === 'true') {
        emailInput.value = savedEmail;
        rememberMeCheckbox.checked = true;
        passwordInput.focus();
    }
}

// Submissão do formulário
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Validação básica
    if (!email || !password) {
        showMessage('Por favor, preencha todos os campos', 'error');
        return;
    }

    // Validar email
    if (!isValidEmail(email)) {
        showMessage('Por favor, insira um email válido', 'error');
        emailInput.focus();
        return;
    }

    // Validar credenciais
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Salvar credenciais se "Lembrar-me" está marcado
        if (rememberMeCheckbox.checked) {
            localStorage.setItem('savedEmail', email);
            localStorage.setItem('rememberMe', 'true');
        } else {
            localStorage.removeItem('savedEmail');
            localStorage.removeItem('rememberMe');
        }

        showMessage('Login realizado com sucesso! Redirecionando...', 'success');

        // Simular redirecionamento após 1.5s
        setTimeout(() => {
            console.log('Usuário logado:', user);
            // Redirecionar para página de dashboard
            // window.location.href = '/dashboard';
            alert('Bem-vindo, ' + email + '!');
        }, 1500);
    } else {
        showMessage('Email ou senha incorretos', 'error');
        passwordInput.value = '';
        passwordInput.focus();
    }
});

// Função para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Função para exibir mensagens
function showMessage(message, type) {
    // Remover mensagem anterior se existir
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Criar nova mensagem
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type} show`;
    messageDiv.textContent = message;

    // Inserir antes do formulário
    loginForm.parentElement.insertBefore(messageDiv, loginForm);

    // Remover mensagem após 5 segundos
    setTimeout(() => {
        messageDiv.classList.remove('show');
        setTimeout(() => messageDiv.remove(), 300);
    }, 5000);
}

// Enter para submit (melhor UX)
passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        loginForm.dispatchEvent(new Event('submit'));
    }
});

// Permitir visualizar/ocultar senha
const passwordToggle = document.createElement('button');
passwordToggle.type = 'button';
passwordToggle.className = 'password-toggle';
passwordToggle.innerHTML = '👁️';
passwordToggle.style.cssText = `
    position: absolute;
    right: 12px;
    top: 38px;
    background: none;
    border: none;
    cursor: pointer;
    color: #666;
    font-size: 18px;
    transition: color 0.3s;
`;

// Envolver o input de senha em um container relativo
const passwordGroup = passwordInput.parentElement;
passwordGroup.style.position = 'relative';
passwordGroup.appendChild(passwordToggle);

passwordToggle.addEventListener('click', (e) => {
    e.preventDefault();
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    passwordToggle.innerHTML = type === 'password' ? '👁️' : '👁️‍🗨️';
    passwordToggle.style.color = type === 'password' ? '#666' : '#000';
});

passwordToggle.addEventListener('mouseenter', function() {
    this.style.color = '#333';
});

passwordToggle.addEventListener('mouseleave', function() {
    this.style.color = passwordInput.type === 'password' ? '#666' : '#000';
});