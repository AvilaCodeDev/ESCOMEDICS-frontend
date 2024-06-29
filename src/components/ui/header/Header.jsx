import { useSelector } from 'react-redux'
import './header.css'

export const Header = () => {

    const { credentials } = useSelector( (state) => state.login );

    return (
        <>
            <div className="col-span-9 row-span-3 header">
                <div className="header-perfil">
                    <p className="header-perfil_nombre">
                        {`Hola, ${credentials.nombre} ${credentials.ap_paterno} ${credentials.ap_materno}`}
                    </p>

                    <p className="header-perfil_correo">
                        {`Usuario: ${credentials.email_usuario} `}
                    </p>
                </div>
            </div>
        </>
    )
}