import { createApp } from 'vue'
import './assets/sass/app.scss'

//Import FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, far)
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import App from './App.vue'

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')

