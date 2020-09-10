<template>
  <div id="addressAddBox">
    <AddressEdit
      :area-list="areaList"
      show-postal
      :show-delete="false"
      show-set-default
      save-button-text="添加"
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import { AddressEdit, Toast } from "vant";
import { addressAddByUserId } from "@/api/index.js";
import areaList from "@/util/area.js";
export default {
  data() {
    return {
      areaList,
      searchResult: [],
    };
  },
  methods: {
    //点击编辑按钮触发事件
    async onSave(content) {
      Toast.loading({
        message: "添加中...",
        forbidClick: true,
        duration: 0,
      });
      content.country = content.county;
      //发送请求添加收货地址
      let { status, message } = await addressAddByUserId(this.$store.state.currentUser.id, content);
      //关闭提示
      Toast.clear();
      Toast(message);
      if (status == 0) {
        this.$router.push("/address");
      }
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "陇田镇",
            address: "砺青中学",
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
  },
  created() {
    this.$parent.titleInfo = "添加地址";
    this.$parent.flag = true;
  },
  components: {
    AddressEdit,
    Toast,
  },
};
</script>

<style lang="scss" scoped>
</style>