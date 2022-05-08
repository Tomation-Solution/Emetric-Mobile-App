import axios from 'axios';
import localStorage from 'react-native-sync-localstorage'

const URL = 'https://emetric-suite-backend.herokuapp.com/'

const instance = axios.create({
  baseURL: URL,
  // ​headers: {
  //   ​'Content-Type': 'application/json',
  //   '​accept': 'application/json'
  // ​},
});

instance.interceptors.request.use((config) => {

  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : null;
  
  return config;
});

// instance.interceptors.response.use(response => {
//   return response;
// }, error => {
//  if (error.response.status === 401) {
//   //place your reentry code
//   alert('You are not authorized')
//  }else{
//   error.message

//  }
//  return error;
// });
export default instance;