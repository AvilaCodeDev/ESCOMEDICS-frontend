import { useEffect } from 'react';
import {CitasCard} from '../../../components/ui/citasCard/CitasCard'
import { useStoreCitas, useStoreLogin, useStoreUi } from '../../../store/store'
import { Button } from '@nextui-org/react';

import './pacientesHome.css';
import { CustomModal } from '../../../components/ui/modal/CustomModal';
import { FormularioCitas } from '../../../components/Formularios/Citas/FormularioCitas';

export const PacienteHome = () =>{

    const { citasPacienteData, setCitasPaciente } = useStoreCitas();
    const { userData } = useStoreLogin();
    const { setOpenModal } = useStoreUi();

    const { id_paciente } = userData;

    useEffect(( () => {
        setCitasPaciente( {id_paciente , estatus:1} )
    }),[citasPacienteData])

    return (
        <div className=" grid grid-rows-9 grid-cols-9 row-span-9 col-span-9" style={{margin: "20px 20px 20px 0" }}>
            <CustomModal form="citas-form">
                <FormularioCitas />
            </CustomModal>
            <div 
                className="citas-container col-span-9 row-span-2 "
            >
                {
                    citasPacienteData.length > 0
                     ? citasPacienteData.map( cita => (
                            <CitasCard key={`cita-${cita.id_consulta}`} cita={cita} />
                        ))
                     :  <>
                            <p>No tienes citas agendadas</p>
                            <Button onClick={ setOpenModal }> Agendar Cita </Button>
                        </>

                }
            </div>
        </div>
    )
}