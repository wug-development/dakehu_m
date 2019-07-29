<template>
    <div id="Suggest" class="suggest-box">
        <Header name="投诉建议"></Header>
        <div class="suggest-info">
            您对凯行网有任何不满意或好的建议请直言；我们会尽快对您的投诉及建议做出回复。我们欢迎每一位用户对凯行网的服务做出评价，提出建议！
        </div>
        <div class="link-info">
            <div class="phone">投诉电话：18601183533</div>
            <div class="email">投诉邮箱：sale@airkx.com</div>
            <div class="time">投诉时间：9：00--17：00</div>
            <div class="jdzc">有了您的监督和支持，我们将做的更好。</div>
        </div>
        <Footer page="message"></Footer>
    </div>
</template>

<script>
import Header from './public/HeaderBack.vue'
import Footer from './public/Footer.vue'

export default {
    name: 'Suggest',
    components: {
        Header,
        Footer
    }
}
</script>

<style lang="scss">
    @import '@/assets/sass/set.scss';
    .suggest-box{
        height: 100%;
        padding: 1.3rem .4rem 1.2rem .4rem;
        box-sizing: border-box;
        background-color: $pubcolor;
        overflow: auto;
        .suggest-info{
            color: #fff;
            font-size: .28rem;
            line-height: .6rem;
        }
        .link-info{
            margin-top: .4rem;
            background-color: #fff;
            border-radius: .1rem;
            height: 7rem;
            padding: .4rem;
            box-sizing: border-box;
            font-size: .28rem;
            color: #666;
            .phone{
                position: relative;
                padding-left: 1.4rem;
                padding-top: .8rem;
            }
            .phone::before{
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                width: 1.2rem;
                height: 1.2rem;
                border-radius: 1.2rem;
                background: url('../assets/images/icon_suggest_phone.png') no-repeat center;
                background-size: auto .7rem;
                background-color: $pubcolor;
            }
            .email{
                position: relative;
                padding-right: 1.4rem;
                padding-top: .4rem;
                text-align: right;
                margin-top: .6rem;
            }
            .email::before{
                content: '';
                position: absolute;
                right: 0;
                top: 0;
                width: 1.2rem;
                height: 1.2rem;
                border-radius: 1.2rem;
                background: url('../assets/images/icon_suggest_email.png') no-repeat center;
                background-size: .8rem auto;
                background-color: $pubcolor;
            }
            .time{
                position: relative;
                padding-left: 1.4rem;
                padding-top: .2rem;
                margin-top: .8rem;
            }
            .time::before{
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                width: 1.2rem;
                height: 1.2rem;
                border-radius: 1.2rem;
                background: url('../assets/images/icon_suggest_time.png') no-repeat center;
                background-size: auto .7rem;
                background-color: $pubcolor;
            }
            .jdzc{
                margin-top: 1.4rem;
                color: #f97226;
                font-size: .3rem;
            }
        }
    }
</style>
