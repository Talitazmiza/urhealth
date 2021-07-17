import { AUTH, AUTHCREATE} from '../constants/actionTypes';
import * as api from '../api/index.js';

function defineRedirect(role, history){
  if(role=='Dokter'){
    history.push('/doctor/dashboard');
  } else if(role=='Pasien'){
    history.push('/patient/dashboard');
  } else if(role=='Klinik'){
    history.push('/clinic/dashboard');
  }
}

export const signin = (form, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(form);
    dispatch({ type: AUTH, data });
    const role = data.result.roles.name;
    defineRedirect(role, history);
  } catch (error) {
    console.log(error);
  }
};

export const signup = (form, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(form);
    dispatch({ type: AUTH, data });
    const role = data.result.roles.name;
    defineRedirect(role, history);
  } catch (error) {
    console.log(error);
  }
};

export const signupcreate = (form) => async (dispatch) => {
  try {
    const { data } = await api.signUpCreate(form);
    dispatch({ type: AUTHCREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
