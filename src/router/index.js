import { createRouter, createWebHistory } from 'vue-router';
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
		meta: { title: '～Violet的摸鱼日志～' },
		children: [
			{
				path: '/index',
				name: 'home',
				component: () => import('../views/Home.vue'),
			},
			{
				path: '/article/:articleId',
				name: 'BlogDetail',
				component: () => import('../views/BlogDetail.vue'),
				meta: { title: 'Article～(՞• •՞)' },
			},
			{
				path: '/timeLine',
				name: 'TimeLine',
				component: () => import('../views/TimeLine.vue'),
				meta: { title: 'Time Line～o(´^｀)o' },
			},
			{
				path: '/filing',
				name: 'Filing',
				component: () => import('../views/Filing.vue'),
				meta: { title: 'Category～/ᐠ｡ꞈ｡ᐟ\\' },
			},
			{
				path: '/about',
				name: 'About',
				component: () => import('../views/AboutPage.vue'),
				meta: { title: 'About～*⸜( •ᴗ• )⸝*' },
			},
			{
				path: '/search',
				name: 'Search',
				component: () => import('../views/Search.vue'),
				meta: { title: 'Search🔍～つ♡⊂' },
			},
			{
				path: '/result',
				name: 'Result',
				component: () => import('../views/SearchDetail.vue'),
				meta: { title: 'Search Result～ ̗̀(ᵔ⌔ᵔ)' },
			},
			{
				path: '/message',
				name: 'Message',
				component: () => import('../views/Message.vue'),
				meta: { title: 'Message～(՞• •՞)～' },
			},
			{
				path: '/friends',
				name: 'Friends',
				component: () => import('../views/Friends.vue'),
				meta: { title: 'Friends～ヾ(￣▽￣)' },
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});
router.afterEach((to, from, next) => {
	if(to.path == '/index' && from.path !== '/') {
		const p = new Promise((resolve,reject) => {
			resolve()
			reject()
		})
		p.then(() => {
			const el = document.getElementById('blogScroll')
    		window.scroll({ top: el.offsetTop})
		})
	} else {
		window.scrollTo({top: 0,left: 0,behavior: "smooth"});
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
