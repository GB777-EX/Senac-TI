// Elementos do DOM
const emailForm = document.getElementById('emailForm');
const codeForm = document.getElementById('codeForm');
const newPasswordForm = document.getElementById('newPasswordForm');
const codeDigits = document.querySelectorAll('.code-digit');
const fullCodeInput = document.getElementById('fullCode');
const resendBtn = document.getElementById('resendBtn');
const timerText = document.getElementById('timerText');
const newPasswordInput = document.getElementById('newPassword');
const confirmPasswordInput = document.getElementById('confirmPassword');
const togglePassword1 = document.getElementById('togglePassword1');
const togglePassword2 = document.getElementById('togglePassword2');
const strengthBar = document.getElementById('strengthFill');
const strengthText = document.getElementById('strengthText');

// Dados simulados
let currentEmail = '';
let verificationCode = '';
let resendTimeout = null;
let timerInterval = null;

// Gerar código aleatório de 6 dígitos
function generateCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Etapa 1: Enviar Email
emailForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();

    // Validar email
    if (!isValidEmail(email)) {
        showMessage('Por favor, insira um email válido', 'error');
        return;
    }

    // Simular envio de código
    currentEmail = email;
    verificationCode = generateCode();

    // Simular envio de email
    console.log('Código enviado para', email + ':', verificationCode);
    alert('✓ Código enviado para: ' + email + '\n\n(Código simulado: ' + verificationCode + ')');

    // Mostrar etapa 2
    showStep('step2');
    document.getElementById('emailDisplay').textContent = currentEmail;

    // Iniciar contador de reenvio
    startResendTimer();
});

// Etapa 2: Verificar Código
codeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const enteredCode = codeDigits.map(digit => digit.value).join('');

    if (enteredCode.length !== 6) {
        showMessage('Por favor, insira todos os 6 dígitos', 'error');
        return;
    }

    if (enteredCode === verificationCode) {
        showMessage('Código verificado com sucesso!', 'success');
        setTimeout(() => {
            showStep('step3');
            clearMessage();
        }, 1500);
    } else {
        showMessage('Código inválido. Tente novamente.', 'error');
        // Limpar os campos
        codeDigits.forEach(digit => digit.value = '');
        codeDigits[0].focus();
    }
});

// Etapa 3: Criar Nova Senha
newPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newPassword = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Validações
    if (newPassword.length < 8) {
        showMessage('A senha deve ter pelo menos 8 caracteres', 'error');
        return;
    }

    if (newPassword !== confirmPassword) {
        showMessage('As senhas não coincidem', 'error');
        return;
    }

    if (!hasStrongPassword(newPassword)) {
        showMessage('A senha deve conter letras, números e caracteres especiais', 'warning');
        return;
    }

    // Salvar a nova senha no localStorage
    const resetPasswords = JSON.parse(localStorage.getItem('resetPasswords') || '{}');
    resetPasswords[currentEmail] = newPassword;
    localStorage.setItem('resetPasswords', JSON.stringify(resetPasswords));

    // Simular salvamento de nova senha
    console.log('Senha redefinida para:', currentEmail);
    showMessage('Senha redefinida com sucesso!', 'success');

    // Mostrar etapa 4 (sucesso)
    setTimeout(() => {
        showStep('step4');
    }, 1500);

    // Redirecionar após 3 segundos
    setTimeout(() => {
        window.location.href = 'Login.html';
    }, 3000);
});

// Navegação entre inputs de código
codeDigits.forEach((digit, index) => {
    digit.addEventListener('input', (e) => {
        if (e.target.value.length === 1) {
            if (index < codeDigits.length - 1) {
                codeDigits[index + 1].focus();
            }
        }
        updateFullCode();
    });

    digit.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && digit.value === '') {
            if (index > 0) {
                codeDigits[index - 1].focus();
                codeDigits[index - 1].value = '';
            }
        }
    });

    // Permitir apenas números
    digit.addEventListener('keypress', (e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    });
});

// Atualizar código completo
function updateFullCode() {
    const fullCode = codeDigits.map(digit => digit.value).join('');
    fullCodeInput.value = fullCode;
}

// Timer de reenvio
function startResendTimer() {
    let seconds = 60;
    timerText.style.display = 'block';
    resendBtn.style.display = 'none';

    timerInterval = setInterval(() => {
        seconds--;
        document.getElementById('timer').textContent = seconds;

        if (seconds === 0) {
            clearInterval(timerInterval);
            timerText.style.display = 'none';
            resendBtn.style.display = 'block';
        }
    }, 1000);
}

// Reenviar código
resendBtn.addEventListener('click', (e) => {
    e.preventDefault();
    verificationCode = generateCode();
    console.log('Código reenviado para', currentEmail + ':', verificationCode);
    alert('✓ Novo código enviado para: ' + currentEmail + '\n\n(Código simulado: ' + verificationCode + ')');

    // Limpar inputs
    codeDigits.forEach(digit => digit.value = '');
    codeDigits[0].focus();

    // Reiniciar timer
    startResendTimer();
});

// Toggle de visibilidade de senha
togglePassword1.addEventListener('click', (e) => {
    e.preventDefault();
    togglePasswordVisibility(newPasswordInput, togglePassword1);
});

togglePassword2.addEventListener('click', (e) => {
    e.preventDefault();
    togglePasswordVisibility(confirmPasswordInput, togglePassword2);
});

function togglePasswordVisibility(input, button) {
    const type = input.type === 'password' ? 'text' : 'password';
    input.type = type;
    button.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
}

// Análise de força da senha
newPasswordInput.addEventListener('input', () => {
    const password = newPasswordInput.value;
    const strength = calculatePasswordStrength(password);

    if (password.length > 0) {
        document.getElementById('strengthBar').classList.add('show');
        document.getElementById('strengthText').classList.add('show');

        strengthBar.className = 'strength-bar ' + strength.level;
        strengthText.textContent = strength.text;
        strengthText.className = 'strength-text show ' + strength.level;
    } else {
        document.getElementById('strengthBar').classList.remove('show');
        document.getElementById('strengthText').classList.remove('show');
    }
});

// Calcular força da senha
function calculatePasswordStrength(password) {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) {
        return { level: 'weak', text: 'Senha fraca' };
    } else if (strength <= 3) {
        return { level: 'medium', text: 'Senha média' };
    } else {
        return { level: 'strong', text: 'Senha forte' };
    }
}

// Validar se a senha é forte
function hasStrongPassword(password) {
    return /[a-z]/.test(password) &&
           /[A-Z]/.test(password) &&
           /[0-9]/.test(password);
}

// Validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Mostrar/ocultar etapas
function showStep(stepId) {
    document.querySelectorAll('.step-content').forEach(step => {
        step.style.display = 'none';
    });
    document.getElementById(stepId).style.display = 'block';
}

// Resetar formulário
function resetForm() {
    clearInterval(timerInterval);
    document.getElementById('email').value = '';
    codeDigits.forEach(digit => digit.value = '');
    newPasswordInput.value = '';
    confirmPasswordInput.value = '';
    showStep('step1');
    clearMessage();
}

// Mostrar/ocultar mensagens
function showMessage(message, type) {
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type} show`;
    messageDiv.textContent = message;

    const container = document.querySelector('.forgot-container');
    container.insertBefore(messageDiv, container.firstChild);

    setTimeout(() => {
        messageDiv.classList.remove('show');
        setTimeout(() => messageDiv.remove(), 300);
    }, 4000);
}

// Limpar mensagens
function clearMessage() {
    const message = document.querySelector('.message');
    if (message) {
        message.remove();
    }
}

// Enter para submit nos inputs numéricos
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const activeForm = document.activeElement.closest('form');
        if (activeForm) {
            activeForm.dispatchEvent(new Event('submit'));
        }
    }
});
