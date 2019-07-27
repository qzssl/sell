<template>
    <div class="cartcontrol">
        <transition name="move">
            <div class="cart-decrease" @click="decreaseCart" v-show="food.count>0">
                <span class="inner icon-remove_circle_outline"></span>
            </div>
         </transition>

        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click="addCart($event)"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue';
    export default {
        props:{
            food:{type:Object}
        },
        methods:{
            addCart(event){
                if (!this.food.count) {
                    Vue.set(this.food,'count',1);
                }else {
                    this.food.count++;
                }
                this.$emit('cartAdd',event.target);
            },
            decreaseCart(){
                if (this.food.count){
                    this.food.count--;
                }
            }
        }
    }
</script>
<!--
出现的过程: name-enter(初始态) => name-enter-active(中间态) => name-enter-to(终止态)
消失的过程: name-leave => name-leave-active => name-leave-to
-->
<style scoped lang="stylus">
    @import "../../common/stylus/icon.styl"
    .cartcontrol
        font-size:0
        .cart-decrease
            display: inline-block
            padding:6px
            &.move-enter-active,&.move-leave-active
                transition:all 0.4s linear
            &.move-enter,&.move-leave-to//进入过渡的开始状态,离开过渡的结束状态
                opacity :0
                transform: translate3D(24px, 0, 0)
                .inner
                    transition:all 0.4s linear
                    transform :rotate(180deg)
            &.move-enter-to,&.move-leave
                opacity :1
                transform: translate3D(0, 0, 0)
                .inner
                    transition:all 0.4s linear
                    transform :rotate(0)
            .inner
                display :block
                line-height:24px
                font-size:24px
                color: rgb(0, 160, 220)
        .cart-count
            display: inline-block
            line-height: 24px
            width: 12px
            vertical-align: top
            padding-top:6px
            font-size :10px
            text-align: center
            color: rgb(147, 153, 159)
        .cart-add
            display: inline-block
            padding:6px
            line-height:24px
            font-size:24px
            color: rgb(0, 160, 220)


</style>
