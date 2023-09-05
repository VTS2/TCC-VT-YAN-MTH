//Login/index.js
import React from 'react'
import InputGroup from '../../../components/InputGroup'
import { Link } from 'react-router-dom'

import './Login.css';

//hooks
import { useContext, useState } from 'react'
//context
import { Context } from '../../../context/UserContext'


function Login() {
  //aqui entra a lógica para o login

  const [user, setUser] = useState({})
  const { login } = useContext(Context)

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    login(user)
  }

  return (
    <section1>
      <div class="form-box">
        <div class="form-value">
          <form action="">
            <h2 className='loginc'>Login</h2>
            <div class="inputbox">
              <ion-icon name="mail-outline"></ion-icon>
              <input type="email" required />
              <label for="">Email</label>
            </div>
            <div class="inputbox">
              <ion-icon name="lock-closed-outline"></ion-icon>
              <input type="password" required />
              <label for="">Password</label>
            </div>
            <div class="forget">
              <label for=""><input type="checkbox" />Lembre de mim  <a href="#">Esqueceu a senha</a></label>

            </div>
            <div className='d-flex justify-content-center'>
              <button className='loginbt'>Conecte-se</button>
            </div>
            <div class="register">
              <p>Não tem conta? <a href="/register">Registar</a></p>
            </div>
          </form>
        </div>
      </div>
      
    </section1>

  )
}

export default Login