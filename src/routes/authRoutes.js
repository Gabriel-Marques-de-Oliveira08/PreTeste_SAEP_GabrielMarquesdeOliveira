const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');

router.post('/login', login);
//quando alguém fizer uma requisição POST para o endereço /login, execute a função //login". 

module.exports = router;
