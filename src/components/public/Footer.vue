<template>
    <div id="Footer" class="footerbox">
        <div @click="toPage('index')" :class='(pageindex==""? "cur " : "") + "index"'>预定机票</div>
        <div @click="toPage('service')" :class='(pageindex=="service"? "cur " : "") + "cell"'>联系客服</div>
        <div @click="toPage('aboutus')" :class='(pageindex=="info"? "cur " : "") + "info"'>公司介绍</div>
        <div @click="toPage('suggest')" :class='(pageindex=="message"? "cur " : "") + "message"'>投诉建议</div>
    </div>
</template>

<script>
export default {
    props: ['page'],
    name: 'Footer',
    data () {
        return {
            pageindex: ''
        }
    },
    methods: {
        toPage: function (p) {
            this.$router.push({
                path: '/' + p
            })
        }
    },
    created () {
        if (this.page) {
            this.pageindex = this.page
        }        
    }
}
</script>

<style lang="scss">
    @import '@/assets/sass/set.scss';
    .footerbox{
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 10;
        background-color: #fff;
        width: 100%;
        height: .9rem;
        display: flex;
        justify-content: space-around;
        box-shadow: 0 -.02rem 0.04rem #eee; 
        div{
            line-height: 1.5rem;
            font-size: .24rem;
            color: #9c9c9c;
        }
        .index{
            background: url('../../assets/images/icon_index.png') no-repeat;
            background-size: .4rem;
            background-position: center .1rem;
        }
        .cell{
            background: url('../../assets/images/icon_cell.png') no-repeat;
            background-size: auto .42rem;
            background-position: center .1rem;
        }
        .info{
            background: url('../../assets/images/icon_info.png') no-repeat;
            background-size: .44rem;
            background-position: center .1rem;
        }
        .message{
            background: url('../../assets/images/icon_message.png') no-repeat;
            background-size: .44rem;
            background-position: center .1rem;
        }
        .index.cur{
            background: url('../../assets/images/icon_index_cur.png') no-repeat;
            background-size: .4rem;
            background-position: center .1rem;
            color: $pubcolor;
        }
        .cell.cur{
            background: url('../../assets/images/icon_cell_cur.png') no-repeat;
            background-size: auto .42rem;
            background-position: center .1rem;
            color: $pubcolor;
        }
        .info.cur{
            background: url('../../assets/images/icon_info_cur.png') no-repeat;
            background-size: .44rem;
            background-position: center .1rem;
            color: $pubcolor;
        }
        .message.cur{
            background: url('../../assets/images/icon_message_cur.png') no-repeat;
            background-size: .44rem;
            background-position: center .1rem;
            color: $pubcolor;
        }
    }
</style>
