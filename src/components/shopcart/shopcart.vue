<template>
    <div>
        <div class="shopcart">
            <div class="content" @click="toggleList">
                <div class="content-left">
                    <div class="logo-wrapper">
                        <div class="logo" :class="{'highLight':totalCount>0}">
                            <i class="icon-shopping_cart" :class="{'highLight':totalCount>0}"></i>
                        </div>
                        <div class="num" v-show="totalCount>0">{{totalCount}}</div>
                    </div>
                    <div class="price" :class="{'highLight':totalPrice>0}">{{totalPrice}}元</div>
                    <div class="desc">另需配送费￥{{deliveryPrice}}</div>
                </div>
                <div class="content-right" @click.stop.prevent="pay">
                    <div class="pay" :class="payClass">
                        {{payDesc}}
                    </div>
                </div>
            </div>
            <div class="ball-container">
                <transition-group name="drop"
                                  @before-enter="beforeEnter"
                                  @enter="enter"
                                  @after-enter="afterEnter"
                >
                    <div v-for="(ball,index) in balls" v-bind:key="'balls'+index" v-show="ball.show" class="ball">
                        <div class="inner inner-hook"></div>
                    </div>
                </transition-group>
            </div>
            <transition name="fold">
                <div class="shopcart-list" v-show="listShow">
                    <div class="list-header">
                        <h1 class="title">购物车</h1>
                        <span class="empty" @click="empty">清空</span>
                    </div>
                    <div class="list-content" ref="list-content">
                        <ul>
                            <li class="food" v-for="(food,index) in selectFoods" v-bind:key="index">
                                <span class="name">{{food.name}}</span>
                                <div class="price">
                                    <span>￥{{food.price*food.count}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cartcontrol :food="food"></cartcontrol>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>
        </div>
        <transition name="mask">
            <div class="list-mask" @click="hideList" v-show="listShow"></div>
        </transition>
    </div>

</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import Cartcontrol from "../cartcontrol/cartcontrol";

    export default {
        components: {Cartcontrol},
        props:{
            selectFoods:{type:Array,default(){
                return [
                    {price:10,count:1}
                ]
            }},
            deliveryPrice:{type:Number,default:0},
            minPrice:{type:Number,default:0},
        },
        data(){
            return {
                balls:[// 使用balls存放5个小球，这些小球的默认状态都是不显示的
                    {show:false},
                    {show: false},
                    {show: false},
                    {show: false},
                    {show: false}
                ],
                dropBalls: [],//已经在下降的小球存在这里
                fold:true,//购物车列表显示或隐藏状态，默认隐藏
            }
        },
        watch:{

        },
        computed:{
            totalPrice:function () {
                let total = 0;
                this.selectFoods.forEach((food) => {
                    total += food.price * food.count
                });
                return total;
            },
            totalCount:function () {
                let count = 0;
                this.selectFoods.forEach((food) => {
                    count += food.count
                });
                return count;
            },
            payDesc:function () {
                if (this.totalPrice === 0){
                    return `￥${this.minPrice}元起送`
                } else if (this.totalPrice < this.minPrice){
                    let diff = this.minPrice - this.totalPrice;
                    return `还差￥${diff}元起送`
                } else {
                    return '去结算';
                }
            },
            payClass:function () {
                if (this.totalPrice<this.minPrice){
                    return 'not-enough'
                } else {
                    return 'enough'
                }
            },
            listShow:{
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
                    console.log(222)
                    if (!this.totalCount){
                        this.fold = true;//隐藏
                        return false;
                    }
                    let show = !this.fold;
                    if (show){
                        this.$nextTick(() => {
                            if (!this.scroll){
                                this.scroll = new BScroll(this.$refs.listContent,{
                                    click:true
                                })
                            } else{
                                this.scroll.refresh();
                            }

                        })
                    }
                    return show
                }
            }
        },
        methods:{
            // 当触发drop方法时小球开始掉落
            drop(el){
                this.show = true;
                for (let i=0;i<this.balls.length;i++){
                    let ball = this.balls[i];
                    if (!ball.show){
                        ball.show = true;
                        ball.el = el;
                        this.dropBalls.push(ball);
                        return;
                    }
                }
            },
            beforeEnter(el){ //出现前
                let count = this.balls.length;
                while (count--){
                    let ball = this.balls[count];
                    if (ball.show){//设为true的小球 视口偏移getBoundingClientRect 小球left 32
                        let rect = ball.el.getBoundingClientRect();
                        let x = rect.left-32;
                        let y = -(window.innerHeight-rect.top-22);
                        el.style.display = '';
                        el.style.webkitTransform = `translate3d(0,${y}px,0)`;
                        el.style.transform = `translate3d(0,${y}px,0)`;
                        let inner = el.getElementsByClassName('inner-hook')[0];
                        inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                        inner.style.transform = `translate3d(${x}px,0,0)`;
                    }
                }

            },
            enter(el){ //出现中
                /* eslint-disable no-unused-vars */
                // 触发浏览器重绘
                let rf = el.offsetHeight;
                this.$nextTick(() => {// 让动画效果异步执行,提高性能
                    el.style.webkitTransform = 'translate3d(0,0,0)';// 设置小球掉落后最终的位置
                    el.style.transform = 'translate3d(0,0,0)';
                    let inner = el.getElementsByClassName('inner-hook')[0];
                    inner.style.webkitTransform = 'translate3d(0,0,0)';
                    inner.style.transform = 'translate3d(0,0,0)';
                });
            },
            afterEnter(el){ //出现后
                let ball = this.dropBalls.shift();// 完成一次动画就删除一个dropBalls的小球
                if (ball){
                    ball.show = false;
                    el.style.display = 'none';
                }
            },
            toggleList(){
                if (!this.totalCount){//没有选商品
                    return;
                }
                this.fold = !this.fold;
            },
            empty(){
                this.selectFoods.forEach((food) => {
                    food.count = 0;
                })
            },
            hideList(){
                this.fold = true;
            },
            pay(){
                if (this.totalPrice<this.minPrice){
                    return
                }
                window.alert(`支付${this.totalPrice}元`)
            }
        }
    }


</script>

<style scoped lang="stylus">
    @import "../../common/stylus/icon.styl"
    @import "../../common/stylus/base.styl"
    .shopcart
        position: fixed
        left:0
        bottom:0
        z-index:50
        width: 100%
        height:48px
        .content
            display :flex
            background :#141d27
            font-size:0
            color:rgba(255,255,255,0.4)
            .content-left
                flex :1
                .logo-wrapper
                    display :inline-block
                    position: relative
                    top: -10px
                    margin:0 12px
                    padding:6px
                    width:56px
                    height:56px
                    -webkit-box-sizing: border-box
                    -moz-box-sizing: border-box
                    box-sizing: border-box
                    vertical-align: top
                    border-radius:50%
                    background :#141d27
                    .logo
                        width: 100%
                        height: 100%
                        border-radius: 50%
                        background :#2b343c
                        text-align: center
                        &.highLight
                            background :rgb(0,160,220)
                        .icon-shopping_cart
                            width:24px
                            height:24px
                            font-size:24px
                            line-height:44px
                            color: #80858a
                            &.highLight
                                color :#fff
                    .num
                        position: absolute
                        top:0
                        right:0
                        width:24px
                        height:16px
                        line-height:16px
                        text-align: center
                        border-radius:16px
                        font-size:9px
                        font-weight:700
                        color:#fff
                        background :rgb(240,20,20)
                        -webkit-box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4)
                        -moz-box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4)
                        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4)
                .price
                    display: inline-block
                    vertical-align :top
                    line-height:24px
                    margin-top:12px
                    box-sizing :border-box
                    padding-right:12px
                    border-right:1px solid rgba(255,255,255,0.1)
                    font-size:16px
                    font-weight:700
                    &.highLight
                        color:#fff
                .desc
                    display: inline-block
                    vertical-align :top
                    line-height:24px
                    margin:12px 0 0 12px
                    font-size:10px
            .content-right
                flex:0 0 105px
                width:105px
                .pay
                    height:48px
                    line-height:48px
                    font-size: 12px
                    text-align: center
                    &.enough
                        background :#00b43c
                        color:#fff
                    &.not-enough
                        background: #2b333b
        .ball-container
            .ball
                position: fixed
                left:32px
                bottom:22px
                z-index: 200
                &.drop-enter-active
                    transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
                .inner
                    display :block
                    width:16px
                    height:16px
                    background :rgb(0,160,220)
                    border-radius :50%
                    transition: all 0.4s linear

        .shopcart-list
            position: absolute
            left:0
            top: 0
            z-index: -1
            width: 100%
            transform :translate3d(0, -100%, 0)
            &.fold-enter-active
                transition: all .5s
                transform: translate3d(0, -100%, 0)
            &.fold-leave-active
                transition: all .5s
            &.fold-enter,&.fold-leave-to
                transform: translate3d(0, 0, 0)
            &.fold-enter-to,&.fold-leave
                transform: translate3d(0, -100%, 0)
            .list-header
                height:40px
                line-height:40px
                background: #f3f5f7
                border-bottom: 1px solid rgba(7,17,27,0.1)
                padding:0 18px
                .title
                    float: left
                    font-size :14px
                    color:rgb(7,17,27)
                .empty
                    float: right
                    color:rgb(0,100,220)
                    font-size :12px
            .list-content
                padding:0 18px
                max-height:217px
                background :#fff
                overflow: hidden
                .food
                    position: relative
                    box-sizing :border-box
                    border-1px(rgba(7,17,27,0.1))
                    padding:12px 0
                    .name
                        line-height:24px
                        font-size :14px
                        color:rgb(7,17,27)
                    .price
                        position: absolute
                        bottom:12px
                        right: 90px
                        font-weight: 700
                        font-size:14px
                        clear: rgb(240,20,20)
                        line-height:24px
                    .cartcontrol-wrapper
                        position: absolute
                        right:0
                        bottom:6px
    .list-mask
        position: fixed
        top:0
        left:0
        height: 100%
        width: 100%
        z-index: 40
        backdrop-filter : blur(10px)
        background:rgba(7,17,27,0.6)
        &.mask-enter-active,&.mask-leave-active
            transition :all 0.5s
        &.mask-enter,&.mask-leave-to
            opacity: 0
            background: rgba(7, 17, 27, 0)

</style>
