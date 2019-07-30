<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper" >
            <ul>
                <li v-for="(item,index) in goods" :key="index" @click="selectMenu(index,$event)" class="menu-item" :class="{'current':currentIndex==index}">
                    <span class="text border-1px">
                        <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li v-for="(item,index) in goods" :key="index" class="foods-list foods-list-hook">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li v-for="(food,key) in item.foods" @click="selectFood(food)" class="food-item border-1px" :key="key">
                            <div class="icon">
                                <img :src="food.icon" width="57" height="57">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span>
                                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cart-control :food="food" v-on:cartAdd="cartAdd"></cart-control>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shop-cart ref="shopcart" :select-foods="selectFoods" v-bind:delivery-price="seller.deliveryPrice" v-bind:min-price="seller.minPrice"></shop-cart>
        <food v-bind:food="selectedFood" ref="foodChild" v-on:cartAdd="cartAdd" v-on:addFirst="cartAdd"></food>
    </div>

</template>

<script>
    import BScroll from 'better-scroll';
    import api from '../../api/api';
    import shopCart from '../shopcart/shopcart.vue';
    import cartControl from '../cartcontrol/cartcontrol.vue';
    import food from "../food/food";
    const ERR_OK = 0;
    export default {
        props:{
            seller:{
                type:Object
            }
        },
        data(){
            return{
                goods:[],
                classMap:['decrease','discount','guarantee','invoice','special'],
                listHeight:[],
                scrollY:0,
                selectedFood:{}
            }
        },
        components:{
            food,
            shopCart,
            cartControl
        },
        computed:{
            currentIndex(){
                for (let i=0;i<this.listHeight.length;i++){
                    let height1 = this.listHeight[i];
                    let height2 = this.listHeight[i+1];
                    if (!height2) return;
                    if (this.scrollY >= height1 && this.scrollY < height2){
                        return i;
                    }

                }
                return 0;
            },
            selectFoods(){
                let foods = [];
                this.goods.forEach((good) => {
                    good.foods.forEach((food) => {
                        if (food.count){
                            foods.push(food)
                        }
                    } )
                });
                return foods;
            }
        },
        created(){
            let self = this;
            api.get('/api/goods')
                .then((res) => {
                    if (res.data.errno===ERR_OK){
                        self.goods=res.data.data;
                        this.$nextTick(() => {
                            this._initScroll();
                            //计算右侧每个类型高度
                            this._calculateHeight()
                        });
                    }
                })
                .catch((err) => {
                    window.console.log(err)
                })
        },
        methods:{
            selectMenu:function(index){
                // if (event._constructed)return;
                let foodsList = this.$refs.foodsWrapper.getElementsByClassName('foods-list-hook');
                let el = foodsList[index];
                this.foodsScroll.scrollToElement(el,300);
            },
            _initScroll:function () {
                this.menuScroll = new BScroll(this.$refs.menuWrapper,{
                    click:true
                });
                this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
                    click:true,
                    probeType:3
                });
                this.foodsScroll.on('scroll',(pos) => {
                    this.scrollY =Math.abs(Math.round(pos.y));
                });
            },
            _calculateHeight:function () {
                let foodsList = this.$refs.foodsWrapper.getElementsByClassName('foods-list-hook');
                let height = 0;
                this.listHeight.push(height);
                for (let i=0;i<foodsList.length;i++){
                    let item = foodsList[i];
                    height += item.clientHeight;
                    this.listHeight.push(height)
                }
            },
            _drop(target){
                this.$refs.shopcart.drop(target)
            },
            cartAdd(target){
                this._drop(target)
            },
            selectFood(food){
                this.selectedFood = food;
                // window.console.log( this.$refs.foodChild)
                this.$refs.foodChild.show();
            }
        }
    };
</script>

<style scoped lang="stylus">
    @import "../../common/stylus/base.styl"
    .goods
        position: absolute
        display :flex
        bottom: 46px
        width: 100%
        overflow: hidden
        top:174px
        .menu-wrapper
            flex:0 0 80px
            width:80px
            background :#f3f5f7
            .menu-item
                display:table
                height:54px
                width:56px
                line-height:14px
                padding:0 12px
                &.current
                    position: relative
                    margin-top: -1px
                    z-index: 10
                    background: #fff
                    font-weight:700
                    .text
                        border-bottom :none
                .icon
                    vertical-align :top
                    width: 12px
                    height: 12px
                    margin-right: 2px
                    background-size : 12px 12px
                    background-repeat :no-repeat
                    display: inline-block
                    &.decrease
                        bg-image('../../common/images/decrease_3')
                    &.discount
                        bg-image('../../common/images/discount_3')
                    &.guarantee
                        bg-image('../../common/images/guarantee_3')
                    &.invoice
                        bg-image('../../common/images/invoice_3')
                    &.special
                        bg-image('../../common/images/special_3')
                .text
                    font-size:12px
                    width:56px
                    vertical-align:middle
                    border-1px(rgba(7,17,27,0.1))
                    display:table-cell
        .foods-wrapper
            flex:1
            .title
                padding-left:14px
                height: 26px
                border-left:2px solid #d9dde1
                font-size:12px
                color:rgb(147,153,159)
                background:#f3f5f7
                line-height:26px
            .food-item
                display :flex
                margin:18px
                padding-bottom: 18px
                border-1px(rgba(7,17,27,0.1))
                &:last-child
                    border-none()
                    margin-bottom:0
                .icon
                    flex:0 0 57px
                    margin-right:10px
                .content
                    flex:1
                    .name
                        margin:2px 0 8px
                        height:14px
                        line-height:14px
                        color:rgb(7,17,27)
                        font-size:14px
                    .desc,extra
                        color:rgb(147,153,159)
                        font-size:10px
                        line-height:10px
                    .desc
                        margin-bottom: 8px
                        line-height:12px
                    .extra
                        .count
                            margin-right:12px
                    .price
                        line-height: 24px
                        font-weight:700
                        .now
                            font-size:14px
                            color:rgb(240,20,20)
                            margin-right:8px
                        .old
                            text-decoration :line-through
                            font-size: 10px
                            color: rgb(147, 153, 159)
                    .cartcontrol-wrapper
                        position: absolute
                        right:0
                        bottom:12px

</style>
