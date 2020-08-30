<template>
  <div id="appBox">
    <!-- 头部组件 -->
    <Sticky v-if="isbool">
      <div id="headerBox">
        <img src="./assets/logo2.png" />
        <Search v-model="value" placeholder="请输入搜索关键词"></Search>
      </div>
    </Sticky>
    <navbar v-else></navbar>

    <!-- 路由容器用来存放对应路由数据信息 -->
    <router-view></router-view>

    <!-- 底部导航栏 -->
    <Tabbar v-model="active" :fixed="true" :route="true">
      <TabbarItem to="/home" icon="wap-home-o">首页</TabbarItem>
      <TabbarItem to="/shoppingCar" icon="shopping-cart-o" :badge="carNum">购物车</TabbarItem>
      <TabbarItem to="/personalCenter" icon="user-o">我的乐淘</TabbarItem>
    </Tabbar>
  </div>
</template>

<script>
import indexmC from "@/components/indexMainComponent.vue";
import navbar from "@/components/navbar.vue";
import { Tabbar, TabbarItem, Search, Sticky } from "vant";

export default {
  data() {
    return {
      value: "",
      isbool: true,
      carNum: 0, //购物车数量
      active: 0, //默认首页高亮显示
      titleInfo: "",
    };
  },
  methods: {
    updBoolAndTitle(bool,tInfo){
      this.isbool = bool;
      this.titleInfo = tInfo;
    },
    updateCarNum(num){
      this.carNum = num;
    }
  },
  created() {
    let res = JSON.parse(localStorage.getItem("myCar"));
    res == null ? this.carNum = 0 : this.carNum = res.length;
  },
  components: {
    indexmC,
    Tabbar,
    TabbarItem,
    Search,
    Sticky,
    navbar,
  },
  watch: {
    "$route":function(newPath,oldPath){
      console.log(oldPath);
      if(newPath.path == "/home"){
        this.isbool = true;
      }else{
        this.isbool = false;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
#appBox {
  min-width: 320px;
  max-width: 750px;
  margin: 0 auto;
  #headerBox {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    background-color: white;
    img {
      width: 44px;
      margin: 2px;
    }
    .van-search {
      flex: 1;
      padding-right: 0;
    }
  }
}
</style>