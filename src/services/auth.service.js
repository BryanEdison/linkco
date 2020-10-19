import axios from "axios";
import inMemoryJWT from './inMemoryJwt';

// let API_URL = "http://localhost:4567/";
//Switch to bottom for production
let API_URL = "linkco.herokuapp.com/"

let headers = new Headers();

headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Origin', API_URL);

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
        }
        return response.data._id;
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
    return axios.post(API_URL + "signup/", {
      username,
      email,
      password
    })
    .then(response => {
      if (response.data.token) {
        inMemoryJWT.setToken(response.data.token)
      }
      //probably hide token instead of returning it
      return response;
    })
  }

  editUser(id, links) {
    let token = inMemoryJWT.getToken();
    return axios.put(API_URL + id, {
      id, links, token
    });
  }

  getCurrentUser(id) {
    let token = inMemoryJWT.getToken();
      return axios.post(API_URL + "profile/" + id, {token})
        .then(response => {
          return response.data;
        })
        .catch(e => {
          console.log('error', e);
      });
      
    }

    getUser(username) {
        return axios.get(API_URL + "profile/" + username)
          .then(response => {
            return response.data;
          })
          .catch(e => {
            console.log('error', e);
        });
        
      }

  checkAuth() {
    return inMemoryJWT.getToken() ? true : false;
  }

  checkError(error) {
    const status = error.status;
    if (status === 401 || status === 403) {
      inMemoryJWT.eraseToken();
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