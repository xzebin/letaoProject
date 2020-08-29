<template>
  <div id="newsListBox">
    <PullRefresh v-model="isLoading" @refresh="onRefresh" animation-duration="500">
      <div class="newsList">
        <div
          class="newsItem"
          v-for="item in newsDatas"
          :key="item.id"
          @click="getNewsDetailById(item.id)"
        >
          <div class="newsImg">
            <img :src="item.img_url" />
          </div>
          <div class="newsInfo">
            <h3 class="van-multi-ellipsis--l2">{{ item.title }}</h3>
            <div class="time_click">
              <div class="time">发布时间：{{ item.add_time | formatDate }}</div>
              <div class="click">点击：{{ item.click }}</div>
            </div>
          </div>
        </div>
      </div>
    </PullRefresh>
    <Button plain hairline type="primary" color="#ccc" :round=true>加载更多新闻</Button>
  </div>
</template>

<script>
import { getNewsDatas } from "@/api/index.js";
import { PullRefresh, Toast, Button } from "vant";
export default {
  data() {
    return {
      newsDatas: [], //用来保存新闻数据信息
      isLoading: false, //监听是否为加载状态
      currentPage: 1, //记录当前的页码
      pageSize: 10, //每页数据量
    };
  },
  methods: {
    async getNewsLists() {
      //获取新闻列表数据
      var res = await getNewsDatas(this.currentPage, this.pageSize);
      if (res.length == 0) {
        Toast("");
        return;
      }
      if (this.currentPage == 1) {
        this.newsDatas = res;
      } else {
        this.newsDatas = this.newsDatas.concat(res);
      }
      this.currentPage++;
    },
    onRefresh() {
      //下拉刷新执行函数
      setTimeout(() => {
        this.newsDatas = this.newsDatas.reverse();
        Toast("刷新成功");
        this.isLoading = false;
      }, 1000);
    },
    getNewsDetailById(newsId) {
      //根据新闻id跳转
      this.$router.push(`/getNewsDetail/${newsId}`);
    },
  },
  components: {
    PullRefresh,
    Toast,
    Button,
  },
  created() {
    this.getNewsLists();
    this.$parent.active = 0;
  },
};
</script>

<style lang="scss" scoped>
#newsListBox {
  margin-bottom: 50px;
  .newsList {
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
}
</style>