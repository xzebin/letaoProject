<template>
  <div id="meituBox">
    <TreeSelect
      :items="items"
      :active-id.sync="activeId"
      :main-active-index.sync="activeIndex"
      @click-nav="getCatelistById"
    >
    <template #content>
        <newsC @click_photo="clickImg" v-if="flag" :cateList="items[activeIndex].children"></newsC>
    </template>
    </TreeSelect>
  </div>
</template>

<script>
import { TreeSelect,Toast,ImagePreview  } from "vant";
import { getCategory, getCatelist,getGoodsImgByGoodsId } from "@/api/index.js";
import newsC from "@/components/photo/news.vue";
export default {
  data() {
    return {
      items: [],
      activeId: 1,
      activeIndex: 0,
      flag:false
    };
  },
  methods: {
    async getCategoryDatas() {
      //发送请求，获取所有的美图类别
      let res = await getCategory();
      //将所有的美图类别中的名称放入items数组中渲染到页面
      res.map((e) => this.items.push({ text: e.title, id: e.id }));
      this.getCatelistById(0);
    },
    async getCatelistById(activeIndex) {
      if(this.items[activeIndex].children){
        return;
      }
      this.flag = false;
      let idd = this.items[activeIndex].id;
      let res = await getCatelist(idd);
      this.items[activeIndex].children = res;
      this.flag = true;
    },
    async clickImg(id){
      let res = await getGoodsImgByGoodsId(id);
      if(res.length == 0){
        Toast("无图片");
        return;
      }
      let newArr = [];
      res.map(e => {
        newArr.push(e.src);
      });
      ImagePreview(newArr);
    }
  },
  components: {
    TreeSelect,newsC
  },
  created() {
    this.getCategoryDatas();
  },
};
</script>

<style lang="scss" scoped>
.van-tree-select {
  height: 85vh !important;
}
</style>