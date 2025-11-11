let currentStep = 1;
const totalSteps = 2;

const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const steps = document.querySelectorAll('.step');
const formSections = document.querySelectorAll('.form-section');

// Função para validar campos obrigatórios do passo atual
function validarPasso(numeroStep) {
    const passo = document.getElementById(`step${numeroStep}`);
    const camposObrigatorios = passo.querySelectorAll('input[required], select[required]');
    
    for (let campo of camposObrigatorios) {
        if (!campo.value.trim()) {
            campo.focus();
            alert(`Por favor, preencha o campo "${campo.previousElementSibling.textContent}" antes de continuar.`);
            return false;
        }
    }
    
    // Validar força da senha no passo 1
    if (numeroStep === 1) {
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        
        // Validar se as senhas são iguais
        if (password.value !== confirmPassword.value) {
            alert('❌ As senhas não correspondem. Por favor, tente novamente.');
            confirmPassword.focus();
            return false;
        }
        
        // Validar força da senha
        if (!isStrongPassword(password.value)) {
            alert('❌ Senha fraca. Deve conter:\n✓ Mínimo 8 caracteres\n✓ Letras maiúsculas (A-Z)\n✓ Letras minúsculas (a-z)\n✓ Números (0-9)');
            password.focus();
            return false;
        }
    }
    
    // Validar termos e condições na última etapa
    if (numeroStep === 2) {
        const termsCheckbox = document.getElementById('terms');
        if (!termsCheckbox.checked) {
            alert('Você deve aceitar os termos e condições para continuar.');
            termsCheckbox.focus();
            return false;
        }
    }
    
    return true;
}

// Função para avançar para o próximo passo
nextBtn.addEventListener('click', () => {
    if (currentStep < totalSteps) {
        // Validar campos do passo atual
        if (!validarPasso(currentStep)) {
            return;
        }
        
        // Esconde o passo atual
        formSections[currentStep - 1].classList.remove('active');
        steps[currentStep - 1].classList.remove('active');

        // Avança para o próximo passo
        currentStep++;

        // Mostra o novo passo
        formSections[currentStep - 1].classList.add('active');
        steps[currentStep - 1].classList.add('active');

        // Mostra botão de voltar se não estiver no primeiro passo
        if (currentStep > 1) {
            prevBtn.style.display = 'block';
        }

        // Se chegou na última etapa, atualiza o botão e preenche confirmação
        if (currentStep === totalSteps) {
            nextBtn.textContent = 'Concluir';
            preencherConfirmacao();
        }
    } else if (currentStep === totalSteps) {
        // Validar e confirmar cadastro
        if (!validarPasso(currentStep)) {
            return;
        }
        
        // Salvar dados do cadastro
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const cpf = document.getElementById('cpf').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const birthDate = document.getElementById('birthDate').value;
        const password = document.getElementById('password').value;

        // Salvar dados do usuário no localStorage
        const userData = {
            firstName: firstName,
            lastName: lastName,
            cpf: cpf,
            email: email,
            phone: phone,
            birthDate: birthDate,
            password: password, // ✅ ADICIONADO
            createdAt: new Date().toISOString()
        };

        // Verificar se usuário já existe
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        const userExists = users.some(u => u.email === email);

        if (userExists) {
            alert('Este email já está cadastrado! Tente fazer login ou use outro email.');
            return;
        }

        // Adicionar usuário à lista
        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users));

        // Criar senha padrão para o novo usuário (pode ser alterada no login)
        const userLogins = JSON.parse(localStorage.getItem('userLogins') || '{}');
        userLogins[email] = password; // ✅ SALVA A SENHA CRIADA NO CADASTRO
        localStorage.setItem('userLogins', JSON.stringify(userLogins));

        console.log('Cadastro realizado com sucesso!');
        console.log('Usuário cadastrado:', userData);
        alert('✓ Cadastro realizado com sucesso!\n\nVocê será redirecionado para fazer login.');
        
        // Redirecionar para login após 2 segundos
        setTimeout(() => {
            window.location.href = 'Login/Login.html';
        }, 2000);
    }
});

// Função para voltar para o passo anterior
prevBtn.addEventListener('click', () => {
    if (currentStep > 1) {
        // Esconde o passo atual
        formSections[currentStep - 1].classList.remove('active');
        steps[currentStep - 1].classList.remove('active');

        // Volta para o passo anterior
        currentStep--;

        // Mostra o passo anterior
        formSections[currentStep - 1].classList.add('active');
        steps[currentStep - 1].classList.add('active');

        // Oculta botão de voltar se voltou ao primeiro passo
        if (currentStep === 1) {
            prevBtn.style.display = 'none';
        }

        // Restaura o botão para "Próximo" se não está na última etapa
        if (currentStep < totalSteps) {
            nextBtn.textContent = 'Próximo';
        }
    }
});

// Função para preencher a confirmação com os dados fornecidos
function preencherConfirmacao() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const cpf = document.getElementById('cpf').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const birthDate = document.getElementById('birthDate').value;
    const password = document.getElementById('password').value;

    // Formatar data de YYYY-MM-DD para DD/MM/YYYY
    let birthDateFormatted = '-';
    if (birthDate) {
        const [year, month, day] = birthDate.split('-');
        birthDateFormatted = `${day}/${month}/${year}`;
    }

    // Preenche os dados pessoais
    document.getElementById('confirmName').textContent = `${firstName} ${lastName}` || '-';
    document.getElementById('confirmCpf').textContent = cpf || '-';
    document.getElementById('confirmEmail').textContent = email || '-';
    document.getElementById('confirmEmailLogin').textContent = email || '-';
    document.getElementById('confirmPhone').textContent = phone || '-';
    document.getElementById('confirmBirthDate').textContent = birthDateFormatted;
    
    // Preenche credenciais (senha sempre mostrada como •)
    if (password) {
        document.getElementById('confirmPasswordDisplay').textContent = '••••••••';
    }
}

// Formatar CPF enquanto digita
document.getElementById('cpf').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 3) {
        value = value.substring(0, 3) + '.' + value.substring(3);
    }
    if (value.length > 7) {
        value = value.substring(0, 7) + '.' + value.substring(7);
    }
    if (value.length > 11) {
        value = value.substring(0, 11) + '-' + value.substring(11, 13);
    }
    e.target.value = value;
});

// Formatar Telefone enquanto digita (até 11 dígitos)
document.getElementById('phone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    // Limitar a 11 dígitos (celular com 9 dígitos + 2 área)
    if (value.length > 11) {
        value = value.substring(0, 11);
    }
    
    // Formatar: (XX) 9XXXX-XXXX ou (XX) XXXX-XXXX
    if (value.length > 0) {
        value = '(' + value.substring(0, 2) + ') ' + value.substring(2);
    }
    if (value.length > 9) {
        value = value.substring(0, 9) + '-' + value.substring(9, 14);
    }
    
    e.target.value = value;
});

// ====== VALIDAÇÃO DE SENHA ======

// Função para validar força da senha
function isStrongPassword(password) {
    const hasLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    console.log('Validação de senha:', {
        length: hasLength,
        uppercase: hasUppercase,
        lowercase: hasLowercase,
        number: hasNumber
    });

    return hasLength && hasUppercase && hasLowercase && hasNumber;
}

// Função para calcular força da senha
function calculatePasswordStrength(password) {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) {
        return { level: 'weak', text: '🔴 Fraca', percentage: 30 };
    } else if (strength <= 3) {
        return { level: 'medium', text: '🟡 Média', percentage: 60 };
    } else {
        return { level: 'strong', text: '🟢 Forte', percentage: 100 };
    }
}

// Event listeners para campos de senha
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const strengthIndicator = document.getElementById('passwordStrengthIndicator');
const strengthFill = document.getElementById('strengthFill');
const strengthText = document.getElementById('strengthText');

if (passwordInput) {
    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (password.length > 0) {
            const strength = calculatePasswordStrength(password);
            
            // Mostrar indicador
            strengthIndicator.style.display = 'block';
            
            // Atualizar barra de força
            strengthFill.style.width = strength.percentage + '%';
            strengthFill.style.backgroundColor = 
                strength.level === 'weak' ? '#e74c3c' :
                strength.level === 'medium' ? '#f39c12' :
                '#27ae60';
            
            // Atualizar texto
            strengthText.textContent = strength.text;
            strengthText.style.color = 
                strength.level === 'weak' ? '#e74c3c' :
                strength.level === 'medium' ? '#f39c12' :
                '#27ae60';
            
            // Validar correspondência de senhas
            if (confirmPassword.length > 0) {
                if (password === confirmPassword) {
                    confirmPasswordInput.style.borderColor = '#27ae60';
                } else {
                    confirmPasswordInput.style.borderColor = '#e74c3c';
                }
            }
        } else {
            strengthIndicator.style.display = 'none';
        }
    });
}

if (confirmPasswordInput) {
    confirmPasswordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (confirmPassword.length > 0 && password.length > 0) {
            if (password === confirmPassword) {
                confirmPasswordInput.style.borderColor = '#27ae60';
                confirmPasswordInput.style.boxShadow = '0 0 0 3px rgba(39, 174, 96, 0.1)';
            } else {
                confirmPasswordInput.style.borderColor = '#e74c3c';
                confirmPasswordInput.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.1)';
            }
        } else if (confirmPassword.length === 0) {
            confirmPasswordInput.style.borderColor = '';
            confirmPasswordInput.style.boxShadow = '';
        }
    });
}
