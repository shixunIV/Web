import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import DevUI from 'vue-devui';
import 'vue-devui/style.css';
import '@devui-design/icons/icomoon/devui-icon.css';
import { ThemeServiceInit, infinityTheme } from 'devui-theme';
import 'ant-design-vue/dist/reset.css';
import Antd from 'ant-design-vue';
import * as Icons from '@ant-design/icons-vue'

ThemeServiceInit({ infinityTheme }, 'infinityThexme');

const app = createApp(App)
app.use(store)
app.use(router)
app.use(DevUI)
app.use(Antd)
// 注册所有图标组件
Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key])
})
app.mount('#app')



