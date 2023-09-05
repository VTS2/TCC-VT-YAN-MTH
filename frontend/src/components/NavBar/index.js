import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import './NavBar.css';

// import SearchBar from './SearchBar';

//Contexto
import { Context } from '../../context/UserContext'

import navimg from '../../assets/img/logo.jpg'


function NavBar() {
  const { authenticated, logout } = useContext(Context)

  return (
    <nav class="navbar navbar-expand-lg " >
      <div class="container-fluid">
        <img
          class="logo"
          src={navimg}
        />
        <a class="navbar-brand" href="#"><h3>Ammu-Nation</h3></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link class="nav-link active" aria-current="page" to='/'><h6>Home</h6></Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to='/catalogo'><h6>Catálogo</h6></Link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/login"><h6>Login</h6></a>
            </li>
            
          </ul>
          
        </div>
      </div>
    </nav>
  )
}

export default NavBar