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



// Patient API
export const getPatients = () => {
  return axios.get('http://localhost:5000/patient/all');
};

export const createPatients = (data) => {
  return axios.post('http://localhost:5000/patient/create', data);
};

// Doctor API
export const getDoctor = () => {
  return axios.get('http://localhost:5000/doctor/all');
};

export const createDoctor = (data) => {
  return axios.post('http://localhost:5000/doctor/create', data);
};

export const getGraph = () => API.get('http://localhost:5000/patient/alldata');

// export const fetchPosts = () => API.get('/posts');
// export const createPost = (newPost) => API.post('/posts', newPost);
// export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
// export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
// export const deletePost = (id) => API.delete(`/posts/${id}`);

