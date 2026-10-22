function permitir(...tiposPermitidos) {
//As três reticências (...) formam o que chamamos de rest parameter (parâmetro "resto"). // Ele permite que a função receba quantos argumentos você quiser, e todos eles são 
// agrupados automaticamente em um array. 

  return (req, res, next) => {
    if (!tiposPermitidos.includes(req.usuario.tipo)) {
      return res.status(403).json({ mensagem: 'Sem permissão para essa ação' });
    }
    next();
  };
//verifica se o tipo do usuário logado está dentro da lista de tipos permitidos. 
//se o tipo do usuário NÃO estiver na lista permitida, bloqueia o acesso com status 403 // (proibido/sem permissão) 
//Se o tipo estiver na lista, chama next() e libera a passagem. 

}

module.exports = permitir;
