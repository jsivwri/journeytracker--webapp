let timer;

import key from './.api.js';
import router from '../../../router.js'

export default {
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(timer);

    context.commit('logout');
  },

  async auth(context, payload) {
    const mode = payload.mode;
    let url = '';

    if (mode === 'signup') {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;
    } else if (mode === 'login') {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`;
    }

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to authenticate.'
      );
      throw error;
    }

    const expiresIn = 1000 * responseData.expiresIn;
    const expirationDate = expiresIn + new Date().getTime();

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('tokenExpiration', expirationDate);

    timer = setTimeout(function() {
      context.dispatch('autoLogout');
    }, expiresIn);

    context.commit('login', {
      token: responseData.idToken,
      userId: responseData.localId
    });
  },

  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 10000) {
      return;
    }

    timer = setTimeout(function() {
      context.dispatch('autoLogout');
    }, expiresIn);

    if (token && userId) {
      context.commit('login', {
        token: token,
        userId: userId
      });
    }
  },

  autoLogout(context) {
    router.replace('/')
    context.dispatch('logout');
  }
};
