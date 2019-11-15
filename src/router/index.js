import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/Index'
import Aboutus from '@/components/Aboutus'
import Service from '@/components/Service'
import Suggest from '@/components/Suggest'
import FlightList from '@/components/FlightList'
import ReturnFlight from '@/components/ReturnFlight'
import GNFlightList from '@/components/GNFlightList'
import GNSelFlight from '@/components/GNSelFlight'
import FlightInfo from '@/components/FlightInfo'
import AddPerson from '@/components/AddPerson'
import WhiteInfo from '@/components/WhiteInfo'
import PersonList from '@/components/PersonList'
import TopContact from '@/components/TopContact'
import PaymentRecord from '@/components/PaymentRecord'
import SearchOrder from '@/components/SearchOrder'
import OrderList from '@/components/OrderList'
import OrderDetail from '@/components/OrderDetail'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/index',
            name: 'Index',
            component: Index
        },
        {
            path: '/aboutus',
            name: 'Aboutus',
            component: Aboutus
        },
        {
            path: '/service',
            name: 'Service',
            component: Service
        },
        {
            path: '/suggest',
            name: 'Suggest',
            component: Suggest
        },
        {
            path: '/flightlist',
            name: 'FlightList',
            component: FlightList
        },
        {
            path: '/returnflight',
            name: 'ReturnFlight',
            component: ReturnFlight
        },
        {
            path: '/gnflightlist',
            name: 'GNFlightList',
            component: GNFlightList
        },
        {
            path: '/selflight',
            name: 'GNSelFlight',
            component: GNSelFlight
        },
        {
            path: '/flightinfo',
            name: 'FlightInfo',
            component: FlightInfo
        },
        {
            path: '/whiteinfo',
            name: 'WhiteInfo',
            meta: {
                keepAlive: true,// 此组件需要被缓存                
                isBack: false// 用于判断上一个页面是哪个
            },
            component: WhiteInfo
        },
        {
            path: '/personlist',
            name: 'PersonList',
            component: PersonList
        },
        {
            path: '/addperson',
            name: 'AddPerson',
            component: AddPerson
        },
        {
            path: '/paymentrecord',
            name: 'PaymentRecord',
            component: PaymentRecord
        },
        {
            path: '/searchorder',
            name: 'SearchOrder',
            component: SearchOrder
        },
        {
            path: '/orderlist',
            name: 'OrderList',
            component: OrderList
        },
        {
            path: '/orderdetail',
            name: 'OrderDetail',
            component: OrderDetail
        },
        {
            path: '/contacts',
            name: 'TopContact',
            component: TopContact
        }
    ]
})
