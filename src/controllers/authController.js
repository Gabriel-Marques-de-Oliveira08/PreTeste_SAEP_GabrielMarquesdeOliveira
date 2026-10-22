const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

async function login(req, res) {
  try {
    const { email, senha } = req.body;
//Pega o email e a senha que o usuário digitou no formulário de login. 

    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ mensagem: 'Email ou senha inválidos' });
    }
// procura no banco de dados um único usuário que tenha aquele email. Se não encontrar //para.

    const senhaConfere = await bcrypt.compare(senha, usuario.senha);
    if (!senhaConfere) {
      return res.status(401).json({ mensagem: 'Email ou senha inválidos' });
    }

//compara a senha que o usuário digitou agora (texto puro, tipo "123456") com a senha // criptografada que está salva no banco 

    const token = jwt.sign(
      { id: usuario.id, tipo: usuario.tipo },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

//Se chegou até aqui, é porque o email existe e a senha está correta. Então o sistema 
// gera um token JWT: 

    res.json({ token });
  } catch (erro) {
    res.status(500).json({
      mensagem: 'Erro ao fazer login',
      erro: erro.message,
    });
  }
}

module.exports = { login };
