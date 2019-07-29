<template>
    <div id="HeaderBack" class="headerback-box" :style="backgroundcolor?'background-color:'+backgroundcolor:''">
        <div class="icon icon-back" id="icon-back" @click="backPage"></div>
        <div class="title">{{titlename}}</div>      
    </div>
</template>

<script>
export default {
    props: ['name', 'bgcolor'],
    name: 'HeaderBack',
    data () {
        return {
            titlename: 'M秒奇艺',
            backgroundcolor: ''
        }
    },
    methods: {
        backPage: function(){
            this.$router.go(-1)
        }
    },
    created () {
        this.titlename = this.name
        if (this.bgcolor) {
            this.backgroundcolor = this.bgcolor
        }        
    }
}
</script>

<style lang="scss">
    @import '@/assets/sass/set.scss';
    .headerback-box{
        position: fixed;
        left: 0;
        top: 0;
        z-index: 11;
        width: 100%;
        height: .9rem;
        line-height: .9rem;
        background-color: $pubcolor;
        color: #fff;
        font-size: .32rem;
        text-align: center;
        padding: 0 .1rem;
        box-sizing: border-box;
        .icon{
            position: absolute;
            left: 0;
            top: 0;
            width: .9rem;
            height: .9rem;
        }
        .icon-back{
            background: url('../../assets/images/back.png') no-repeat center;
            background-size: auto .6rem;
        }
    }
</style>
