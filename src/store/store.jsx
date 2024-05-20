import { configureStore } from "@reduxjs/toolkit";
import loginReducer, { storeLogin } from "../slices/login/loginSlice";
import pacientesReducer, { storePacientes } from "../slices/pacientes/pacientesSlice";
import uiReducer, { storeUi } from "../slices/ui/uiSlice";

export const store = configureStore({
    reducer:{
        login: loginReducer,
        pacientes: pacientesReducer,
        ui: uiReducer
    }
});

export const useStoreLogin = () => storeLogin();
export const useStorePacientes = () => storePacientes();
export const useStoreUi = () => storeUi();