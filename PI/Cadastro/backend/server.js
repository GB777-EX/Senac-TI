const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Database setup
const db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            password TEXT NOT NULL
        )`);
    }
});

// Route to update password
app.post('/reset-password', async (req, res) => {
    const { username, newPassword } = req.body;

    // Validate password
    const passwordCriteria = /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,}$/;
    if (!passwordCriteria.test(newPassword)) {
        return res.status(400).json({ message: 'A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula e um número, e não deve conter caracteres especiais.' });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the password in the database
        db.run(`UPDATE users SET password = ? WHERE username = ?`, [hashedPassword, username], function(err) {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ message: 'Erro ao atualizar a senha.' });
            }

            if (this.changes === 0) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }

            res.status(200).json({ message: 'Senha atualizada com sucesso!' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});