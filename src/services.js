import axios from 'axios';

const api = axios.create({
  baseURL: 'https://folha-pagamento-api.herokuapp.com/',
});
export default api;
