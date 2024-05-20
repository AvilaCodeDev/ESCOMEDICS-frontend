import { createSlice } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux";

const initialState = {
    modalOpen: false
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers:{
        openModal: ( state, action ) => {
            state.modalOpen = action.payload
        },
        closeModal:( state, action ) =>  {
            console.log( action.payload );
            state.modalOpen = action.payload
        }
    
    }
});

const {
    openModal,
    closeModal
} = uiSlice.actions;

export function storeUi (){
    const dispatch = useDispatch();
    const isOpenModal = useSelector(( state ) => state.ui.modalOpen);

    return {
        isOpenModal,
        setOpenModal: () => dispatch(openModal( true )),
        setCloseModal: () => dispatch(closeModal( false ))
    }
}

export default uiSlice.reducer