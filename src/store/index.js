import { createStore } from 'vuex';
import authModule from './modules/auth/index.js';
import journeysModule from './modules/journeys/index.js';
import bugsModule from './modules/bugs/index.js';

const store = createStore({
  modules: {
    auth: authModule,
    journeys: journeysModule,
    bugs: bugsModule
  }
});

export default store;
