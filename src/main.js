import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
// import Axios from 'axios';
//注册插件
Vue.use(VueRouter);
// Vue.prototype.$http = Axios;
import './common/stylus/base.styl'

//1.引入路由组件
import goods from './components/goods/goods.vue';
import ratings from './components/ratings/ratings.vue';
import seller from './components/seller/seller.vue';

//2.定义路由,每个路由应该映射一个组件。 其中"component" 可以是通过 Vue.extend() 创建的组件构造器，
//或者，只是一个组件配置对象。
const routes = [
    {path:'/goods',component:goods},
    {path:'/ratings',component:ratings},
    {path:'/seller',component:seller},
];
// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
   routes,
    linkActiveClass:'router-link-active'
});
// 想要导航到路由
// router.push({path:'/goods'});

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
new Vue({
  render: h => h(App),
    router
}).$mount('#app');
