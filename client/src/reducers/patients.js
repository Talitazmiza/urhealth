import { FETCH_ALL, CREATE } from '../constants/actionTypes';

// export default (patients = [], action) => {
//     switch (action.type) {
//         case 'FETCH_ALL':
//             return action.payload;
//         case 'CREATE':
//             return [...patients, action.payload];
//         default:
//             return patients;
//     }
// }

export default function patientReducer(state = {patients : []}, action) {
    switch (action.type) {
        case 'FETCH_ALL':
            return [
                { patients : action.payload.patient }, ...state.patients
            ]
        case 'CREATE':
            return [

            ]
        default:
            return state;
    }
    return state;
}
