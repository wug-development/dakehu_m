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
                <ul class="recode-list" v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                    <li class="item" v-for="(item, i) in paylist" :key="i">
                        <div class="log">
                            <div class="log-acount">
                                <div class="log-money">
                                    <div class="money">&yen;{{item.money}}</div>
                                    <div class="explain">汇款金额</div>
                                </div>
                                <div class="log-paytype">
                                    <div class="paytype">付款方式：<span>{{item.method}}</span></div>
                                    <div class="paydate">日期：<span>{{item.datetime}}</span></div>
                                    <div class="paycompany">单位：{{item.company}}</div>
                                </div>
                            </div>
                            <div class="remarks">备注：{{item.other}}</div>
                        </div>
                        <div class="status" v-html="item.status == 1? '已<br>确<br>认': '等<br>待<br>确<br>认'"></div>
                    </li>
                </ul>
                <div class="loading">{{loadText}}</div>
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
            account: {},
            payCount: 0,
            qiankuan: 0,
            paylist: [],
            page: 0,
            pagenum: 10,
            loading: false,
            loadText: ''
        }
    },
    methods: {
        loadMore () {
            if (!this.loading) {
                this.page += 1
                this.loadText = '加载中...'
                this.loading = true
                this.utils.http({
                    name: this,
                    uri: '/payrecord/getPayList',
                    params: {
                        params: { 
                            cid: this.account.id,
                            page: this.page,
                            pagenum: this.pagenum
                        }
                    },
                    success: res=>{
                        this.loading = false
                        this.loadText = ''
                        if(res.status === 200 && res.data.status === 1){
                            let _d = res.data.data
                            if (_d.length > 0) {
                                for (let i in _d) {
                                    this.paylist.push(_d[i])
                                }
                            } else {
                                this.loading = true
                                if (this.paylist.length < 1) {
                                    this.loadText = ''
                                } else {
                                    this.loadText = '——全部加载完成——'
                                }
                            }
                        }
                    },fail: res=> {
                        this.loadText = ''
                        this.loading = false
                    }
                })
            }
        },
        getAccountInfo () {
            this.utils.http({
                name: this,
                uri: '/company/getCompanyAccount',
                params: {
                    params: { 
                        id: this.account.id
                    }
                },
                success: res=>{
                    console.log(res)
                    if(res.status === 200 && res.data.status === 1){
                        this.payCount = res.data.data[0].paycount
                        this.qiankuan = res.data.data[0].debt
                    }
                }
            })
        }
    },
    components: {
        Header
    },
    created () {    
        this.account = JSON.parse(sessionStorage.getItem('account'))
        this.loadMore()
        this.getAccountInfo()
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
            .loading{
                text-align: center;
                font-size: .28rem;
                color: #777;
            }
        }
    }
}
</style>
