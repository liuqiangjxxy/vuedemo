import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/chuShiYeMian'
        },
        {
            path: '/chuShiYeMian',
            component: resolve => require(['../components/page/chuShiYeMian.vue'], resolve),
            meta: {title: '初始页面'}
        },
        {
            path: '/xuanZeBiaoDuan',
            component: resolve => require(['../components/page/xuanZeBiaoDuan.vue'], resolve),
            meta: {title: '选择标段'}
        },
        {
            path: '/login',//登录
            component: resolve => require(['../components/page/Login.vue'], resolve),
            meta: {title: '登录'}
        },
        {
            path: '/flowPath ',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: {title: '自述文件'},
            children: [
                // {
                //     path: '/dashboard',
                //     component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                //     meta: {title: '系统首页'}
                // },
                {
                    path: '/flowPath/queDingBiaoDuan',
                    component: resolve => require(['../components/page/queDingBiaoDuan.vue'], resolve),
                    meta: {title: '确定标段'}
                },
                {
                    path: '/flowPath/daoRuZhaoBiaoWenJian',
                    component: resolve => require(['../components/page/daoRuZhaoBiaoWenJian.vue'], resolve),
                    meta: {title: '导入招标文件'}
                },
                {
                    path: '/flowPath/daoRuTouBiaoWenJian',
                    component: resolve => require(['../components/page/daoRuTouBiaoWenJian.vue'], resolve),
                    meta: {title: '导入投标文件'}
                },
                {
                    path: '/flowPath/changBiao',
                    component: resolve => require(['../components/page/changBiao.vue'], resolve),
                    meta: {title: '唱标'}
                },
                {
                    path: '/flowPath/changBiao/detail',
                    component: resolve => require(['../components/page/changBiaoDetail.vue'], resolve),
                    meta: {title: '唱标-详情'}
                },
                {
                    path: '/flowPath/kaiBiaoJieShu',
                    component: resolve => require(['../components/page/kaiBiaoJieShu.vue'], resolve),
                    meta: {title: '开标结束'}
                },

            ]
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve),
            meta: {title: '404'}
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve),
            meta: {title: '403'}
        },
        {
            path: '/test',
            component: resolve => require(['../components/page/test.vue'], resolve),
            meta: {title: 'test'}
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
