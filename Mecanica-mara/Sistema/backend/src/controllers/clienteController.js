const prisma = require('../db');
const { criptografar, descriptografar } = require('../utils');

exports.listar = async (req, res) => {
    const dados = await prisma.cliente.findMany({
        include: { veiculos: true },
        orderBy: { nome: 'asc' }
    });

    res.json(dados.map(cliente => ({
        ...cliente,
        cpf: descriptografar(cliente.cpf)
    })));
};

exports.criar = async (req, res) => {
    const { nome, cpf, telefone, email, endereco } = req.body;

    if (!nome || !cpf) {
        return res.status(400).json({ erro: 'Nome e CPF são obrigatórios.' });
    }

    const cliente = await prisma.cliente.create({
        data: {
            nome,
            cpf: criptografar(cpf),
            telefone: telefone || '',
            email: email || '',
            endereco: endereco || ''
        }
    });

    res.status(201).json({ ...cliente, cpf });
};

exports.editar = async (req, res) => {
    const id = Number(req.params.id);
    const { nome, cpf, telefone, email, endereco } = req.body;
    
    const dadosAtualizacao = { nome, telefone, email, endereco };
    
    if (cpf) {
        dadosAtualizacao.cpf = criptografar(cpf);
    }

    const cliente = await prisma.cliente.update({
        where: { id },
        data: dadosAtualizacao
    });

    res.json({
        ...cliente,
        cpf: cpf || descriptografar(cliente.cpf)
    });
};

exports.excluir = async (req, res) => {
    const id = Number(req.params.id);

    const veiculo = await prisma.veiculo.findFirst({
        where: { clienteId: id }
    });

    if (veiculo) {
        return res.status(400).json({ erro: 'Cliente possui veículo cadastrado.' });
    }

    await prisma.cliente.delete({
        where: { id }
    });

    res.json({ mensagem: 'Cliente excluído.' });
};