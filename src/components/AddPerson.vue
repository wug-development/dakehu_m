<template>
    <div id="AddPerson" class="addperson-box">
        <Header :name="pageTitle"></Header>
        <div class="person-form">
            <div class="notice">请确保填写信息准备无误，顾客姓名必须是拼音或英文</div>
            <div class="form-box" v-if="PersonList.length">
                <ul class="text-box" v-for="(item, index) in PersonList.slice(0,1)" :key="index">
                    <li class="text-item">
                        <span class="text-item-key">姓名：</span>
                        <input type="text" @blur="checkName" v-model="item.CjrName" placeholder="与乘机人证件一致" maxlength="20">
                        <div class="use" v-if="userID && list[0].values.length>0" @click="showChengjiren">常用乘机人</div>
                    </li>
                    <li class="text-item">
                        <span class="text-item-key middle">出生年月：</span>
                        <input type="text" readonly @click="selBirth(0, item.type)" v-model="item.CSRQ" placeholder="请选择出生日期" maxlength="20">
                    </li>
                    <li class="text-item">
                        <span class="text-item-key middle">护照号码：</span>
                        <input type="text" @blur="checkPassport" v-model="item.HZH" placeholder="请填写护照号码" maxlength="15">
                    </li>
                    <li class="text-item">
                        <span class="text-item-key lager">护照有效期：</span>
                        <input type="text" readonly @click="huzhaoShow=true;selIndex=0" v-model="item.HZYXQ" placeholder="请选择护照有效期" maxlength="20">
                    </li>
                    <li class="text-item">
                        <span class="text-item-key">性别：</span>
                        <mt-radio v-model="item.Sex" :options="['男', '女']"></mt-radio>
                    </li>
                </ul>
            </div>
            <div class="new-person">
                <div class="chengjiren" v-if="PersonList.length>1">
                    <ul class="text-box" v-for="(item, i) in PersonList.slice(1,PersonList.length)" :key="i">
                        <li class="text-item">
                            <span class="text-item-key">姓名：</span>
                            <input type="text" placeholder="与乘机人证件一致" maxlength="20" @blur="checkName" v-model="item.CjrName">
                            <div class="del" @click="del(i+1)">—</div>
                        </li>
                        <li class="text-item">
                            <span class="text-item-key middle">出生年月：</span>
                            <input type="text" placeholder="请选择出生日期" maxlength="20" readonly @click="selBirth(i+1, item.type)" v-model="item.CSRQ">
                        </li>
                        <li class="text-item">
                            <span class="text-item-key middle">护照号码：</span>
                            <input type="text" placeholder="请填写护照号码" maxlength="15" @blur="checkPassport" v-model="item.HZH">
                        </li>
                        <li class="text-item">
                            <span class="text-item-key lager">护照有效期：</span>
                            <input type="text" placeholder="请选择护照有效期" maxlength="20" readonly @click="huzhaoShow=true;selIndex=i+1" v-model="item.HZYXQ" >
                        </li>
                        <li class="text-item">
                            <span class="text-item-key">性别：</span>
                            <mt-radio v-model="item.Sex" :options="['男', '女']"></mt-radio>
                        </li>
                    </ul>
                </div>

                <div class="add"><span @click="addChengren">+新增乘机人</span></div>

            </div>
        </div>
        <div class="amount">
            <span>￥{{amountPrice}}</span>
            <a @click="submit">提 交</a>
        </div>
        <DateTime :dateShow="birthShow" :startTime="this.utils.getAfterNDate(-100, 'y')" :endTime="new Date()" v-on:confirm="birthConfirm" v-on:cancel="selIndex=-1;birthShow=false"></DateTime>
        <DateTime :dateShow="huzhaoShow" :startTime="new Date()" :endTime="this.utils.getAfterNDate(100, 'y')" v-on:confirm="huzhaoConfirm" v-on:cancel="selIndex=-1;huzhaoShow=false"></DateTime>
        <PickerList :dataList='dataList' :isShow="showPerson" :keys="listKey" v-on:selValue="checkUser" v-on:cancelList="showPerson=false"></PickerList>
    </div>
</template>

<script>
import Header from './public/HeaderBack.vue'
import PickerList from './public/PickerList.vue'
import DateTime from './public/DateTime.vue'

import { setInterval, setTimeout } from 'timers';
export default {
    name: 'AddPerson',
    data() {
        return {
            pageTitle: '填写乘机人',
            tgqLayer: false,
            dataList: [{values:[]}],
            showPerson: false,
            PersonList: [],
            pList: [],
            userID: 0,
            username: '',
            pass: '',
            email: '',
            tel: '',
            cname: '',
            amountPrice: 0,
            airPrice: 0,
            airTax: 0,
            linkname: '',
            birthday: '',
            passport: '',
            passporttime: '',
            sex: '',
            birthShow: false,
            huzhaoShow: false,
            selIndex: -1,
            listKey: '',
            list: [{values:[]}],
            isSubmitIng: false,
            person: {
                CjrName: '',//联系人
                Sex: '',//性别
                HZH: '',//护照号码
                HZYXQ: '',//护照有效期
                CSRQ: '',//出生日期
                SFZ: '',//身份证
                type: '1',//类型1成人 0儿童
                ID: ''
            },
            orderID : '',
            flightID: '',
            startInfo: {},
            backInfo: {}

        }
    },
    components: {
        Header,
        PickerList,
        DateTime
    },
    methods : {
        showChengjiren () {
            this.showPerson = true
            this.listKey = 'CjrName'
            this.dataList = this.list
        },
        checkUser (val) {
            console.log(val)
            this.showPerson = false
            if(val.length<1){
                return false
            }
            let i = this.PersonList.findIndex(function(e){
                return e.CjrName == val[0].CjrName
            })
            if(i<0){
                let p = this.PersonList[0]
                let myDate = this.utils.dateFormat('yyyy')
                if(val[0].CSRQ.length>5){
                    let age = parseInt(myDate) - parseInt(val[0].CSRQ.substr(0,4))
                    if (age > 12) {
                        val[0].type = '1'
                    }else{
                        val[0].type = '0'
                    }
                }else{
                    val[0].type = '1'
                }
                if(this.PersonList.length<2 && p.CjrName == '' && p.Sex == '' && p.HZH == '' && p.HZYXQ == '' && p.CSRQ == ''){
                    this.PersonList[0] = val[0]
                }else{
                    this.PersonList.push(val[0])
                }
                countAmount(this)      
            }
        },
        checkName (e) {
            let v = e.target.value
            if(v.length < 0 || v.length > 20 || !this.utils.englishName(v)){
                this.utils.alert(this, '姓名必须是拼音或英文')
            }
        },
        checkPassport (e) {
            let v = e.target.value
            if (v.length > 50 || this.utils.isEn(v) || !this.utils.isNumberEn(v)) {
                this.utils.alert(this, '格式不正确')
            } else if(v.length<1){
                this.utils.alert(this, '请输入护照号码')
            }
        },
        birthConfirm(v){
            let val = this.utils.dateFormat(v, 'yyyy-MM-dd').split('-')
            if(this.PersonList[this.selIndex].type === '0'){
                let myDate = this.utils.dateFormat('yyyy')
                let age = parseInt(myDate) - parseInt(val[0])
                if (age > 12) {
                    this.utils.alert(this, '该乘客年龄超出，请重新选择')
                    this.birthShow = false
                    return false
                }
            }
            this.PersonList[this.selIndex].CSRQ = this.utils.dateFormat(v, "yyyyMMdd")
            this.birthShow = false
            this.selIndex = -1
        },
        huzhaoConfirm(v){
            this.PersonList[this.selIndex].HZYXQ = this.utils.dateFormat(v, "yyyy-MM-dd")
            this.huzhaoShow = false
            this.selIndex = -1
        },
        selBirth(i, type) {
            this.birthShow = true;
            this.selIndex = i
        },
        addChengren () {
            this.person.type = '1'
            this.PersonList.push(JSON.parse(JSON.stringify(this.person)))
            countAmount(this)   
        },
        addErtong () {
            this.person.type = '0'
            this.PersonList.push(JSON.parse(JSON.stringify(this.person)))
            countAmount(this)
        },
        del (i) {
            this.PersonList.splice(i,1)
            countAmount(this)
        },
        submit () {
            let ischeck = checkVal(this)
            
            if(ischeck && !this.isSubmitIng){
                let that = this
                // this.Indicator.open('提交中...')
                
                let AirType = '单程'
                const types = this.utils.getItem("ttype")

                let startDate = this.utils.getItem("stime")
                let startCity = this.utils.getItem("scity")
                let endDate = ''
                let endCity = ''
                let toIDS = []
                let toBackIDS = []
                for (let i in this.startInfo.otherFlight) {
                    toIDS.push(this.startInfo.otherFlight[i].SubAirID)
                }
                if(types == 1 || types == '1'){
                    AirType = '往返'
                    endDate = this.utils.getItem("etime")
                    endCity = this.utils.getItem("ecity")
                    for (let i in this.backInfo.otherFlight) {
                        toBackIDS.push(this.backInfo.otherFlight[i].SubAirID)
                    }
                }

                const params = {
                    cid: this.userID,
                    cname: this.username,
                    persons: this.pList,
                    airinfo: {
                        airtype: types,
                        startDate: startDate,
                        backDate: endDate,
                        startCity: startCity,
                        backCity: endCity,
                        flightInfo: {
                            airID: this.startInfo.AirID,
                            ticketID: this.startInfo.jipiao.TicketID,
                            detailID: this.startInfo.piaojia.DetailID,
                            toFlightInfo: toIDS
                        },
                        backFlightInfo: {
                            airID: this.backInfo.AirID,
                            ticketID: this.backInfo.jipiao.TicketID,
                            detailID: this.backInfo.piaojia.DetailID,
                            toFlightInfo: toBackIDS
                        }
                    }
                }
                console.log(params)
                this.utils.http({
                    name: this,
                    uri: '/order/submitorder',
                    method: 'post',
                    params: params,
                    success: res=>{
                        console.log(111)
                        if(res.status === 200 && res.data.status === 1){
                            this.MessageBox('下单成功！').then(action => {
                                this.$router.push({
                                    path: '/orderlist'
                                })
                            })                            
                        } else {
                            this.MessageBox('下单成功！', res.data.msg)
                        }
                    }
                })
            }
        }
    },
    created () {
        const _account = this.utils.getAccount(this)
        this.userID = _account.id || ''
        this.username = _account.uname

        this.PersonList.push(JSON.parse(JSON.stringify(this.person)))   
        this.airPrice = parseInt(this.utils.getItem('orderprice'))   
        this.airTax = parseInt(this.utils.getItem('ordertax'))
        this.amountPrice = this.airPrice + this.airTax
        this.startInfo = JSON.parse(this.utils.getItem("startInfo"))
        this.backInfo = JSON.parse(this.utils.getItem("backInfo"))

        if(this.userID){
            this.utils.http({
                name: this,
                uri: '/passenger/getpersons',
                params: {
                    params: { id: this.userID}
                },
                success: res=>{
                    if(res.status === 200 && res.data.status === 1){
                        this.list[0].values = res.data.data
                    }
                }
            })
        } else {
            this.tel = this.utils.getItem('lmtel')
            this.username = this.utils.getItem('lmname')
            this.email = this.utils.getItem('lmemail')
            this.pass = this.utils.getItem('lmpass')
        }

        // document.body.style.overflow='hidden';        
        document.addEventListener("touchmove",function(e){e.preventDefault();},false);//禁止页面滑动
    },
}

function randomNum(min, max) {
    let text = ''
    for(let i=0;i<6;i++){
        text += Math.floor(min + Math.random() * (max - min))
    }
    return text
}

function countAmount(vue){
    let p = vue.airPrice
    let t = vue.airTax
    let len = vue.PersonList.length
    let amount = 0
    for(let i in vue.PersonList){
        if(vue.PersonList[i].type == '1'){
            amount += p + t
        }else{
            amount += p*0.75 + t
        }
    }
    vue.amountPrice = amount
}

function checkVal(vue) {
    let ischeck = true
    let p = vue.PersonList        

    for(let i in p){
        vue.pList[i] = {}
        vue.pList[i].PName = vue.utils.clearSpace(p[i].CjrName)
        vue.pList[i].PCode = ""
        vue.pList[i].PHZ = vue.utils.clearSpace(p[i].HZH)
        vue.pList[i].PBD = vue.utils.clearSpace(p[i].CSRQ)
        vue.pList[i].PSEX = vue.utils.clearSpace(p[i].Sex)
        vue.pList[i].PHZYXQ = vue.utils.clearSpace(p[i].HZYXQ)
        vue.pList[i].PTYPE = p[i].type
        vue.pList[i].FlightID = 0
        vue.pList[i].ID = p[i].id
        let myDate = vue.utils.dateFormat('yyyy')
        let age = 0
        if(p[i].CSRQ.length > 1){
            age = parseInt(myDate) - parseInt(p[i].CSRQ.substr(0,4))
        }
        if(p[i].CjrName.length < 1 || p[i].CjrName.length > 20 || !vue.utils.englishName(p[i].CjrName)){
            vue.utils.alert(vue, '第' + (parseInt(i)+1) + '位乘机人姓名必须是拼音或英文')
            ischeck = false
            break
        }else if(p[i].HZH.length < 1){
            vue.utils.alert(vue, '请输入第' + (parseInt(i)+1) + '位乘机人的护照号码')
            ischeck = false
            break
        }else if(p[i].HZH.length > 50 || vue.utils.isEn(p[i].HZH) || !vue.utils.isNumberEn(p[i].HZH)){
            vue.utils.alert(vue, '第' + (parseInt(i)+1) + '位乘机人护照号码格式不正确')
            ischeck = false
            break
        }else if(p[i].CSRQ.length < 1){
            vue.utils.alert(vue, '请选择第' + (parseInt(i)+1) + '位乘机人的出生日期')
            ischeck = false
            break
        }else if(p[i].type == '0' && age > 12){
            vue.utils.alert(vue, '第' + (parseInt(i)+1) + '位乘机人年龄超出，请重新选择出生日期')
            ischeck = false
            break
        }else if(p[i].Sex.length < 1){
            vue.utils.alert(vue, '请选择第' + (parseInt(i)+1) + '位乘机人的性别')
            ischeck = false
            break
        }
    }
    return ischeck
}

</script>

<style lang="scss">
    @import '@/assets/sass/set.scss';
    .addperson-box{
        position: relative;
        height: 100%;
        min-height: 12.44rem;
        background-color: #f4f4f4;
        .person-form{
            padding-top: .9rem;
            padding-bottom: 3.3rem;
            box-sizing: border-box;
            height: 100%;
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;
            .notice{
                background: url("../assets/images/notice.png") no-repeat;
                background-size: .32rem .32rem;
                background-position-x: .6rem;
                background-position-y: center;
                background-color: #ffffdb;
                height: .8rem;
                line-height: .8rem;
                padding-left: 1rem;
                color: #6e6e6e;
                font-size: .24rem;
            }
            .form-box{
                background-color: #fff;
                padding: 0 .2rem;
                box-sizing: border-box;
                .text-box{
                    padding: 0;
                }
            }
            .new-person{
                padding: .2rem .1rem;
                .chengjiren{
                    .text-box{
                        margin-bottom: .2rem;
                    }
                }
                .add{
                    line-height: .5rem;
                    display: flex;
                    padding-left: .1rem;
                    span{
                        border: .02rem solid #fa6c1c;
                        width: 1.8rem;
                        text-align: center;
                        border-radius: .1rem;
                        font-size: .28rem;
                        color: #777;
                    }
                }

            }
        }
        .text-box{
            font-size: .28rem;
            color: #666;
            background-color: #fff;
            padding: 0 .2rem;
            box-sizing: border-box;
            .text-item{
                position: relative;
                height: .8rem;
                line-height: .8rem;
                border-bottom: .02rem dotted #ccc;
                padding: 0 .3rem;
                box-sizing: border-box;
                display: flex;
                overflow: hidden;
                .text-item-key{
                    min-width: 1rem;
                }
                .middle{
                    min-width: 1.5rem;
                }
                .lager{
                    min-width: 1.8rem;
                }
                input{
                    width: 100%;
                    box-sizing: border-box;
                    border: 0;
                    font-size: .28rem;
                }
                input::placeholder{
                    color: #aaa;
                    font-size: .28rem;
                }
                .del{
                    position: absolute;
                    top: .2rem;
                    right: .1rem;
                    width: .4rem;
                    height: .4rem;
                    background-color: #FB9653;
                    color: #fff;
                    border-radius: .4rem;
                    font-size: .24rem;
                    line-height: .4rem;
                    text-align: center;
                }
                .use{
                    position: absolute;
                    top: .2rem;
                    right: .1rem;
                    width: 1.6rem;
                    height: .4rem;
                    background-color: #f00000;
                    color: #fff;
                    border-radius: .08rem;
                    font-size: .24rem;
                    line-height: .4rem;
                    text-align: center;
                }
                .mint-radiolist{
                    display: flex;
                    .mint-radiolist-title{
                        margin: 0;
                    }
                    .mint-cell{
                        width: auto;
                        min-height: auto;
                        .mint-cell-wrapper{
                            height: 100%;
                            padding-left: 0;
                            font-size: .28rem;
                            background-image: none;
                            .mint-radiolist-label{
                                padding-left: 0;
                                .mint-radio-core{
                                    width: .28rem;
                                    height: .28rem;
                                    border: .02rem solid #ccc;
                                }
                                .mint-radio-core::after{
                                    width: .12rem;
                                    height: .12rem;
                                    left: .06rem;
                                    top: .06rem;
                                }
                            }
                        }
                    }
                    .mint-cell:last-child{
                        background-image: none;
                    }
                }
            }
            .text-item:last-child{
                border: 0;
            }
        }
        .amount{
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: .8rem;
            background-color: #fff;
            padding: 0 .2rem;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            span{
                color: #f00000;
                font-size: .4rem;
                line-height: .8rem;
            }
            a{
                width: 2rem;
                height: .6rem;
                background-color: $pubcolor;
                color: #fff;
                font-size: .32rem;
                text-align: center;
                margin-top: .1rem;
                line-height: .6rem;
                border-radius: .1rem;
            }
        }
        .footer{
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
        }
    }
</style>
