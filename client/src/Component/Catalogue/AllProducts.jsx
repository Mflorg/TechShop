import React,{ useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard.jsx';
import style from './Catalogue.module.css'
import { useSelector,useDispatch } from 'react-redux';
import {mostrarProductos} from '../../actions/products'

export default function AllProducts(props) {

const productsl = useSelector(state=>state.products);
const userlog=useSelector(state=>state.user)
const dispatch = useDispatch();

 let products = productsl.products;
 useEffect(() => {
    dispatch(mostrarProductos())
},[])

if (products!= undefined){
let sinStock = products.filter(el => el.stock===0)
let conStock= products.filter(el=> el.stock > 0)
   products = conStock.concat(sinStock)
}
    return (
            <div className={style.productos}>
                { products.length !== 0 ? 
                products.map(product => {
                    return (<ProductCard userlog={userlog?userlog:""} Product={product} />)
                })
                :
                <h5>No hay publicaciones que coincidan con tu búsqueda.
                Revisá la ortografía de la palabra.
                Utilizá palabras más genéricas o menos palabras.</h5>
                }
            </div>
    )
}

