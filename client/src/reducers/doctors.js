import { CREATE_DOCTORS, DELETE_DOCTORS, FETCH_ALL_DOCTORS, UPDATE_DOCTORS } from "../constants/actionTypes";

export default (doctors = [], action) => {
    switch (action.type) {
        case 'UPDATE_DOCTORS':
            return doctors.map((doctor) => doctor._id === action.payload._id ? action.payload : doctor);
        case 'FETCH_ALL_DOCTORS':
            return action.payload;
        case  'DELETE_DOCTORS':
            return doctors.filter(({ _id }) => _id !== action.payload._id);
        case 'CREATE_DOCTORS':
            return [...doctors, action.payload]; // send an array first spread all of the doctors then add new doctor and then the new doctor will stored in the action.payload
        default:
            return doctors;
    }
}