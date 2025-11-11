// Elementos do DOM
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const rememberMeCheckbox = document.getElementById('rememberMe');

// Dados de usuários padrão para teste
let users = [
    { email: 'usuario@email.com', password: '123456' },
    { email: 'teste@email.com', password: 'senha123' },
    { email: 'demo@email.com', password: 'demo1234' }
];

// Carregar dados salvos ao abrir a página
window.addEventListener('DOMContentLoaded', () => {
    initializeUsers();
    loadSavedCredentials();
});

// Inicializar usuários - combinar usuários padrão com cadastrados
function initializeUsers() {
    const registeredUsers = JSON.parse(localStorage.getItem('userLogins') || '{}');
    const resetPasswords = JSON.parse(localStorage.getItem('resetPasswords') || '{}');
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]'); // Dados do cadastro
    
    // Adicionar usuários cadastrados
    Object.keys(registeredUsers).forEach(email => {
        const userIndex = users.findIndex(u => u.email === email);
        const userInfo = allUsers.find(u => u.email === email); // Procurar dados do cadastro
        
        if (userIndex === -1) {
            const newUser = { 
                email: email, 
                password: registeredUsers[email],
                firstName: userInfo ? userInfo.firstName : 'Usuário', // ✅ APENAS PRIMEIRO NOME
                lastName: userInfo ? userInfo.lastName : ''
            };
            users.push(newUser);
        } else {
            users[userIndex].password = registeredUsers[email];
            if (userInfo) {
                users[userIndex].firstName = userInfo.firstName;
                users[userIndex].lastName = userInfo.lastName;
            }
        }
    });
    
    // Atualizar senhas redefinidas
    Object.keys(resetPasswords).forEach(email => {
        const userIndex = users.findIndex(u => u.email === email);
        const userInfo = allUsers.find(u => u.email === email); // Procurar dados do cadastro
        
        if (userIndex !== -1) {
            users[userIndex].password = resetPasswords[email];
            if (userInfo) {
                users[userIndex].firstName = userInfo.firstName;
                users[userIndex].lastName = userInfo.lastName;
            }
        } else {
            const newUser = {
                email: email,
                password: resetPasswords[email],
                firstName: userInfo ? userInfo.firstName : 'Usuário',
                lastName: userInfo ? userInfo.lastName : ''
            };
            users.push(newUser);
        }
    });
    
    console.log('Usuários carregados:', users);
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

// Toggle de Visibilidade de Senha
function initPasswordToggle() {
    const toggleButton = document.getElementById('togglePassword');
    const passwordField = document.getElementById('password');

    if (toggleButton && passwordField) {
        toggleButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Alternar tipo de input
            const isPassword = passwordField.type === 'password';
            passwordField.type = isPassword ? 'text' : 'password';
            
            // Atualizar emoji (opcional - visualizar mudança)
            this.textContent = isPassword ? '👁️‍🗨️' : '👁️';
        });
    }
}

// Inicializar toggle após carregar o DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPasswordToggle);
} else {
    initPasswordToggle();
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
        
        // Salvar usuário logado
        localStorage.setItem('currentUser', email);

        // Exibir mensagem de sucesso
        showMessage('✅ Login realizado com sucesso!', 'success');

        // Aguardar 2 segundos e exibir mensagem de boas-vindas
        setTimeout(() => {
            // ✅ USA APENAS O PRIMEIRO NOME
            const userName = user.firstName || email.split('@')[0];
            showWelcomeMessage(`👋 Bem-vindo(a), ${userName}!`);
            
            // Redirecionar após mais 3 segundos
            setTimeout(() => {
                console.log('Usuário logado:', user.email);
                // Redirecionar para página de dashboard (pode ser alterado conforme necessário)
                // window.location.href = '/dashboard';
            }, 3000);
        }, 2000);
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
passwordToggle.innerHTML = '';
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

// Função para exibir mensagem de boas-vindas personalizada com efeitos 3D FLUIDOS
function showWelcomeMessage(message) {
    // Remover mensagem anterior se existir
    const existingMessage = document.querySelector('.welcome-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Criar container para efeito de background animado
    const bgOverlay = document.createElement('div');
    bgOverlay.className = 'welcome-bg-overlay';
    bgOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at 50% 50%, rgba(102, 126, 234, 0.15) 0%, transparent 70%);
        z-index: 9998;
        animation: bgFade 3s ease-in-out forwards;
    `;

    // Criar novo elemento de boas-vindas com animação FLUIDA
    const welcomeDiv = document.createElement('div');
    welcomeDiv.className = 'welcome-message show';
    welcomeDiv.textContent = message;
    
    // Estilos com animações ULTRA FLUIDAS e leves
    welcomeDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 40%, #f093fb 100%);
        color: white;
        padding: 55px 90px;
        border-radius: 25px;
        font-size: 38px;
        font-weight: 700;
        text-align: center;
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        box-shadow: 0 20px 50px rgba(102, 126, 234, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2);
        z-index: 10000;
        animation: welcomeSlideInSmooth 0.6s cubic-bezier(0.16, 1, 0.3, 1) both,
                   welcomeFloatSmooth 3s ease-in-out 0.6s both,
                   welcomeSlideOutSmooth 0.6s cubic-bezier(0.7, 0, 0.84, 0) 2.4s forwards;
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        letter-spacing: 0.5px;
        max-width: 85vw;
        word-wrap: break-word;
        will-change: transform, opacity;
    `;

    // Adicionar estilos de animação FLUIDA ao documento
    if (!document.getElementById('welcome-animation-styles-smooth')) {
        const style = document.createElement('style');
        style.id = 'welcome-animation-styles-smooth';
        style.textContent = `
            /* Animação de entrada SUPER FLUIDA (sem 3D pesado) */
            @keyframes welcomeSlideInSmooth {
                0% {
                    opacity: 0;
                    transform: translate(-50%, -55%) scale(0.9);
                }
                100% {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
            }
            
            /* Flutuação LEVE e suave */
            @keyframes welcomeFloatSmooth {
                0%, 100% {
                    transform: translate(-50%, -50%) translateY(0px);
                }
                50% {
                    transform: translate(-50%, -50%) translateY(-8px);
                }
            }
            
            /* Saída FLUIDA simples */
            @keyframes welcomeSlideOutSmooth {
                0% {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translate(-50%, -55%) scale(0.9);
                }
            }
            
            /* Fade do background */
            @keyframes bgFade {
                0% { opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { opacity: 0; }
            }
            
            /* Efeito de partículas LEVE */
            .confetti-particle {
                position: fixed;
                pointer-events: none;
                font-size: 24px;
                opacity: 1;
                z-index: 9999;
                will-change: transform;
            }
            
            @keyframes fallSmooth {
                0% {
                    transform: translateY(0) translateX(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) translateX(var(--tx, 0px)) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Inserir background e mensagem
    document.body.appendChild(bgOverlay);
    document.body.appendChild(welcomeDiv);

    // Criar efeito de confete/partículas FLUIDO
        createConfetteSmooth(40);    // Remover após 3 segundos
    setTimeout(() => {
        if (welcomeDiv && welcomeDiv.parentNode) {
            welcomeDiv.remove();
        }
        if (bgOverlay && bgOverlay.parentNode) {
            bgOverlay.remove();
        }
    }, 3000);
}

// Função para criar efeito de confete FLUIDO e elegante
function createConfetteSmooth(count) {
    const confettiItems = ['🎉', '✨', '⭐', '🎊', '💫', '🌟', '✨', '🎈', '🎁', '🎀'];
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'confetti-particle';
        particle.textContent = confettiItems[Math.floor(Math.random() * confettiItems.length)];
        
        // Posição aleatória no topo
        const startX = Math.random() * window.innerWidth;
        const randomDelay = Math.random() * 0.8;
        const randomDuration = 2.5 + Math.random() * 1.5;
        const randomTranslateX = (Math.random() - 0.5) * 400;
        
        particle.style.left = startX + 'px';
        particle.style.top = window.innerHeight / 2 + 'px';
        particle.style.setProperty('--tx', randomTranslateX + 'px');
        particle.style.animation = `fallSmooth ${randomDuration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;
        particle.style.animationDelay = randomDelay + 's';
        particle.style.opacity = (0.7 + Math.random() * 0.3);
        particle.style.filter = `blur(${Math.random() * 1}px) brightness(${0.9 + Math.random() * 0.2})`;
        
        document.body.appendChild(particle);
        
        // Remover após animação
        setTimeout(() => {
            if (particle && particle.parentNode) {
                particle.remove();
            }
        }, (randomDelay + randomDuration) * 1000);
    }
}