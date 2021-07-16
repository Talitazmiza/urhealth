import * as api from '../api';
import {CREATE, FETCH_ALL} from "../constants/actionTypes";

export const getPatients = () => async (dispatch) => { // a function (async) that returns another function (dispatch)
    try {
        const { data } = await api.getPatients();

        dispatch({ type: 'FETCH_ALL', payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const createPatients = (patient) => async (dispatch) => {
    try {
        const { data } = await api.createPatients(patient);

        dispatch({ type: 'CREATE', payload: data });
    } catch (error) {
        console.log(error);
    }
};
