<template>
    <div class="whiteinfo-box">
        <Header class="flight-header" :name="pageTitle"></Header>
        <div class="whiteinfo-body">
            <div class="whiteinfo-body-flightinfo">
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
                        <div>机建+燃油：{{flight.airportTax}}+{{flight.fuelTax}}元</div>
                        <div>
                            <span class="tgq" @click="checkTGQ(flight.flightNo.substr(0,2), seat.seatCode, 0)">退改签规定</span>
                            <span @click="showGPTip">购票须知</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="whiteinfo-person-list">
                <div class="person-item" v-for="(item, i) in selPersonList" :key="i">
                    <div class="div-item"><span>姓名：</span><input type="text" v-model="item.name" placeholder="与乘机证件一致"></div>
                    <div class="div-item"><span>证件信息：</span><input type="text" v-model="item.idcard" placeholder="请填写证件信息"></div>
                    <div class="div-item"><span>乘机人手机：</span><input type="text" v-model="item.phone" placeholder="请填写乘机人手机号"></div>
                    <div class="div-item"><span>紧急人手机：</span><input type="text" v-model="item.jjphone" placeholder="请填写紧急联系人手机号"></div>
                    <div class="div-item"><span>购买保险：</span><input type="tel" v-model="item.safenum" > 份</div>
                </div>
                <div class="addperson" @click="addItem">+新增乘机人</div>
                <div class="btn-persons" v-if="allPerson.length" @click="showPerson">常用乘机人</div>
            </div>
            <div class="div-submit">
                <span>&yen;{{seat.parPrice}}</span>
                <div class="btn" @click="submitOrder">提交</div>
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
            search: {},
            beizhu: '',
            startDate: '',
            flight: {},
            seat: {},
            tgqLayer: false,
            allPerson: [],
            person: {
                id: '',
                type: '成人',
                name: '',
                cardtype: '1',
                idcard: '',
                phone: '',
                jjphone: '',
                safenum: 0
            },
            selPersonList: [],
            account: {},
            isLoading: false
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
        checkTGQ (v, code, n) {
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
        showGPTip () {
            this.beizhu = '婴儿不能单独订票，一位成人最多限带两名婴儿，儿童必须有成人陪伴。如无成人陪伴 请在订单里备注。'
            this.tgqLayer = true
        },
        addItem () {
            this.selPersonList.push(JSON.parse(JSON.stringify(this.person)))
        },
        showPerson () {
            this.utils.setItem('plist', JSON.stringify(this.allPerson))
            this.$router.push({ path: '/personlist' })
        },
        getPerson (id) {
            this.$http.get(this.uris + '/passenger/GetPersonList', {params: {
                cid: id
            }})
            .then(res => {
                if (res && res.data && res.data.status != 0) {
                    this.allPerson = res.data.data
                    for(let i in this.allPerson) {
                        this.allPerson[i].checked = false
                        this.allPerson[i].safenum = 0
                    }
                }
            })
        },
        selPersonEven () {
            for (let i in this.allPerson) {
                if (this.allPerson[i].checked) {
                    this.selPersonList.push(JSON.parse(JSON.stringify(this.allPerson[i])))
                }
            }
            if (this.selPersonList.length < 1) {
                this.addItem()
            }
        },
        verifyPerson () {
            let isCheck = true
            for (let i in this.selPersonList) {
                if (this.selPersonList[i].name.trim() == '') {
                    isCheck = false;
                    this.MessageBox('请输入第 ' + (Number(i) + 1) + ' 位乘机人的姓名')
                    break;
                } else if (this.selPersonList[i].idcard.trim() == '') {
                    isCheck = false;
                    this.MessageBox('请输入第 ' + (Number(i) + 1) + ' 位乘机人的证件号码')
                    break;
                } else if (this.selPersonList[i].phone.trim() == '') {
                    isCheck = false;
                    this.MessageBox('请输入第 ' + (Number(i) + 1) + ' 位乘机人的联系电话')
                    break;
                } else if (this.selPersonList[i].jjphone.trim() !== '' && this.selPersonList[i].jjphone.trim() === this.selPersonList[i].phone.trim()) {
                    isCheck = false;
                    this.MessageBox('请输入第 ' + (Number(i) + 1) + ' 位乘机人的联系电话和紧急人联系电话不能一致！')
                    break;
                }
            }
            return isCheck
        },
        submitOrder () {
            if (!this.isLoading && this.verifyPerson()) {
                this.loading = true
                let orderBody = {
                    cid: this.account.id,
                    scity: this.search.scity,
                    ecity: this.search.ecity,
                    sdate: this.startDate,
                    cname: this.account.uname,
                    personlist: this.selPersonList,
                    airbody: this.flight,
                    airseat: this.seat
                }
                this.$http.post(this.uris + '/gnorder/submitordercn', orderBody)
                .then(res => {
                    this.loading = false
                    if (res && res.data && res.data.status != 0) {
                        this.MessageBox("下单成功！", '温馨提示').then(()=>{
                            this.$router.push({
                                path: '/orderlist'
                            })
                            this.utils.setItem('selFlight', '')
                            this.utils.setItem('bookFlightSeat', '')
                            this.utils.setItem('plist', '')
                        })
                    } else {
                        this.MessageBox("下单失败，请检查数据！", '温馨提示')
                    }
                }).catch(res => {
                    this.loading = false
                })
            }
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
        let sflight = this.utils.getItem("sflight")
        let eflight = this.utils.getItem("eflight")
        this.startCity = scity;
        this.endCity = ecity;
        this.startDate = stime;
        this.pageTitle = scity + '-' + ecity
        this.search = {
            scity: {
                airportname: sflight,
                code: scode,
                name: scity
            },
            ecity: {
                airportname: eflight,
                code: ecode,
                name: ecity
            }
        }

        let f = this.utils.getItem('selFlight')
        if (f) {
            this.flight = JSON.parse(f)
            let s = this.utils.getItem('bookFlightSeat')
            this.seat = JSON.parse(s)
            let _account = this.utils.getItem('account')
            if (_account) {
                this.account = JSON.parse(_account)
                console.log(this.account)
                let _plist = this.utils.getItem('plist')
                if (_plist) {
                    this.allPerson = JSON.parse(_plist)
                    this.selPersonEven()
                } else {
                    this.getPerson(this.account.id)
                    this.addItem()
                }
            }
        } else {
            this.$router.push({
                path: '/index'
            })
        }
    }
}
</script>

<style lang="scss">
.whiteinfo-box{
    min-height: 100%;
    height: 100%;
    background: linear-gradient(#29ad7f 1rem, #EFEFEF 5rem);
    overflow: hidden;
    font-size: .24rem;
    .whiteinfo-body{
        padding: .9rem 0 1.2rem 0;
        height: 100%;
        overflow: hidden auto;
        box-sizing: border-box;
        .whiteinfo-body-flightinfo{
            padding: .2rem;
            box-sizing: border-box;
            .item-box{
                background-color: #fff;
                border-radius: .08rem;
                padding: .2rem 0 .2rem .2rem;
                box-sizing: border-box;
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
                    width: 6.4rem;
                    color: #9b9a9a;
                    padding-top: .1rem;
                    display: flex;
                    justify-content: space-between;
                    span{
                        line-height: .3rem;
                        padding: 0 .1rem;
                        border-left: .02rem solid #ccc;
                        color: #29ad80;
                    }
                    .tgq{
                        border: 0;
                    }
                }
            }
        }
        .whiteinfo-person-list{
            position: relative;
            .person-item{
                background-color: #fff;
                padding: 0 .2rem;
                box-sizing: border-box;
                margin-bottom: .2rem;
                .div-item{
                    display: flex;
                    line-height: .8rem;
                    border-top: .02rem dotted #ccc;
                    padding: 0 .2rem;
                    font-size: .32rem;
                    box-sizing: border-box;
                    color: #6e6e6e;
                    span{
                        white-space: nowrap;
                        padding-right: .2rem;
                    }
                    input[type=text]{
                        width: 100%;
                        height: .78rem;
                        line-height: .78rem;
                        border: 0;
                    }
                    input[type=tel]{
                        width: .8rem;
                        height: .78rem;
                        line-height: .78rem;
                        border: 0;
                        border-bottom: .04rem solid #666;
                        box-sizing: border-box;
                        text-align: center;
                    }
                }
                .div-item:first-child{
                    border: 0;
                }
            }
            .addperson{
                color: #f37e29;
                border: .02rem solid #f37e29;
                border-radius: .08rem;
                padding: .1rem .2rem;
                margin: .2rem;
                width: 1.4rem;
            }
            .btn-persons{
                position: absolute;
                right: .3rem;
                top: .14rem;
                background-color: #F37E29;
                color: #fff;
                font-size: .32rem;
                border-radius: .08rem;
                padding: 0 .2rem;
                height: .5rem;
                line-height: .5rem;
            }
        }
    }
    .div-submit{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1.2rem;
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        padding: .2rem;
        box-sizing: border-box;
        border-top: .02rem solid #ddd;
        span{
            color: #f00;
            font-size: .44rem;
            line-height: .8rem;
            padding-left: .2rem;
        }
        .btn{
            line-height: .8rem;
            border-radius: .08rem;
            font-size: .36rem;
            width: 2rem;
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