import { createSlice } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux";
import { fetchConToken } from "../../helpers/fetch";


const initialState = {
    citasDisponibles: [],
    citasPaciente: [],
    historialCitas: []
}

const citasSlice = createSlice({
    name: 'citas',
    initialState,
    reducers:{
        setCitasDisponibles: (state, action) => {
            state.citasDisponibles = action.payload
        },
        setCitasPaciente: ( state, action) => {
            state.citasPaciente = action.payload
        },
        setHistorialCitas: (state, action ) =>{
            state.historialCitas = action.payload
        }       
    }
});

const {
    setCitasDisponibles,
    setCitasPaciente,
    setHistorialCitas
} = citasSlice.actions;

const startSetingCitasDisponibles = ( cedula_prof ) => {
    return async( dispatch ) => {
        const resp = await fetchConToken('citas/disponibilidadCitas', {cedula_prof}, 'POST');
        const body = await resp.json();

        console.log( body );

        if( body.ok ){
            dispatch( setCitasDisponibles( body.citasDisponibles ));
        }
    }
}

const startAddingCita = ( datos_cita) => {
    return async( dispatch ) => {   
        const res = await fetchConToken('citas/agregaNuevaCita', datos_cita, 'POST')
        const body = await res.json();

        return body;
    }
}

const starSettingCitasPaciente = ( id_paciente, estatus ) => {
    return async( dispatch) => {
        const resp = await fetchConToken('citas/obtieneCitasPaciente', {id_paciente, estatus}, 'POST');
        const body = await resp.json();
        if( body.ok ){
            dispatch( setCitasPaciente ( body.consultas ))
        }
    }
}

const startSettingHistorialCitas = () => {
    return async( dispatch ) => {
        const resp = await fetchConToken('citas/obtieneHistorialCitas');
        const body = await resp.json();
        if( body.ok ){
            dispatch( setHistorialCitas ( body.citas ))
        }
    }
}


export function storeCitas(){
    const dispatch = useDispatch();

    const citasDisponiblesData = useSelector( (state) => state.citas.citasDisponibles);
    const citasPacienteData = useSelector( state => state.citas.citasPaciente);
    const historialCitasData = useSelector( state => state.citas.historialCitas );

    return{
        citasDisponiblesData,
        citasPacienteData,
        historialCitasData,
        setCitasDisponibles: ({ cedula_prof }) => dispatch(startSetingCitasDisponibles(cedula_prof)),
        setCitasPaciente: ({ id_paciente, estatus }) => dispatch( starSettingCitasPaciente( id_paciente, estatus )),
        addNewCita: ( datos_cita ) => dispatch( startAddingCita( datos_cita ) ),
        setHistorialConsultas: () => dispatch( startSettingHistorialCitas() ),
    }
}

export default citasSlice.reducer;