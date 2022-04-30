import axios from 'axios';
import localStorage from 'react-native-sync-localstorage'

const URL = 'https://emetric-suite-revamp.herokuapp.com';

const instance = axios.create({
  baseURL: URL,
});

instance.interceptors.request.use((config) => {

  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : null;
  
  return config;
});

instance.interceptors.response.use(response => {
  return response;
}, error => {
 if (error.response.status === 401) {
  //place your reentry code
  alert('You are not authorized')
 }
 return error;
});
// instance.interceptors.response.use((response) => {

//   if(response.status === 401) {
//       alert("You are not authorized");
//     }
//   return response;
// });

// if(response.status === 401) {
//   alert("You are not authorized");
// }
// return response;
export default instance;