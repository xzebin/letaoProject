<template>
  <div id="newsListBox">
    <div
      class="newsItem"
      v-for="item in cateList"
      :key="item.id"
      @click="getNewsDetailById(item.id)"
    >
      <div class="newsImg" @click.stop="clickImg(item.id)">
        <img :src="item.img_url" />
      </div>
      <div class="newsInfo">
        <h3 class="van-multi-ellipsis--l2">{{ item.title }}</h3>
        <div class="time_click">
          <div class="click van-multi-ellipsis--l2">{{ item.zhaiyao }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["cateList"],
  methods: {
    getNewsDetailById(newsId) {
      //根据新闻id跳转
      this.$router.push(`/getNewsDetail/${newsId}`);
    },
    clickImg(id){
        this.$emit("click_photo",id);
    }
  },
};
</script>

<style lang="scss" scoped>
#newsListBox {
  margin-bottom: 50px;
    .newsItem {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ccc;
      .newsInfo {
        flex: 1;
        margin: 0 10px;
        h3 {
          color: #000000;
          font-size: 13px;
        }
        .time_click {
          display: flex;
          justify-content: space-between;
          color: #888888;
          margin-right: 11px;
          font-size: 12px;
        }
      }
      .newsImg {
        img {
          width: 100px;
          height: 100px;
        }
      }
    }
}
</style>