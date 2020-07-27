import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from "axios";

import './registerServiceWorker';
import 'bootstrap';
import './sass/_common.scss'
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import ToggleButton from 'vue-js-toggle-button';
import 'vue-datetime/dist/vue-datetime.css'
import {Datetime} from "vue-datetime";

axios.defaults.baseURL = "https://zeiterfassung-backend.herokuapp.com/";
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(ToggleButton);
Vue.component('datetime', Datetime);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
