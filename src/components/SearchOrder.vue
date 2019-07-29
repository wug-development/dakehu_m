<template>
    <div id="SearchOrder" class="searchorder-box">
        <Header name="订单查询"></Header>
        <div class="search-date">
            <span>预定日期：</span>
            <input type="text" readonly placeholder="开始日期" v-model="startTime">
            <span>至</span>
            <input type="text" readonly placeholder="截止日期" v-model="endTime">
        </div>
        <div class="search-body">
            <div class="search-form">
                <span>分公司：</span>
                <input type="text" maxlength="50">
            </div>
            <div class="search-form">
                <span>乘机人姓名：</span>
                <input type="text" maxlength="50">
            </div>
        </div>
        <div class="btn">搜索</div>
    </div>
</template>

<script>
import Header from './public/HeaderBack.vue'

export default {
    name: 'SearchOrder',
    data () {
        return {
            startTime: '',
            endTime: ''
        }
    },
    components: {
        Header
    },
}
</script>

<style lang="scss">
@import '@/assets/sass/set.scss';
.searchorder-box{
    height: 100%;
    background-color: #f4f4f4;
    padding-top: .9rem;
    .search-date{
        margin-top: .2rem;
        background-color: #fff;
        display: flex;
        height: .8rem;
        line-height: .8rem;
        padding: 0 .3rem;
        font-size: .3rem;
        color: #777;
        input{
            width: 2rem;
            margin: 0 .1rem;
            border: 0;
            box-sizing: border-box;
            text-align: center;
            color: #777;
        }
    }
    .search-body{
        margin-top: .2rem;
        background-color: #fff;
        padding: 0 .3rem;
        box-sizing: border-box;
        .search-form{
            height: .8rem;
            line-height: .8rem;
            box-sizing: border-box;
            display: flex;
            white-space: nowrap;
            color: #777;
            input{
                width: 100%;
                border: 0;
                color: #777;
            }
        }
        .search-form:first-child{
            border-bottom: .02rem dotted #ccc;
        }
    }
    .btn{
        width: 6.9rem;
        margin: .3rem auto;
        border-radius: .1rem;
        font-size: .28rem;
        height: .8rem;
        line-height: .8rem;
    }
}
</style>
