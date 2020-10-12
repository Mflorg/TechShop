import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Col, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../actions/category';
import style from './FormCategory.module.css';
import { BiArrowBack } from "react-icons/bi";
import {Link} from 'react-router-dom'


export default function FormCategory() {

    const dispatch = useDispatch();
    const initialFormData = Object.freeze({
        name: '',
        description: ''
    });
    const [formData, updateFormData] = useState(initialFormData);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });

    };

    const handleSubmit = (e) => {
        e.preventDefault();

        var newDate = {
            name: formData.name,
            description: formData.description
        }
        dispatch(addCategory(newDate))

        limpiarFormulario()
        updateFormData(initialFormData)
        console.log(newDate)
    }

    function limpiarFormulario() {
        document.getElementById("form").reset();
    }

    return (
        <div>
            <Container>
                <br />
            <Card className={style.card}>
            <Link className={style.botonlink} to={`/listCategory`}>
                        <BiArrowBack/>
                    </Link>

                <Form id="form" onSubmit={(e) => handleSubmit(e)} className="card-boy">
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

                    <Button className={style.button} type="submit" >Agregar</Button>
                </Form>
                </Card>
            </Container>
            
        </div>

    );
}
