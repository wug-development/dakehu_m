<template>
    <div id="PaymentRecord" class="payrecord-box">
        <Header :name="pageTitle"></Header>
        <div class="payrecord-body">
            <div class="tab">
                <div class="tab_money tab_paycount">
                    <div class="money">&yen;<span>{{payCount}}</span></div>
                    <div class="explain">付款总额</div>
                </div>
                <div class="tab_money tab_debt">
                    <div class="money">&yen;<span>{{qiankuan}}</span></div>
                    <div class="explain">剩余欠款</div>
                </div>
            </div>
            <div class="recode-body">
                <div class="title">付款记录</div>
                <ul class="recode-list">
                    <li class="item" v-for="(item, i) in paylist" :key="i">
                        <div class="log">
                            <div class="log-acount">
                                <div class="log-money">
                                    <div class="money">￥{{item.dnMoney}}</div>
                                    <div class="explain">汇款金额</div>
                                </div>
                                <div class="log-paytype">
                                    <div class="paytype">付款方式：<span>{{item.dcPayType}}</span></div>
                                    <div class="paydate">日期：<span>{{item.dtAddDatetime}}</span></div>
                                    <div class="paycompany">单位：{{uname}}</div>
                                </div>
                            </div>
                            <div class="remarks">备注：{{item.dcRemarks}}</div>
                        </div>
                        <div class="status" v-html="item.dnStatus == 1? '已<br>确<br>认': '等<br>待<br>确<br>认'"></div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import Header from './public/HeaderBack.vue'

export default {
    name: 'PaymentRecord',
    data () {
        return {
            pageTitle: '付款记录',
            uname: '',
            payCount: 0,
            qiankuan: 0,
            paylist: []
        }
    },
    components: {
        Header
    },
    created () {        
        let acount = JSON.parse(sessionStorage.getItem('account'))
        this.uname = acount.uname
        this.utils.http({
            name: this,
            uri: '/payrecord/getrecordlist',
            params: {
                params: { cid: acount.id}
            },
            success: res=>{
                console.log(res)
                if(res.status === 200 && res.data.status === 1){
                    this.paylist = res.data.data.orderlist
                    this.payCount = format(res.data.data.paycount)
                    this.qiankuan = format(res.data.data.qiankuan)
                }
            }
        })
    }
}

function format (num) {
    return (num.toFixed(0) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
}
</script>

<style lang="scss">
@import '@/assets/sass/set.scss';
.payrecord-box{
    height: 100%;
    background-color: #f4f4f4;
    .payrecord-body{
        height: 100%;
        padding-top: .9rem;
        box-sizing: border-box;
        overflow: auto;
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
        .recode-body{
            margin-top: .2rem;
            padding: .2rem;
            box-sizing: border-box;
            .title{
                font-size: .3rem;
                font-weight: bold;
            }
            .recode-list{
                .item{
                    margin-top: .2rem;
                    background-color: #fff;
                    border-radius: .1rem;
                    padding: .2rem 0 .2rem .2rem;
                    box-sizing: border-box;
                    display: flex;
                    .log{
                        width: 6.1rem;
                        padding-right: .2rem;
                        box-sizing: border-box;
                        .log-acount{
                            display: flex;
                            padding-bottom: .2rem;
                            box-sizing: border-box;
                            .log-money{
                                padding: .4rem 0 .4rem .2rem;
                                text-align: left;
                                width: 2.4rem;
                                border-right: .02rem dotted #eee;
                                box-sizing: border-box;
                                .money{
                                    color: #fd610c;
                                    font-size: .36rem;
                                }
                                .explain{
                                    color: #fa6c1c;
                                    font-size: .2rem;
                                }
                            }
                            .log-paytype{
                                padding-top: .3rem;
                                padding-left: .3rem;
                                box-sizing: border-box;
                                color: #929292;
                                span{
                                    color: #5c5c5c;
                                }
                                .paycompany{
                                    margin-top: .2rem;
                                    color: #fb9d77;
                                }
                            }
                        }
                        .remarks{
                            border-top: .02rem dotted #eee;
                            color: #777;
                            line-height: .5rem;
                        }
                    }
                    .status{
                        width: .8rem;
                        border-left: .02rem dotted #ddd;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #fa6c1c;
                        line-height: .3rem;
                    }
                }
            }
        }
    }
}
</style>
