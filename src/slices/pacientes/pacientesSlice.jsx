import { createSlice } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux";
import { fetchConToken } from "../../helpers/fetch";
import { useStoreUi } from "../../store/store";

const initialState = {
    pacientes : [],
    activePaciente: null
}

const pacientesSlice = createSlice({
    name: 'pacientes',
    initialState,
    reducers:{
        setPacientes: ( state, action ) => {
            state.pacientes = action.payload;
        },
        setActivePaciente: ( state, action ) => {
            state.activePaciente = action.payload;
        }
    }
});

const {
    setPacientes,
    setActivePaciente
} = pacientesSlice.actions;

const startAddNeWpaciente = ( datosPaciente ) => {
    return async( dispatch ) => {
        const resp = await fetchConToken( 'pacientes/registrarPaciente', datosPaciente, 'POST' );
        const body = await resp.json();

        if( body.ok ){
            dispatch( startGetingPacientes() );
        }
    }
}

const startUpdatePaciente = ( datosPaciente ) => {
    return async( dispatch ) => {
        const resp = await fetchConToken( `pacientes/${ datosPaciente.id_paciente }`, datosPaciente, 'PUT' )
        const body = await resp.json();

        if( body.ok ){
            dispatch( startGetingPacientes() );
        }
    }
}

const startDeletePaciente = ( id_paciente ) => {
    return async( dispatch ) => {
        const resp = await fetchConToken( `pacientes/${ id_paciente }`, id_paciente, 'DELETE');
        const body = await resp.json();

        if( body.ok ){
            dispatch( startGetingPacientes() );
        }
    }
}

const startGetingPacientes = () => {
    return async( dispatch ) => {
        const resp = await fetchConToken( 'pacientes' );
        const body = await resp.json();

        if( body.ok ){
            dispatch( setPacientes( body.pacientes ) )
        }
    }
}

export function storePacientes(){
    const dispatch = useDispatch();

    const pacientesData = useSelector(( state ) => state.pacientes.pacientes );
    const activePaciente = useSelector(( state ) => state.pacientes.activePaciente);

    return{
        pacientesData,
        activePaciente,
        setPacientes: () => dispatch(startGetingPacientes()),
        registrarPaciente: ( datosPaciente ) => dispatch( startAddNeWpaciente(datosPaciente)),
        pacienteSetActive: ( datosPaciente ) => dispatch( setActivePaciente( datosPaciente )),
        clearActivePaciente: () => dispatch( setActivePaciente(null) ),
        updatePaciente: ( datosPaciente ) => dispatch( startUpdatePaciente( datosPaciente )),
        deletePaciente: ( id_paciente ) => dispatch( startDeletePaciente( id_paciente ) )
    }
}

export default pacientesSlice.reducer;