const router = require('express').Router();
const clienteController = require('../controllers/clienteController');

router.get('/', clienteController.listar);
router.post('/', clienteController.criar);
router.put('/:id', clienteController.editar);
router.delete('/:id', clienteController.excluir);

module.exports = router;