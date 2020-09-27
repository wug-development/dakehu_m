import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            component (resolve) {
                require(['@/components/Login'], resolve)
            }
        },
        {
            path: '/index',
            name: 'Index',
            component (resolve) {
                require(['@/components/Index'], resolve)
            }
        },
        {
            path: '/aboutus',
            name: 'Aboutus',
            component (resolve) {
                require(['@/components/Aboutus'], resolve)
            }
        },
        {
            path: '/service',
            name: 'Service',
            component (resolve) {
                require(['@/components/Service'], resolve)
            }
        },
        {
            path: '/suggest',
            name: 'Suggest',
            component (resolve) {
                require(['@/components/Suggest'], resolve)
            }
        },
        {
            path: '/flightlist',
            name: 'FlightList',
            component (resolve) {
                require(['@/components/FlightList'], resolve)
            }
        },
        {
            path: '/returnflight',
            name: 'ReturnFlight',
            component (resolve) {
                require(['@/components/ReturnFlight'], resolve)
            }
        },
        {
            path: '/gnflightlist',
            name: 'GNFlightList',
            component (resolve) {
                require(['@/components/GNFlightList'], resolve)
            }
        },
        {
            path: '/selflight',
            name: 'GNSelFlight',
            component (resolve) {
                require(['@/components/GNSelFlight'], resolve)
            }
        },
        {
            path: '/flightinfo',
            name: 'FlightInfo',
            component (resolve) {
                require(['@/components/FlightInfo'], resolve)
            }
        },
        {
            path: '/whiteinfo',
            name: 'WhiteInfo',
            meta: {
                keepAlive: true,// 此组件需要被缓存                
                isBack: false// 用于判断上一个页面是哪个
            },
            component (resolve) {
                require(['@/components/WhiteInfo'], resolve)
            }
        },
        {
            path: '/personlist',
            name: 'PersonList',
            component (resolve) {
                require(['@/components/PersonList'], resolve)
            }
        },
        {
            path: '/addperson',
            name: 'AddPerson',
            component (resolve) {
                require(['@/components/AddPerson'], resolve)
            }
        },
        {
            path: '/paymentrecord',
            name: 'PaymentRecord',
            component (resolve) {
                require(['@/components/PaymentRecord'], resolve)
            }
        },
        {
            path: '/searchorder',
            name: 'SearchOrder',
            component (resolve) {
                require(['@/components/SearchOrder'], resolve)
            }
        },
        {
            path: '/orderlist',
            name: 'OrderList',
            component (resolve) {
                require(['@/components/OrderList'], resolve)
            }
        },
        {
            path: '/orderdetail',
            name: 'OrderDetail',
            component (resolve) {
                require(['@/components/OrderDetail'], resolve)
            }
        },
        {
            path: '/contacts',
            name: 'TopContact',
            component (resolve) {
                require(['@/components/TopContact'], resolve)
            }
        }
    ]
})
