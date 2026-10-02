const prisma = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ erro: 'Preencha e-mail e senha.' });
        }

        const usuario = await prisma.usuario.findUnique({ where: { email } });

        if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
            return res.status(401).json({ erro: 'E-mail ou senha incorretos.' });
        }

        const token = jwt.sign(
            { id: usuario.id, nome: usuario.nome },
            process.env.JWT_SECRET,
            { expiresIn: '30m' }
        );

        res.json({ token, nome: usuario.nome });
    } catch (erro) {
        res.status(500).json({ erro: 'Erro no login.' });
    }
};