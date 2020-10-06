import axios from "axios";
import inMemoryJWT from './inMemoryJwt';


const API_URL = "http://localhost:4567/";


let headers = new Headers();

headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Origin', 'http://localhost:3000');

const config = {
  withCredentials: true,
  mode: 'cors',
  credentials: 'include',
  method: 'POST',
  headers: headers
}

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "login", {
        username,
        password
      }, config)
      //maybe just use 'same-site' instead
      .then(response => {
        if (response.data.token) {
          inMemoryJWT.setToken(response.data.token)
          // localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      })
      .catch(e => {
        console.log('error', e);
    });
    
  }

  logout() {
    inMemoryJWT.eraseToken();
    return Promise.resolve();
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup/ealulema", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

  checkAuth() {
    return inMemoryJWT.getToken() ? true : false;
  }

  checkError(error) {
    const status = error.status;
    if (status === 401 || status === 403) {
      inMemoryJWT.ereaseToken();
      return Promise.reject();
    }
    return Promise.resolve();
  }

  getPermissions() {
    return inMemoryJWT.getToken() ? Promise.resolve() : Promise.reject();
  }

  checkUserName(username) {
    return axios
      .post(API_URL + "userNameCheck", {
        username
      })
      .then(response => {
        if (response.status === '400') {
          return false
        }
        return true
      });
  }

  checkEmail(email) {
    return axios
      .post(API_URL + "emailCheck", {
        email
      })
      .then(response => {
        if (response.status === '400') {
          return false
        }
        return true
      });
  }
}

export default new AuthService();