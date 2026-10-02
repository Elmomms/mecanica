require('dotenv').config();
const express = require('express');
const cors = require('cors');
const auth = require('./middleware/auth');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ mensagem: 'API AutoFix funcionando' });
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/clientes', auth, require('./routes/clientes'));
app.use('/api/veiculos', auth, require('./routes/veiculos'));
app.use('/api/ordens', auth, require('./routes/ordens'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`AutoFix API rodando em http://localhost:${PORT}`);
});