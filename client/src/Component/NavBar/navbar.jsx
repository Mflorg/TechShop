import React from 'react';
import Logo from './technav1.png';
import { Nav } from 'react-bootstrap';
import styles from './navbar.module.css';
import SearchBar from '../SearchBar/SearchBar.js';
export default function NavBar (){
 return (
     <Nav className={`navbar navbar-dark bg-dark ${styles.nav}`}>
         <Nav.Item className={styles.logotech}>
            <Nav.Link href='/'>
            <img className={styles.logotech} src={Logo} width="90" height="40" alt="" />
            </Nav.Link>
        </Nav.Item>
       
        <SearchBar className={styles.buscador}/>
        
        <ul className="nav navbar pull-xs-right">

        <Nav.Item>
            <Nav.Link href='/admin'>Admin</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link href='/products'>Catalogo</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link href='/'>Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link href='/'>Sobre Nosotros</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link href='/'>Cuenta</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link href='/'>
            <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-cart3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
            </svg>
            </Nav.Link>
        </Nav.Item>
        </ul>
     </Nav>
 )
}