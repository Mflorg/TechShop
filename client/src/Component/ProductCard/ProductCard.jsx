import React from 'react';
import {enviarAlCarritoLocalStorage,sumarCarritoLocal} from '../carrito/localStorage'
import styles from './ProductCard.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { BiArrowBack,BiCart} from "react-icons/bi";
import {useDispatch, useSelector } from 'react-redux';
import {agregarProductoCarrito,modificarStock} from '../../actions/cart.js';

export default function ProductCard({userlog,Product}) {

    let base64ToString;
    (Product.img) && (base64ToString = Buffer.from(Product.img.data, "base64").toString())
    
    const productId=Product.id
    const cantidad =1
    
const dispatch=useDispatch()

let prodStock = JSON.parse(localStorage.stock)[Product.id] 


const sumarProdLocalStorage=()=>{
    sumarCarritoLocal(prodStock,cantidad,Product,productId)
}

const sumarAlCarrito = ()=>{
    // si el producto no existe lo agrega 
    let prodStock = JSON.parse(localStorage.stock)[Product.id] 
    const idUser=userlog.user.id
   if(idUser){
        console.log("aasdadasdasd")
        var productos_line={
            productId:parseInt(Product.id),
            cantidad:1,
            price:parseInt(Product.price),
            estado:"carrito"}

            
            let obj={
                productId: Product.id,
                cantidad:parseInt(cantidad)
            }
            dispatch(modificarStock(idUser,obj))
            dispatch(agregarProductoCarrito(idUser,productos_line))
        } 

    if(!prodStock && cantidad<Product.stock){
                sumarProdLocalStorage()
               enviarAlCarritoLocalStorage(Product)
                return 
            }
     //si el prod exite, verifica el stock no existe lo agrega        
        if(prodStock && prodStock.stock>0){
                sumarProdLocalStorage()
                return 
            }
        }

     
    let botones=
            <div className={styles.botonlink}>
                <Link to={`/products/${Product.id}`}>
                    <Button variant="primary" className={styles.boton}>Ver</Button>
                </Link>
                
                <Link> 
                    <Button variant="outline-primary"  onClick={sumarAlCarrito} className={styles.botoncart}><svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-cart3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/></svg>
                    </Button>
                </Link>
            </div>;

        let cartel = <div className={styles.sinstock}>
                            <Link to={`/products/${Product.id}`}>
                                <Button variant="primary" className={styles.boton}>Ver</Button>
                            </Link>
                            <h4>Sin Stock</h4>
                    </div>;
    
        
    return (
        
            <Card className={styles.card}>
                <Card.Title className={styles.title}>
                    <Link className={styles.textLink} to={`/products/${Product.id}`}>{Product.name}</Link>
                </Card.Title>
                <div className={styles.imagen }>
                    <Card.Img  className={Product.stock==0 ? styles.imgGris : styles.img} 
                    src={base64ToString}/>
                </div>
                    
                <Card.Subtitle className={styles.precio} >
                        ${Product.price}
                </Card.Subtitle>
                   
            
                {Product.stock==0 ? cartel : botones}
            

        </Card>

    )

}