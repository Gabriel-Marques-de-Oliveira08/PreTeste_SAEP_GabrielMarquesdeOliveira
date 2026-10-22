const Material = require('../models/Material');
const { Op } = require('sequelize'); 
 
async function cadastrar(req, res) {
  try {
    const { nome, preco, quantidade_estoque } = req.body;
 
    const material = await Livro.create({
      nome,
      preco,
      quantidade_estoque,
    });
 
    res.status(201).json(material);
  } catch (erro) {
    res.status(400).json({
      mensagem: 'Erro ao cadastrar material',
      erro: erro.message,
    });
  }
}
 
async function listar(req, res) { 
    try { 
        const { pagina = 1, limite = 10, nome, data } = req.query; 
        const filtro = {}; 
        // guarda as condições da busca em filtro  
            if (nome) { 
            filtro.titulo = { [Op.like]: `%${nome}%` }; 
            } 
            if (data) { 
            filtro.createdAt = { [Op.gte]: new Date(data) }; 
            } 
            const materiais = await Material.findAll({ 
                where: filtro, 
                limit: Number(limite), 
                offset: (Number(pagina) - 1) * Number(limite), 
            }); 
            res.json(materiais); 
                } catch (erro) { 
                    res.status(400).json({ 
                    mensagem: 'Erro ao listar materiais', 
                    erro: erro.message, 
            }); 
    } 
} 

async function deletar(req, res) { 
  try { 
    const { id } = req.params; 
  
    const livro = await Material.findByPk(id); 
    if (!livro) { 
      return res.status(404).json({ 
        mensagem: 'Material não encontrado', 
      }); 
    } 
  
    await livro.destroy(); 
  
    res.status(200).json({ 
      mensagem: 'Material removido com sucesso', 
    }); 
  } catch (erro) { 
    res.status(400).json({ 
      mensagem: 'Erro ao remover material', 
      erro: erro.message, 
    }); 
  } 
} 
  
module.exports = { cadastrar, listar, deletar }; 
