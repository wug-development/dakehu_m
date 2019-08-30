<template>
    <div id="TopContact" class="contact-box">
        <div class="header">
            <div class="icon icon-back" id="icon-back" @click="backPage"></div>
            <div class="search-box">
                <input type="search" v-model="searchKey" placeholder="请输入姓名公司进行搜索" @change="searchList()">
                <div class="btn_search"></div>
            </div>
        </div>
        <div class="contact-body">
            <div class="title">常用乘机人</div>
            <ul class="list">
                <li class="item" v-for="(item, i) in personList">
                    <div class="item-title">
                        <span>姓名</span>
                        <span class="name">{{item.dcPerName}}</span>
                        <span class="company">{{item.uname}}</span>
                    </div>
                    <div class="item-body">
                        <div><span>乘机人手机</span>{{item.dcPhone}}</div>
                        <div><span>紧急人手机</span>{{item.dcUrgentPhone}}</div>
                        <div><span>护照号</span>{{item.dcPassportNo}}</div>
                        <div><span>护照到期日</span>{{item.dcPassportDate}}</div>
                        <div><span>证件号码</span>{{item.dcIDNumber}}</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TopContact',
    data () {
        return {
            personList: [],
            pList: [],
            searchKey: ''
        }
    },
    methods: {
        backPage: function(){
            this.$router.go(-1)
        },
        searchList () {
            this.personList = []
            if (this.searchKey) {
                for (let i in this.pList) {
                    if (this.pList[i]['dcPerName'].indexOf() > -1 || this.pList[i]['uname'].indexOf() > -1) {
                        this.personList.push(this.pList[i])
                    }
                }
            } else {
                this.personList = this.pList
            }
        }
    },
    created () {
        let acount = JSON.parse(sessionStorage.getItem('account'))
        this.utils.http({
            name: this,
            uri: '/people/getpersonlist',
            params: {
                params: { cid: acount.id}
            },
            success: res=>{
                console.log(res)
                if(res.status === 200 && res.data.status === 1){
                    this.personList = res.data.data
                    this.pList = res.data.data
                }
            }
        })
    }
}
</script>

<style lang="scss">
@import '@/assets/sass/set.scss';
.contact-box{
    height: 100%;
    background-color: #f4f4f4;
    .header{
        height: .9rem;
        background-color: #fff;
        padding: .1rem;
        box-sizing: border-box;
        .icon{
            position: absolute;
            left: 0;
            top: 0;
            width: .9rem;
            height: .9rem;
        }
        .icon-back{
            background: url('../assets/images/left.png') no-repeat center;
            background-size: auto .4rem;
        }
        .search-box{
            width: 5rem;
            margin: 0 auto;
            height: 100%;
            border: .02rem solid #ccc;
            box-sizing: border-box;
            overflow: hidden;
            border-radius: .1rem;
            display: flex;
            input{
                width: 4.3rem;
                height: 100%;
                border: 0;
                padding-left: .3rem;
                box-sizing: border-box;
            }
            .btn_search{
                width: .7rem;
                height: .66rem;
                background: url('../assets/images/head_search.png') no-repeat center;
                background-size: .4rem auto;
            }
        }
    }
    .contact-body{
        padding: .2rem;
        box-sizing: border-box;
        .title{
            font-size: .3rem;
            color: #000;
            font-weight: bold;
            margin: .3rem auto;
        }
        .list{
            .item{
                padding: .2rem;
                box-sizing: border-box;
                background-color: #fff;
                border-radius: .1rem;
                margin-bottom: .2rem;
                .item-title{
                    color: #777;
                    font-size: .28rem;
                    .name{
                        color: #000;
                        font-size: .32rem;
                    }
                    .company{
                        border: .02rem solid $pubcolor;
                        color: $pubcolor;
                        padding: 0 .2rem;
                        border-radius: .1rem;
                        margin-left: .1rem;
                    }
                }
                .item-body{
                    border-top: .02rem solid #ccc;
                    margin-top: .2rem;
                    padding-top: .1rem;
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    line-height: .5rem;
                    color: #777;
                    div{
                        min-width: 50%;
                        display: flex;
                        span{
                            width: 1.3rem;
                        }
                    }
                }
            }
        }
    }
}
</style>
