import { FETCH_ALL, CREATE_PATIENTS, UPDATE_PATIENTS, DELETE_PATIENTS } from '../constants/actionTypes';

export default (patients = [], action) => {
    switch (action.type) {
        case 'UPDATE_PATIENTS':
            return patients.map((patient) => patient._id === action.payload._id ? action.payload : patient);
        // case UPDATE_TUTORIAL:
        //     return tutorials.map((tutorial) => {
        //         if (tutorial.id === payload.id) {
        //             return {
        //                 ...tutorial,
        //                 ...payload,
        //             };
        //         } else {
        //             return tutorial;
        //         }
        //     });
        case 'FETCH_ALL':
            return action.payload;
        case  'DELETE_PATIENTS':
            return patients.filter(({ _id }) => _id !== action.payload._id);
        case 'CREATE_PATIENTS':
            return [...patients, action.payload]; // send an array first spread all of the patients then add new patient and then the new patient will stored in the action.payload
        default:
            return patients;
    }
}

// export default (patients = [], action) => {
//     switch (action.type) {
//         case 'UPDATE':
//             return patients.map((patient) => patient._id === action.payload._id ? action.payload : patient);
//         case 'FETCH_ALL':
//             return action.payload;
//         case 'CREATE':
//             return [...patients, action.payload]; // send an array first spread all of the patients then add new patient and then the new patient will stored in the action.payload
//         default:
//             return patients;
//     }
// }

// export default function patientReducer(state = {patients : []}, action) {
//     switch (action.type) {
//         case 'FETCH_ALL':
//             return [
//                 { patients : action.payload.patient }, ...state.patients
//             ]
//         case 'CREATE':
//             return [
//
//             ]
//         default:
//             return state;
//     }
//     return state;
// }
