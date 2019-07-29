<template>
    <div id="Header" class="header-box" :style="backgroundcolor?'background-color:'+backgroundcolor:''">
        <div class="icon icon-cell" id="icon-cell" @click="showTel">
            <div class="layer-tel" v-show="isShowTel" @click="isShowTel = false">
                <div class="box">
                    <div class="title">拨打电话咨询</div>
                    <div>010-84098177</div>
                    <div class="box-btn">
                        <div class="cancel">取消</div>
                        <div class="telplay"  @click="tel">拨打</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="title">{{titlename}}</div>
        <div class="icon icon-menu" id="icon-menu" @click="showMenu">
            <div id="layer-menu" v-show="isShow" @click="isShow = false" class="layer">
                <ul class="header-menu-box">
                    <li><div class="icon-bg icon-order"></div><div>订单查询</div></li>
                    <li><div class="icon-bg icon-fkjl"></div><div>付款记录</div></li>
                    <li><div class="icon-bg icon-cjr"></div><div>常用乘机人</div></li>
                    <li><div class="icon-bg icon-exit"></div><div>退出</div></li>
                </ul>
            </div>
        </div>        
    </div>
</template>

<script>
export default {
    props: ['name', 'bgcolor'],
    name: 'Header',
    data () {
        return {
            titlename: 'M秒奇艺',
            backgroundcolor: '',
            isShow: false,
            isShowTel: false
        }
    },
    methods: {
        tel: function () {
            window.location.href = 'tel:13810173310'
        },
        showTel: function (e) {
            if(e.target.id == 'icon-cell'){
                this.isShowTel = true
            }
        },
        closeTel: function () {
            console.log(111)
            this.isShowTel = false
            console.log(this.isShowTel)
        },
        showMenu: function(e){
            if(e.target.id == 'icon-menu'){
                this.isShow = true
            } 
        }
    },
    watch: {
        name: function (v) {
            this.titlename = v
        }
    },
    created () {
        this.titlename = this.name
        if (this.bgcolor) {
            this.backgroundcolor = this.bgcolor
        }        
    }
}
</script>

<style lang="scss">
    @import '@/assets/sass/set.scss';
    .header-box{
        position: fixed;
        left: 0;
        top: 0;
        z-index: 11;
        width: 100%;
        height: .9rem;
        line-height: .9rem;
        background-color: $pubcolor;
        color: #fff;
        font-size: .32rem;
        text-align: center;
        display: flex;
        justify-content: space-between;
        padding: 0 .1rem;
        box-sizing: border-box;
        .icon{
            width: .9rem;
            height: .9rem;
        }
        .icon-cell{
            background: url('../../assets/images/icon_header_phone.png') no-repeat center;
            background-size: auto .6rem;
            .layer-tel{
                position: fixed;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                z-index: 11111;
                background-color: rgba(0, 0, 0, 0.6);
                .box{
                    width: 5rem;
                    height: 2.86rem;
                    background-color: #fff;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    margin-left: -2.5rem;
                    margin-top: -1.5rem;
                    border-radius: .1rem;
                    color: #000;
                    font-size: .32rem;
                    line-height: .7rem;
                    box-sizing: border-box;
                    .title{
                        font-size: .28rem;
                        color: #999;
                        line-height: .9rem;
                    }
                    .box-btn{
                        margin-top: .4rem;
                        border-top: .02rem solid #ccc;
                        display: flex;
                        color: $pubcolor;
                        line-height: .9rem;
                        box-sizing: border-box;
                        div{
                            width: 50%;
                        }
                        .cancel{
                            box-sizing: border-box;
                            border-right: .02rem solid #ccc;
                        }
                    }
                }
            }
        }
        .icon-menu{
            background: url('../../assets/images/icon_header_menu.png') no-repeat center;
            background-size: .64rem auto;
            .header-menu-box{
                background-color: #fff;
                color: #000;
                position: absolute;
                right: .2rem;
                top: .9rem;
                width: 2.5rem;
                height: 3.5rem;
                font-size: .32rem;
                padding: .2rem .25rem;
                li{
                    text-align: left;
                    display: flex;
                    padding: .15rem 0;
                    box-sizing: border-box;
                    height: .9rem;
                    line-height: .6rem;
                    border-top: .02rem solid #ccc;
                    .icon-order{
                        background: url('../../assets/images/icon_menu_order.png') no-repeat center;
                        background-size: .4rem;
                    }
                    .icon-fkjl{
                        background: url('../../assets/images/icon_menu_fkjl.png') no-repeat center;
                        background-size: .32rem;
                    }
                    .icon-cjr{
                        background: url('../../assets/images/icon_menu_cjr.png') no-repeat center;
                        background-size: .32rem;
                    }
                    .icon-exit{
                        background: url('../../assets/images/icon_menu_exit.png') no-repeat center;
                        background-size: .32rem;
                    }
                    .icon-bg{
                        width: .6rem;
                        height: .6rem;
                        border-radius: .1rem;
                        background-color: $pubcolor;
                        margin-right: .2rem;
                    }
                } 
                :first-child{
                    border: 0;
                }              
            }
        }
    }
</style>
