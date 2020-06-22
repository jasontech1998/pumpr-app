import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pumpr-182dc.firebaseio.com/'
});

export default instance;