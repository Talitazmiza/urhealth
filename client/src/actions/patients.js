import * as api from '../api';
import {CREATE_PATIENTS, FETCH_ALL_PATIENTS, UPDATE_PATIENTS, DELETE_PATIENTS} from "../constants/actionTypes";

export const getAllPatient = () => async (dispatch) => { // a function (async) that returns another function (dispatch)
    try {
        const { data } = await api.getAllPatient();

        dispatch({ type: 'FETCH_ALL_PATIENTS', payload: data.result });
    } catch (error) {
        console.log(error);
    }
};

export const createPatient = (patient) => async (dispatch) => {
    try {
        const res = await api.createPatient(patient);

        dispatch({ type: 'CREATE_PATIENTS', payload: res.data });

        return Promise.resolve(res.data);
    } catch (error) {
        return Promise.reject(error);
    }
};


export const updatePatient = (id, patient) => async (dispatch) => {
    try {
        const res = await api.updatePatient(id, patient);

        dispatch({ type: 'UPDATE_PATIENTS', payload: res });

        return Promise.resolve(res.data);
    } catch (error) {
        return Promise.reject(error.message);
    }
};


export const deletePatient = (id) => async (dispatch) => {
    try {
        await api.deletePatient(id);

        dispatch({ type: 'DELETE_PATIENTS', payload: { id } });
    } catch (error) {
        console.log(error.message);
    }
};


// export const findTutorialsByEmail = (email) => async (dispatch) => {
//     try {
//         const res = await TutorialDataService.findBy(email);
//
//         dispatch({
//             type: RETRIEVE_TUTORIALS,
//             payload: res.data,
//         });
//     } catch (err) {
//         console.log(err);
//     }
// };