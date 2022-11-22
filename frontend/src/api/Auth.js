/* Authetifacation actions */
// LOGIN

import axios from 'axios';

export const login = (data, setMensagem, navigate) => {
  axios.post(`http://127.0.0.1:5000/signin`, {},
    {
      headers: {
        'Content-Type': 'application/json'
      },
      auth: {
        username: data.get('username'),
        password: data.get('password')
      }
    }).then(res => {
      localStorage.setItem('token', res.data.token);
      navigate('/home');
    }).catch(err => {
      setMensagem(err.response.message);
    });
};

// LOGOUT
export const logout = () => {
  localStorage.removeItem('token');
  window.location.reload();
}

export const currentUser = (setUser) => {
  axios.get('http://127.0.0.1:5000/current_user',
    { headers: { "Authorization": localStorage.getItem('token') } }
  ).then(res => {
    setUser(res.data);
  }).catch(err => {
    //logout();
  });
}

// LOGIN STATUS

export const isLogin = () => {
  if (localStorage.getItem('token')) return true;
  return false;
};