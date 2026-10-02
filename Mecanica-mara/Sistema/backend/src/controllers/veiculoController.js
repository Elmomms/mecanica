const prisma = require('../db');

exports.listar = async (req, res) => {
    const veiculos = await prisma.veiculo.findMany({
        include: { cliente: true },
        orderBy: { id: 'desc' }
    });

    res.json(veiculos);
};

exports.criar = async (req, res) => {
    const { placa, marca, modelo, ano, clienteId } = req.body;

    if (!placa || !marca || !modelo || !ano || !clienteId) {
        return res.status(400).json({ erro: 'Preencha todos os campos.' });
    }

    const cliente = await prisma.cliente.findUnique({
        where: { id: Number(clienteId) }
    });

    if (!cliente) {
        return res.status(400).json({ erro: 'Cliente não encontrado.' });
    }

    const novoVeiculo = await prisma.veiculo.create({
        data: {
            placa,
            marca,
            modelo,
            ano: Number(ano),
            clienteId: Number(clienteId)
        }
    });

    res.status(201).json(novoVeiculo);
};

exports.editar = async (req, res) => {
    const id = Number(req.params.id);
    const { placa, marca, modelo, ano, clienteId } = req.body;

    const veiculoAtualizado = await prisma.veiculo.update({
        where: { id },
        data: {
            placa,
            marca,
            modelo,
            ano: Number(ano),
            clienteId: Number(clienteId)
        }
    });

    res.json(veiculoAtualizado);
};

exports.excluir = async (req, res) => {
    const id = Number(req.params.id);

    const ordemServico = await prisma.ordemServico.findFirst({
        where: { veiculoId: id }
    });

    if (ordemServico) {
        return res.status(400).json({ erro: 'Veículo possui ordem de serviço.' });
    }

    await prisma.veiculo.delete({
        where: { id }
    });

    res.json({ mensagem: 'Veículo excluído.' });
};