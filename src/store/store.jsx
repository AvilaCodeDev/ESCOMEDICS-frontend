import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginReducer, { storeLogin } from "../slices/login/loginSlice";
import pacientesReducer, { storePacientes } from "../slices/pacientes/pacientesSlice";
import uiReducer, { storeUi } from "../slices/ui/uiSlice";
import usuariosReducer,{ storeUsuarios } from "../slices/usuarios/usuariosSlice";
import medicosSlice, { storeMedicos } from "../slices/medicos/medicosSlice";
import citasSlice, { storeCitas } from "../slices/citas/citasSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";



const appReducer = combineReducers({
    login: loginReducer,
    pacientes: pacientesReducer,
    ui: uiReducer,
    usuarios: usuariosReducer,
    medicos: medicosSlice,
    citas: citasSlice
})

const persistConfig = {
    key: 'login',
    storage,
    whitelist:['login']
};

const rootReducer = ( sate, action ) => {
    return appReducer
}

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
    reducer: persistedReducer,
    // devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
                serializableCheck: false
            }),
});


export const useStoreLogin = () => storeLogin();
export const useStorePacientes = () => storePacientes();
export const useStoreUi = () => storeUi();
export const useStoreUsuarios = () => storeUsuarios();
export const useStoreMedicos = () => storeMedicos();
export const useStoreCitas = () => storeCitas();