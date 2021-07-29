import * as api from '../api';
import { CREATE_DOCTORS, DELETE_DOCTORS, FETCH_ALL_DOCTORS, UPDATE_DOCTORS } from "../constants/actionTypes";

export const getAllDoctor = () => async (dispatch) => { // a function (async) that returns another function (dispatch)
    try {
        const { data } = await api.getAllDoctor();

        dispatch({ type: 'FETCH_ALL_DOCTORS', payload: data.result });
    } catch (error) {
        console.log(error);
    }
};

export const createDoctor = (doctor) => async (dispatch) => {
    try {
        const res = await api.createDoctor(doctor);

        dispatch({ type: 'CREATE_DOCTORS', payload: res.data });

        return Promise.resolve(res.data);
    } catch (error) {
        return Promise.reject(error);
    }
};


export const updateDoctor = (id, doctor) => async (dispatch) => {
    try {
        const res = await api.updateDoctor(id, doctor);

        dispatch({ type: 'UPDATE_DOCTORS', payload: res });

        return Promise.resolve(res.data);
    } catch (error) {
        return Promise.reject(error.message);
    }
};


export const deleteDoctor = (id) => async (dispatch) => {
    try {
        await api.deleteDoctor(id);

        dispatch({ type: 'DELETE_DOCTORS', payload: { id } });
    } catch (error) {
        console.log(error.message);
    }
};