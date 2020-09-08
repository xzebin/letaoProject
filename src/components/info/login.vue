<template>
  <div id="loginBox">
    <div class="top">
      <NavBar title="乐淘登录" />
    </div>
    <div class="loginInfo">
      <Divider :style="{color: '#000000',borderColor: '#000000'}">用户登录</Divider>
      <Form @submit="onSubmit">
        <Field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="请输入用户名进行登录"
          :rules="[{ required: true, message: '请正确输入用户名' }]"
        />
        <Field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="请输入密码进行登录"
          :rules="[{ required: true, message: '请正确填写密码' }]"
        />
        <div style="margin: 16px;">
          <Button round block type="danger" native-type="submit">登陆</Button>
        </div>
        <Loading v-if="flag" />
        <div class="foo">
          <router-link to="/home" tag="div" class="toIndex">逛逛再来</router-link>
          <router-link to="/register" tag="div" class="userRegister">新用户注册</router-link>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { NavBar, Form, Field, Button, Divider, Toast, Loading } from "vant";
import { getUserByNameAndPwd } from "@/api/index.js";
export default {
  data() {
    return {
      username: "",
      password: "",
      flag: false,
    };
  },
  methods: {
    async onSubmit(values) {
      //点击登录按钮后触发，并且不让用户点击页面其他部分
      Toast.loading({
        message: "登录中...",
        forbidClick: true,
        duration: 0,
      });
      //并且让加载层显示出来
      this.flag = true;
      //发送请求验证用户名和密码是否正确登录
      let { status, message, token, userInfo } = await getUserByNameAndPwd(
        values
      );
      //验证成功之后关闭加载层
      this.flag = false;
      //关闭提示
      Toast.clear();
      if (status == 0) {      //登录成功提示
        Toast(message);       
        localStorage.setItem("token", token);         //将用户数据保存进本地存储
        localStorage.setItem("userInfo", JSON.stringify(userInfo));   //将用户token保存进本地存储
        this.$router.push("/");                       //跳转到首页
      } else {                //登录失败提示
        Toast("用户名或密码错误");
      }
    },
  },
  components: {
    Field,
    Form,
    Button,
    Divider,
    NavBar,
    Toast,
    Loading,
  },
};
</script>

<style lang="scss">
#appBox {
  height: 100vh;
  background-color: #e9e9e9;
}
.loginInfo {
  width: 90%;
  margin: 4%;
  background-color: white;
  border-radius: 15px;
  padding: 5px;
  .foo {
    display: flex;
    justify-content: space-between;
    .userRegister {
      color: rgb(143, 143, 143);
      margin-right: 20px;
    }
    .toIndex {
      color: rgb(143, 143, 143);
      margin-left: 20px;
    }
  }
}
.van-nav-bar {
  width: 100%;
}
</style>