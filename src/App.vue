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
    <Tabbar v-model="active" :fixed="true" :route="true" v-if="flag">
      <TabbarItem to="/home" icon="wap-home-o">首页</TabbarItem>
      <TabbarItem to="/shoppingCar" icon="shopping-cart-o" :badge="this.$store.getters.getTotal">购物车</TabbarItem>
      <TabbarItem to="/personalCenter" icon="user-o">我的乐淘</TabbarItem>
    </Tabbar>
    <Tabbar v-model="active" :fixed="true" :route="true" v-else>
      <Button type="default" @click="loginOut" block>退出登录</Button>
    </Tabbar>
  </div>
</template>

<script>
import indexmC from "@/components/indexMainComponent.vue";
import navbar from "@/components/navbar.vue";
import { Tabbar, TabbarItem, Search, Sticky, Button,Dialog,Toast } from "vant";

export default {
  data() {
    return {
      value: "",
      isbool: true,
      carNum: this.$store.getters.getTotal, //购物车数量
      active: 0, //默认首页高亮显示
      titleInfo: "",
      flag: true
    };
  },
  methods: {
    //修改头部显示信息和显示隐藏
    updBoolAndTitle(bool, tInfo) {
      this.isbool = bool;
      this.titleInfo = tInfo;
    },
    loginOut(){
      //退出登录
      Dialog.confirm({
        title: "退出登录",
        message: "确认退出吗",
      })
        .then(() => {
          Toast("退出成功");
        })
        .catch(() => {
          Toast("取消退出");
        });
    }
  },
  components: {
    indexmC,
    Tabbar,
    TabbarItem,
    Search,
    Sticky,
    navbar,
    Button,
    Dialog,
    Toast
  },
  watch: {
    $route: function (newPath, oldPath) {
      console.log(oldPath);
      if (newPath.path == "/home") {
        this.flag = true;
        this.isbool = true;
      } else if (newPath.path == "/personalCenter") {
        this.flag = false;
      } else {
        this.flag = true;
        this.isbool = false;
      }
    },
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
  .foo {
    width: 100%;
    position: fixed;
    bottom: 0px;
  }
}
</style>