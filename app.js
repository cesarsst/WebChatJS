// Importar as configs do server
var app = require('./config/server');

const port = 80;

// Parametrizar a porta de escuta 
const server = app.listen(port, function(){
    console.log('Servidor Online na porta 80.')
});

// Configurando o socket para escutar a mesma porta do servidor
var io = require('socket.io')(server);

// Criando a variavel global io para ser usado no app
app.set('io',io);


/** Criar a conexão por Websockets
 * 
 * io.on -> Escuta o socket do cliente (fica ouvindo pedido para execução)
 * io.emit -> Envia o socket do servidor (realiza pedido para executar uma ação)
 * 'connection' e 'disconnect' são eventos pré defindo.
 * 
 *  */ 
io.on('connection', function(socket){
    console.log('Usuário Conectado!');


    socket.on('disconnect', function(){
        console.log('Usuário desconectou!');
    })

    // Data é o JSON enviado pelo cliente
    socket.on('msgParaServidor', function(data){
    
    // Eventos de dialogos
        // envia somente para quem pediu
        socket.emit('msgParaCliente', {
            apelido: data.apelido,
            msg: data.msg
        });

        // envia para todos Broadcast
        socket.broadcast.emit('msgParaCliente', {
            apelido: data.apelido,
            msg: data.msg
        });
    

    // Participantes
        if(parseInt(data.apelido_atualizado_nos_clientes) == 0){
            // envia somente para quem pediu
            socket.emit('participantesParaCliente', {
                apelido: data.apelido,
            });

            // envia para todos Broadcast
            socket.broadcast.emit('participantesParaCliente', {
                apelido: data.apelido,
            });
        }

    });

    // Pode criar aqui mais eventos de escuta (on) ou de emissão (emit)
})