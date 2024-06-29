import { Button, Card, CardBody, Image, Input } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'

import logo from "../../assets/escudo_ESCOM.webp"
import "./login.css";
import { useForm } from '../../hooks/useForm';
import { validateEmail } from '../../helpers/helpers';
import { useStoreLogin } from '../../store/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Login = () => {

  const [ errorMail, setErrorMail ] = useState({ isValid: true, mensaje: ""});
  const [ erroPass, setErrorPass ] = useState({ isValid: true, mensaje:""});  
  const { credentials, loginError } = useSelector( (state) => state.login );
  const navigate = useNavigate();

  const {
    setLogin,
    setUserData
  } =  useStoreLogin();



  const [ formLoginValues, handleLoginInputChnage ] = useForm({
    loginEmail: '',
    loginPassword: ''
  });

  const { loginEmail, loginPassword } = formLoginValues;

  const validationMail = () => {
    const isValidMail = validateEmail( loginEmail );
    setErrorMail({
      isValid: loginEmail != '' ? isValidMail : false ,
      mensaje: loginEmail != "" ? (!isValidMail ? "Por favor, ingrese un correo valido" : "") : ""
    })
  }

  const validationFields = () => {
    let validationMail = true;
    let validationPass = true;

    if (loginEmail === "") {
      setErrorMail({ isValid: false, mensaje: "Campo obligatorio" });
      validationMail = false;
    } else if (!validateEmail(loginEmail)) {
      setErrorMail({ isValid: false, mensaje: "Por favor, ingrese un correo valido" });
      validationMail = false;
    } else {
        setErrorMail({ isValid: true, mensaje: "" });
      validationMail = true;
    }
    if (loginPassword === "") {
      setErrorPass({ isValid: false, mensaje: "Campo obligatorio" });
      validationPass = false;
    } else {
      setErrorPass({ isValid: true, mensaje: "" });
      validationPass = true;
    }
    return validationMail && validationPass ? true : false;
  };



  const enviarDatos = async(e) =>{
    e.preventDefault();
    if(validationFields()){
      const body = await setLogin({ loginEmail, loginPassword });
      if( body?.error == "email" ) setErrorMail({ isValid: false, mensaje: body.msg });
      if( body?.error == "password" ) setErrorPass({ isValid: false, mensaje: body.msg});
    }
  }  

  useEffect(() => {
    const fetchData = async( ) => {
      if( !!credentials?.uid ){
        const {uid, id_rol} = credentials;
        const userData = await setUserData({ uid, id_rol });
        navigate(`/home`);
      }
    }

    fetchData();
  }, [credentials])

  useEffect(( () => {
    if(loginError != null ){
      setErrorPass({ isValid: false , mensaje: loginError})
      setErrorMail({ isValid: false , mensaje: ''})
    }else if(loginError == null ){
      setErrorPass({ isValid: true , mensaje: ''})
      setErrorMail({isValid: true, mensaje:''})
    }
  }),[loginError])

  return (
    <Card 
      className='col-span-10 col-start-2 row-start-2 row-span-10 login__form' 
    >
        <CardBody className='grid grid-cols-2 grid-rows-6'>
            <div className="row-start-2 row-span-5 login__form--logo-container">
              <Image 
                src={ logo }
              />
            </div>
            <div className="grid grid-cols-5 grid-rows-6 col-start-2 row-start-1 row-span-6 login__form--inputs-container">
              <h1 className=' col-span-3 col-start-2 row-start-2 login__form--text'>ESCOMEDICS</h1>
              <Input 
                name="loginEmail"
                className="col-span-3 col-start-2 row-start-3" 
                type='email' 
                variant='faeded' 
                color='primary' 
                label="Correo" 
                placeholder='Ingresa tu correo' 
                defaultValue={ loginEmail }
                onChange={ handleLoginInputChnage }
                isInvalid={ !errorMail.isValid }
                errorMessage={ errorMail.mensaje }
                onBlur={ () => validationMail() }
              />
              <Input 
                name="loginPassword"
                className="col-span-3 col-start-2 row-start-4" 
                type='password' 
                variant='faeded' 
                color='primary' 
                label="Contraseña" 
                placeholder='Ingresa tu contraseña' 
                defaultValue={ loginPassword }
                onChange={ handleLoginInputChnage }
                isInvalid={ !erroPass.isValid }
                errorMessage={ erroPass.mensaje }
              />
              <Button className='col-span-3 col-start-2 row-start-5' color='primary' onClick={ enviarDatos }>Iniciar Sesion </Button>

              {/* { 
                  loginError != null 
                  ? <span className='col-span-3 row-start-6 col-start-2' >{loginError}</span>
                  : ''
              } */}
            </div>
        </CardBody>
    </Card>
  )
}
