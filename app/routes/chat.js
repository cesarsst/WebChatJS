var controller = require('../controllers/chat')

module.exports = function(application){

    application.post('/chat', function(req, res){
        controller.iniciaChat(application, req, res);
    })



}