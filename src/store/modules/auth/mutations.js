import router from '../../../router'

export default {
  logout(state) {
    state.userId = null;
    state.token = null;
    router.push('/');
  },
  login(state, payload) {
    state.userId = payload.userId;
    state.token = payload.token;
    router.push('/journeys/');
  }
};
