import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { PublicRoute } from "./PublicRoute"
import { PrivateRoute } from "./PrivateRoute"
import { Login } from "../views/login/Login"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useStoreLogin } from "../store/store"
import App from "../App"
import { Pacientes } from "../views/pacientes/Pacientes"



export const AppRuter = () => {

    // const dispatch = useDispatch();
    // const { credentials } = useSelector( state => state.login );
    // const { setChecking } = useStoreLogin();    

  return (
    <BrowserRouter>
        <Routes>
            <Route 
                path="/"
                element= { <Login /> }
            />
            <Route 
                path="/pacientes"
                element= {<Pacientes />}
            />
        </Routes>
    </BrowserRouter>
  )
}
