<template>
    <div id="Aboutus" class="abountus">
        <Header name="关于我们"></Header>
        <div class="aboutus-body">
            <div class="logo"><img src="../assets/images/icon_logo.png" alt=""> </div>
            <div class="content">
                北京凯行网航空服务有限公司成立于2004年，作为一家专业的机票代理商，与国际国内200余家航空公司建立了良好的销售代理关系。公司秉承诚恳、热情、快捷的服务方式和极具竞争力的价格得到广大客户的信赖，以及社会各界同仁的支持，并与多家留学服务中介机构、科研院所、民间组织、外企商会以及大中型企事业单位签约。
                <br/><br/>凯行网机票服务中心每年的出票量达到近十亿、出团率达数百次，在业内名列前茅，树立了凯行网在业内的品牌形象；您的票量越大，凯行网为您争取到的机位票价将更低。本公司拥有一支业务精、作风硬、服务好、效率高的员工队伍,他们当中既有服务公司多年的业务精英，也有令人刮目相看的业务新秀,公司的特色经营和优秀的人才群体形成了独特的企业文化。
            </div>
            <div class="addr">公司地址：北京市东城区东直门南大街9号华普花园C座   -906</div>
        </div>
        <Footer page="info"></Footer>
    </div>
</template>

<script>
import Header from './public/HeaderBack.vue'
import Footer from './public/Footer.vue'

export default {
    name: 'Aboutus',
    components: {
        Header,
        Footer
    }

}
</script>

<style lang="scss">
    .abountus{
        height: 100%;
        background-color: #f4f4f4;
        box-sizing: border-box;
        overflow: hidden auto;
        .aboutus-body{
            min-height: 100%;
            padding: 1.2rem 0;
            box-sizing: border-box;
            .logo{
                text-align: center;
                img{
                    width: 1.4rem;
                }            
            }
            .content{
                padding: .3rem;
                box-sizing: border-box;
                color: #666;
                font-size: .28rem;
                line-height: .5rem;
            }
            .addr {
                padding: .3rem;
                box-sizing: border-box;
                font-size: .28rem;
                color: #ff7e0c;
            }
        }
    }
</style>
