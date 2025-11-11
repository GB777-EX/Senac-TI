document.getElementById('resetPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorMessage = document.getElementById('errorMessage');

    // Clear previous error message
    errorMessage.textContent = '';

    // Password validation criteria - Mínimo 8 caracteres, com letra maiúscula e número
    const passwordCriteria = /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,}$/;

    if (!passwordCriteria.test(newPassword)) {
        errorMessage.textContent = 'A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula e um número.';
        return;
    }

    if (newPassword !== confirmPassword) {
        errorMessage.textContent = 'As senhas não coincidem. Por favor, tente novamente.';
        return;
    }

    // Simular salvamento de nova senha no localStorage
    const userEmail = localStorage.getItem('resetUserEmail');
    if (userEmail) {
        const resetPasswords = JSON.parse(localStorage.getItem('resetPasswords') || '{}');
        resetPasswords[userEmail] = newPassword;
        localStorage.setItem('resetPasswords', JSON.stringify(resetPasswords));
        
        alert('Senha redefinida com sucesso!');
        // Redirecionar para Login
        window.location.href = 'Login.html';
    } else {
        errorMessage.textContent = 'Erro: Nenhum usuário para redefinir senha.';
    }
});