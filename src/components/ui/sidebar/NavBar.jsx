import { Image } from '@nextui-org/react'

import logo from "../../../assets/escudo_ESCOM.webp"
import { AiOutlineUser } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { BiCalendar, BiChevronDown, BiChevronUp, BiSolidUser } from 'react-icons/bi'
import { Link } from 'react-router-dom'

import './sidebar.css'
import { key } from 'localforage'

const baseUrl = import.meta.env.VITE_REACT_APP_URL;

export const  NavBar = () =>{
    const [ actual , setActual ] = useState("")
    const [ collapsable, setCollapsable ] = useState({});
    const { userData } = useSelector( (state) => state.login );

    const iconsMaping = {
        usuarios: <BiSolidUser />,
        citas: <BiCalendar />
    }

    const rotesMaping = {
        consultausuarios: `${baseUrl}consultausuarios`,
        agendarcita: `${baseUrl}agendarcita`,
        historialcitas: `${baseUrl}historialcitas`
    }

    const formatName = (name) => {
        let formated = name.toLowerCase().replace(" ", "");
        return formated.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      };

      const handleEndSession = () =>{
        
      }

    return(
        <div className="col-span-3 row-span-12 sidebar">
            <div className="sidebar-content">
                <div className=" col-span-3 sidebar-header text-center">
                    <span className='sidebar-title'>ESCOMEDICS</span>
                    <div className="sidebar-profile">
                        <div className="">
                            <p>Perfil:</p>
                            <p>{userData.rol_usuario}</p>
                        </div>
                        <div className="sidebar-profileicon">
                            <AiOutlineUser />
                        </div>
                    </div>
                </div>

                <div className="sidebar-opciones_menu">
                    {
                        userData.opcion_menu[0].menu.map( (menu,i) =>(
                            <div key={i}>
                                <div 
                                    className="sidebar-menu"
                                    key={ `menu-${i}` }
                                    onClick={ () => {
                                        setCollapsable({
                                            ...collapsable,
                                            [i]: !collapsable[i]
                                        })
                                        }
                                    }
                                >
                                    <div className="sidebar-menu_text">
                                        { iconsMaping[ formatName(menu.descripcion )] }
                                        { menu.descripcion }
                                    </div>
                                    { collapsable[i] ? <BiChevronUp /> : <BiChevronDown /> }
                                </div>
                                <div className={`sidebar-opciones_submenu ${collapsable[i] ? 'block':'hidden' }`}>
                                    {
                                        menu.submenus.map( (submenu, index2 ) => (
                                            <div className='flex' key={`subenu-${index2}`}>
                                                <Link 
                                                    className={`self-center justify-self-center ${ actual.selected == submenu.id ? 'selected': '' } sidebar-opcion_submenu `}
                                                    to={ rotesMaping[formatName(submenu.descripcion)] }
                                                    onClick={ () => setActual({ selected: submenu.id }) }
                                                >
                                                    {submenu.descripcion}
                                                </Link>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                         ))
                    }
                </div>

                <div className="sidebar-footer row-start-11">
                    <Link onClick={ handleEndSession }>Cerrar Sesion</Link>
                </div>
            </div>
        </div>
    )
}