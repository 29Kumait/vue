import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { createPinia } from 'pinia'
// import { router } from './router'
// import clickOutside from './directives/click-outside'

const pinia = createPinia()
const app = createApp(App)


// app.directive('click-outside', clickOutside)

// app.use(router)
app.use(pinia)
app.mount('#app')