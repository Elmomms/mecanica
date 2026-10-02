const prisma = require('../db');

exports.listar = async (req, res) => {
    const ordens = await prisma.ordemServico.findMany({
        include: {
            veiculo: {
                include: { cliente: true }
            }
        },
        orderBy: { data: 'desc' }
    });

    res.json(ordens);
};

exports.criar = async (req, res) => {
    const { veiculoId, data, descricao, valor, status } = req.body;

    if (!veiculoId || !descricao) {
        return res.status(400).json({ erro: 'Veículo e descrição são obrigatórios.' });
    }

    const veiculo = await prisma.veiculo.findUnique({
        where: { id: Number(veiculoId) }
    });

    if (!veiculo) {
        return res.status(400).json({ erro: 'Veículo não encontrado.' });
    }

    const novaOrdem = await prisma.ordemServico.create({
        data: {
            veiculoId: Number(veiculoId),
            data: data ? new Date(data) : new Date(),
            descricao,
            valor: Number(valor || 0),
            status: status || 'Aberta'
        }
    });

    res.status(201).json(novaOrdem);
};

exports.editar = async (req, res) => {
    const id = Number(req.params.id);
    const { veiculoId, data, descricao, valor, status } = req.body;

    const ordemAtualizada = await prisma.ordemServico.update({
        where: { id },
        data: {
            veiculoId: Number(veiculoId),
            data: new Date(data),
            descricao,
            valor: Number(valor),
            status
        }
    });

    res.json(ordemAtualizada);
};

exports.excluir = async (req, res) => {
    const id = Number(req.params.id);

    await prisma.ordemServico.delete({
        where: { id }
    });

    res.json({ mensagem: 'OS excluída.' });
};