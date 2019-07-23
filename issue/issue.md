#### Do not use built-in or reserved HTML elements as component id: header
>组件，不能和html标签重复
>header组件，h5新标签重复
App.vue
```
   <v-header></v-header>

  import header from './components/header/header.vue';
  //简写  header:header
  export default {
      components:{
          'v-header':header
      }
  }
```
header.vue
```
 export default {
     name: "v-header"
 }
```

#### vue3.x引入组件inport时组件必须带.vue后缀 否则就报错
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
#### 1px
