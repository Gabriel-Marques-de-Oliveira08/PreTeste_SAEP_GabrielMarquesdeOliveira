const express = require('express');
const router = express.Router();
const { cadastrar, listar, deletar } = require('../controllers/materialController');
const auth = require('../middlewares/auth');
const permitir = require('../middlewares/checkRole'); 
 
router.post('/materiais', auth, cadastrar);
router.get('/materiais', auth, listar);
router.delete('/materiais/:id', auth, permitir('administrador'), deletar); 

module.exports = router;
