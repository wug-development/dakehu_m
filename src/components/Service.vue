<template>
    <div id="Service" class="service-box">
        <Header name="" bgcolor="inherit"></Header>
        <div class="service-body">
            <div class="imgservice">
                <img src="../assets/images/service.png" alt="">
            </div>
            <ul class="card-list">
                <li class="card-item">
                    <div class="name">武娟</div>
                    <div class="tel"><span>手机号</span><div>18601183533</div></div>
                    <div class="qq"><span>QQ</span><div>1076406820</div></div>
                </li>
                <li class="card-item">
                    <div class="name">陈雪倩</div>
                    <div class="tel"><span>手机号</span><div>18601183422</div></div>
                    <div class="qq"><span>QQ</span><div>1773004009</div></div>
                </li>
                <li class="card-item">
                    <div class="name">张娟</div>
                    <div class="tel"><span>手机号</span><div>18618302927</div></div>
                    <div class="qq"><span>QQ</span><div>2850323384</div></div>
                </li>
                <li class="card-item">
                    <div class="name">王艳霞</div>
                    <div class="tel"><span>手机号</span><div>18601183411</div></div>
                    <div class="qq"><span>QQ</span><div>2435622020</div></div>
                </li>
                <li class="card-item">
                    <div class="name">华琳</div>
                    <div class="tel"><span>手机号</span><div>18601183531</div></div>
                    <div class="qq"><span>QQ</span><div>858051233</div></div>
                </li>
                <li class="card-item">
                    <div class="name">乔艳</div>
                    <div class="tel"><span>手机号</span><div>18601183520</div></div>
                    <div class="qq"><span>QQ</span><div>1606679418</div></div>
                </li>
            </ul>
        </div>
        <Footer page="service"></Footer>
    </div>
</template>

<script>
import Header from './public/HeaderBack.vue'
import Footer from './public/Footer.vue'

export default {
    name: 'Service',
    components: {
        Header,
        Footer
    }
}
</script>

<style lang="scss">
    .service-box{
        height: 100%;
        overflow: hidden auto;
        background: linear-gradient(#28ad7f 1rem, #EFEFEF 5rem);
        .service-body{
            min-height: 100%;
            padding: .7rem .3rem 1.2rem .3rem;
            box-sizing: border-box;
            .imgservice{
                padding: 0 .6rem;
                img{
                    display: block;
                    width: 100%;
                }
            }
            .card-list{
                margin-top: .4rem;
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                .card-item{
                    position: relative;
                    width: 3.3rem;
                    height: 2rem;
                    background-color: rgba(255,255,255, .5);
                    border-radius: .1rem;
                    text-align: center;
                    padding-top: .3rem;
                    box-sizing: border-box;
                    margin-top: .6rem;
                    box-shadow: .05rem .05rem .1rem #ddd;
                    font-size: .24rem;
                    font-size: .24rem;
                    color: #666;
                    .name {
                        border-bottom: .04rem solid #28ad7f;
                        width: .92rem;
                        margin: 0 auto;
                        font-size: .28rem;
                        color: #333;
                    }
                    .tel{
                        margin-top: .26rem;
                        display: flex;
                        padding-left: .36rem;
                        box-sizing: border-box;
                        span{
                            width: .8rem;
                            text-align: right;
                            margin-right: .2rem;
                        }
                    }
                    .qq{
                        margin-top: .16rem;
                        display: flex;
                        padding-left: .36rem;
                        box-sizing: border-box;
                        span{
                            display: inline-block;
                            width: .8rem;
                            text-align: right;
                            margin-right: .2rem;
                        }
                    }
                }
                .card-item::before{
                    content: '·';
                    position: absolute;
                    left: 1.35rem;
                    top: -15px;
                    width: 30px;
                    height: 15px;
                    background-color: rgba(255,255,255, .5);
                    border-top-left-radius: 30px;
                    border-top-right-radius: 30px;
                    color: #999;
                    font-size: .9rem;
                    line-height: 14px;
                }
            }
        }
    }    
</style>
