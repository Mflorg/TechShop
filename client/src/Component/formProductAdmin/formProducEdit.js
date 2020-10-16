import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector} from 'react-redux';
import { editarProducto } from "../../actions/products.js";
import {listCategory} from '../../actions/category';

const FormProductEdit = (productEdit) => {
    // extrae los valores
    const dispatch = useDispatch();
    const categ=useSelector(store=>store.category);
    const categories=categ.category;
    useEffect(()=>{
         dispatch(listCategory())
     },[]);
     
    let { id, name, description, price, stock, img } = productEdit.product;
    //pasa la imagen a base 64 desde un buffer
    let base64ToString;
    (img) && (base64ToString = Buffer.from(img.data, "base64").toString())
    //crea los checkbox con las categorias
    const [checkboxes, setCheckboxes] = useState([]);
    useEffect(
		() => {
			const categoryTypes = categories.map(c => ({
				name: c.name,
				id: c.id,
				add: false
			}));

			setCheckboxes(categoryTypes);
		},
		[categories]
	);
    const [product, setProduct] = useState({
        id: id,
        name: name,
        description: description,
        price: price,
        stock: stock,
        img: base64ToString
    });
    
    

    

    //leer datos del formulario
    const obtenerInfo = e => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    }

    function encodeImageFileAsURL(e) {
        var input = e.target;
        var fReader = new FileReader();
        fReader.readAsDataURL(input.files[0]);
        fReader.onloadend = function (event) {
            //console.log(event);
            var base64 = event.target.result;
            let buff = new Buffer(base64, 'base64');

            setProduct({
                ...product,
                img: base64
            })
        }
    }
    
    const handleCategoryChecks = e => {
		const modifiedCategories = [...checkboxes];
		modifiedCategories[e.target.value].add = e.target.checked;
		setCheckboxes(modifiedCategories);
	};


    const envioformulario = (e) => {
        e.preventDefault();
        dispatch(editarProducto(product))
        for (let i=0;i<checkboxes.length;i++){
            if(checkboxes[i].add === true){
                axios.post(`http://localhost:3000/products/${product.id}/category/${checkboxes[i].id}`, product,{
                headers:{"Content-type":"application/json; charset=UTF-8"}})
            }
        }
         
         return;
       
    }

    return (
        <Container id='container' className='container-fluid col-6 mt-4 bg-white p-3'>
            <Form id='formProduct' name="editar">

                <Form.Label id='formTitle'>Editar Producto</Form.Label>


                <Form.Label>Nombre</Form.Label>
                <Form.Control column="sm" size="sm" type='text' placeholder='nombre'
                    name='name'
                    onChange={obtenerInfo}
                    value={product.name}
                    required
                />
                

                <Form.Label>Descripción</Form.Label>
                <Form.Control type='text' placeholder='descripción'
                    name='description'
                    onChange={obtenerInfo}
                    value={product.description}
                    required
                />
               

                <Form.Label>Precio</Form.Label>
                <Form.Control type='number' placeholder='precio'
                    name='price'
                    onChange={obtenerInfo}
                    value={product.price}
                    required
                /> 
                

                <Form.Label >Stock</Form.Label>
                <Form.Control type='number' placeholder='stock'
                    name='stock'
                    onChange={obtenerInfo}
                    value={product.stock}
                    required
                />

                <Form.Group>
                    <Form.Label>Categorias</Form.Label>
                   
					{checkboxes.map((categoria, i) => {
						return (
							<Form.Label>
                                <input
									type="checkbox"
									className="checks"
									value={i}
									checked={categoria.add}
									onChange={handleCategoryChecks}
								/>{categoria.name}
                            </Form.Label>
								
								
							
						);
					})}
				
                </Form.Group>

                <Form.Label>Imagen</Form.Label>
                <Form.Control type='file' placeholder='imagen'
                    name='img'
                    onChange={encodeImageFileAsURL}
                    //value={base64ToString}
                />
                <img src={product.img} width="300px" />
                
                <Form.Group controlId="formBasic">
                    <Button type="submit" className='mt-3' variant="primary" onClick={() => {
                        dispatch(editarProducto(product))
                        for (let i = 0; i < checkboxes.length; i++) {
                            if (checkboxes[i].add === true) {
                                axios.post(`http://localhost:3000/products/${product.id}/category/${checkboxes[i].id}`, product, {
                                    headers: { "Content-type": "application/json; charset=UTF-8" }
                                })
                            }
                        }
                    }}>Editar</Button>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default FormProductEdit;

