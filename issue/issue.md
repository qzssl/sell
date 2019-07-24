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
#### axios不能通过Vue.use(axios)的方式引入, 如果想在所有组件中直接使用axios, 可以这样设置
```
import axios from 'axios';
Vue.prototype.$http = axios;
```
#### 使用 icon 字体图标出现小方块问题
修改路径
```
@font-face
  font-family: 'sell-icon'
  src:  url('../../common/fonts/sell-icon.eot?ze40eg')
  src:  url('../../common/fonts/sell-icon.eot?ze40eg#iefix') format('embedded-opentype'),
          url('../../common/fonts/sell-icon.ttf?ze40eg') format('truetype'),
          url('../../common/fonts/sell-icon.woff?ze40eg') format('woff'),
          url('../../common/fonts/sell-icon.svg?ze40eg#sell-icon') format('svg')
```
