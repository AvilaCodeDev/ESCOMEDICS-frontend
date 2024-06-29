import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { PublicRoute } from "./PublicRoute"
import { PrivateRoute } from "./PrivateRoute"
import { Login } from "../views/login/Login"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useStoreLogin } from "../store/store"
import App from "../App"
import { Pacientes } from "../views/pacientes/Pacientes"
import { Layout } from "../layout/Layout"
import { Usuarios } from "../views/usuarios/Usuarios"
import { FormularioUsuarios } from "../components/Formularios/FormularioUsuario"
import { FormularioCitas } from "../components/Formularios/Citas/FormularioCitas"
import { HistorialCitas } from "../views/historialCitas/HistorialCitas"



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
                path="/home"
                element= { <Layout /> }
            />
            <Route 
                path="/consultausuarios"
                element= {
                    <Layout>
                        <Usuarios />
                    </Layout>
                }
            />
            <Route 
                path="/formulariousuarios"
                element= {
                    <Layout>
                        <FormularioUsuarios />
                    </Layout>
                }
            />
            <Route 
                path="/agendarcita"
                element={
                    <Layout>
                        <FormularioCitas />
                    </Layout>
                }
            />
            <Route 
                path="/historialcitas"
                element={
                    <Layout>
                        <HistorialCitas />
                    </Layout>
                }
            />
        </Routes>
    </BrowserRouter>
  )
}
