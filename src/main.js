import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2';
import VueFinalModal from 'vue-final-modal'
import 'sweetalert2/dist/sweetalert2.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';

createApp(App)
    .use(store)
    .use(router)
    .use(VueSweetalert2)
    .use(VueFinalModal())
    .mount('#app')
