import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import TimeLine from '../views/TimeLine.vue';
import Filing from '../views/Filing.vue'
import AboutPage from '../views/AboutPage.vue'
import Search from '../views/Search.vue'
import SearchDetail from '../views/SearchDetail.vue'
import Friends from '../views/Friends.vue'
const routes = [
    {
        path: '/:catchAll(.*)',
        redirect: '/',
    },
    {
        path: '/',
        name: 'index', //index包含header footer等需要在每个页面都会显示的东西
        component: () => import('../views/Index.vue'),
        redirect: '/index',
        children: [
            {
                path: '/index',
                name: 'home',
                component: Home,
                meta: { title: '薇尔薇 | Index' },
            },
            {
                path: '/article/:articleId',
                name: 'BlogDetail',
                component: () => import('../views/BlogDetail.vue'),
                meta: { title: '薇尔薇 | Article～(՞• •՞)' },
            },
            {
                path: '/timeLine',
                name: 'TimeLine',
                component: TimeLine,
                meta: { title: '薇尔薇 | Time Line～o(´^｀)o' },
            },
            {
                path: '/filing',
                name: 'Filing',
                component: Filing,
                meta: { title: '薇尔薇 | Category～/ᐠ｡ꞈ｡ᐟ\\' },
            },
            {
                path: '/about',
                name: 'About',
                component: AboutPage,
                meta: { title: '薇尔薇 | About～*⸜( •ᴗ• )⸝*' },
            },
            {
                path: '/search',
                name: 'Search',
                component: Search,
                meta: { title: '薇尔薇 | Search🔍～つ♡⊂' },
            },
            {
                path: '/result',
                name: 'Result',
                component: SearchDetail,
                meta: { title: '薇尔薇 | Search Result～ ̗̀(ᵔ⌔ᵔ)' },
            },
            {
                path: '/message',
                name: 'Message',
                component: () => import('../views/Message.vue'),
                meta: { title: '薇尔薇 | Message～(՞• •՞)～' },
            },
            {
                path: '/friends',
                name: 'Friends',
                component: Friends,
                meta: { title: '薇尔薇 | Friends～ヾ(￣▽￣)' },
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
router.afterEach((to, from, next) => {
    if (to.path == '/index' && from.path !== '/') {
        const p = new Promise((resolve, reject) => {
            resolve();
            reject();
        });
        p.then(() => {
            const width = document.documentElement.clientWidth;
            let offset = 0;
            if (width < 1000) {
                offset = 60;
            }
            const el = document.getElementById('blogScroll');
            window.scroll({ top: el.offsetTop + offset});
        });
    } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
});

router.beforeEach((to, from, next) => {
    //beforeEach是router的钩子函数，在进入路由前执行
    if (to.meta.title) {
        //判断是否有标题
        document.title = to.meta.title;
    }
    next();
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    if (document.visibilityState === 'visible') {
        document.title = to.meta.title;
    }
    next();
});
export default router;
