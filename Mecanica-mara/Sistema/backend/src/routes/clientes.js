const r=require('express').Router();const c=require('../controllers/clienteController');r.get('/',c.listar);r.post('/',c.criar);r.put('/:id',c.editar);r.delete('/:id',c.excluir);module.exports=r;
