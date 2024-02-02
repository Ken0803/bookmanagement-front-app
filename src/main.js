import { createApp } from 'vue'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import router from './router';
import App from './App.vue'
import store from './store';

const vuetify = createVuetify({
  components,
  directives
});

const vm = createApp(App)
  .use(router)
  .use(vuetify)
  .use(VueToast, { position: "top-right" })
  .use(store)
  .mount('#app');
window.toast = vm.$toast;