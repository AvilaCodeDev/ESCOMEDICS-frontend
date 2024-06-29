import { useSelector } from "react-redux"
import { Header } from "../components/ui/header/Header"
import { NavBar } from "../components/ui/sidebar/NavBar"
import { PacienteHome } from "../views/home/pacienteHome/PacientesHome"
import { ToastContainer } from "react-toastify"


import 'react-toastify/dist/ReactToastify.css';
import { RecepcionistaHome } from "../views/home/recepcionistaHome"

export const Layout = (props) => {

    const { id_rol } = useSelector( state => state.login.credentials )

    const decideHome = () => {
        if( props.children == undefined ){
            if( id_rol == 4 ){
                return <PacienteHome />
            }
            if( id_rol == 1){
                return <RecepcionistaHome />
            }
        }else{
            return <div className="col-span-9 row-start-4 col-start-4" style={{margin: "20px 20px 20px 0" }}>{props.children}</div>
        }
    }

    return(
        <>
            <NavBar />
            <Header /> 
            {decideHome()}
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="dark"
            />
            
        </>
    )
}