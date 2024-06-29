import { DatePicker, Input, Select, SelectItem } from "@nextui-org/react"
import { useStoreCitas, useStoreLogin, useStoreMedicos, useStorePacientes, useStoreUi } from "../../../store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "../../../hooks/useForm";
import {getLocalTimeZone, today } from "@internationalized/date";
import { storeCitas } from "../../../slices/citas/citasSlice";
import { toast } from "react-toastify";
import { data } from "autoprefixer";

const initialState = {
    id_especialidad: 1,
    cedula_prof: null,
    fecha_consulta: null,
    hora_consulta: null 
}

export const FormularioCitas = () => {
    
    const { credentials, userData } =useSelector( (state) => state.login )
    const [ values, handleInputChange, reset ] = useForm( initialState );
    const {  citasDisponiblesData, setCitasDisponibles, addNewCita } = useStoreCitas();
    const { setCloseModal } = useStoreUi();
    const { pacientesData ,setPacientes } = useStorePacientes();

    const [ pacientesSelect, setPacientesSelect] = useState([])
    const [ disabledHours, setDisabledHours ] = useState([]);
    const [ hours, setHours ] = useState([]);
    
    const { 
        setEspecialidades, 
        especialidadesData, 
        setMedicosEspecialidad,
        medicosEspecialidadData
    } = useStoreMedicos();

    const { 
        id_especialidad,
        cedula_prof,
        fecha_consulta,
        hora_consulta
     } = values;
    
    useEffect(( () => {
        setEspecialidades()
        setMedicosEspecialidad( {id_especialidad} );

        if(userData.id_paciente == null){
            setPacientes();
        }

    } ),[]);

    useEffect(( () => {
        setMedicosEspecialidad( {id_especialidad} );
    } ),[id_especialidad]);

    // useEffect((()=>{
    //     if( cedula_prof != null )setCitasDisponibles({cedula_prof});
    // }),[cedula_prof])
    useEffect((()=>{
        if( cedula_prof != null )setCitasDisponibles({cedula_prof});
    }),[cedula_prof])

    useEffect(( () => {
        if(citasDisponiblesData != null )getHours();
    }),[citasDisponiblesData]);

    useEffect(( () =>{
        const disabled_hours = []
        if( citasDisponiblesData.consultas_agendadas){
            citasDisponiblesData.consultas_agendadas.forEach( consulta => {
                if(consulta.fecha_consulta == fecha_consulta){
                    consulta.horas.forEach( hora => {
                        disabled_hours.push( hora.hora_ocupada)
                    })
                }
            });
        }

        setDisabledHours( disabled_hours );
    } ),[ fecha_consulta ]);

    useEffect((()=>{
        const pacientesSelect = [];

        if(pacientesData != []){
            pacientesData.forEach( paciente => {
                pacientesSelect.push({
                    key: `${paciente.id_paciente}`,
                    label: `${paciente.nombre} ${paciente.ap_paterno} ${paciente.ap_materno}`
                })
            })
        }

        console.log(pacientesSelect);

        setPacientesSelect( pacientesSelect );
    }
    ),[ pacientesData ])

    const getHours = ()=>{
        let i = 0;
        const hours = [];
        let hour;
        let aux;
        if( citasDisponiblesData.hora_entrada ){
            for(i = 0; i < 7; i++){
                aux = +citasDisponiblesData.hora_entrada.split(":")[0]+i;
                hour = `${ aux < '10' ? '0': ''}${+citasDisponiblesData.hora_entrada.split(":")[0]+i}:00`;
                hours.push({
                    key: hour,
                    label: hour,
                })
            }
            setHours( hours );
        }
    }

    const handelDatePickerChange = (e) => {
        const date_value = `${e.year}-${e.month < 10 ?  '0' : ''}${e.month}-${e.day}`;

        reset({
            ...values,
            fecha_consulta: date_value
        })

    }

    const handleSubmit =async(e) => {
        e.preventDefault();
        let valuesForm = {};
        if( userData.id_paciente != undefined ){ valuesForm = { ...values, id_paciente : userData.id_paciente }}
        else if( userData.id_recepcionista != undefined ){ valuesForm = { ...values, id_registra : userData.id_recepcionista } }
        const result = await addNewCita( valuesForm );

        if( result.ok ){
            setCloseModal()
            toast.success( result.msg );
        }else{
            toast.error( result.msg );
        }
    }

    return(
        <form className="grid grid-cols-2 gap-4" id="citas-form" onSubmit={ e => handleSubmit(e) }>

            {
                !userData.id_paciente 
                && (
                    <Select
                        items={pacientesSelect}
                        label="Paciente"
                        placeholder="Seleccione el paciente"
                        className="col-span-2"
                        onChange={ (e) => handleInputChange(e) }
                        name="id_paciente"
                        // defaultSelectedKeys={[1]}
                    >
                        {(paciente) => <SelectItem key={ paciente.key }>{paciente.label}</SelectItem>}
                    </Select>
                )
            }

            <Select
                isDisabled={ credentials.id_rol == 4 ? true : false }
                items={especialidadesData}
                label="Especialidad"
                placeholder="Seleccione la especialidad"
                className="col-span-1"
                onChange={ (e) => handleInputChange(e) }
                name="id_especialidad"
                defaultSelectedKeys={[1]}
            >
                {(especialidad) => <SelectItem>{especialidad.label}</SelectItem>}
            </Select>

            <Select
                items={medicosEspecialidadData}
                label="Medico"
                placeholder="Seleccione el medico"
                className="col-span-1"
                onChange={ (e) => handleInputChange(e) }
                name="cedula_prof"
                // defaultSelectedKeys={[1]}
            >
                {(medico) => <SelectItem>{medico.label}</SelectItem>}
            </Select>

            <DatePicker 
                label="Fecha Consulta"
                name="fecha_consulta"
                minValue={today(getLocalTimeZone()).add({ days: 2 })}
                maxValue={today(getLocalTimeZone()).add({ months: 3 })}
                onChange={ (e) => handelDatePickerChange(e) }
                className="col-span-1"
            /> 

            <Select
                items={hours}
                label="Hora"
                placeholder="Seleccione la hora"
                className="col-span-1"
                onChange={ ( value ) => handleInputChange(value) }
                name="hora_consulta"
                disabledKeys={ disabledHours }
                // defaultSelectedKeys={[1]}
            >
                {(hora) => <SelectItem  >{hora.label}</SelectItem>}
            </Select>
        </form>
    )
}