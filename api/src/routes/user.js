const server = require('express').Router();
const { User, Order }=require('../db');

//Ruta que retorne todos los Usuarios
server.get('/',(req, res)=>{
    User.findAll()
    .then(user=>
        res.send(user))

})
//Ruta que retorne todas las Ordenes de los usuarios
server.get('/:id/orders',(req, res)=>{
    const {id}= req.params;
    Order.findAll(
       { where:{
        userId:id
        }}
    )
    .then(orden=>
        res.send(orden))

})

//Ruta para creación de Usuario
server.post('/',(req, res)=>{
    User.create({
        name:req.body.name,
        lastname:req.body.lastname,
        dni:req.body.dni,
        email:req.body.email,
        username:req.body.username,
        password:req.body.password,
        image:req.body.image,
        typeUser:req.body.typeUser,
    })
    .then((user)=>{
        res.send(user)
    })
    .catch(error=>{
        res.status(500).send("Error: "+ error)
    })

})
//Ruta para modificar Usuario
server.put('/:id',(req, res)=>{
    const {id}= req.params;
    User.update({
        name:req.body.name,
        lastname:req.body.lastname,
        dni:req.body.dni,
        email:req.body.email,
        username:req.body.username,
        password:req.body.password,
        image:req.body.image,
        typeUser:req.body.typeUser,
    },
    {
        where:{id}
    })
    .then((user)=>{
        res.send(user)
    })
    .catch(error=>{
        res.status(500).send("Error: "+ error)
    })

})

module.exports=server;


//Ruta para modificar Usuario
server.put('/:id',(req, res)=>{
    const {id}= req.params;
    User.update({
        name:req.body.name,
        lastname:req.body.lastname,
        dni:req.body.dni,
        email:req.body.email,
        username:req.body.username,
        password:req.body.password,
        image:req.body.image,
        typeUser:req.body.typeUser,
    },
    {
        where:{id}
    })
    .then((user)=>{
        res.send(user)
    })
    .catch(error=>{
        res.status(500).send("Error: "+ error)
    })

})

module.exports=server;