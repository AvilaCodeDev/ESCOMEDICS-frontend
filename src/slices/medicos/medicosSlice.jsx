import { createSlice } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux";
import { fetchConToken } from "../../helpers/fetch";

const initialState = {
    medicosData: [],
    especialidades:[],
    consultorios: [],
    medicosEspecialidad: [],
    activeMedico: null
}

const medicosSlice = createSlice({
    name: 'medicos',
    initialState,
    reducers:{
        setMedicos: ( state, action ) => {
            state.medicos = action.payload;
        },
        setEspecialidades: (state, action) => {
            state.especialidades = action.payload;
        },
        setConsultorios: (state, action) => {
            state.consultorios = action.payload;
        },
        setMedicosEspecialidad: (state, action) => {
            state.medicosEspecialidad = action.payload
        },
        setActiveMedico: ( state, action ) => {
            state.activeMedico = action.payload;
        }
    }
});

const {
    setMedicos,
    setEspecialidades,
    setConsultorios,
    setMedicosEspecialidad,
    setActiveMedico
} = medicosSlice.actions;

const getEspecialidades = () => {
    return async(dispatch) => {
        const resp = await fetchConToken('medicos/obtieneEspecialidades');
        const body = await resp.json();

        if( body.especialidades ){
            const especialidades = [];
            body.especialidades.forEach (especialidad => {
                especialidades.push({
                    key: `${especialidad.key}`,
                    label: `${especialidad.label}`
                })
            });
            dispatch(setEspecialidades( especialidades ));
        }
    }
}
const getConsultorios = () => {
    return async(dispatch) => {
        const resp = await fetchConToken('medicos/obtieneConsultorios');
        const body = await resp.json();

        if( body.consultorios ){
            const consultorios = [];
             body.consultorios.forEach(consultorio => {
                consultorios.push(
                    {
                        key: `${consultorio.key}`,
                        label: `${consultorio.key}`,
                    }
                )
             });
            dispatch(setConsultorios( consultorios ));
        }
    }
}

const getMedicoEspecialidad = ( id_especialidad ) => {
    return async(dispatch) => {
        const resp = await fetchConToken('medicos/obtieneMedicosEspecialidad', {id_especialidad}, 'POST');
        const body = await resp.json();

        if( body.medicosEspecialidad ){
            const medicosEspecialidad = [];
             body.medicosEspecialidad.forEach(medico => {
                medicosEspecialidad.push(
                    {
                        key: `${medico.key}`,
                        label: `${medico.label}`,
                    }
                )
             });
            dispatch(setMedicosEspecialidad( medicosEspecialidad ));
        }
    }
}

export function storeMedicos(){
    const dispatch = useDispatch();

    const medicosData = useSelector(( state ) => state.medicos.medicos );
    const especialidadesData = useSelector (( state ) => state.medicos.especialidades );
    const consultoriosData = useSelector(( state ) => state.medicos.consultorios );
    const activeMedico = useSelector(( state ) => state.medicos.activeMedico );
    const medicosEspecialidadData = useSelector( (state) => state.medicos.medicosEspecialidad );

    return{
        medicosData,
        especialidadesData,
        consultoriosData,
        activeMedico,
        medicosEspecialidadData,
        setEspecialidades: () => dispatch(getEspecialidades()),
        setConsultorios: () => dispatch( getConsultorios()),
        setMedicosEspecialidad: ( { id_especialidad } ) => dispatch( getMedicoEspecialidad( id_especialidad) )
    }
}

export default medicosSlice.reducer;