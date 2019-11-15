<template>
    <div class="person-list-box">
        <Header class="flight-header" :name="pageTitle"></Header>
        <div class="btn-save" @click="save">完成</div>
        <div class="personlist-body">
            <ul class="p-list">
                <li class="p-item" v-for="(item, i) in personList" :key="i" @click="item.checked = !item.checked">
                    <div class="rd-box"><span :class='"rd" + (item.checked?" cur":"")'></span></div>
                    <div class="item-info">
                        <div>
                            <span class="name">{{item.name}}</span>
                            <span>证件号码：{{item.idcard}}</span>
                        </div>
                        <div class="item-phones">
                            <span>乘机人手机：{{item.phone}}</span>
                            <span>紧急人手机：{{item.jjphone}}</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Header from './public/HeaderBack.vue'
export default {
    data () {
        return {
            pageTitle: '选择乘机人',
            personList: []
        }
    },
    components: {
        Header
    },
    methods: {
        save () {
            this.utils.setItem('plist', JSON.stringify(this.personList))
            this.$router.go(-1)
        }
    },
    created () {
        let _plist = this.utils.getItem('plist')
        this.personList = JSON.parse(_plist)
        console.log(this.personList)
    }
}
</script>

<style lang="scss">
.person-list-box{
    min-height: 100%;
    height: 100%;
    background-color: #EFEFEF;
    .btn-save{
        position: fixed;
        top: .24rem;
        right: .4rem;
        color: #fff;
        font-size: .28rem;
        z-index: 12;
    }
    .personlist-body{
        height: 100%;
        overflow: hidden auto;
        padding-top: .9rem;
        box-sizing: border-box;
        .p-list{
            background-color: #fff;
            padding: 0 .3rem;
            .p-item{
                border-top: .02rem dotted #ccc;
                padding: .2rem 0;
                box-sizing: border-box;
                color: #979696;
                display: flex;
                .rd-box{
                    display: flex;
                    align-items: center;
                    padding-right: .2rem;
                    .rd{
                        display: block;
                        width: .3rem;
                        height: .3rem;
                        border: .02rem solid #29ad7f;
                        border-radius: 40px;
                        position: relative;
                    }
                    .cur::after{
                        border: .04rem solid transparent;
                        border-left: 0;
                        border-top: 0;
                        content: " ";
                        top: .02rem;
                        left: .08rem;
                        position: absolute;
                        width: .08rem;
                        height: .16rem;
                        transform: rotate(45deg) scale(1);
                        border-color: #29ad7f;
                    }
                }
                .item-info{
                    width: 100%;
                    .name{
                        font-size: .32rem;
                        color: #000;
                        margin-right: .4rem;
                    }
                    div{
                        line-height: .5rem
                    }
                    .item-phones{
                        display: flex;
                        justify-content: space-between;
                    }
                }
            }
            .p-item:first-child{
                border: 0;
            }
        }
    }
}
</style>