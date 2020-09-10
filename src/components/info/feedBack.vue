<template>
  <div id="feedBackBox">
    <div class="liuyan">
      <Field
        v-model="message"
        rows="5"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入有爱的反馈"
        show-word-limit
      />
      <Button type="info" id="commitFeedBack" @click="commitFeedBack" block>提交反馈</Button>
    </div>
  </div>
</template>

<script>
import { Field, Button, Toast } from "vant";
import { addFeedBack } from "@/api/index.js";
export default {
  data() {
    return {
      message: "",
    };
  },
  components: {
    Field,
    Button,
    Toast,
  },
  created() {
    this.$parent.titleInfo = "反馈中心";
    this.$parent.flag = true;
  },
  methods: {
    async commitFeedBack() {
      Toast.loading({
        message: "提交中...",
        forbidClick: true,
        duration: 0,
      });
      let info = this.message;
      if (info.trim() == "") {
        Toast("请正确反馈");
        return;
      }
      let id = this.$store.state.currentUser.id;
      let { status, message } = await addFeedBack(
        info,
        id
      );
      Toast.clear();
      Toast(message);
      if (!status) {
          this.$router.go(-1);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#feedBackBox {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .liuyan {
    width: 80%;
    margin: 10px 0;
    #commitFeedBack {
      border-radius: 15px;
      margin: 10px 0;
    }
  }
}
</style>