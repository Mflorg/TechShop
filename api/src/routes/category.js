const server = require('express').Router();
const {Category} = require('../db.js');

server.get('/', (req, res, next) => {
	
	Category.findAll()
		.then(categoryId => {
			res.send(categoryId);
		})
		.catch(next);
	
});

server.post('/',(req,res) => {
	 
	const  {name, description} = req.body;
	console.log(req.body)
	Category.create({
		name:name,
		description:description,
	})
	.then((cat)=>{
		//console.log(cat)
		res.send("Categoria agregada")
	})

}) 

server.delete('/:idCategoria', (req, res)=>{
	const  {idCategoria} = req.params;

	 if(!idCategoria){
	   res.status(400).send("Faltan parametros !!!")
	} 

	Category.destroy({
		where:{
			id:idCategoria
		}
	})
	.then(() => {
		res.send("ando!!");

	})

})

server.put('/:idCategoria', (req, res) => {
	
	const  {idCategoria} = req.params;
	console.log(idCategoria)
	 Category.findByPk(idCategoria)
	.then (function(category){
        category.name = req.body.name;
        category.description = req.body.description;
        category.save();
        res.status(201).send(category);
	})
});


module.exports = server;

 


