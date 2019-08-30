<template>
    <div id="OrderDetail" class="pubbody orderdetail-box">
        <Header :name="pageTitle"></Header>
        <div class="detail-head">
            <div class="order-status"><div>{{orderInfo.dnStatus == 0? '等待处理' : '预定成功'}}</div><span>预订时间：{{checkTime(orderInfo.dtAddTime)}}</span></div>
            <div class="service"><div>{{orderInfo.dcAdminName}}</div><span>（您的客服专员）</span> </div>
            <div class="notice">
                请仔细核对您的订单详情<span>(取消此订单请联系管理员！)</span>
            </div>
        </div>
        <div class="detail-body" v-if="orderInfo.dcStartCity">
            <div class="title">订单信息</div>
            <ul class="info">
                <li><span>联系人</span>{{orderInfo.dcLinkName}}</li>
                <li><span>行程</span>{{orderInfo.dcStartCity}}-{{orderInfo.dcBackCity}}</li>
                <li><span>出发日期</span>{{orderInfo.dcStartDate}}</li>
                <li><span>记录编号</span>{{orderInfo.dcOrderCode}}</li>
                <li><span>票号</span>{{orderInfo.dcOrderCode}}</li>
                <li><span>订单金额</span>{{orderInfo.dnTotalPrice}} ( {{orderInfo.dnPrice}}  + 税金 {{orderInfo.dnTax}} )*{{orderInfo.person.length}}人</li>
            </ul>
            <ul class="info" v-if="orderInfo.dcOrderCode">
                <li><span>记录编号</span>{{orderInfo.dcOrderCode}}</li>
                <li><span>CTCM</span></li>
                <li><span>CTCT</span></li>
                <li><span>票号</span>996-564758112248</li>
                <li><span>折扣</span></li>
                <li><span>订单金额</span>1260 ( 1180  + 税金 60 + 服务费 20 )*1人</li>
                <li><span>备注</span></li>
            </ul>
            <div class="remark">
                <textarea placeholder="备注">{{orderInfo.dcContent}}</textarea>
            </div>
            <div class="flight-info">
                <div class="itembox">
                    <div class="title">
                        <span>
                            {{orderInfo.dcStartDate}}&nbsp;&nbsp;{{orderInfo.dcStartCity}} - {{orderInfo.dcBackCity}}
                        </span>
                    </div>
                    <div class="togolist">
                        <div class="togoitem" v-for="(item, i) in goFlightList">
                            <div class="time">
                            <div>{{item.dcSTime}}</div>
                            <div class="row"></div>
                            <div>{{item.dcETime}}</div>
                            </div>
                            <div class="col end"></div>
                            <div class="fline">
                            <div>{{item.dcSPortName}}</div>
                            <div class="air">
                                <img :src="item.dcCompanyLogo" alt="">
                                {{item.dcJixing}}
                            </div>
                            <div>{{item.dcEPortName}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="itembox" v-if="toFlightList.length > 0">
                    <div class="title">
                        <span>
                            {{orderInfo.dcBackDate}}&nbsp;&nbsp;{{orderInfo.dcBackCity}} - {{orderInfo.dcStartCity}}
                        </span>
                    </div>
                    <div class="togolist">
                        <div class="togoitem" v-for="(item, i) in toFlightList">
                            <div class="time">
                            <div>{{item.dcSTime}}</div>
                            <div class="row"></div>
                            <div>{{item.dcETime}}</div>
                            </div>
                            <div class="col end"></div>
                            <div class="fline">
                            <div>{{item.dcSPortName}}</div>
                            <div class="air">
                                <img :src="item.dcCompanyLogo" alt="">
                                {{item.dcJixing}}
                            </div>
                            <div>{{item.dcEPortName}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="title">乘机人信息</div>
            <ul class="man-list">
                <li class="man-item" v-for='(p, index) in orderInfo.person'>
                    <div><span>乘机人<label>{{index + 1}}</label></span>{{p.pername}}（{{p.type == 1? '成人' : '儿童'}}）</div>
                    <div><span>性别</span>{{p.sex}}</div>
                    <div><span>护照号码</span>{{p.pno}}</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Header from './public/HeaderBack.vue'

export default {
    name: 'OrderDetail',
    data () {
        return {
            pageTitle: '订单号',
            orderID: '',
            orderInfo: {},
            goFlightList: [],
            toFlightList: []
        }
    },
    components: {
        Header
    },
    methods: {
        checkTime (v) {
            if (v) {
                return v.replace('T', ' ').replace('Z','')
            } else {
                return ''
            }
        }
    },
    created () {
        this.orderID = this.$route.query.id
        this.utils.http({
            name: this,
            uri: '/order/getorderinfo',
            params: {
                params: { id: this.orderID}
            },
            success: res=>{
                console.log(res)
                if(res.status === 200 && res.data.status === 1){
                    this.orderInfo = res.data.data
                    for (let i in this.orderInfo.flight) {
                        if (this.orderInfo.flight[i].dnFlightType === 0) {
                            this.goFlightList.push(this.orderInfo.flight[i])
                        } else {
                            this.toFlightList.push(this.orderInfo.flight[i])
                        }
                    }
                }
            }
        })
    }
}
</script>

<style lang="scss">
@import '@/assets/sass/set.scss';
.orderdetail-box{
    min-height: 100%;
    height: auto;
    padding-bottom: .5rem;
    .detail-head{
        background-color: $pubcolor;
        color: #fff;
        display: flex;
        justify-content: space-between;
        padding: .2rem .2rem .6rem .2rem;
        height: 1.8rem;
        box-sizing: border-box;
        flex-wrap: wrap;
        .order-status{
            padding-left: .6rem;
            width: 65%;
            box-sizing: border-box;
            div{
                position: relative;
                font-size: .4rem;
                margin-bottom: .1rem;
            }
            div::before{
                content: '';
                position: absolute;
                left: -.6rem;
                top: 0;
                width: .5rem;
                height: .5rem;
                background: url('../assets/images/wait.png') no-repeat center;
                background-size: 80%;
            }
            span{
                font-size: .22rem;
            }
        }
        .service{
            text-align: right;
            font-size: .32rem;
            width: 35%;
            div{
                padding-right: .15rem;
                margin-bottom: .1rem;
            }
            span{
                font-size: .22rem;
            }
        }
        .notice{
            margin-top: .4rem;
            width: 100%;
            background-color: #fff;
            color: #333;
            font-size: .26rem;
            border-radius: .1rem;
            padding: .2rem;
            span{
                color: #fe7122;
            }
        }
    }
    .detail-body{
        margin-top: .8rem;
        padding: 0 .2rem;
        .title{
            padding-left: .2rem;
            font-size: .3rem;
            color: #000;
            font-weight: bold;
        }
        .info{
            margin-top: .2rem;
            background-color: #fff;
            border-radius: .1rem;
            padding: .24rem;
            color: #000;
            font-size: .24rem;
            li{
                margin-bottom: .2rem;
                display: flex;
                span{
                    width: 1.2rem;
                    color: #818181;
                }
            }
        }
        .remark{
            margin-top: .2rem;
            background-color: #fff;
            border-radius: .1rem;
            padding: .2rem;
            box-sizing: border-box;
            textarea{
                width: 100%;
                height: 1rem;
                border: .02rem solid #ccc;
                border-radius: .1rem;
                resize: none;
                padding: .1rem;
                box-sizing: border-box;
                color: #777;
            }
        }
        .flight-info{
            margin-top: .2rem;
            border-radius: .1rem;
        }
        .itembox{
            background-color: #fff;
            padding: .3rem .2rem;
            box-sizing: border-box;
            border-radius: .1rem;
            margin-bottom: .2rem;
            .title{
                font-size: .28rem;
                height: .6rem;
                line-height: .62rem;
                display: flex;
                div{
                    color: #fff;
                    background-color: #FE6600;
                    width: .32rem;
                    height: .32rem;
                    line-height: .34rem;
                    font-size: .28rem;
                    padding: .02rem;
                    text-align: center;
                    margin-top: .14rem;
                    margin-right: .1rem;
                    box-sizing: border-box;
                }
                span{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
            .togolist{
                padding: 0 0 0 .6rem;
                box-sizing: border-box;
                .togoitem{
                    display: flex;
                    font-size: .28rem;
                    box-sizing: border-box;
                    margin-top: .15rem;
                    .fline{
                        padding-left: .2rem;
                        .air{
                            color: #666;
                            font-size: .24rem;
                            height: .56rem;
                            line-height: .56rem;
                            img{
                                width: .24rem;
                                height: .24rem;
                            }
                        }
                    }
                    .col{
                        position: relative;
                        border-left: .02rem solid $pubcolor;
                        margin: .2rem;
                    }
                    .col::before{
                        content: '';
                        position: absolute;
                        left: -5px;
                        top: -5px;
                        width: 10px;
                        height: 10px;
                        background-color: $pubcolor;
                        border-radius: 10px;
                    }
                    .col.end::after{
                        content: '';
                        position: absolute;
                        left: -5px;
                        bottom: -5px;
                        width: 10px;
                        height: 10px;
                        background-color: $pubcolor;
                        border-radius: 10px;
                    }
                    .time{
                        width: 1.2rem;
                        .row{
                            height: .56rem;
                        }
                    }
                }
                .changecity{
                    margin: .2rem 0 .2rem .8rem;
                    box-sizing: border-box;
                    display: flex;
                    background-color: #FEE8EA;
                    width: 4rem;
                    height: .4rem;
                    line-height: .4rem;
                    color: #666;
                    span{
                        width: .2rem;
                        height: .2rem;
                        border-radius: .2rem;
                        border: .02rem solid #FCA7A6;
                        box-sizing: border-box;
                        margin: .1rem;
                    }
                }
            }
        }
        .man-list{
            margin-top: .2rem;
            background-color: #fff;
            border-radius: .1rem;
            padding: 0 .2rem;
            box-sizing: border-box;
            li{
                border-top: .02rem solid #ccc;
                padding: .3rem 0;
                div{
                    display: flex;
                    line-height: .5rem;
                    color: #000;
                    padding-left: .1rem;
                    span{
                        width: 1.4rem;;
                        color: #777;
                        position: relative;
                        label{
                            position: absolute;
                            top: .12rem;
                            left: .76rem;
                            display: block;
                            width: 12px;
                            height: 12px;
                            line-height: 12px;
                            border-radius: 20px;
                            color: #fff;
                            text-align: center;
                            background-color: #fe7122;
                            font-size: .2rem;
                        }
                    }
                }
            }
            li:first-child{
                border: 0;
            }
        }
    }
}
</style>
