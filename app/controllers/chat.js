module.exports.iniciaChat = function(application, req ,res){

    const  { apelido } = req.body;
    
    if(apelido.length < 3 || apelido.length>15 ){ 
        const erros = "Apelido inválido! O apelido deve ter de 3 a 15 caracteres."
        console.log(erros)
        return res.render("index", {erros});
    }
    
    
    // Usando o objeto salvo em app 'io' para realizar o emit
    application.get('io').emit('msgParaCliente',
        {
            apelido: apelido,
            msg: 'acabou de entrar no chat.'
        }
   
    );
    
    // renderiza a tela e passa o apelido como parametro
    res.render('chat', {apelido});

}