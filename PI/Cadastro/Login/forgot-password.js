// Elementos do DOM
const emailForm = document.getElementById('emailForm');
const codeForm = document.getElementById('codeForm');
const newPasswordForm = document.getElementById('newPasswordForm');
const codeDigits = Array.from(document.querySelectorAll('.code-digit')); // Converter NodeList em Array
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

    // Validar que todos os campos estão preenchidos
    const enteredCode = codeDigits.map(digit => digit.value).join('');
    
    console.log('Código inserido:', enteredCode);
    console.log('Código esperado:', verificationCode);

    if (enteredCode.length !== 6) {
        showMessage('Por favor, insira todos os 6 dígitos', 'error');
        return;
    }

    if (enteredCode !== verificationCode) {
        showMessage('❌ Código inválido. Tente novamente.', 'error');
        // Limpar os campos
        codeDigits.forEach(digit => digit.value = '');
        codeDigits[0].focus();
        return;
    }

    // Código correto
    showMessage('✓ Código verificado com sucesso!', 'success');
    console.log('Código validado! Avançando para próxima etapa...');
    
    setTimeout(() => {
        showStep('step3');
        clearMessage();
    }, 1500);
});

// Etapa 3: Criar Nova Senha
newPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newPassword = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    console.log('Validando nova senha...');

    // Validação 1: Comprimento
    if (newPassword.length < 8) {
        showMessage('❌ A senha deve ter pelo menos 8 caracteres', 'error');
        return;
    }

    // Validação 2: Confirmação de senha
    if (newPassword !== confirmPassword) {
        showMessage('❌ As senhas não coincidem. Verifique a confirmação.', 'error');
        return;
    }

    // Validação 3: Força da senha
    if (!hasStrongPassword(newPassword)) {
        showMessage('❌ A senha deve conter: maiúsculas, minúsculas e números (ex: Abc123xyz)', 'error');
        return;
    }

    // Validação 4: Email foi definido?
    if (!currentEmail) {
        showMessage('❌ Erro: Email não foi definido. Por favor, comece novamente.', 'error');
        return;
    }

    // Tudo OK! Salvar a nova senha
    console.log('Senha validada com sucesso! Salvando para:', currentEmail);

    // Salvar email e nova senha no localStorage
    const resetPasswords = JSON.parse(localStorage.getItem('resetPasswords') || '{}');
    resetPasswords[currentEmail] = newPassword;
    localStorage.setItem('resetPasswords', JSON.stringify(resetPasswords));
    
    // Salvar email para reset-password.js acessar (se necessário)
    localStorage.setItem('resetUserEmail', currentEmail);

    // Log de confirmação
    console.log('✓ Senha redefinida com sucesso para:', currentEmail);
    console.log('✓ resetPasswords atualizado:', resetPasswords);

    showMessage('✓ Senha redefinida com sucesso!', 'success');

    // Mostrar etapa 4 (sucesso)
    setTimeout(() => {
        showStep('step4');
    }, 1500);

    // Redirecionar após 3 segundos
    setTimeout(() => {
        console.log('Redirecionando para Login.html...');
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

// Atualizar código completo (sincronizar com o input hidden)
function updateFullCode() {
    if (!codeDigits || codeDigits.length === 0) {
        console.warn('codeDigits não encontrado');
        return;
    }
    
    const fullCode = codeDigits.map(digit => digit.value || '').join('');
    if (fullCodeInput) {
        fullCodeInput.value = fullCode;
    }
    
    console.log('Código atualizado:', fullCode);
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

// Análise de força da senha em tempo real
newPasswordInput.addEventListener('input', () => {
    const password = newPasswordInput.value;
    const strength = calculatePasswordStrength(password);

    if (password.length > 0) {
        const strengthBar = document.getElementById('strengthBar');
        const strengthText = document.getElementById('strengthText');
        
        if (strengthBar) strengthBar.classList.add('show');
        if (strengthText) strengthText.classList.add('show');

        const fillBar = document.getElementById('strengthFill');
        if (fillBar) {
            fillBar.className = 'strength-bar ' + strength.level;
        }
        
        if (strengthText) {
            strengthText.textContent = strength.text;
            strengthText.className = 'strength-text show ' + strength.level;
        }
        
        console.log('Força da senha:', strength.level, '-', strength.text);
    } else {
        const strengthBar = document.getElementById('strengthBar');
        const strengthText = document.getElementById('strengthText');
        
        if (strengthBar) strengthBar.classList.remove('show');
        if (strengthText) strengthText.classList.remove('show');
    }
});

// Calcular força da senha com feedback detalhado
function calculatePasswordStrength(password) {
    let strength = 0;
    let requirements = [];

    if (password.length >= 8) {
        strength++;
        requirements.push('✓ 8+ caracteres');
    } else {
        requirements.push('✗ Menos de 8 caracteres');
    }

    if (/[a-z]/.test(password)) {
        strength++;
        requirements.push('✓ Minúsculas');
    } else {
        requirements.push('✗ Sem minúsculas');
    }

    if (/[A-Z]/.test(password)) {
        strength++;
        requirements.push('✓ Maiúsculas');
    } else {
        requirements.push('✗ Sem maiúsculas');
    }

    if (/[0-9]/.test(password)) {
        strength++;
        requirements.push('✓ Números');
    } else {
        requirements.push('✗ Sem números');
    }

    if (/[^a-zA-Z0-9]/.test(password)) {
        strength++;
        requirements.push('✓ Caracteres especiais');
    }

    if (strength <= 2) {
        return { 
            level: 'weak', 
            text: '🔴 Senha Fraca' 
        };
    } else if (strength <= 3) {
        return { 
            level: 'medium', 
            text: '🟡 Senha Média' 
        };
    } else {
        return { 
            level: 'strong', 
            text: '🟢 Senha Forte' 
        };
    }
}

// Validar se a senha atende aos requisitos mínimos
function hasStrongPassword(password) {
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasLength = password.length >= 8;

    console.log('Validação de senha:', {
        length: hasLength,
        lowercase: hasLowercase,
        uppercase: hasUppercase,
        number: hasNumber
    });

    return hasLowercase && hasUppercase && hasNumber && hasLength;
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

// Mostrar/ocultar mensagens com melhor controle
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
    messageDiv.role = 'alert'; // Accessibility
    messageDiv.style.cssText = `
        padding: 15px 20px;
        margin-bottom: 20px;
        border-radius: 5px;
        font-weight: 500;
        animation: slideDown 0.3s ease-in-out;
        z-index: 1000;
    `;

    // Cores diferentes para cada tipo
    if (type === 'error') {
        messageDiv.style.backgroundColor = '#fee';
        messageDiv.style.color = '#c33';
        messageDiv.style.borderLeft = '4px solid #c33';
    } else if (type === 'success') {
        messageDiv.style.backgroundColor = '#efe';
        messageDiv.style.color = '#3c3';
        messageDiv.style.borderLeft = '4px solid #3c3';
    }

    const container = document.querySelector('.forgot-container');
    if (container) {
        container.insertBefore(messageDiv, container.firstChild);
        console.log('Mensagem exibida:', message);
    } else {
        console.error('Container .forgot-container não encontrado');
    }

    // Remover mensagem após 5 segundos
    setTimeout(() => {
        if (messageDiv && messageDiv.parentNode) {
            messageDiv.classList.remove('show');
            setTimeout(() => {
                if (messageDiv && messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 300);
        }
    }, 5000);
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

// Inicializar quando o documento carrega
document.addEventListener('DOMContentLoaded', () => {
    console.log('=== FORGOT-PASSWORD.JS INICIALIZADO ===');
    console.log('Email Form:', emailForm ? '✓ Encontrado' : '✗ NÃO ENCONTRADO');
    console.log('Code Form:', codeForm ? '✓ Encontrado' : '✗ NÃO ENCONTRADO');
    console.log('Password Form:', newPasswordForm ? '✓ Encontrado' : '✗ NÃO ENCONTRADO');
    console.log('Code Digits:', codeDigits.length > 0 ? `✓ Encontrados ${codeDigits.length} campos` : '✗ NÃO ENCONTRADOS');
    console.log('=====================================');
});
