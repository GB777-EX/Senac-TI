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
        // Submeter formulário
        console.log('Formulário enviado!');
        alert('Cadastro realizado com sucesso!');
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
    document.getElementById('confirmPhone').textContent = phone || '-';
    document.getElementById('confirmBirthDate').textContent = birthDateFormatted;
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

// Formatar Telefone enquanto digita
document.getElementById('phone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 0) {
        value = '(' + value.substring(0, 2) + ') ' + value.substring(2);
    }
    if (value.length > 9) {
        value = value.substring(0, 9) + '-' + value.substring(9, 13);
    }
    e.target.value = value;
});
