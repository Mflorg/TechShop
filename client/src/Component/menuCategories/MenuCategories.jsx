import React from 'react';
import styles from './menuCategories.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from 'react-bootstrap';
import {Link} from 'react-router-dom'


export default function menuCategories({ categories }) {

const categorias = ["categoria 1","categoria 2","categoria 3","categoria 4","categoria 5"]

    return (
     
            <Nav defaultActiveKey="/home" className={`flex-column ${styles.main_menu}`}>
                <Nav.Link className={styles.text + ' ' + styles.centrar }
                eventKey="disabled" 
                disabled>CATEGORIAS</Nav.Link>
                <hr class="clearfix w-100"/>
                {
                    categorias.map(cat=>{
                        return(
                            <Nav.Link className={styles.text} eventKey="link-1">{cat}</Nav.Link>
                        )
                    })
                }
                <Nav.Link href='/listCategory' className={styles.text}>Nueva Categoria</Nav.Link>

            </Nav>
        

 

    )

}

