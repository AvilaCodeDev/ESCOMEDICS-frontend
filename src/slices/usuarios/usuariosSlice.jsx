import { createSlice } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux";
import { fetchConToken } from "../../helpers/fetch";
import { useStoreUi } from "../../store/store";

const initialState = {
    usuarios : [],
    activeUsuario: null
}

const usuariosSlice = createSlice({
    name: 'usuarios',
    initialState,
    reducers:{
        setUsuarios: ( state, action ) => {
            state.usuarios = action.payload;
        },
        setActiveUsuario: ( state, action ) => {
            state.activeUsuario = action.payload;
        }
    }
});

const {
    setUsuarios,
    setActiveUsuario
} = usuariosSlice.actions;

// const startAddNeWpaciente = ( datosPaciente ) => {
//     return async( dispatch ) => {
//         const resp = await fetchConToken( 'pacientes/registrarPaciente', datosPaciente, 'POST' );
//         const body = await resp.json();

//         if( body.ok ){
//             dispatch( startGetingPacientes() );
//         }
//     }
// }

// const startUpdatePaciente = ( datosPaciente ) => {
//     return async( dispatch ) => {
//         const resp = await fetchConToken( `pacientes/${ datosPaciente.id_paciente }`, datosPaciente, 'PUT' )
//         const body = await resp.json();

//         if( body.ok ){
//             dispatch( startGetingPacientes() );
//         }
//     }
// }

// const startDeletePaciente = ( id_paciente ) => {
//     return async( dispatch ) => {
//         const resp = await fetchConToken( `pacientes/${ id_paciente }`, id_paciente, 'DELETE');
//         const body = await resp.json();

//         if( body.ok ){
//             dispatch( startGetingPacientes() );
//         }
//     }
// }

const addNewUsuario = ( datosUsuario ) => {
    return async( dispatch ) => {
        const resp = await fetchConToken('usuarios/registraUsuario', datosUsuario , 'POST');
        const body = await resp.json();

        console.log( body );
    }
}

const startGetingUsuarios = () => {
    return async( dispatch ) => {
        const resp = await fetchConToken( 'usuarios' );
        const body = await resp.json();

        if( body.ok ){
            dispatch( setUsuarios( body.dataUsuarios ) )
        }
    }
}

// const startSettingActiveUsuario = ( id_usuario ) => {
//     return async( dispatch ) => {
//     }
// }

export function storeUsuarios(){
    const dispatch = useDispatch();

    const usuariosData = useSelector(( state ) => state.usuarios.usuarios );
    const activeUsuario = useSelector(( state ) => state.usuarios.activeUsuario);

    return{
        usuariosData,
        activeUsuario,
        setUsuarios: () => dispatch(startGetingUsuarios()),
        registrarUsuario: (datosUsuario) => dispatch(addNewUsuario( datosUsuario )),
        usuariosSetActive: ( datosUsuario ) => dispatch( setActiveUsuario( datosUsuario )),
        // registrarPaciente: ( datosPaciente ) => dispatch( startAddNeWpaciente(datosPaciente)),
        // clearActivePaciente: () => dispatch( setActivePaciente(null) ),
        // updatePaciente: ( datosPaciente ) => dispatch( startUpdatePaciente( datosPaciente )),
        // deletePaciente: ( id_paciente ) => dispatch( startDeletePaciente( id_paciente ) )
    }
}

export default usuariosSlice.reducer;