<template>
    <div id="Login" class="login-box">
        <div class="nihao">您好，</div>
        <div class="title">欢迎来到凯行网月结平台，请登录</div>
        <div class="formtext txt_account">
            <input type="text" v-model="acount" placeholder="请输入账号登录">
        </div>
        <div class="formtext txt_pass">
            <input type="text" v-model="pass" placeholder="请输入密码">
        </div>
        <div class="tit">
            <span v-if="tit">提示：{{tit}}</span>
        </div>
        <div class="btn" @click="login">登录</div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data () {
        return {
            acount: '',
            pass: '',
            tit: ''
        }
    },
    methods: {
        login: function () {
            if (this.acount == '') {
                this.MessageBox('请输入账号')
            } else if (this.pass == '') {
                this.MessageBox('请输入密码')
            } else {
                this.$http.get(this.uris + '/company/login', {
                    params: {
                        "uname": this.acount,
                        "upass": this.pass
                    }
                }).then(res => {
                    if (res.data.status == '1') {
                        sessionStorage.setItem('account', JSON.stringify(res.data.data[0]))
                        this.$router.push({
                            path: '/index'
                        })
                    } else {
                        this.MessageBox(res.data.msg)
                    }
                })
            }
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/sass/set.scss';
.login-box{
    height: 100%;
    background-color: #f4f4f4;
    padding: .3rem;
    box-sizing: border-box;
    .nihao{
        font-size: .42rem;
        color: #000;
        font-weight: bold;
    }
    .title{
        color: #7f7f7f;
        font-size: .32rem;
    }
    .formtext{
        position: relative;
        margin-top: .3rem;
        background-color: #fff;
        height: 40px;
        border-radius: .1rem;
        overflow: hidden;
        input{
            width: 100%;
            height: 100%;
            border: 0;
            box-sizing: border-box;
            padding-left: .8rem;
        }
    }
    .formtext::before{
        content: '';
        position: absolute;
        left: 8px;
        top: 8px;
        display: block;
        width: 24px;
        height: 24px;
        border-radius: 20px;
        background: url('../assets/images/icon_login_account.png') no-repeat center center;
        background-size: auto 70%;
        background-color: $pubcolor;
    }
    .txt_account{
        margin-top: .5rem;
    }
    .txt_pass::before{
        background: url('../assets/images/icon_login_pass.png') no-repeat center center;
        background-size: auto 70%;
        background-color: $pubcolor;
    }
    .tit{
        height: .6rem;
        line-height: .6rem;
        color: #f7a461;
    }
    .btn {
        width: 6.5rem;
        height: .8rem;
        line-height: .8rem;
        border-radius: .1rem;
        margin: .3rem auto;
        font-size: .28rem;
    }
}
</style>
