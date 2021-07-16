import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

export const signIn = (form) => API.post('/user/signin', form);
export const signUp = (form) => API.post('/user/signup', form);

////// Patient API ///////
export const getAllPatient = () => {
  return axios.get('http://localhost:5000/patient/all');
};

export const createPatient = (data) => {
  return axios.post('http://localhost:5000/patient/create', data);
};

export const updatePatient = (id, updatedPatient) => {
  return axios.put('http://localhost:5000/patient/update/:id', updatedPatient);
};

export const deletePatient = (id) => {
  return axios.delete('http://localhost:5000/patient/:id');
};

// export const getPatients = () => axios.get('http://localhost:5000/patient/all');
// export const createPatients = (data) => axios.post('http://localhost:5000/patient/create', data);

/////// Doctor API //////
export const getDoctor = () => {
  return axios.get('http://localhost:5000/doctor/all');
};

export const createDoctor = (data) => {
  return axios.post('http://localhost:5000/doctor/create', data);
};

export const getGraph = () => API.get('http://localhost:5000/patient/alldata');
