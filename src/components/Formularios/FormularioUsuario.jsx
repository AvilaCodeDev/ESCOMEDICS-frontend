import { Input, Radio, RadioGroup, Select, SelectItem } from "@nextui-org/react"
import { useForm } from "../../hooks/useForm";
import { useStoreMedicos, useStoreUsuarios } from "../../store/store";
import { useEffect } from "react";

const intialState = {
    nombre: null,
    ap_paterno: null,
    ap_materno: null,
    sexo: 0,
    curp: null,
    correo: null,
    telefono: null,
    direccion: null,
    id_horario: "1",
    cedula: null,
    id_especialidad: "1",
    id_consultorio: null,
    id_rol: "4"
}

export const FormularioUsuarios = () => {

    const [ values , handleInputChange, reset] = useForm( intialState );
    const { activeUsuario ,registrarUsuario } = useStoreUsuarios();
    const { 
        setEspecialidades, 
        setConsultorios, 
        especialidadesData, 
        consultoriosData 
    } = useStoreMedicos();

    const {
        nombre,
        ap_paterno,
        ap_materno,
        sexo,
        curp,
        correo,
        telefono,
        direccion,
        id_horario,
        cedula,
        id_especialidad,
        id_consultorio,
        id_rol
    } = values;

    // useEffect(( () => {
    //     if( activeUsuario ){
    //         reset( activeUsuario );
    //         console.log( roles[ id_rol ]);
    //     }
    // } ), [ activeUsuario, reset ]);

    const sexos = [
        {
            key: 1,
            label: "Femenino"
        },
        {
            key: 0,
            label: "Masculino"
        }
    ];

    const roles = [
        {key: "1", label: "Recepcionista"},
        {key: "2", label: "Medico"},
        {key: "3", label: "Farmaceutico"},
        {key: "4", label: "Paciente"}
      ];

    const horarios = [
        {key: "1", label: "Matutino"},
        {key: "2", label: "Vespertino"},
        {key: "3", label: "Nocturno"},
    ];
    
    const handleSubmit = ( e ) => {
        e.preventDefault();
        registrarUsuario( values );
    }
    
    useEffect(( () =>{
        setEspecialidades();
        setConsultorios();
    }),[]);
    


    return (
        <form id="usuarios-form" className="grid grid-cols-3 grid-rows-2 gap-4" onSubmit={ handleSubmit }>

            <Input
                isRequired
                name="nombre"
                className="col-start-1"
                type='text'
                variant='faeded'
                color='primary'
                label="Nombre"
                placeholder='Ingresa el nombre'
                value={ nombre }
                onChange={ (e) => handleInputChange(e) }
            />
            <Input
                isRequired
                name="ap_paterno"
                className="col-start-2"
                type='text'
                variant='faeded'
                color='primary'
                label="Apellido Paterno"
                placeholder='Ingresa el apellido paterno'
                value={ ap_paterno }
                onChange={ (e) => handleInputChange(e) }
            />
            <Input
                isRequired
                name="ap_materno"
                className="col-start-3"
                type='text'
                variant='faeded'
                color='primary'
                label="Apellido Materno"
                placeholder='Ingresa el apellido materno'
                value={ ap_materno }
                onChange={ (e) => handleInputChange(e) }
            />
            <Input
                isRequired
                name="telefono"
                className="col-start-1 row-start-2"
                type='text'
                variant='faeded'
                color='primary'
                label="Telefono"
                placeholder='Ingresa el telefono'
                value={ telefono }
                onChange={ (e) => handleInputChange(e) }
            />
            <Input
                isRequired
                name="direccion"
                className="col-start-2 row-start-2"
                type='text'
                variant='faeded'
                color='primary'
                label="Direccion"
                placeholder='Ingresa el apellido materno'
                value={ direccion }
                onChange={ (e) => handleInputChange(e) }
            />
            <Input
                isRequired
                name="curp"
                value={ curp }
                className="col-start-3 row-start-2"
                type='text'
                variant='faeded'
                color='primary'
                label="CURP"
                placeholder='Ingresa el CURP'
                onChange={ (e) => handleInputChange(e) }
            />
            <Select
                items={sexos}
                label="Sexo"
                placeholder="Seleccione el sexo"
                className="max-w-xs"
                onChange={ (e) => handleInputChange(e) }
                name="sexo"
                defaultSelectedKeys={ sexo != null ? [sexo] : [1] }
            >
                {(sexo) => <SelectItem key={sexo.key}>{sexo.label}</SelectItem>}
            </Select>
            <Input
                isRequired
                name="correo"
                value={correo}
                className="col-start-2 row-start-3"
                type='email'
                variant='faeded'
                color='primary'
                label="Correo"
                placeholder='Ingresa el correo'
                onChange={ (e) => handleInputChange(e) }
            />

            <Select
                items={roles}
                label="Tipo de usuario"
                placeholder="Seleccione el tipo de usuario"
                className="max-w-xs"
                onChange={ (e) => handleInputChange(e) }
                name="id_rol"
                // value={ id_rol != null ? id_rol : intialState }
                defaultSelectedKeys={ id_rol != null ? [id_rol] : [4]}
            >
                {(rol) => <SelectItem>{rol.label}</SelectItem>}
            </Select>

            {
                values.id_rol != 4 &&
                <Select
                    items={horarios}
                    label="Horario"
                    placeholder="Seleccione el horario"
                    className="max-w-xs"
                    onChange={ (e) => handleInputChange(e) }
                    name="id_horario"
                    defaultSelectedKeys={ id_horario != null && [id_horario]}
                >
                    {(horario) => <SelectItem>{horario.label}</SelectItem>}
                </Select>
            }

            {
                values.id_rol == 2 &&
                <>
                    <Select
                        items={especialidadesData}
                        label="Especialidad"
                        placeholder="Seleccione la especialidad"
                        className="max-w-xs"
                        onChange={ (e) => handleInputChange(e) }
                        name="id_especialidad"
                        defaultSelectedKeys={ id_especialidad != null ? [id_especialidad]:[1]}
                    >
                        {(especialidad) => <SelectItem>{especialidad.label}</SelectItem>}
                    </Select>

                    <Input
                        isRequired
                        name="cedula"
                        value={ cedula }
                        className="col-start-3 row-start-4"
                        type='text'
                        variant='faeded'
                        color='primary'
                        label="Cedula"
                        placeholder='Ingresa la cedula profesional'
                        onChange={ (e) => handleInputChange(e) }
                    />
                    <Select
                        items={consultoriosData}
                        label="Consultorio"
                        placeholder="Seleccione el consultorio"
                        className="max-w-xs col-start-2 row-start-5"
                        onChange={ (e) => handleInputChange(e) }
                        name="id_consultorio"
                        defaultSelectedKeys={ id_consultorio != null ? [id_consultorio] : [] }
                    >
                        {(consultorio) => <SelectItem key={consultorio.key}>{consultorio.label}</SelectItem>}
                    </Select>
                    
                </>

            }
        </form>
    )
}