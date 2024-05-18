import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import DevUI from 'vue-devui';
import 'vue-devui/style.css';
import '@devui-design/icons/icomoon/devui-icon.css';
import { ThemeServiceInit, infinityTheme } from 'devui-theme';

ThemeServiceInit({ infinityTheme }, 'infinityTheme');



const app = createApp(App)
app.use(store)
app.use(router)
app.use(DevUI)
// app.config.globalProperties.$http = axios
app.mount('#app')
