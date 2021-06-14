import { createApp } from 'vue';

import store from './store/index.js';
import router from './router.js';
import App from './App.vue';

import TheHeader from './components/layout/TheHeader.vue';
import TheMenu from './components/layout/TheMenu.vue';
import TheFooter from './components/layout/TheFooter.vue';

import BaseModel from './components/ui/BaseModel.vue';

const app = createApp(App);

app.use(store);
app.use(router);

app.component('the-header', TheHeader);
app.component('the-menu', TheMenu);
app.component('the-footer', TheFooter);

app.component('base-model', BaseModel)

app.mount('#app');
