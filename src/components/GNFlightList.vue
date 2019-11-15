<template>
    <div id="FlightList" class="flightlist-box">
        <Header class="flight-header" :name="pageTitle"></Header>
        <div class="flist-tlist">
            <div class="flist-head">
                <div class="flist-body-pd">
                    <div class="flist-search">
                        <label>{{flightType}}</label>
                        <span>{{utils.dateFormat(startDate, 'MM月dd日')}}</span>
                    </div>
                </div>
            </div>
            <div class="flist-body" v-if="isLoading || flightList.length">
                <ul class="flist-list">
                    <li class="flist-item" v-for="(item, index) in flightList" :key="index" @click="selFlight(item)">
                        <div class='itembox'>
                            <div class="itembox-padding">
                                <div class="lab">
                                    <div class="labs">
                                        <img :src="'/static/icons/' + (item.flightNo.substr(0,2)) + '.gif'" alt="">
                                        <span>{{item.flightNo}}</span>
                                        <label>{{item.planeType}}（{{item.seatItems[0].seatMsg.replace("特价舱","特价经济舱")}}）</label>
                                        <label class="tgq" @click="checkTGQ(item.flightNo.substr(0,2), item.seatItems[0].seatCode, index, 0)">退改签</label>
                                    </div>
                                </div>
                                <div>                                    
                                    <div class="info">
                                        <div class="info-go">
                                            <div class="time">{{item.depTime.substr(0,2) + ':' + item.depTime.substr(2,2)}}</div>
                                            <div class="name">{{startCity}}</div>
                                        </div>
                                        <div class="change">{{checkTime(item.depTime,item.arriTime)}}</div>
                                        <div class="info-to">
                                            <div class="time">{{item.arriTime.substr(0,2) + ':' + item.arriTime.substr(2,2)}}</div>
                                            <div class="name">{{endCity}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="btnprice">
                                <div>2.5折</div>
                                <span>￥<label>{{item.seatItems[0].parPrice}}</label></span>
                            </div>
                        </div>
                    </li>
                </ul>
                <Footer></Footer>
            </div>
        </div>
        <div v-if="tgqLayer" @click="closeTgqLayer" class="tgqlayer">
            <div class="tgqbox">
                <div v-html="beizhu">{{beizhu}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from './public/HeaderBack.vue'
import Footer from './public/Footer.vue'

export default {
    name: 'FlightList',
    data() {
        return {
            pageTitle: '航班列表',
            btnname: '预定',
            tgqLayer: false,
            notFind: false,
            flightType: '',
            startCity: '',
            endCity: '',
            startDate: '',
            endDate: '',
            flightList: [],
            airPort: [],
            airCompany: [],
            isLoading: false,
            beizhu: '',
            othernum: 0,
            //定制
            tel: '',
            name: '',
            email: '',
            pass: '',
            content: '',
            isVip: false,
            passName: '请设置您的订单查询密码',
            userID: '',
            isLogin: false
        }
    },
    components: {
        Header,
        Footer
    },
    methods: {
        getFlightList (scode, ecode, sdate) {
            this.isLoading = true
            // 获取航班
            this.$http.get(this.uris + '/flight/getgnflights', {params: {
                scity: scode,
                ecity: ecode,
                sdate: sdate
            }})
            .then(res => {
                if (res && res.data && res.data.status != 0) {
                    var _d = res.data.data
                    console.log(_d)
                    if (_d.data.returnCode === 'S') {
                        this.airCompany = _d.airCompany
                        this.airPort = _d.airPort
                        this.flightList = _d.data.flightItems[0].flights
                    }
                }
                this.isLoading = false
            })
            .catch(res => {
                this.isLoading = false
            })
        },
        checkAirPort (v) {
            let txt = '';
            if (v) {
                for (let i=0; i<this.airPort.length; i++) {
                    if (this.airPort[i].dcCode == v) {
                        txt = this.airPort[i].dcAirPortName
                        break;
                    }
                }
            }
            return txt
        },
        checkTGQ (v, code, m, n) {
            // 获取退改签
            if (!this.flightList[m].seatItems[n].param4) {
                this.$http.get(this.uris + '/flight/getflighttgq', {params: {
                    flightNo: v,
                    seatCode: code
                }})
                .then(res => {
                    if (res && res.data && res.data.status != 0) {
                        var _o = res.data.data.replace('更改条件', '<b>更改条件</b>').replace('退票条件', '<br/><b>退票条件</b>').replace('签转条件', '<br/><b>签转条件</b>')
                        if (_o == '') {
                            this.flightList[m].seatItems[n].param4 = '未找到条件';
                        } else {
                            this.flightList[m].seatItems[n].param4 = _o;
                        }
                        this.beizhu = _o
                        this.tgqLayer = true
                    }
                })
            } else {
                this.beizhu = this.flightList[m].seatItems[n].param4
                this.tgqLayer = true
            }
        },
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
        closeTgqLayer: function () {
            this.tgqLayer = false
        },
        selFlight: function(item){
            this.utils.setItem('selFlight', JSON.stringify(item))
            this.$router.push({ path: '/selflight' })
        }
    },
    created: function() {
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
        if(ttype == 1 || ttype == '1'){
            this.endDate = etime
            this.flightType = '往返'
            this.btnname = '选定'
        }else{
            this.flightType = '单程'
        }
        this.isLoading = true
        
        this.userID = this.utils.getItem("kxUserID") || '';
        if(this.userID && this.userID != "null"){
            this.isLogin = true
        }
        this.getFlightList(scode, ecode, stime)
    }
}


</script>

<style lang="scss">
.flightlist-box{
    min-height: 100%;
    height: 100%;
    background: linear-gradient(#4fc199 1rem, #EFEFEF 5rem);
    overflow: hidden;
    font-size: .24rem;
    .flist-tlist{
        position: relative;
        height: 100%;
        .flist-head{
            position: absolute;
            left: 0;
            top: .9rem;
            width: 100%;
            overflow: hidden;
            .flist-body-pd{
                padding: 0 .1rem .1rem .1rem;
                .flist-search{
                    height: .6rem;
                    width: 100%;
                    background-color: rgba(255,255,255,.64);
                    display: flex;
                    label{
                        margin: .1rem 0 0 .12rem;
                        border: .02rem solid #bfbfbf;
                        height: .42rem;
                        width: .72rem;
                        line-height: .42rem;
                        text-align: center;
                        color: #fa6c1c;
                        border-radius: .1rem;
                        box-sizing: border-box;
                        font-size: .28rem;
                    }
                    span{
                        line-height: .62rem;
                        margin-left: .1rem;
                        color: #444;
                        font-size: .24rem;
                    }
                }
            }
        }
        .flist-body{
            position: absolute;
            top: 0;
            left: 0;
            margin-top: 1.6rem;
            width: 100%;
            height: 100%;
            overflow: scroll;
            padding-bottom: 2.5rem;
            box-sizing: border-box;
            .flist-list{
                padding: 0 .2rem 0 .2rem;
                box-sizing: border-box;
                width: 100%;
                min-height: 9rem;
                .flist-item{
                    background-color: #fff;
                    margin-bottom: .4rem;
                    border-radius: .1rem;
                    box-sizing: border-box;
                    position: relative;
                    .itembox{
                        background-color: #fff;
                        border-radius: .1rem;
                        box-sizing: border-box;
                        position: relative;
                    }
                    .itemboxs{
                        border-radius: .1rem;              
                        background-color: #e4e4e4;
                        margin-bottom: .1rem;
                        box-sizing: border-box;
                    }
                    .itembox-padding{
                        padding: .1rem .1rem .2rem .2rem;
                    }
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
                                margin-left: .1rem;
                                margin-top: .04rem;
                                border-left: .01rem solid #999;
                                height: .28rem;
                                line-height: .28rem;
                                padding-left: .1rem;
                            }
                            .tgq{
                                color: #29ad80;
                            }
                        }
                    }
                    .btnprice{
                        position: absolute;
                        top: 0;
                        right: 0;
                        display: flex;
                        font-size: .24rem;
                        color: #f00;
                        width: 1.6rem;
                        height: 100%;
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                        span{
                            position: absolute;
                            top: .9rem; 
                            right: .3rem;
                            font-size: .24rem;
                            line-height: .5rem;
                            label{
                                font-size: .46rem;
                            }
                        }
                        div {
                            position: absolute;
                            top: .2rem; 
                            right: .3rem;
                            font-size: .26rem;
                            height: .36rem;
                            line-height: .34rem;
                            color: #fa6c1c;
                            border: .02rem solid #fa6c1c;
                            padding: 0 .1rem;
                            box-sizing: border-box;
                        }
                    }
                    .info{
                        display: flex;
                        justify-content: left;
                        height: 1.2rem;
                        margin-top: .1rem;
                        .info-go{
                            font-size: .26rem;
                            color: #999;
                            text-align: center;
                            overflow: hidden;
                            min-width: 1.3rem;
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
                            min-width: 1.3rem;
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
                            width: 2rem;
                            height: .8rem;
                            line-height: 1.6rem;
                            background: url('../assets/images/flight.png') no-repeat center;
                            background-size: 1.35rem;
                            text-align: center;
                            font-size: .24rem;
                        }
                    }
                    .info-change{
                        position: relative;
                        border-top: .02rem dotted #ccc;
                        margin: 0;
                        padding-top: .2rem;
                        .change-name{
                            position: absolute;
                            left: 0;
                            top: -.2rem;
                            width: 100%;
                            height: .4rem;
                            line-height: .4rem;
                            color: #f7a461;
                            text-align: center;
                            font-size: .24rem;
                            span{
                                background-color: #fff;
                                padding: 0 .2rem;
                            }
                        }
                    }
                }
            }
        }
        .flight-nofind{
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding-top: 1.6rem;
            .nofind-content{
                background-color: #fff;
                padding: 0 .4rem .4rem .4rem;
                height: 100%;
                overflow-y: scroll;
            }
            .content{
                text-align: center;
                font-size: .32rem;
                color: #999;
                padding: .4rem 0;
            }
            .red{
                color: #f00000;
                font-size: .28rem;
                line-height: .5rem;
            }
            .dizhi{
                padding: .2rem 0;
                box-sizing: border-box;
                .tit{
                    font-size: .28rem;
                }
                .dingzhi-form-textarea{
                    display: flex;
                    justify-content: space-between;
                    div{
                        width: 3.25rem;
                        text-align: left;
                        height: .6rem;
                        line-height: .6rem;
                        margin-top: .2rem;
                        font-size: .26rem;
                    }
                    textarea{
                        margin-top: .2rem;
                        resize: none;
                        text-indent: .5rem;
                        width: 100%;
                        height: 2.8rem;
                        padding: .4rem .3rem;
                        font-size: .24rem;
                    }
                    textarea::placeholder{
                        color: #b4b4b4;
                        font-size: .24rem;
                    }
                }
                .dingzhi-form{
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    margin-top: .2rem;
                    .dingzhi-form-name{
                        line-height: .6rem;
                        height: .6rem;
                        font-size: .28rem;
                    }
                    input{
                        width: 3.25rem;
                        text-align: left;
                        height: .9rem;
                        padding: .2rem;
                        box-sizing: border-box;
                    }
                }
                .txt{
                    outline: none;
                    border: .02rem solid #ccc;
                    color: #333;
                    box-sizing: border-box;
                }
                .btn{
                    display: block;
                    margin: .5rem auto 0 auto;
                    width: 4.64rem;
                    height: .8rem;
                    line-height: .8rem;
                    text-align: center;
                    background-color: #f00000;
                    border-radius: .1rem;
                    color: #fff;
                    font-size: .32rem;
                }
                .btn:active{
                    background-color: #C50000;
                }
                .forget{
                    text-align: right;
                    color: #999;
                    line-height: .4rem;
                    font-size: .24rem;
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
