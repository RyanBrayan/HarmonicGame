import { createApp } from 'vue'
import App from './App.vue'
import bootstrap from '../bootstrap';
import emitterPlugin from './emitter.js'; // ATTENTION HERE


let app = createApp(App);
app.use(emitterPlugin); 

app.mount('#app')
