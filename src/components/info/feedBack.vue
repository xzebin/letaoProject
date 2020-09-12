<template>
  <div id="feedBackBox">
    <div class="problemTy">
      问题类型
      <RadioGroup v-model="radio">
        <Radio name="1" checked-color="#07c160">功能异常</Radio>
        <Radio name="2" checked-color="#07c160">优化建议</Radio>
      </RadioGroup>
    </div>
    <div class="liuyan">
      问题或建议
      <Divider />
      <Field
        v-model="message"
        rows="5"
        autosize
        type="textarea"
        maxlength="200"
        placeholder="请描述您的问题或建议，如果有系统截图，请在添加图片中上传截图，我们将尽快优化体验，感谢您的反馈(如催单，物流查询类问题，请联系客服处理)"
        show-word-limit
      />
    </div>
    <div class="lianxi">
      联系方式(选填)
      <Divider />
      <Field v-model="tel" type="tel" placeholder="请留下您的手机号码" />
    </div>
      <Button type="info" id="commitFeedBack" @click="commitFeedBack" block>提交反馈</Button>
  </div>
</template>

<script>
import { Field, Button, Toast, RadioGroup, Radio,Divider  } from "vant";
import { addFeedBack } from "@/api/index.js";
export default {
  data() {
    return {
      tel: "",
      radio: '1',
      message: "",
    };
  },
  components: {
    Field,
    Button,
    Toast,
    RadioGroup,
    Radio,
    Divider 
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
      let { status, message } = await addFeedBack(info, id);
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
  color: rgb(95, 75, 89);
  .problemTy{
    padding: 5px;
    margin: 10px auto;
    background-color: white;
    .van-radio-group{
      display: flex;
      .van-radio{
        margin: 10px 15px;
      }
    }
  }
  .liuyan {
    margin: 10px auto;
    background-color: white;
    padding: 5px;
  }
  .lianxi{
    background-color: white;
    padding: 5px;
  }
  #commitFeedBack {
    border-radius: 15px;
    margin: 10px 0;
  }
}
</style>