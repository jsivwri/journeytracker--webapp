import { createRouter, createWebHistory } from 'vue-router';

import Journeys from './pages/Journeys.vue';
import Home from './pages/Home.vue';
import About from './pages/About.vue';

import store from './store/index.js';



const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/journeys/',
      component: Journeys,
      beforeEnter(to, _from, next) {
        if (!store.getters.isAuthenticated) {
          next('/');
        } else {
          store.dispatch('journeys/readJourneys').then(next());
        }
      }
    },
    {
      path: '/about/',
      component: About
    },
    {
      path: '/',
      component: Home
    }
    // { path: '/:notFound(.*)', component: notFound }
  ]
});

export default router;
