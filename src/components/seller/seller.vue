<template>
    <div class="seller" ref="seller">
        <div class="seller-wrapper">
            <div class="overview">
                <h1 class="title">{{seller.name}}</h1>
                <div class="desc border-1px">
                    <star :size="36" :score="seller.score"></star>
                    <span class="text">({{seller.ratingCount}})</span>
                    <span class="text">月售{{seller.sellCount}}单</span>
                </div>
                <ul class="remark">
                    <li class="block">
                        <h2>起送价</h2>
                        <div class="content">
                            <span class="stress">{{seller.minPrice}}</span>
                        </div>
                    </li>
                    <li class="block">
                        <h2>商家配送</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryPrice}}</span>
                        </div>
                    </li>
                    <li class="block">
                        <h2>平均配送时间</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryTime}}</span>
                        </div>
                    </li>
                </ul>
                <div class="favorite" @click="toggleFavorite">
                    <span class="icon-favorite" :class="{'active':favorite}"></span>
                    <span class="text">{{favoriteText}}</span>
                </div>
            </div>
            <split></split>
            <div class="bulletin">
                <h1 class="title">公告与活动</h1>
                <div class="content-wrapper border-1px">
                    <p class="content">{{seller.bulletin}}</p>
                </div>
                <ul v-if="seller.supports" class="supports">
                    <li class="support-item border-1px" v-for="(item,index) in seller.supports" :key="index">
                        <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                        <span class="text">{{seller.supports[index].description}}</span>
                    </li>
                </ul>
            </div>
            <split></split>
            <div class="pics">
                <h1 class="title">商家实景</h1>
                <div class="pic-wrapper" ref="picWrapper">
                    <ul class="pic-list" ref="picList">
                        <li class="pic-item" v-for="(pic,index) in seller.pics" :key="index">
                            <img :src="pic" width="120" height="90"/>
                        </li>
                    </ul>
                </div>
            </div>
            <split></split>
            <div class="info">
                <h1 class="title border-1px">商家信息</h1>
                <ul>
                    <li class="info-item" v-for="(info,index) in seller.infos" :key="index">{{info}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import star from '../star/star.vue';
    import split from '../split/split.vue';
    import BScroll from 'better-scroll';
    import {saveToLocal, loadFromLocal} from '../../common/js/store';
    export default {
        props:{
            seller:{type:Object}
        },
        components:{
            star,split
        },
        data(){
            return {
                favorite: (()=>{
                    return loadFromLocal(this.seller.id,'favorite', false);
                })()
            }
        },
        computed: {
            favoriteText() {
                return this.favorite ? '已收藏' : '收藏';
            }
        },
        watch:{
          seller:function () {
              this.initBScroll();
              this.initPics();
          }
        },
        created() {
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        },
        mounted(){
            this.initBScroll();//整个页面上下滚动
            this.initPics();//商家实景水平滚动
        },
        methods:{
            initBScroll:function () {
                if (!this.scroll){
                    this.scroll = new BScroll(this.$refs.seller,{
                        click:true
                    })
                } else {
                    this.scroll.refresh();
                }
            },
            initPics:function () {
                if (this.seller.pics){
                    let picwidth = 120;
                    let margin = 6;
                    let width = (picwidth+margin)*this.seller.pics.length-margin;
                    this.$refs.picList.style.width = width+'px';
                    this.$nextTick(()=>{
                        if (!this.picScroll) {
                            this.picScroll = new BScroll(this.$refs.picWrapper, {
                                scrollX: true,
                                eventPassthrough: 'vertical'
                            });
                        } else {
                            this.picScroll.refresh();
                        }
                    })
                }
            },
            toggleFavorite(event) {
                if (!event._constructed) {
                    return;
                }
                this.favorite = !this.favorite;
                saveToLocal(this.seller.id, 'favorite', this.favorite);
            },
        }
    }
</script>

<style scoped lang="stylus">
    @import "../../common/stylus/base.styl"
    @import "../../common/stylus/icon.styl"
    .seller
        position: absolute
        top:174px
        left: 0
        bottom: 0
        width: 100%
        overflow: hidden
        .overview
            padding:18px
            .title
                line-height: 14px
                font-size:14px
                color:#07111b
                margin-bottom:6px
            .desc
                padding-bottom:18px
                font-size:0
                border-1px(rgba(7,17,27,0.1))
                .star
                    display: inline-block
                    margin-right:8px
                    vertical-align: top
                .text
                    display: inline-block
                    margin-right:12px
                    color:#4d555d
                    line-height: 18px
                    vertical-align: top
                    font-size :10px
            .remark
                display: flex
                padding-top:18px
                .block
                    flex: 1
                    text-align: center
                    border-right: 1px solid rgba(7, 17, 27, 0.1)
                    &:last-child
                        border: none
                    h2
                        margin-bottom: 4px
                        line-height: 10px
                        font-size: 10px
                        color: rgb(147, 153, 159)
                    .content
                        line-height: 24px
                        font-size: 10px
                        color: rgb(7, 17, 27)
                        .stress
                            font-size: 24px

            .favorite
                position: absolute
                width: 50px
                right: 11px
                top: 18px
                text-align: center
                .icon-favorite
                    display: block
                    margin-bottom:4px
                    line-height:24px
                    font-size:24px
                    color: #d4d6d9
                    &.active
                        color:rgb(240,20,20)
                .text
                    line-height: 10px
                    font-size: 10px
                    color: rgb(77, 85, 93)
        .bulletin
            padding: 18px 18px 0 18px
            .title
                margin-bottom: 8px
                line-height: 14px
                color: rgb(7, 17, 27)
                font-size: 14px
            .content-wrapper
                padding: 0 12px 16px 12px
                border-1px(rgba(7, 17, 27, 0.1))
                .content
                    line-height: 24px
                    font-size: 12px
                    color: rgb(240, 20, 20)
            .supports
                .support-item
                    padding: 16px 12px
                    border-1px(rgba(7, 17, 27, 0.1))
                    font-size: 0
                    &:last-child
                        border-none()
                .icon
                    display: inline-block
                    width: 16px
                    height: 16px
                    vertical-align: top
                    margin-right: 6px
                    background-size: 16px 16px
                    background-repeat: no-repeat
                    &.decrease
                        bg-image('../../common/images/decrease_4')
                    &.discount
                        bg-image('../../common/images/discount_4')
                    &.guarantee
                        bg-image('../../common/images/guarantee_4')
                    &.invoice
                        bg-image('../../common/images/invoice_4')
                    &.special
                        bg-image('../../common/images/special_4')
                .text
                    line-height: 16px
                    font-size: 12px
                    color: rgb(7, 17, 27)
        .pics
            padding: 18px
            .title
                margin-bottom: 12px
                line-height: 14px
                color: rgb(7, 17, 27)
                font-size: 14px
            .pic-wrapper
                width: 100%
                overflow: hidden
                white-space: nowrap
                .pic-list
                    font-size: 0
                    .pic-item
                        display: inline-block
                        margin-right: 6px
                        width: 120px
                        height: 90px
                        &:last-child
                            margin: 0
        .info
            padding: 18px 18px 0 18px
            color: rgb(7, 17, 27)
            .title
                padding-bottom: 12px
                line-height: 14px
                border-1px(rgba(7, 17, 27, 0.1))
                font-size: 14px
            .info-item
                padding: 16px 12px
                line-height: 16px
                border-1px(rgba(7, 17, 27, 0.1))
                font-size: 12px
                &:last-child
                    border-none()
</style>
