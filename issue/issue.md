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
#### 动画 transition要放在需要的v-show元素外面
>出现的过程: name-enter(初始态) => name-enter-active(中间态) => name-enter-to(终止态)
>消失的过程: name-leave => name-leave-active => name-leave-to

>错误：
```
<div class="cart-decrease" @click="decreaseCart" v-show="food.count>0">
    <transition name="move">
        <span class="inner icon-remove_circle_outline">

        </span>
    </transition>
</div>
```
>正确：
```
<transition name="move">
    <div class="cart-decrease" @click="decreaseCart" v-show="food.count>0">
        <span class="inner icon-remove_circle_outline">

        </span>
    </div>
 </transition>
```
#### 如果有v-for须使用 transition-group
```
<transition-group name="drop">
    <div v-for="(ball,key) in balls" v-show="ball.show" :key="key">
        <div class="inner inner-hook"></div>
    </div>
</transition-group>
```
#### 报错Do not use v-for index as key on <transition-group> children, this is the same as not using keys.
在<transition-group>的子元素上，不能使用v-for的index作为key
修改：
```
<div v-for="(ball,key) in balls">
    <transition-group name="drop"
                      @before-enter="beforeEnter"
                      @enter="enter"
                      @after-enter="afterEnter"
    >
        <div v-show="ball.show" :key="'balls'+index" class="ball">
            <div class="inner inner-hook"></div>
        </div>
    </transition-group>
</div>
```
####  Unexpected side effect in "listShow" computed property
```出错
listShow:function () {
  if (!this.totalCount){ //购物车没有商品
    this.fold = true;//隐藏
     return false;
  }
    let show = !this.fold;
}
```
修改：使用get,set
```
// 页面初始化时会先执行一次 get
// 监视 data 中 fold 和 totalCount 的属性值，只有发生改变时，它们才会重新求值，否则取缓存中的
get(){
    if (!this.totalCount){ //购物车没有商品
        return false;
    }
    return !this.fold;
},
// 监视当前属性值的变化，当属性值发生变化时执行，更新相关的属性数据，类似于 watch 的功能
set(){
    if (!this.totalCount){
        this.fold = true;//隐藏
        return false;
    }
    let show = !this.fold;
    return show
}

```
#### 阻止冒泡 @click.stop.prevent="pay"
```
<div class="content-right" @click.stop.prevent="pay">
    <div class="pay" :class="payClass">
        {{payDesc}}
    </div>
</div>
```
#### 报错：组件内不能修改props的值，同时修改的值也不会同步到组件外层，即调用组件方不知道组件内部当前的状态是什么
```
Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's value. Prop being mutated: "selectType"
```
修改：在data返回
```
props:{
    selectType:{
        type: Number,
        default:ALL
    }
},
data(){
    return {
        selectedType:this.selectType
    }
},
```
#### 从父组件传过来的值更新了，如果在data中引用，此时data没有响应更新值，需要用watch监听
```
props:{
    selectType:{
        type: Number,
        default:ALL
    },
    onlyContent:{
        type:Boolean,
        default:false
    }
},
data(){
    return {
        selectedType:this.selectType,
        onlyContents:this.onlyContent
    }
},
watch:{
    selectType(type){
        this.selectedType = type;
    },
    onlyContent(bol){
        this.onlyContents = bol;
    }
},
```
#### 页面缓存
```
    <keep-alive>
      <router-view v-bind:seller="seller"></router-view>
    </keep-alive>
```
