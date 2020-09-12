<template>
  <div id="addressEditBox">
    <AddressEdit
      :area-list="areaList"
      :address-info="addressInfo"
      show-postal
      :show-delete="false"
      show-set-default
      save-button-text="编辑"
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
import { updateaddressByAddrId } from "@/api/index.js";
import areaList from "@/util/area.js";
export default {
  data() {
    return {
      areaList,
      searchResult: [],
      addressInfo: {},
    };
  },
  methods: {
    //点击编辑按钮触发事件
    async onSave(content) {
      Toast.loading({
        message: "编辑中...",
        forbidClick: true,
        duration: 0,
      });
      content.country = content.county;
      if (content.isDefault) {
        content.isDefault = 1;
      } else {
        content.isDefault = 0;
      }
      let { status, message } = await updateaddressByAddrId(
        content.id,
        content
      );
      Toast(message);
      //关闭提示
      Toast.clear();
      if (status == 0) {
        this.$router.go(-1);
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
    this.$parent.titleInfo = "编辑地址";
    this.$parent.flag = true;
    let res = JSON.parse(this.$route.params.addrInfo);
    if (res.isDefault == 1) {
      res.isDefault = true;
    } else {
      res.isDefault = false;
    }
    this.addressInfo = res;
  },
  components: {
    AddressEdit,
    Toast,
  },
};
</script>

<style lang="scss" scoped>
</style>