#### vue依赖的插件会帮忙CSS做出兼容
#### 路由
```
import VueRouter from 'vue-router';
//注册插件
Vue.use(VueRouter);
import goods from './components/goods/goods.vue';
const routes = [
    {path:'/goods',component:goods}
];
const router = new VueRouter({ routes});
new Vue({
    router
}).$mount('#app');
```
#### 设置默认路由 main.js
```
//想要导航到的路由
router.push({path:'/goods'});
```

#### 阻止冒泡 @click.stop.prevent="pay"
```
<div class="content-right" @click.stop.prevent="pay">
    <div class="pay" :class="payClass">
        {{payDesc}}
    </div>
</div>
```
#### 页面缓存
```
    <keep-alive>
      <router-view v-bind:seller="seller"></router-view>
    </keep-alive>
```
####制作图标字体
* https://icomoon.io/
* -->选择 icomoon app-->import icons(选择所需的svg文件)

