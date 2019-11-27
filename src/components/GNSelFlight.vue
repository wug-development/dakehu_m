<template>
    <div class="gnselflight-box">
        <Header class="flight-header" :name="pageTitle"></Header>
        <div class="selflight-body">
            <div class="item-box">
                <div class="lab">
                    <div class="labs">
                        <img :src="'/icons/' + (flight.flightNo.substr(0,2)) + '.gif'" alt="">
                        <span>{{flight.flightNo}}</span>
                        <label>{{flight.planeType}}（{{flight.seatItems[0].seatMsg.replace("特价舱","特价经济舱")}}）</label>
                        <label>{{startDate}}</label>
                    </div>
                </div>                               
                <div class="info">
                    <div class="info-go">
                        <div class="time">{{flight.depTime.substr(0,2) + ':' + flight.depTime.substr(2,2)}}</div>
                        <div class="name">{{startCity}}</div>
                    </div>
                    <div class="change">{{checkTime(flight.depTime,flight.arriTime)}}</div>
                    <div class="info-to">
                        <div class="time">{{flight.arriTime.substr(0,2) + ':' + flight.arriTime.substr(2,2)}}</div>
                        <div class="name">{{endCity}}</div>
                    </div>
                </div>
                <div class="div-hr">
                    机建+燃油：{{flight.airportTax}}+{{flight.fuelTax}}元
                </div>
            </div>
            <div class="item-box" v-for="(item, i) in flight.seatItems" :key="i">
                <div class="item-price">
                    <div>&yen;<span>{{item.parPrice}}</span></div>
                    <div class="btns" @click="book(item)">预定</div>
                </div>
                <div class="div-hr">
                    <span>{{item.seatMsg}}</span>
                    <span>{{item.discount * 10}}折</span>
                    <span class="tgq" @click="checkTGQ(flight.flightNo.substr(0,2), item.seatCode, i, 0)">退改签</span>
                </div>
            </div>
        </div>
        <div v-if="tgqLayer" @click="tgqLayer = false" class="tgqlayer">
            <div class="tgqbox">
                <div v-html="beizhu"></div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from './public/HeaderBack.vue'
export default {
    data () {
        return {
            pageTitle: '',
            startCity: '',
            endCity: '',
            beizhu: '',
            startDate: '',
            flight: {},
            tgqLayer: false
        }
    },
    components: {
        Header
    },
    methods: {
        checkTime(v1, v2) {
            var h1 = Number(v1.substr(0,2))
            var m1 = Number(v1.substr(2,2))
            var h2 = Number(v2.substr(0,2))
            var m2 = Number(v2.substr(2,2))
            var hours = 0, minutes = 0
            hours = h2 - h1
            if (h2 < h1) {
                hours = h2 + 24 - h1
            }
            minutes = m2 - m1
            if (m2 < m1) {
                hours -= 1
                minutes = m2 + 60 -m1
            }
            return hours + "时" + minutes + "分";
        },
        checkTGQ (v, code, m, n) {
            // 获取退改签
            if (!this.flight.seatItems[n].param4) {
                this.$http.get(this.uris + '/flight/getflighttgq', {params: {
                    flightNo: v,
                    seatCode: code
                }})
                .then(res => {
                    if (res && res.data && res.data.status != 0) {
                        var _o = res.data.data.replace('更改条件', '<b>更改条件</b>').replace('退票条件', '<br/><b>退票条件</b>').replace('签转条件', '<br/><b>签转条件</b>')
                        if (_o == '') {
                            this.flight.seatItems[n].param4 = '未找到条件';
                        } else {
                            this.flight.seatItems[n].param4 = _o;
                        }
                        this.beizhu = _o
                        this.tgqLayer = true
                    }
                })
            } else {
                this.beizhu = this.flight.seatItems[n].param4
                this.tgqLayer = true
            }
        },
        book (item) {
            this.utils.setItem('selFlight', JSON.stringify(this.flight))
            this.utils.setItem('bookFlightSeat', JSON.stringify(item))
            this.$router.push({ path: '/whiteinfo' })
        }
    },
    created () {        
        let scode = this.utils.getItem("scode")
        let ecode = this.utils.getItem("ecode")
        let stime = this.utils.getItem("stime")
        let etime = this.utils.getItem("etime")
        let ttype = this.utils.getItem("ttype")
        let ftype = this.utils.getItem("ftype")
        let scity = this.utils.getItem("scity")
        let ecity = this.utils.getItem("ecity")
        let eDay = this.utils.getItem("eDay")
        this.startCity = scity;
        this.endCity = ecity;
        this.startDate = stime;
        this.pageTitle = scity + '-' + ecity

        let f = this.utils.getItem('selFlight')
        this.flight = JSON.parse(f)
        console.log(this.flight)
    }
}
</script>

<style lang="scss">
.gnselflight-box{
    height: 100%;
    background-color: #f3f3f3;
    overflow: hidden auto;
    .selflight-body{
        padding: 1.1rem .2rem 0 .2rem;
        box-sizing: border-box;
        .item-box{
            background-color: #fff;
            border-radius: .08rem;
            padding: .2rem 0 .2rem .4rem;
            box-sizing: border-box;
            margin-bottom: .2rem;
            .lab{
                display: flex;
                justify-content: space-between;
                color: #999;
                font-size: .24rem;
                height: .5rem;
                .labs{
                    display: flex;
                    line-height: .36rem;
                    margin-top: .1rem;
                    font-family: "pingfang";
                    font-weight: lighter;
                    img{
                        height: .36rem;
                        max-width: .6rem;
                    }
                    span{
                        margin-left: .1rem;
                    }
                    label{
                        margin-left: .14rem;
                        margin-top: .04rem;
                        border-left: .01rem solid #999;
                        height: .28rem;
                        line-height: .28rem;
                        padding-left: .2rem;
                    }
                    .tgq{
                        color: #29ad80;
                    }
                }
            }
            .info{
                display: flex;
                justify-content: space-between;
                height: 1.2rem;
                margin-top: .1rem;
                .info-go{
                    font-size: .26rem;
                    color: #999;
                    text-align: center;
                    overflow: hidden;
                    min-width: 2rem;
                    .time{
                        font-size: .44rem;
                        color: #333;
                        line-height: .6rem;
                        height: .6rem;
                    }
                    .name{
                        width: 100%;
                        height: .4rem;
                        line-height: .4rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space:nowrap;
                    }
                }
                .info-to{
                    font-size: .26rem;
                    color: #999;
                    text-align: center;
                    min-width: 2rem;
                    overflow: hidden;
                    .time{
                        font-size: .44rem;
                        color: #333;
                        line-height: .6rem;
                        height: .6rem;
                        span{
                        font-size: .2rem;
                        color: #999;
                        }
                    }
                    .name{
                        width: 100%;
                        height: .4rem;
                        line-height: .4rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space:nowrap;
                    }
                }
                .change{
                    color: #999;
                    width: 2.4rem;
                    height: .6rem;
                    line-height: 1.24rem;
                    background: url('../assets/images/bgflight.png') no-repeat center;
                    background-size: 100%;
                    text-align: center;
                    font-size: .24rem;
                }
            }
            .div-hr{
                border-top: .02rem dotted #ccc;
                width: 6.2rem;
                color: #9b9a9a;
                padding-top: .1rem;
                display: flex;
                span{
                    line-height: .3rem;
                    padding: 0 .1rem;
                    border-right: .02rem solid #ccc;
                }
                .tgq{
                    border: 0;
                    color: #29ad80;
                }
            }
            .item-price{
                color: #f00;
                padding-bottom: .1rem;
                display: flex;
                justify-content: space-between;
                span{
                    font-size: .44rem;
                }
                .btns{
                    background: #FA6B1C;
                    color: #fff;
                    font-size: .36rem;
                    border-radius: .08rem;
                    height: .6rem;
                    line-height: .6rem;
                    padding: 0 .3rem;
                    margin-right: .2rem;
                }
            }
        }
    }
    .tgqlayer{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 11;
        background-color: rgba(0,0,0,.6);
        display: flex;
        justify-content: center;
        align-items: center;
        .tgqbox{
            background-color: #fff;
            border-radius: .1rem;
            padding: .2rem .2rem;
            box-sizing: border-box;
            width: 6.4rem;
            text-align: left;
            color: #777;
            line-height: .5rem;
            font-size: .28rem;
        }
    }
}
</style>