import * as api from '../api';
import {CREATE, FETCH_ALL, UPDATE, DELETE} from "../constants/actionTypes";

export const getAllPatient = () => async (dispatch) => { // a function (async) that returns another function (dispatch)
    try {
        const { data } = await api.getAllPatient();

        dispatch({ type: 'FETCH_ALL', payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const createPatient = (patient) => async (dispatch) => {
    try {
        const { data } = await api.createPatient(patient);

        dispatch({ type: 'CREATE', payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updatePatient = (id, patient) => async (dispatch) => {
    try {
        const { data } = await api.updatePatient(id, patient);

        dispatch({ type: 'UPDATE', payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const deletePatient = (id) => async (dispatch) => {
    try {
        await api.deletePatient(id);

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error.message);
    }
};