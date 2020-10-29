const server = require('express').Router();
const {Order, User}=require('../db');
const nodemailer = require('nodemailer');


server.get('/', (req,res)=>{
    const status = req.query.status;

    if(!status){
    return Order.findAll()
    .then(orders=>{
        res.send(orders)
    })
    
    }
    else {
        Order.findAll({
            where:{
                estado: status
            }
        })
        .then(orders=>{ 
            res.send(orders)
        })
        .catch(err=>{
            console.log(err)
            res.send("algo malir sal");})
        }
})

//ruta para obtener una orden por id
// server.get('/:id',(req,res)=>{
//     const orderId =req.params.id;

//     Order.findOne({
//         where:{id:orderId}
//     }).then(respuesta=>{
//         console.log("respuesta:",respuesta)

//         return res.send(respuesta);
//     })
// })

server.get('/:id',(req,res)=>{
    const orderId =req.params.id;
    Order_line.findAll({
        where:{orderId: orderId}
    }).then((resp)=>{
        res.send(resp)
    })

})


//ruta para modificar una orden por id (envia automaticamente un mail al usuario)
server.put('/:id', (req,res)=>{
    const {id} = req.params;
    const {estado} = req.body;
    Order.update({
        estado: estado
    },
    {
        where:{id:id}
    }
    )
    
    Order.findAll({
        where:{
            id:id
        },
        include:{
            model:User
        }
    })
    .then(resp=>{
        res.send('orden modificada correctamente. Enviando mail');
        let {estado , user} = resp[0];
        
        var transporter =  nodemailer.createTransport({
            service: 'Gmail',
                auth: {
                    user: 'ecomerceft1@gmail.com',
                    pass: 'ecomerce1547'
                }
            })
            
            
    switch (estado){
        case 'procesando':
        
            return(

                transporter.sendMail({
                    from:'TechShop',
                    to: user.email,
                    subject: "Gracias por tu compra!",
                    html: `<img alt=logo src="https://i.postimg.cc/vZsQxVPF/fondotech.jpg" style="width:100% ;max-height:150px"/>
                                    <div style="text-align: justify; font-size: 16px">
                                    <h1>Hola ${user.name}!</h1>
                                    <p>Hemos recibido con éxito tu pago, en este momento estamos preparando tu pedido. <br/>
                                    Pronto te llegara un mail cuando tu producto ya este en camino!<br/>
                                    </p>
                                    </div>
                                    <hr/>
                                    <div style="width:100% ; text-align: center">
                                        <a style="text-decoration: none; border-radius: 5px; padding:11px 23px; color: white; background-color: #3498db" href="http://localhost:3006/" >Segui Comprando -> </a>
                                    </div>
                                    <div>
                                        <p style="color:#b3b3b3 ; font-size:12px; text-align: center">Tech Shop 2020.</p>
                                    </div>`
                }, function (error, info){
                    if (error) {
                        console.log(error);
                        res.status(500);
                        res.send(error);
                        return
                    } else {
                        console.log("Email sent");
                        res.status(200).jsonp(req.body);
                        return
                    }
                })
                )
        case "enviada":
            
            return(
                transporter.sendMail({
                    from:'TechShop',
                    to: user.email,
                    subject: "En Camino!!!",
                    html: `<img alt=logo src="https://i.postimg.cc/vZsQxVPF/fondotech.jpg" style="width:100% ;max-height:150px"/>
                                    <div style="text-align: justify; font-size: 16px">
                                    <h1>Hola ${user.name}!</h1>
                                    <p>Ya esta en camino tu pedido!<br/>
                                    En los próximos dias te encontraras con tus productos <3</p>
                                    </div>
                                    <hr/>
                                    <div style="width:100% ; text-align: center">
                                        <a style="text-decoration: none; border-radius: 5px; padding:11px 23px; color: white; background-color: #3498db" href="http://localhost:3006/" >Volve a nuestra Tienda -> </a>
                                    </div>
                                    <div>
                                        <p style="color:#b3b3b3 ; font-size:12px; text-align: center">Tech Shop 2020.</p>
                                    </div>`
                }, function (error, info){
                    if (error) {
                        console.log(error);
                        res.status(500);
                        res.send(error);
                        return
                    } else {
                        console.log("Email sent");
                        res.status(200).json(req.body);
                        return
                    }
                })
                )

            case "completada":
            
                    return(
                        transporter.sendMail({
                            from:'TechShop',
                            to: user.email,
                            subject: "Muchas gracias por confiar",
                            html: `<img alt=logo src="https://i.postimg.cc/vZsQxVPF/fondotech.jpg" style="width:100% ;max-height:150px"/>
                                    <div style="text-align: justify; font-size: 16px">
                                    <h1>Muchas gracias por elegirnos, ${user.name}!</h1>
                                    <p>Esperamos que disfrutes mucho de tu compra! </br>
                                    </p>
                                    </div>
                                    <hr/>
                                    <div style="width:100% ; text-align: center">
                                        <a style="text-decoration: none; border-radius: 5px; padding:11px 23px; color: white; background-color: #3498db" href="http://localhost:3006/" >Volve a nuestra Tienda -> </a>
                                    </div>
                                    <div>
                                        <p style="color:#b3b3b3 ; font-size:12px; text-align: center">Tech Shop 2020.</p>
                                    </div>`
                        }, function (error, info){
                            if (error) {
                                console.log(error);
                                res.status(500);
                                res.send(error);
                                return
                            } else {
                                console.log("Email sent");
                                res.status(200).json(req.body);
                                return
                            }
                        })
                        )
            case "cancelada":
                       return(
                                transporter.sendMail({
                                    from:'TechShop',
                                    to: user.email,
                                    subject: "tenemos noticias sobre tu pedido :(",
                                    html: `<img alt=logo src="https://i.postimg.cc/vZsQxVPF/fondotech.jpg" style="width:100% ;max-height:150px"/>
                                    <div style="text-align: justify; font-size: 16px">
                                    <h1>Ups!</h1>
                                    <p>Lo lamentamos, pero tu orden fue cancelada.</p>
                                    </div>
                                    <hr/>
                                    <div style="width:100% ; text-align: center">
                                        <a style="text-decoration: none; border-radius: 5px; padding:11px 23px; color: white; background-color: #3498db" href="http://localhost:3006/" >Volve a nuestra Tienda -> </a>
                                    </div>
                                    <div>
                                        <p style="color:#b3b3b3 ; font-size:12px; text-align: center">Tech Shop 2020.</p>
                                    </div>`
                                }, function (error, info){
                                    if (error) {
                                        console.log(error);
                                        res.status(500);
                                        res.send(error);
                                        return
                                    } else {
                                        console.log("Email sent");
                                        res.status(200).json(req.body);
                                        return
                                    }
                                })
                                )

        default:
            return(

                console.log("paso de largo")
            )
            
    }
    
        

        })
    .catch(err=>{
        res.send("ocurrio algo inesperado: "+ err)
    })
    

})

//Camiar estado order
server.get('/state/:id/:cancel', (req, res) => {
    const orderId = req.params.id;

    const cancel = req.params.cancel;

    if (cancel === 'false') {
        Order.findOne({
            where: {
                id: orderId
            }
        })
            .then(respuesta => {
                console.log(respuesta.dataValues.estado)
                switch (respuesta.dataValues.estado) {
                    case 'carrito':
                        Order.update(
                            {
                                estado: 'procesando'
                            },
                            {
                                where:
                                {
                                    id: respuesta.dataValues.id
                                }
                            }
                        )
                            .then(resp => {
                                Order.findAll()
                                    .then(order => {
                                        return res.send(order);
                                    })
                            })
                        break;
                    case 'procesando':
                        Order.update(
                            {
                                estado: 'enviada'
                            },
                            {
                                where:
                                {
                                    id: respuesta.dataValues.id
                                }
                            }
                        )
                            .then(resp => {
                                Order.findAll()
                                    .then(order => {
                                        return res.send(order);
                                    })
                            })
                        break;
                    case 'enviada':
                        Order.update(
                            {
                                estado: 'completada'
                            },
                            {
                                where:
                                {
                                    id: respuesta.dataValues.id
                                }
                            }
                        )
                            .then(resp => {
                                Order.findAll()
                                    .then(order => {
                                        return res.send(order);
                                    })
                            })
                        break;
                    case 'completada':
                        Order.update(
                            {
                                estado: 'completada'
                            },
                            {
                                where:
                                {
                                    id: respuesta.dataValues.id
                                }
                            }
                        )
                            .then(resp => {
                                Order.findAll()
                                    .then(order => {
                                        return res.send(order);
                                    })
                            })
                        break;
                    default:
                        break;
                }
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    } else {
        Order.findOne({
            where: {
                id: orderId
            }
        })
            .then(respuesta => {
                if (respuesta.dataValues.estado !== 'completada') {
                    Order.update(
                        {
                            estado: 'cancelada'
                        },
                        {
                            where:
                            {
                                id: respuesta.dataValues.id
                            }
                        }
                    )
                        .then(resp => {
                            Order.findAll()
                                .then(order => {
                                    return res.send(order);
                                })
                        })
                }
            })
            .catch(err => {
                return res.send(err);
            })
    }
})

module.exports= server;