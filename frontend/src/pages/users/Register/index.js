//componente register 
import React from 'react'
import InputGroup from '../../../components/InputGroup'

//hooks
import { useContext, useState } from 'react'

import './register.css';

//context
import { Context } from '../../../context/UserContext'

function Register() {
  //a logica para enviar um formulario, ou para fazer qualquer coisa diferenciada em uma pagina fica nesse local
  const [user, setUser] = useState({})
  const { register } = useContext(Context)

  function handleChange(evento) {
    setUser({ ...user, [evento.target.name]: evento.target.value })
    //{...user}: isso aqui, cria uma cópia do objeto user atual, usando a sintaze de espalhamento do javascript(...), essa cópia e feita para preservar valores existentes no objeto antes de fazer qualquer att
  }

  function handleSubmit(evento){
    evento.preventDefault()
    register(user)
  }

  return (
    <div className='formulario container'>
      <h1>Registrar</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <InputGroup
            type='text'
            label='Digite seu nome'
            placeholder='Seu nome aqui'
            name='name'
            handleChange={handleChange}
          />
          <InputGroup
            type='email'
            label='Digite seu email'
            placeholder='Seu email aqui'
            name='email'
            handleChange={handleChange}
          />
          <InputGroup
            type='cpf'
            label='Digite seu CPF aqui'
            placeholder='Seu CPF aqui'
            name='cpf'
            handleChange={handleChange}
          />
          <InputGroup
            type='tel'
            label='Digite seu telefone aqui'
            placeholder='Seu telefone aqui'
            name='phone'
            handleChange={handleChange}
          />
          <InputGroup
            type='password'
            label='Digite sua senha'
            placeholder='Digite sua senha'
            name='password'
            handleChange={handleChange}
          />
          <InputGroup
            type='password'
            label='Confirme sua senha'
            placeholder='Confirme sua senha'
            name='confirmpassword'
            handleChange={handleChange}
          />
           <InputGroup
            type='file'
            label='Identidade'
            placeholder='Enviar Sua Identidade'
            name='indentidade'
            handleChange={handleChange}
          />
          <InputGroup
            type='file'
            label='Ficha Criminal'
            placeholder='Enviar Ficha Criminal'
            name='fichaCriminal'
            handleChange={handleChange}
          />
          <InputGroup
            type='file'
            label='Laudo De Capacitacao'
            placeholder='Enviar Seu Laudo de Capacitação'
            name='laudoCapacitacao'
            handleChange={handleChange}
          />
          <button type='submit' className='btnRegistrar'><h5 className='btnn'>Registrar</h5></button>
        </form>
      </div>
    </div>
    
  )
}

export default Register