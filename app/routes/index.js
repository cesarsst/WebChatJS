var controller = require('../controllers/index')

module.exports = function(application){

    application.get('/', function(req, res){
        controller.home(application, req, res);
    })



}