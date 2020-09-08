<template>
  <div id="personalCenterBox">
    <div class="hasLogin">
      <div class="info">
        <VanImage round width="10rem" height="10rem" :src="img" @click="getImg" />
        <h3>用户名：{{ currentUser.username }}</h3>
      </div>
      <div class="manage">
        <CellGroup>
          <Cell title="注册的手机号" :value="currentUser.phone" />
          <Cell title="修改密码" is-link to="index" />
          <Cell title="我的订单" is-link to="index" />
          <Cell title="地址管理" is-link to="/address" />
        </CellGroup>
      </div>
      <div class="bgc"></div>
      <div class="about">
        <CellGroup>
          <Cell title="提交反馈" is-link to="index" />
          <Cell title="关于乐淘" value="v1.0.0" />
          <Cell title="给个好评">
            <Rate v-model="value" icon="like" void-icon="like-o" />
          </Cell>
        </CellGroup>
      </div>
    </div>
  </div>
</template>

<script>
import { Image as VanImage, Cell, CellGroup, Rate, Button, Popup,ImagePreview  } from "vant";
import { isLogin } from "@/api/index.js";
export default {
  data() {
    return {
      img: require("../assets/logo2.png"),
      show: true,
      currentUser: {},
      value: 1,
    };
  },
  methods: {
    getImg(){
      ImagePreview([require("../assets/logo2.png")]);
    }
  },
  created() {
    //修改页面头部标题信息
    this.$parent.titleInfo = "我的乐淘";
    this.$parent.flag = false;
    //验证是否登录
    isLogin();
    //将登录成功后的用户信息保存进当前的全局变量currentUser
    this.currentUser = JSON.parse(localStorage.getItem("userInfo")) || {username : ""};
  },
  components: {
    VanImage,
    Cell,
    CellGroup,
    Rate,
    Button,
    Popup,
    ImagePreview 
  },
};
</script>

<style lang="scss">
#personalCenterBox {
  img {
    width: 145px;
    height: 145px;
    padding: 5px;
  }
  .info {
    display: flex;
    align-items: center;
    justify-content: space-around;
    h3 {
      width: 50%;
      text-align: center;
    }
  }
  .bgc {
    height: 15px;
    background-color: #e9e9e9;
  }
  .noLogin {
    .van-popup {
      text-align: center;
      line-height: 200px;
    }
    .logo {
      margin: 5px;
      text-align: center;
    }
  }
}
</style>