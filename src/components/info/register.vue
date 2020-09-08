<template>
  <div id="registerBox">
    <div class="top">
      <NavBar title="乐淘注册" />
    </div>
    <div class="registerInfo">
      <Form @submit="onSubmit">
        <Field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <Field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="请设置密码"
          :rules="[{ required: true, message: '请正确填写密码' }]"
        />
        <Field
          v-model="confirmPwd"
          type="password"
          name="confirmPwd"
          label="确认密码"
          placeholder="请再次填写密码"
          :rules="[{ required: true, message: '请正确填写密码' }]"
        />
        <div style="margin: 16px;">
          <Button round block type="danger" native-type="submit">注册</Button>
        </div>
        <router-link to="/login" id="toLogin" tag="div">已有账号，前往登录？</router-link>
      </Form>
    </div>
  </div>
</template>

<script>
import { NavBar, Form, Field, Button, Toast } from "vant";
import { addUser } from "@/api/index.js";
export default {
  data() {
    return {
      username: "",
      password: "",
      confirmPwd: "",
    };
  },
  methods: {
    async onSubmit(values) {
      //点击注册后触发的事件
      //打开加载层并且设置不让用户点击页面其他元素
      Toast.loading({
        message: "注册中，请稍后...",
        forbidClick: true,
        duration: 0,
      });
      let { username, password, confirmPwd } = values;
      if (password !== confirmPwd) {
        Toast("密码不一致，请重新设置");
        return;
      }
      let { status, message } = await addUser({
        username,
        password,
      });
      Toast.clear();
      if (status == 1) {
        Toast(message + "请重新设置");
      } else {
        Toast(message);
        this.$router.push("/login");
      }
    },
  },
  components: {
    NavBar,
    Form,
    Field,
    Button,
    Toast,
  },
};
</script>

<style lang="scss">
#appBox {
  height: 100vh;
  background-color: #e9e9e9;
}
.registerInfo {
  width: 90%;
  margin: 4%;
  background-color: white;
  border-radius: 15px;
  padding: 5px;
  .userRegister {
    text-align: right;
    color: #ccc;
  }
}
.van-nav-bar {
  width: 100%;
}
#toLogin {
  color: red;
  text-align: center;
  margin-bottom: 5px;
}
</style>