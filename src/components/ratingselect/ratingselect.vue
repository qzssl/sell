<template>
    <div class="ratingselect">
        <div class="rating-type border-1px">
            <span @click="select(2)" class="block positive" :class="{'active':selectedType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
            <span @click="select(0)" class="block positive" :class="{'active':selectedType===0}">{{desc.positive}}<span class="count">{{positive.length}}</span></span>
            <span @click="select(1)" class="block negative" :class="{'active':selectedType===1}">{{desc.negative}}<span class="count">{{negative.length}}</span></span>
        </div>
        <div @click="toggleContent" class="switch" :class="{'on':onlyContents}">
            <span class="icon-check_circle"></span>
            <span class="text">只看有内容的评价</span>
        </div>
        <div class=""></div>
    </div>
</template>

<script>
    const POSITIVE = 0;//推荐
    const NEGATIVE = 1;//吐槽
    const ALL = 2;//全部
    export default {
        props:{
            ratings:{
                type:Array,
                default(){
                    return [];
                }
            },
            selectType:{
                type: Number,
                default:ALL
            },
            onlyContent:{
                type:Boolean,
                default:false
            },
            desc:{
                type:Object,
                default(){
                    return {
                        all:'全部',
                        positive:'满意',
                        negative:'不满意'
                    }
                }
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
        computed:{
            positive(){
                return this.ratings.filter((rating)=>{
                    // window.console.log(rating.rateType === POSITIVE);
                    return rating.rateType === POSITIVE;
                })
            },
            negative(){
                return this.ratings.filter((rating)=>{
                    return rating.rateType === NEGATIVE;
                })
            }
        },
        methods:{
            select(type){
                this.selectedType = type;
                this.$emit('select',type);
            },
            toggleContent(){
                this.onlyContents = !this.onlyContents;
                this.$emit('toggle',this.onlyContents);
            }
        }
    }
</script>

<style scoped lang="stylus">
    @import "../../common/stylus/icon.styl"
    @import "../../common/stylus/base.styl"
    .ratingselect
        .rating-type
            padding:18px 0
            margin0 18px
            border-1px(rgba(7,17,270,.1))
            font-size:0
            .block
                display: inline-block
                padding:8px 12px
                margin-right:8px
                border-radius:1px
                color:rgb(77,85,93)
                font-size:12px
                line-height:16px
                &.active
                    color: #fff
                &.count
                    font-size :8px
                    margin-left:8px
                &.positive
                    background: rgba(0,160,220,0.2)
                    &.active
                        background: rgb(0, 160, 220)
                &.negative
                    background: rgba(77,85,93,0.2)
                    &.active
                        background: rgb(77, 85, 93)



        .switch
            padding:12px 18px
            line-height:24px
            border-bottom:1px solid rgba(7,17,27,0.1)
            color:rgb(147,153,159)
            &.on
                .icon-check_circle
                    color: #00c850
            .icon-check_circle
                font-size:24px
                margin-right:4px
                display: inline-block
                vertical-align :top
            .text
                font-size:12px
                display: inline-block
                vertical-align :top

</style>
