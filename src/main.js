import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import {createApp} from "vue";
import 'highlight.js/styles/github-dark.css';
import {createPinia} from 'pinia'
import { MotionPlugin } from '@vueuse/motion';


const app = createApp(App);

app.use(router)
app.use(MotionPlugin);
app.use(createPinia())
app.config.globalProperties.$router = router
app.mount('#app')