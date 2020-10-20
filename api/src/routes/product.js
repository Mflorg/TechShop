const server = require('express').Router();
const { Product , Category, Categoryproduct } = require('../db.js');
const Reviews = require('../models/Reviews.js');

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

//trae el producto que tenga esa ID
server.get("/:id", (req,res)=>{
    const id = req.params.id
    Product.findOne({
        where: {id: id},
        include: {model: Category}
    })
    .then(prod=>{
        return res.send(prod)
    })
})

//agrega categoria al producto
server.post('/:idProducto/category/',(req,res) => {
	 
	const  {idProducto} = req.params;
	const categoriesCheck = req.body[1];
	console.log('categorias:',categoriesCheck);

	 if(!idProducto ){
	   return res.status(400).send("Faltan parametros !!!")
	} 
	let categoriesProductCreate=[];
	for(let i=0; i<categoriesCheck.length;i++){
		objCategoriesProduct={
			categoryId:categoriesCheck[i],
			productId:idProducto
		}
		categoriesProductCreate.push(objCategoriesProduct);
	}

	Categoryproduct.bulkCreate(
		categoriesProductCreate
	).then(algo=>{
		res.send(algo);
	}).catch(err=>{
		console.log("no anda")   
		res.send(err)})
	
}) 

//quitar categoria al producto
server.delete('/:idProducto/category/:idCategoria', (req, res)=>{
	const  {idProducto, idCategoria} = req.params;

	 if(!idProducto || !idCategoria){
	  return res.status(400).send("Faltan parametros !!!")
	} 

	Categoryproduct.destroy({
		where:{
			productId:idProducto,
			categoryId:idCategoria
		}
	})
	.then(() => {
		res.send("ando!!");
	})
})

// AGREGAR PRODUCTOS 
 server.post('/',(req,res) => {
//SE VERIFICAN LOS CAMPOS
	const  {name, description, price, stock, img} = req.body;

	if(!name || !description || !price || !stock){
		return res.status(400).send("Los campos enviados no son correctos.")
	 }
	
	 Product.create({
		 name:name,
		 description:description,
		 price:price,
		 stock:stock,
		 img:img
	 })
	 .then((prod)=>{
		 res.send(prod);
	 })
}) 

//ACTUALIZAR PRODUCTO
server.put('/:idProducto',(req,res)=>{
	const  {idProducto} = req.params;
	const	{name, description, price, stock, img} = req.body

	if(!idProducto){
		return	res.status(400).send("Faltan parametros !!!")
	}
	if(!name || !description || !price || !stock){
		return	res.status(400).send("Los campos enviados no son correctos.")
	 }
	
	 Product.update(
		{
			name:name,
			description:description,
			price:price,
			stock:stock,
			img:img
		},
		{where:
			{id:idProducto}}
		)
		//agregar esto!!!!!
        .then((r)=>{
            res.status(200).json(req.body)
        })
})

//ELIMINAR PRODUCTO
server.delete('/:idProducto',(req, res)=>{
	const  {idProducto} = req.params;
	if(!idProducto){
		return res.status(400).send("Faltan parametros !!!");
	}
	Product.destroy({
		where:{
			id:idProducto
		}
	})
	.then(r=>{
		res.send("El producto se elimino con exito")
	})
	.catch(err=>{
		res.send("algo malir sal")
	})
})

// Crear Ruta que devuelva los productos de X categoría

server.get("/category/:id", (req, res) => {
	
	const  {id} = req.params;
	
	Product.findAll({
		include:[{
			model:Category,
			attributes: ['id','name'],
			where:{
				id:id
			},
			through: {attributes: []}
		}]
	})
	.then(function(productId){
		res.status(200).json(productId);
		})

})


//Trae todas las review de un producto
server.get("/:id/review/", (req,res)=>{
	let prodId= req.params.id
	Review.findAll({where:{productId: prodId}})
	.then(reviews=>{
			res.send(reviews)
	})
})


module.exports = server;