import Vue from "vue";
import VueRouter from "vue-router";

//将vue路由安装到Vue身上
Vue.use(VueRouter);

import shoppingCar from "@/components/shoppingCar.vue";
import home from "@/components/home.vue";
import personalCenter from "@/components/personalCenter.vue";
import menuInfo from "@/components/menuInfo.vue";
import newsDetail from "@/components/news/newsDetail.vue";
import goodsDetail from "@/components/goods/goodsDetail.vue";
import address from "@/components/info/address.vue";
import addressAdd from "@/components/info/addressAdd.vue";
import addressEdit from "@/components/info/addressEdit.vue";
import login from "@/components/info/login.vue";
import feedBack from "@/components/info/feedBack.vue";
import register from "@/components/info/register.vue";
import orderList from "@/components/order/orderList.vue";

// 创建路由对象
var router = new VueRouter({
    routes: [{
            path: "/",
            redirect: "/home"
        },
        {
            path: "/home",
            component: home
        },
        {
            path: "/menuInfo/:routeInfo",
            component: menuInfo
        },
        {
            path: "/getGoodsInfo/:id",
            component: goodsDetail
        },
        {
            path: "/shoppingCar",
            component: shoppingCar
        },
        {
            path: "/personalCenter",
            component: personalCenter
        },
        {
            path: "/getNewsDetail/:newsId",
            component: newsDetail
        },
        {
            path: "/address",
            component: address
        },
        {
            path: "/addressAdd",
            component: addressAdd
        },
        {
            path: "/addressEdit/:addrInfo",
            component: addressEdit
        },
        {
            path: "/login",
            component: login
        },
        {
            path: "/register",
            component: register
        },
        {
            path: "/feedBack",
            component: feedBack
        },
        {
            path: "/orderList",
            component: orderList
        }
    ]
})


router.beforeEach((to, from, next) => {
    if (to.path == "/home") {   //判断当前跳转路径是否为home，为home的话设置头部搜索显示
        Vue.nextTick(()=>{
            document.getElementById("navbarBox").style.display = "none";
            document.getElementById("headerBox").style = "";
            document.getElementsByClassName("van-tabbar")[0].style = "";
        });
    }else if (to.path == "/login") {
        Vue.nextTick(()=>{
            document.getElementsByClassName("van-tabbar")[0].style.display = "none";
            document.getElementById("navbarBox").style.display = "none";
            document.getElementById("headerBox").style.display = "none";
        });
    }else if (to.path == "/register") {
        Vue.nextTick(()=>{
            document.getElementsByClassName("van-tabbar")[0].style.display = "none";
            document.getElementById("navbarBox").style.display = "none";
            document.getElementById("headerBox").style.display = "none";
        });
    }else {
        Vue.nextTick(()=>{
            document.getElementById("navbarBox").style.display = "";
            document.getElementById("headerBox").style.display = "none";
            document.getElementsByClassName("van-tabbar")[0].style = "";
        });
    }
    next();
})

//将路由对象导出
export default router;