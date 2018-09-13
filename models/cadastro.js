var mongoose = require('mongoose');
//var moment = require('moment'); // For date handling.

var Schema = mongoose.Schema;

var CadastroSchema = new Schema(
    {
    nome: {type: String, required: true, max: 100},
    cpf: {type: String, required: true, max: 100},
    email: {type: String, required: true, max: 100},
    telefone: {type: String, required: true, max: 100},
    data_de_nascimento: { type: String, required: true, max: 100 },
    sexo: {type:String},
    
    }
  );

CadastroSchema
.virtual('url')
.get(function () {
  return '/cadastro/cadastro/'+this._id
});


module.exports = mongoose.model('Cadastro', CadastroSchema);
