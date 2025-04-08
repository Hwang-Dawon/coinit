// import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);


import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

app.use(router);

app.mount('#app');
