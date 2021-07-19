import { FETCH_ALL, CREATE, UPDATE } from '../constants/actionTypes';

export default (patients = [], action) => {
    switch (action.type) {
        case 'UPDATE':
            return patients.map((patient) => patient._id === action.payload._id ? action.payload : patient);
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...patients, action.payload]; // send an array first spread all of the patients then add new patient and then the new patient will stored in the action.payload
        default:
            return patients;
    }
}

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
