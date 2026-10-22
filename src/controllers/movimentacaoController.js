const Movimentacao = require('../models/Movimentacao');
const Material = require('../models/Material');
 
async function cadastrar(req, res) {
  try {
    const { material_id, tipo, quantidade } = req.body;
 
    const material = await Material.findByPk(material_id);
    if (!material) {
      return res.status(404).json({
        mensagem: 'Material não encontrado',
      });
    }
 
    if (tipo === 'saida' && material.quantidade_estoque < quantidade) {
      return res.status(400).json({
        mensagem: 'Quantidade insuficiente em estoque',
      });
    }
 
    const novaQuantidade = tipo === 'entrada'
      ? material.quantidade_estoque + quantidade
      : material.quantidade_estoque - quantidade;
 
    await material.update({ quantidade_estoque: novaQuantidade });
 
    const movimentacao = await Movimentacao.create({
      material_id,
      tipo,
      quantidade,
      usuario_id: req.usuario.id, 
    });
 
    res.status(201).json(movimentacao);
  } catch (erro) {
    res.status(400).json({
      mensagem: 'Erro ao cadastrar movimentação',
      erro: erro.message,
    });
  }
}
 
module.exports = { cadastrar };
