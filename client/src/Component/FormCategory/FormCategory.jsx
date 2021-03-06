import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Col, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addCategory, listCategory } from '../../actions/category';
import style from './FormCategory.module.css';
import { BiArrowBack } from "react-icons/bi";
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2';


export default function FormCategory() {

    const dispatch = useDispatch();
  
    const [formData, updateFormData] = useState({
        name: '',
        description: ''
    });

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });

    };
    useEffect(() => {
        dispatch(listCategory())
    }, []);
  
    const handleSubmit = (e) => {
        e.preventDefault();

        var newDate = {
            name: formData.name,
            description: formData.description
        }
        dispatch(addCategory(newDate))
        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Categoria Agregada',
            showConfirmButton: true
          })
        limpiarFormulario()
        updateFormData('')
        
    }

    function limpiarFormulario() {
        document.getElementById("form").reset();
    }
 
    useEffect(() => {
        dispatch(listCategory())
        return () => {

        }
    }, [])

    return (
        <div>
            <Container>
                <br />
            <Card className={style.card}>
            <Link className={style.botonlink} to={`./admin`}>
                        <BiArrowBack/>
                    </Link>

                <Form id="form"  className="card-boy" onSubmit={(e)=>{handleSubmit(e)}}>
                    <Form.Label className={style.h3}><h3>Ingresar Nueva Categoria</h3></Form.Label>
                    <br /><br /><br />
                    <Form.Row>
                        <Form.Label className={style.input}><h5>Nombre:</h5></Form.Label>
                        <Form.Group as={Col}>
                            <Form.Control
                                name='name'
                                onChange={handleChange}
                                type='text'
                                placeholder="Ingrese Nombre Categoria..."
                                required="true" />
                        </Form.Group>
                    </Form.Row>
                    <br />

                    <Form.Row>
                        <Form.Label size="sm" ><h5>Descripcion:</h5></Form.Label>
                        <Form.Group as={Col}>
                            <Form.Control
                                name='description'
                                onChange={handleChange} block
                                type='text'
                                placeholder="Ingrese descripcion..."
                                required="true" />
                        </Form.Group>

                    </Form.Row>
                    <br />

                    <Button  className={style.button}  type="submit"
                    // onClick={() => {
                    //     Swal.fire({
                    //         position: 'top-center',
                    //         icon: 'success',
                    //         title: 'Categoria Agregada',
                    //         showConfirmButton: false,
                    //         timer: 1500
                    //       })
                    //        dispatch(addCategory(formData))
                    //        limpiarFormulario()
                    //        updateFormData('')  
                    // }} 
                    >Agregar</Button>
                </Form>
                </Card>
            </Container>
            
        </div>

    );
}
