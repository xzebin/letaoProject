<template>
  <div id="personalCenterBox">
    <div class="hasLogin" v-if="isLogin">
      <div class="info">
        <van-image round width="10rem" height="10rem" :src="img" />
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
    <div class="noLogin" v-else>
      <Popup v-model="show" :round="true" position="top" :style="{ height: '30%' }">未登录，需要进行登录哦</Popup>
      <div class="logo">
        <van-image round width="10rem" height="10rem" :src="img" />
      </div>
    </div>
  </div>
</template>

<script>
import { Image as VanImage, Cell, CellGroup, Rate, Button, Popup } from "vant";
export default {
  data() {
    return {
      isLogin: false,
      img: require("../assets/logo2.png"),
      show: true,
      currentUser: {},
      value: 1,
    };
  },
  created() {
    this.$parent.updBoolAndTitle(false, "个人中心");
    let res = JSON.parse(localStorage.getItem("currentUser"));
    if (res == null) {
      this.isLogin = false;
    } else {
      this.isLogin = true;
      this.currentUser = res;
      let phone = this.currentUser.phone;
      this.currentUser.phone = phone.substring(0,3) + "****" + phone.substring(7);
    }
  },
  components: {
    VanImage,
    Cell,
    CellGroup,
    Rate,
    Button,
    Popup,
  },
};
</script>

<style lang="scss">
#personalCenterBox {
  img {
    width: 145px;
    height: 145px;
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