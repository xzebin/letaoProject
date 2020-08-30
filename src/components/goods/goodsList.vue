<template>
  <div id="goodsBox">
    <PullRefresh v-model="refreshing" @refresh="onRefresh">
      <List v-model="loading" :finished="finished" finished-text="到底了" loading-text="玩命加载中" @load="onLoad">
        <div class="goodList">
          <div
            class="good_item"
            v-for="item in goodsData"
            :key="item.id"
            @click="getGoodsDetail(item.id)"
          >
            <img v-lazy="item.img_url" />
            <div class="good_title van-multi-ellipsis--l2">{{ item.title }}</div>
            <div class="price">
              ￥{{ item.sell_price }}
              <span id="oldPrice">
                <del>￥{{ item.market_price }}</del>
              </span>
            </div>
            <div class="good_info">
              <span>热卖中</span>
              <span>剩{{ item.stock_quantity }}件</span>
            </div>
          </div>
        </div>
      </List>
    </PullRefresh>
  </div>
</template>

<script>
import { getGoodsLists } from "@/api/index.js";
import { List, PullRefresh, Cell,Toast } from "vant";
export default {
  data() {
    return {
      goodsData: [],
      currentPage: 1,
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
    };
  },
  methods: {
    async getGoodsDatas() {
      let res = await getGoodsLists(this.currentPage);
      this.goodsData = res;
    },
    getGoodsDetail(goodsDetail) {
      this.$router.push(`/getGoodsInfo/${goodsDetail}`);
    },
    onLoad() {
        this.currentPage ++;
      setTimeout(async () => {
        let res = await getGoodsLists(this.currentPage);
        if (res.length == 0) {
            this.finished = true;
            return;
        }
        this.goodsData = this.goodsData.concat(res);

        this.loading = false;

      }, 1000);
    },
    onRefresh() {
        // 清空列表数据
        // this.finished = false;
        // // 重新加载数据
        // // 将 loading 设置为 true，表示处于加载状态
        // this.loading = true;
        // this.onLoad();
      setTimeout(() => {
        Toast("刷新成功");
        this.refreshing = false;
        this.goodsData = this.goodsData.reverse();
      }, 800);
    },
  },
  created() {
    this.getGoodsDatas();
  },
  components: {
    List,
    PullRefresh,
    Cell,
    Toast
  },
};
</script>

<style lang="scss" scoped>
#goodsBox {
  background-color: #ccc;
  margin-bottom: 50px;
  .goodList {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0px 5px 0px 5px;
    .good_item {
      border-radius: 10px;
      background-color: white;
      margin: 5px 0;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      width: 49.5%;
      padding: 4px;
      img {
        flex: 1;
        width: 100%;
      }
      .good_title {
        color: #333;
        font-size: 12px;
      }
      .price {
        color: #ff0000;
        font-size: 16px;
        font-weight: 700;
        #oldPrice {
          color: #565252;
          font-size: 12px;
          margin-left: 5px;
        }
      }
      .good_info {
        display: flex;
        font-size: 14px;
        color: #565252;
        justify-content: space-between;
      }
    }
  }
}
</style>