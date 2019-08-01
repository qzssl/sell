#### 安装
```
"better-scroll": "^1.15.2"
```
#### 引入
```
import BScroll from 'better-scroll';
```
#### 获取元素
```
//在元素上添加ref
<div class="menu-wrapper" ref="menuWrapper" >

</div>

//获取
methods:{
    _initScroll:function () {
        this.menuScroll = new BScroll(this.$refs.menuWrapper,{})
        this.foodScroll = new BScroll(this.$refs.foodsWrapper)
    }
}
```
//在获取数据中调用方法
```
created(){
    let self = this;
    api.get('/api/goods')
        .then((res) => {
            if (res.data.errno===ERR_OK){
                self.goods=res.data.data;
                this.$nextTick(() => {
                    this._initScroll();
                });
            }
        })
        .catch((err) => {
            window.console.log(err)
        })
}
```
