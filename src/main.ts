import { createApp } from 'vue';
import App from './App';
import router from './router';
import store from './store';
import 'ant-design-vue/dist/antd.css';
import { Layout } from 'ant-design-vue/es'
import Antd from 'ant-design-vue/es';
import moment from 'moment';
import 'moment/dist/locale/zh-cn';

import alertName from '@/components/alert/alert'
moment.locale('zh-cn');
// import '@/style/index.scss';
const app = createApp(App)
// app.config.globalProperties.$alertName = alertName
app.use(router).use(store).use(Layout).use(Antd).use(alertName, {name: '111'}).mount('#app');
