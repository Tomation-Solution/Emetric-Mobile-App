import axios from 'axios';
import localStorage from 'react-native-sync-localstorage'

const URL = 'https://emetric-suite-revamp.herokuapp.com';

const instance = axios.create({
  baseURL: URL,
});

instance.interceptors.request.use((config) => {

//   if (!config.noload) {
//     Swal.fire({
//       title: 'Please Wait !',
//       html: 'Loading',// add html attribute if you want or remove
//       allowOutsideClick: false,
//       showConfirmButton: false,
//       onBeforeOpen: () => {
//         Swal.showLoading()
//       },
//     });
//   }

  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : null;
  return config;
});

export default instance;