// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

/*引入Vue框架*/
import Vue from 'vue';
import App from './App';
import router from './router/router';
import axios from 'axios';
import "babel-polyfill";
import $ from 'jquery';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


// 引用公用方法
import utils from '../static/js/common.js';

Vue.use(utils);

Vue.use(ElementUI, {size: 'small'});
Vue.prototype.$axios = axios;
Vue.prototype.$ajax = axios;
Vue.use(VueAwesomeSwiper);

Vue.config.productionTip = false;
//设置为 false 以阻止 vue 在启动时生成生产提示。

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');

    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
});

/* eslint-disable no-new */
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');


