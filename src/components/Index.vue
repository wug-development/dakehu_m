<template>
    <div id="Index" class="index-box">
        <Header name="M秒奇艺" bgcolor=""></Header>
        <div class="index-body">            
            <div class="banner">
                <img src="../assets/images/index_banner_bg.png" alt="">
            </div>

            <div class="searchticket">
                <div class="ticket-tab">
                    <div @click="changeRegion(0)" :class="flightType==0?'cur gn':'gn'">国内机票</div>
                    <div @click="changeRegion(1)" :class="flightType==1?'cur gj':'gj'">国际机票</div>
                </div>
                <div class="ticket-type">
                    <div @click="ticketType=0" :class="ticketType==0?'cur':''"><span></span>单程</div>
                    <div v-show="flightType" @click="ticketType=1" :class="ticketType==1?'cur':''"><span></span>往返</div>
                    <div @click="ticketType=2" :class="ticketType==2?'cur':''"><span></span>定制行程</div>
                </div>
                <div class="search-from" v-show="ticketType!=2">
                    <div class="form-goto go">
                        <input type="text" readonly v-model="flightInfo.startCityText" @click="showStartCity" placeholder="出发城市" >
                    </div>
                    <div class="form-goto out" v-show="flightType==1">
                        <input type="text" readonly v-model="flightInfo.endCityText" @click="showEndCity('gj')" placeholder="到达城市" >
                    </div>
                    <div class="form-goto out" v-show="flightType==0">
                        <input type="text" readonly v-model="flightInfo.endCityText" @click="showEndCity('gn')" placeholder="到达城市" >
                    </div>
                    <div class="date">
                        <div class="form-date go-date">
                            <input type="text" readonly v-model="flightInfo.startTime" @click="showStartDate" placeholder="出发日期">
                        </div>
                        <div class="form-date out-date" v-show="ticketType">
                            <input type="text" readonly v-model="flightInfo.endTime" @click="showEndDate" placeholder="返回日期">
                        </div>
                    </div>
                    <div class="btn" @click="findFlight">
                        查询航班
                    </div>
                </div>
                <div class="book-box" v-show="ticketType==2">
                    <textarea name="" id="" cols="30" rows="10" v-model="dzContent" placeholder="请尽量写清楚您的航班需求，我们将量身为您制定行程！"></textarea>
                    <div class="btn" @click="saveDingzhi">
                        提交
                    </div>
                </div>
            </div>

            <div class="logininfo">
                <div class="tab-title">登录信息</div>
                <div class="info-tab">
                    <div class="accpass account">
                        <div>{{accountInfo.username}}</div>
                        <span>公司简称</span>
                    </div>
                    <div class="accpass pass">
                        <div>{{accountInfo.password}}</div>
                        <span>登录密码</span>
                    </div>
                </div>
            </div>

            <div class="linkmaninfo">
                <div class="tab-title">联系人信息</div>
                <ul class="linkman-box">
                    <li v-for="(item, i) in linkmans" :key="i">
                        <div class="linkman-infobox">
                            <div class="name">
                                <span>{{item.linkname}}</span>
                            </div>
                            <div class="phone">
                                手机号<span>{{item.phone}}</span>
                            </div>
                            <div :class='"down-up" + (other.linkman===item.id? " cur" : "")' @click="openMoreInfo(item.id)">
                                {{other.linkman===item.id? "关闭" : "展开"}}
                            </div>
                        </div>
                        <div class="other-info" v-show="other.linkman===item.id">
                            <div><span>微信号</span>{{item.wechat}} </div>
                            <div><span>QQ</span>{{item.qq}}</div>
                            <div><span>邮&nbsp;&nbsp;&nbsp;箱</span>{{item.email}}</div>
                        </div>
                    </li>
                </ul>
                <div class="xyed-box">
                    <mt-swipe :auto="4000">
                        <mt-swipe-item>
                            <div class="xyed-bg dxqk">
                                <div class="moneys"><span>当前欠款</span><div>&yen;100000</div></div>
                                <div class="company">保利科技的信用信息</div>
                            </div>
                        </mt-swipe-item>
                        <mt-swipe-item>
                            <div class="xyed-bg xyed">
                                <div class="moneys"><span>信用额度</span>&yen;100000</div>
                                <div class="company">保利科技的信用信息</div>
                            </div>
                        </mt-swipe-item>
                        <mt-swipe-item>
                            <div class="xyed-bg jszq">
                                <div class="moneys"><span>结算周期</span>自然月</div>
                                <div class="company">保利科技的信用信息</div>
                            </div>
                        </mt-swipe-item>
                    </mt-swipe>
                </div>
            </div>

            <div class="branchoffice">
                <div class="tab-title">分公司信息</div>
                <div class="branchoffice-box">
                    <div class="tab">
                        <span :class='other.subc === i?"cur":""' @click="other.subc = i" v-for="(item, i) in subCompanyLinkMans" :key="i">{{item.uname}}</span>
                    </div>
                    <ul class="tab-info">
                        <li v-for="(item, i) in subCompanyLinkMans" :key="i" v-show='other.subc === i'>
                            <div class="title">{{item.uname}}</div>
                            <div class="tab-info-box">
                                <div><span>登录密码</span>{{item.upass}}</div>
                                <div><span>联系人</span>{{item.linkname}}</div>
                                <div><span>联系电话</span>{{item.phone}}</div>
                                <div><span>邮箱</span>{{item.email}}</div>
                                <div><span>QQ</span>{{item.qq}}</div>
                                <div><span>微信号</span>{{item.wechat}}</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="baseline"><span>我是有底线的</span></div>
        </div>
        <Footer></Footer>
        <CityList cityTitle="选择出发城市" :cityList="startCityList" :cityShow="visibleStartCity" v-on:close="visibleStartCity=false" v-on:chooseCity='selStartCity'></CityList>
        <CityList cityTitle="选择到达城市" :cityList="gjendCityList" :cityShow="visibleGJEndCity" v-on:close="visibleGJEndCity=false" v-on:chooseCity='selEndCity'></CityList>
        <CityList cityTitle="选择到达城市" :cityList="gnendCityList" :cityShow="visibleGNEndCity" v-on:close="visibleGNEndCity=false" v-on:chooseCity='selEndCity'></CityList>
        <DatePicker title="选择出发时间" :dateShow="startDateShow" :endDate="startEndTime" v-on:chooseDate="startConfirm" v-on:close="startCancel"></DatePicker>
        <DatePicker title="选择到达时间" :dateShow="endDateShow" :startDate="flightInfo.startTime" :endDate="startEndTime" v-on:chooseDate="endConfirm" v-on:close="endCancel"></DatePicker>
    </div>
</template>

<script>
import Header from './public/Header.vue'
import Footer from './public/Footer.vue'
import CityList from './public/CityList.vue'
import DatePicker from './public/DatePicker.vue'

export default {
    name: 'Index',
    data () {
        return {
            flightType: 1,
            ticketType: 1,
            accountInfo: {
                id: '',
                username: '',
                password: ''
            },
            flightInfo: {
                startCity: '',
                startCityValue: '',
                startCityShort: '',
                startCityText: '',
                endCity: '',
                endCityValue: '',
                endCityShort: '',
                endCityText: '',
                startTime: '',
                endTime: ''
            },
            startCityList: [],
            gjendCityList: [],
            gnendCityList: [],
            startDateShow: false,
            endDateShow: false,
            visibleStartCity: false,
            visibleGJEndCity: false,
            visibleGNEndCity: false,
            startEndTime: '',
            startTime: '',
            linkmans: [],
            subCompanyLinkMans: [],
            other: {
                linkman: '',
                subc: 0
            },
            dzContent: ''
        }
    },
    methods: {
        findFlight: function () {
            if (this.flightInfo.startCityShort === "") {
                this.utils.alert(this, '请选择出发城市')
            }else if (this.flightInfo.endCityShort === "") {
                this.utils.alert(this, '请选择到达城市')
            }else if (this.flightInfo.startTime === "") {
                this.utils.alert(this, '请选择出发时间')
            } else if (this.flightType === 1 && this.ticketType === 1 && this.flightInfo.endTime === "") {
                this.utils.alert(this, '请选择到达时间')
            } else {
                this.utils.setItem("scity", this.flightInfo.startCity)
                this.utils.setItem("scode", this.flightInfo.startCityShort)
                this.utils.setItem("sflight", this.flightInfo.startCityValue)
                this.utils.setItem("ecity", this.flightInfo.endCity)
                this.utils.setItem("ecode", this.flightInfo.endCityShort)
                this.utils.setItem("eflight", this.flightInfo.endCityValue)
                this.utils.setItem("stime", this.flightInfo.startTime)
                this.utils.setItem("etime", this.flightInfo.endTime)
                this.utils.setItem("ttype", this.ticketType)
                this.utils.setItem("ftype", this.flightType)
                if (this.flightType === 1) {
                    this.$router.push({
                        path: '/flightlist'
                    })
                } else {
                    this.$router.push({
                        path: '/gnflightlist'
                    })
                }
            }
        },
        selStartCity: function(val){
            this.flightInfo.startCity = val.name
            this.flightInfo.startCityValue = val.airportname
            this.flightInfo.startCityShort = val.code
            this.flightInfo.startCityText = val.airportname + '(' + val.code + ')'
            this.visibleStartCity = false
        },
        selEndCity: function(val){
            this.flightInfo.endCity = val.name
            this.flightInfo.endCityValue = val.airportname
            this.flightInfo.endCityShort = val.code
            this.flightInfo.endCityText = val.airportname + '(' + val.code + ')'
            this.visibleGJEndCity = false
            this.visibleGNEndCity = false
        },
        startConfirm: function(val){
            this.flightInfo.startTime = this.utils.dateFormat(val, "yyyy-MM-dd")
            this.endStartTime = this.utils.getAfterNDate(val, 1, 'd')
            this.startDateShow = false
            if(this.flightInfo.endTime && this.utils.dateTab(this.flightInfo.startTime, this.flightInfo.endTime)){
                this.flightInfo.endTime = ''
            }
        },
        startCancel: function(){
            this.startDateShow = false
        },
        endConfirm: function(val){
            this.flightInfo.endTime = this.utils.dateFormat(val, "yyyy-MM-dd")
            this.startEndTime = this.utils.getAfterNDate(val, -1, 'd')
            this.endDateShow = false
        },
        endCancel: function(){
            this.endDateShow = false
        },
        showStartCity: function(){
            if(this.startCityList.length){
                this.visibleStartCity = true
            }else{
                this.utils.alert(this, '城市加载中...')
            }
        },
        showEndCity: function(ty){
            if (ty === 'gj') {
                if(this.gjendCityList.length){
                    this.visibleGJEndCity = true
                }else{
                    this.utils.alert(this, '城市加载中...')
                }
            } else {
                if(this.gnendCityList.length){
                    this.visibleGNEndCity = true
                }else{
                    this.utils.alert(this, '城市加载中...')
                }
            }            
        },
        changeRegion: function (v) {
            this.flightType = v
            this.ticketType = v
            let ecity = '洛杉矶  (加利福尼亚州) '
            let ecode = 'LAX'
            let eflight = '洛杉矶国际机场'
            if (!v) {
                ecity = '上海'
                ecode = 'SHA'
                eflight = '上海虹桥机场'
            }
            this.flightInfo.endCity = ecity
            this.flightInfo.endCityShort = ecode
            this.flightInfo.endCityValue = eflight
            this.flightInfo.endCityText = eflight + '(' + ecode + ')'
        },
        showStartDate(){
            this.startEndTime = this.utils.dateFormat(this.utils.getAfterNDate((new Date()), 1, 'y'), 'yyyy-MM-dd')
            this.startDateShow = true
        },
        showEndDate(){
            if(this.flightInfo.startTime == '' || this.flightInfo.startTime == '出发时间'){
                this.utils.alert(this, '请先选择出发时间')
            }else{          
                this.startEndTime = this.utils.dateFormat(this.utils.getAfterNDate(this.flightInfo.startTime, 1, 'y'), 'yyyy-MM-dd')
                this.endDateShow = true
            }
        },
        openMoreInfo (i) {
            if (this.other.linkman == i) {
                this.other.linkman = ''
            } else {
                this.other.linkman = i
            }
        },
        saveDingzhi () {
            if (this.dzContent != ''){
                let params = {
                    content: this.dzContent,
                    cid: this.accountInfo.id
                }
                this.utils.http({
                    name: this,
                    uri: '/order/submitdingzhiorder',
                    method: 'post',
                    params: params,
                    success: res=>{
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
    components: {
        Header,
        Footer,
        CityList,
        DatePicker
    },
    created() {
        const _account = sessionStorage.getItem('account')
        if (!_account) {
            this.MessageBox.alert('请登录').then(() => {
                this.$router.push({
                    path: '/'
                })
            })
        } else {
            let _user = JSON.parse(_account)
            this.accountInfo.username = _user.uname
            this.accountInfo.password = _user.upass
            this.accountInfo.id = _user.id
        }

        let scode = this.utils.getItem("scode") || 'PEK'
        let ecode = this.utils.getItem("ecode") || 'LAX'
        let stime = this.utils.getItem("stime") || this.utils.dateFormat(this.utils.getAfterNDate(1,'d'),'yyyy-MM-dd')
        let etime = this.utils.getItem("etime") || this.utils.dateFormat(this.utils.getAfterNDate(2,'d'),'yyyy-MM-dd')
        let ttype = this.utils.getItem("ttype") || 1
        let ftype = this.utils.getItem("ftype") || 1
        let scity = this.utils.getItem("scity") || '北京'
        let ecity = this.utils.getItem("ecity") || '洛杉矶  (加利福尼亚州) '
        let sflight = this.utils.getItem("sflight") || '北京首都机场'
        let eflight = this.utils.getItem("eflight") || '洛杉矶国际机场'
        this.ticketType = Number(ttype)
        this.flightInfo.startCity = scity
        this.flightInfo.startCityShort = scode
        this.flightInfo.startCityValue = sflight
        this.flightInfo.startCityText = sflight + '(' + scode + ')'
        this.flightInfo.endCity = ecity
        this.flightInfo.endCityShort = ecode
        this.flightInfo.endCityValue = eflight
        this.flightInfo.endCityText = eflight + '(' + ecode + ')'
        this.flightInfo.startTime = stime
        this.flightInfo.endTime = etime
        this.flightType = Number(ftype)

        this.userID = this.utils.getItem("kxUserID") || ''
        // 获取城市列表
        getCityList(this)

        // 获取联系人
        getLinkMans(this)

        // 获取子公司和联系人
        getSubCompanyLinkman(this)
    }
}


// 获取联系人
function getLinkMans (vue) {
    vue.utils.http({
        name: vue,
        uri: '/company/getlinkman',
        params: {params:{id: vue.accountInfo.id}},
        success: res=>{
            if(res.data.status === 1){
                vue.linkmans = res.data.data
            }
        }
    })
}

// 获取子公司和联系人
function getSubCompanyLinkman (vue) {
    vue.utils.http({
        name: vue,
        uri: '/company/getsubcompanylinkman',
        params: {params:{id: vue.accountInfo.id}},
        success: res=>{
            if(res.data.status === 1){
                vue.subCompanyLinkMans = res.data.data
            }
        }
    })
}

//获取城市列表
function getCityList(vue){
    vue.utils.http({
        name: vue,
        uri: '/city/getallcity',
        success: res=>{
            if(res.data.status === 1){
                getStartCityList(vue, res.data.data.ds)
                getEndCityList(vue, res.data.data.ds1)
            }
        }
    })
}
//获取出发城市
function getStartCityList(vue, data){
    let sCity = data.sort(function(x,y){
        return x.pinyin.trim()>y.pinyin.trim()?1:-1
    })
    let sArr = [{
        index: '*',
        items: []
    }]
    let m = 1;
    for(let i = 65; i < 91; i++ ){
        sArr.push({
            index : String.fromCharCode(i),
            items : []
        })
    }
    for(let c in sCity){
        let g = sCity[c].pinyin.trim().substr(0,1).toLocaleUpperCase()
        if (sCity[c].hot == 1) {
            sArr[0].items.push(sCity[c])
        } else if(c != 0 && g != sArr[m].index && m<25){
            m++
        }
        if (sCity[c].hot != 1) {
            sArr[m].items.push(sCity[c])
        }
    }
    if (sArr[0].items.length < 1) {
        sArr.shift(0,1)
    }
    vue.startCityList = sArr
    vue.gnendCityList = sArr
}
//获取到达城市
function getEndCityList(vue, data){
    let eCity = data.sort(function(x,y){
        return x.pinyin.trim()>y.pinyin.trim()?1:-1
    })
    let eArr = [{
        index: '*',
        items: []
    }]
    let m = 1
    for(let i = 65; i < 91; i++ ){
        eArr.push({
            index : String.fromCharCode(i),
            items : []
        })
    }
    let len = eCity.length
    for(let a=0; a < len; a++){
        let g = eCity[a].pinyin.trim().substr(0,1).toLocaleUpperCase()
        if (eCity[a].hot == 1) {
            eArr[0].items.push(eCity[a])
        } else if(a && g != eArr[m].index && m<25){
            m++;
        }
        if (eCity[a].hot != 1) {
            eArr[m].items.push(eCity[a])
        }
    }
    if (eArr[0].items.length < 1) {
        eArr.shift(0,1)
    }
    vue.gjendCityList = eArr
}
</script>

<style lang="scss">
    @import '@/assets/sass/set.scss';
    .index-body{
        padding: .9rem .2rem 1rem .2rem;
        box-sizing: border-box;
        background-color: #f4f4f4;
        .banner{
            padding: .1rem 0;
            img{
                display: block;
                width: 100%;
            }
        }
        .searchticket{
            margin-top: .1rem;
            background-color: #fff;
            border-radius: .1rem;
            overflow: hidden;
            .ticket-tab{
                border-bottom: .02rem solid #eee;
                height: .9rem;
                line-height: .9rem;
                display: flex;
                justify-content: space-around;
                color: #777;
                font-size: .28rem;
                .cur{
                    color: $pubcolor;
                    border-bottom: .04rem solid $pubcolor;
                }
            }
            .ticket-type{
                color: #777;
                display: flex;
                justify-content: space-evenly;
                padding: .2rem 0;
                div{
                    display: flex;
                    font-size: .28rem;
                    span{
                        width: 12px;
                        height: 12px;
                        border: .02rem solid #ccc;
                        border-radius: 12px;
                        margin-top: .06rem;
                        margin-right: .06rem;
                        position: relative;
                    }
                }
                .cur{
                    color: $pubcolor;
                    span{
                        border: .02rem solid $pubcolor;
                    }
                    span::before{
                        content: '';
                        position: absolute;
                        left: .04rem;
                        top: .04rem;
                        display: block;
                        width: 8px;
                        height: 8px;
                        border-radius: 8px;
                        background-color: $pubcolor;
                    }
                }
            }
            .search-from{
                padding: 0 .4rem .4rem .4rem;
                box-sizing: border-box;
                input{
                    display: block;
                    width: 100%;
                    height: .8rem;
                    line-height: .8rem;
                    border: 0;
                    border-bottom: .02rem solid #ccc;
                    padding-right: .6rem;
                    box-sizing: border-box;
                }
                input::placeholder{
                    color: #000;
                    font-size: .28rem;
                }
                .form-goto, .form-date{
                    position: relative;
                    margin-bottom: .4rem;
                }
                .form-goto::before{
                    content: '';
                    display: block;
                    position: absolute;
                    width: .6rem;
                    height: .6rem;
                    top: .1rem;
                    right: 0;
                    background: url(../assets/images/search.png) no-repeat center;
                    background-color: #a7a7a7;
                    background-size: .4rem;
                }
                .date{
                    display: flex;
                    justify-content: space-between;
                    .form-date{
                        width: 48%;
                    }
                    .form-date::before{
                        content: '';
                        display: block;
                        position: absolute;
                        width: .6rem;
                        height: .6rem;
                        top: .1rem;
                        right: 0;
                        background: url(../assets/images/date.png) no-repeat center;
                        background-color: #a7a7a7;
                        background-size: .4rem;
                    }
                }
                .btn{
                    margin-top: .2rem;
                    width: 100%;
                    height: .8rem;
                    line-height: .8rem;
                    font-size: .32rem;
                    border-radius: .1rem;
                }
            }
            .book-box{
                padding: .2rem .4rem;
                box-sizing: border-box;
                textarea{
                    width: 100%;
                    height: 3.14rem;
                    resize: none;
                    padding: .3rem;
                    box-sizing: border-box;
                    border: .02rem solid #999;
                    border-radius: .06rem;
                }
                .btn {
                    margin: .4rem 0;
                    width: 100%;
                    border-radius: .1rem;
                    font-size: .28rem;
                }
            }
        }
        .tab-title{
            font-size: .36rem;
            color: #333;
            margin-bottom: .2rem;
        }
        .logininfo{
            margin-top: .4rem;
            .info-tab{
                display: flex;
                justify-content: space-between;
                .accpass{
                    width: 48%;
                    height: 1.46rem;
                    padding: .2rem .2rem;
                    box-sizing: border-box;
                    div{
                        font-size: .36rem;
                        color: #000;
                    }
                    span{
                        display: block;
                        font-size: .24rem;
                        color: #999;
                        position: relative;
                        margin-top: .06rem;
                        padding-top: .1rem;
                    }
                    span::after{
                        content: '';
                        position: absolute;
                        left: 0;
                        top: 0;
                        display: block;
                        width: .42rem;
                        border-top: .02rem solid $pubcolor;
                    }
                }
                .account{
                    background: url('../assets/images/index_accont_bg.png') no-repeat center;
                    background-size: auto 100%;
                }
                .pass{
                    background: url('../assets/images/index_pass_bg.png') no-repeat center;
                    background-size: auto 100%;
                }
            }
        }
        .linkmaninfo{
            margin-top: .4rem;
            .linkman-box{
                background-color: #fff;
                border-radius: .1rem;
                padding: .2rem;
                box-sizing: border-box;
                li{
                    border: .02rem solid #eee;
                    padding: 0 .2rem;
                    border-radius: .2rem;
                    box-sizing: border-box;
                    margin-top: .2rem;
                    .linkman-infobox{
                        position: relative;
                        height: .8rem;
                        line-height: .8rem;
                        display: flex;
                        font-size: .28rem;
                        .name{
                            padding-left: .4rem;
                            color: #000;
                            position: relative;
                        }
                        .name:after{
                            content: '';
                            position: absolute;
                            top: .3rem;
                            left: .1rem;
                            display: block;
                            width: 10px;
                            height: 10px;
                            border-radius: 10px;
                            background-color: $pubcolor;
                        }
                        .phone{
                            color: #666;
                            margin-left: .4rem;
                            span{
                                margin-left: .2rem;
                                color: #f9701f;
                                border: .02rem solid #f9701f;
                                padding: 0 .1rem;
                                border-radius: .1rem;
                            }
                        }
                        .down-up{
                            position: absolute;
                            right: 0;
                            color: #999;
                            padding-right: .3rem;
                        }
                        .down-up:after{
                            content: '';
                            position: absolute;
                            right: 0;
                            top: .32rem;
                            display: block;
                            width: 0;
                            border-width: .16rem .12rem 0;
                            border-color: #999 transparent transparent;
                            border-style: solid;
                        }
                        .down-up.cur:after{
                            content: '';
                            border-width: 0 .12rem .16rem;
                            border-color: transparent transparent #999;
                            border-style: solid;
                        }
                    }
                    .other-info{
                        display: flex;
                        border-top: .02rem solid #eee;
                        flex-wrap: wrap;
                        color: #333;
                        line-height: .5rem;
                        padding: .16rem 0;
                        font-size: .24rem;
                        div{
                            min-width: 50%;
                            display: flex;
                            span{
                                color: #999;
                                width: .9rem;
                                text-align: right;
                                margin-right: .1rem;
                            }
                        }
                    }
                }
                :first-child{
                    margin: 0;
                }                
            }
            .xyed-box{
                margin-top: .3rem;
                height: 1.98rem;
                .xyed-bg{
                    height: 1.98rem;
                    padding: .5rem 0 0 1rem;
                    box-sizing: border-box;
                    div{
                        font-size: .36rem;
                        display: flex;
                        div{
                            line-height: .5rem;
                        }
                        span{
                            padding: .06rem .2rem;
                            background-color: $pubcolor;
                            color: #fff;
                            font-size: .28rem;
                            margin-right: .4rem;
                            position: relative;
                        }
                        span::after{
                            content: '';
                            position: absolute;
                            right: -.3rem;
                            top: .09rem;
                            display: block;
                            width: 0;
                            border-width:.16rem 0 .16rem .3rem;
                            border-color:transparent transparent transparent $pubcolor;/*透明 透明 透明 灰*/
                            border-style: solid;
                        }
                    }
                    .company{
                        margin-top: .1rem;
                        color: #9c9c9c;
                        font-size: .24rem;
                    }
                }
                .dxqk{
                    background: url('../assets/images/xy_dqqk.png') no-repeat center;
                    background-size: auto 100%;
                    div{
                        span{
                            background-color: #f2b74f;
                        }
                        span::after{
                            border-color:transparent transparent transparent #f2b74f;/*透明 透明 透明 灰*/
                        }
                    }
                }
                .jszq{
                    background: url('../assets/images/xy_jszq.png') no-repeat center;
                    background-size: auto 100%;  
                    div{
                        span{
                            background-color: #f67522;
                        }
                        span::after{
                            border-color:transparent transparent transparent #f67522;/*透明 透明 透明 灰*/
                        }
                    }
                }
                .xyed{
                    background: url('../assets/images/xy_xyed.png') no-repeat center;
                    background-size: auto 100%;
                }
                .is-active{
                    background-color: $pubcolor;
                    opacity: 1;
                }
            }
        }
        .branchoffice{
            margin-top: .4rem;
            .branchoffice-box{
                background-color: #fff;
                border-radius: .1rem;
                padding-bottom: .25rem;
                .tab{
                    width: 100%;
                    height: 1rem;
                    line-height: 1rem;
                    display: flex;
                    white-space: nowrap;
                    box-sizing: border-box;
                    overflow-x: auto;
                    padding: 0 .25rem;
                    span{
                        border: .02rem solid #eee;
                        height: .5rem;
                        margin-top: .25rem;
                        line-height: .5rem;
                        padding: 0 .2rem;
                        border-radius: .1rem;
                        margin-right: .2rem;
                    }
                    .cur{
                        background-color: $pubcolor;
                        border: .02rem solid $pubcolor;
                        color: #fff;
                    }
                }
                .tab-info{
                    .title{
                        font-size: .28rem;
                        color: #000;
                        padding-left: .2rem;
                        margin-bottom: .2rem;
                        font-weight: bold;
                    }
                    .tab-info-box{
                        padding: 0 .2rem;
                        box-sizing: border-box;
                        display: flex;
                        flex-wrap: wrap;
                        div{
                            width: 50%;
                            line-height: .4rem;
                            color: #777;
                            display: flex;
                            span{
                                width: 1rem;
                            }
                        }
                    }
                }
            }
        }
        .baseline{
            width: 3rem;
            height: 0;
            border-top: 1px solid #ddd;
            margin: .8rem auto;
            text-align: center;
            line-height: 0;
            color: #aaa;
            span{
                padding: 0 .2rem;
                background-color: #f4f4f4;
            }
        }
    }
</style>
