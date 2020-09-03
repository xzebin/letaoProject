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

// 创建路由对象
var router = new VueRouter({
    routes:[
        {path:"/",redirect:"/home"},
        {path:"/home",component:home},
        {path:"/menuInfo/:routeInfo",component:menuInfo},
        {path:"/getGoodsInfo/:id",component:goodsDetail},
        {path:"/shoppingCar",component:shoppingCar},
        {path:"/personalCenter",component:personalCenter},
        {path:"/getNewsDetail/:newsId",component:newsDetail},
        {path:"/address",component:address},
    ]
})

//将路由对象导出
export default router;