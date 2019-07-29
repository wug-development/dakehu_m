<template>
    <div id="OrderList" class="pubbody">
        <Header :name="pageTitle"></Header>
        <div class="orderlist-body">
            <div class="tab">
                <div class="tab_money tab_paycount">
                    <div class="money">&yen;<span>187,224</span></div>
                    <div class="explain">付款总额</div>
                </div>
                <div class="tab_money tab_debt">
                    <div class="money">&yen;<span>187，224</span></div>
                    <div class="explain">剩余欠款</div>
                </div>
            </div>
            <div class="hzimg">
                <img src="../assets/images/orderlist_hz.png" alt="">
            </div>
            <div class="myorder">
                <div class="title">我的订单</div>
                <ul class="list">
                    <li class="item">
                        <div class="no-status">
                            <div class="no">订单号<span>78556</span></div>
                            <div class="status wait">等待处理</div>
                        </div>
                        <div class="item-head">
                            <div>乘机人</div>
                            <div>行程</div>
                            <div>出发日期</div>
                        </div>
                        <div class="item-body">
                            <div>武广</div>
                            <div>北京-上海</div>
                            <div>2019/5/12</div>                            
                        </div>
                        <div class="recordno-money">
                            <div class="recordno">记录编号<span>预订未成功</span></div>
                            <div class="money">金额<span>￥124562</span></div>
                        </div>
                    </li>
                    <li class="item">
                        <div class="no-status">
                            <div class="no">订单号<span>78556</span></div>
                            <div class="status">出票完成</div>
                        </div>
                        <div class="item-head">
                            <div>乘机人</div>
                            <div>行程</div>
                            <div>出发日期</div>
                        </div>
                        <div class="item-body">
                            <div>武广</div>
                            <div>北京-上海</div>
                            <div>2019/5/12</div>                            
                        </div>
                        <div class="recordno-money">
                            <div class="recordno">记录编号<span>WERSDWR</span></div>
                            <div class="money">金额<span>￥124562</span></div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import Header from './public/HeaderBack.vue'

export default {
    name: 'OrderList',
    data () {
        return {
            pageTitle: '订单'
        }
    },
    components: {
        Header
    },
}
</script>

<style lang="scss">
    @import '@/assets/sass/set.scss';
    .orderlist-body{
        .tab{
            padding: .6rem .2rem;
            background-color: #fff;
            display: flex;
            box-sizing: border-box;
            .tab_money{
                width: 50%;
                border-right: .02rem solid #ccc;
                text-align: center;
                .money{
                    color: $pubcolor;
                    span{
                        font-size: .36rem;
                    }
                }
                .explain{
                    color: #777;
                }
            }
            .tab_debt{
                border: 0;
                .money{
                    color: #fa6c1c;
                }
            }
        }
        .hzimg{
            padding: .3rem .2rem;
            img{
                display: block;
                width: 100%;
            }
        }
        .myorder{
            padding: .2rem;
            box-sizing: border-box;
            .title{
                color: #333;
                font-size: .3rem;
                font-weight: bold;
                padding-left: .2rem;
                box-sizing: border-box;
            }
            .list{
                .item{
                    margin-top: .3rem;
                    background-color: #fff;
                    border-radius: .1rem;
                    padding: .3rem .2rem;
                    box-sizing: border-box;
                    box-shadow: .03rem .03rem .08rem #ddd;
                    .no-status{
                        display: flex;
                        justify-content: space-between;
                        .no{
                            position: relative;
                            padding-left: .8rem;
                            font-size: .22rem;
                            color: #777;
                            span{
                                color: #000;
                                font-size: .28rem;
                                margin-left: .2rem;
                            }
                        }
                        .no::before{
                            content: '';
                            position: absolute;
                            left: .2rem;
                            top: 0;
                            display: block;
                            width: 20px;
                            height: 20px;
                            border-radius: 20px;
                            background: url('../assets/images/icon_orderlist.png') no-repeat center;
                            background-color: $pubcolor;
                            background-size: 60%;
                        }
                        .status{
                            color: #000;
                            font-size: .28rem;
                            padding-right: .5rem;
                        }
                        .status.wait{
                            color: #fe0202;
                        }
                    }
                    .item-head,.item-body{
                        display: flex;
                        color: #a3a3a3;
                        font-size: .24rem;
                        justify-content: space-around;
                        margin-top: .3rem;
                        div{
                            width: 2.5rem;
                            overflow: hidden;
                            text-align: center;
                        }
                    }
                    .item-body{
                        color: #121212;
                        font-size: .28rem;
                        margin-top: .15rem;
                    }
                    .recordno-money{
                        margin-top: .2rem;
                        border-top: .02rem solid $pubcolor;
                        padding: .2rem .2rem 0 .2rem;
                        box-sizing: border-box;                       
                        display: flex;
                        justify-content: space-between;
                        color: #a3a3a3;
                        .recordno{
                            span{
                                color: #000;
                                margin-left: .2rem;
                            }
                        }
                        .money{
                            span{
                                color: #fa6c1c;
                                margin-left: .2rem;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
