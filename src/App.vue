<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
      <div class="tab-item">
        <router-link to='/goods'>商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <!--<div class="content">
      content
    </div>-->
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <keep-alive>
      <router-view v-bind:seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from './components/header/header.vue';
  import api from './api/api';
  import {urlParam} from "./common/js/util";

  const ERR_OK = 0;
  //简写  header:header
  export default {
      data() {
          return {
              seller:{
                  id:(() => {
                      let queryParam = urlParam();
                      return queryParam.id;
                  })()
              }
          }
      },
      created() {
          var self =this;
          api.get('/api/seller')
              .then((res) => {
                  if (res.data.errno===ERR_OK){
                      self.seller=Object.assign({},self.seller,res.data.data) ;
                  }
              })
              .catch((err) => {
                  window.console.log(err)
              })
      },
      components:{
          'v-header':header
      }
  }
</script>

<style scoped lang="stylus">
  @import "./common/stylus/base.styl"
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border-1px(rgba(7,17,27,0.1))
    .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        font-size: 14px
        color:rgb(77,85,93)
        &.router-link-active
          color: rgb(240,20,20)
</style>
