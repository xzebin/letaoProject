<template>
  <div id="indexMainBox">
    <!-- 首页轮播图 -->
    <Swipe class="my-swipe" indicator-color="white" :autoplay="3000">
      <SwipeItem v-for="item in lunboDatas" :key="item.url">
        <img :src="item.img" />
      </SwipeItem>
    </Swipe>
    <!-- 首页菜单（八宫格） -->
    <Grid square :border="false">
      <GridItem
        v-for="(items,index) in gonggeDatas"
        :key="items.path+index"
        @click="getMenuDatas(index)"
      >
        <img :src="items.path" />
        <div id="gridItemInfo">{{ items.info }}</div>
      </GridItem>
    </Grid>
    <!-- 首页为您推荐栏目 -->
    <div class="recommendGoodsBox">
      <Divider :style="{ color: '#333333', borderColor: '#333333'}">为您推荐</Divider>
      <div class="recommendGoods">
        <div
          class="item"
          v-for="items in recommendedDatas"
          :key="items.img_url"
          @click="jumpRcdRoute(items.id)"
        >
          <img v-lazy="items.img_url" />
          <div class="goodsInfo">
            <div class="goodTitle" :title="items.title">
              <span class="van-multi-ellipsis--l2">{{items.title}}</span>
            </div>
            <div class="buyInfo">
              <span id="price">￥ {{ items.sell_price != null ? items.sell_price : 3000}}</span>
              <span id="buyer">{{ items.buy }}已购买</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Grid, GridItem, Divider, Empty } from "vant";
import { getLunboDatas, getRecommendedDatas } from "@/api/index.js";
export default {
  data() {
    return {
      lunboDatas: [], //保存轮播图数据
      gonggeDatas: [
        //保存宫格菜单数据
        {
          path: "http://vue.w0824.com/img/menu10.d317590d.png",
          info: "数码电器",
          routeInfo: "1",
        },
        {
          path: "http://vue.w0824.com/img/menu19.f35d219e.png",
          info: "乐淘头条",
          routeInfo: "2",
        },
        {
          path: "http://vue.w0824.com/img/menu18.0a6c2ad9.png",
          info: "美图欣赏",
          routeInfo: "3",
        },
        {
          path: "http://vue.w0824.com/img/menu15.cca20f0c.png",
          info: "乐淘服饰",
          routeInfo: "4",
        },
        {
          path: "http://vue.w0824.com/img/menu12.0577be7e.png",
          info: "9.9元拼单",
          routeInfo: "5",
        },
        {
          path: "http://vue.w0824.com/img/menu15.cca20f0c.png",
          info: "乐淘服饰",
          routeInfo: "6",
        },
        {
          path: "http://vue.w0824.com/img/menu16.fb0e91c4.png",
          info: "物流查询",
          routeInfo: "7",
        },
        {
          path: "http://vue.w0824.com/img/menu17.48909dd2.png",
          info: "全部",
          routeInfo: "8",
        },
      ],
      recommendedDatas: [], //保存推荐商品数据
    };
  },
  components: {
    Swipe,
    SwipeItem,
    Grid,
    GridItem,
    Divider,
    Empty,
  },
  methods: {
    //获取轮播图数据
    async getLunboLists() {
      this.lunboDatas = await getLunboDatas();
    },
    //获取推荐商品数据
    async getRecommendedLists() {
      var recommendedData = await getRecommendedDatas();
      this.recommendedDatas = await recommendedData;
    },
    //首页菜单(八宫格)跳转
    getMenuDatas(routeInfo) {
      this.$router.push(`/menuInfo/routeInfo=${routeInfo}`);
    },
    //根据商品id跳转商品详情页面
    jumpRcdRoute(goodsId) {
      console.log(goodsId);
      this.$router.push(`/getGoodsInfo/${goodsId}`);
    },
  },
  created() {
    this.getLunboLists();
    this.getRecommendedLists();
  },
};
</script>

<style lang="scss" scoped>
#indexMainBox {
  img {
    width: 100%;
  }
  .van-grid-item {
    img {
      width: 50%;
      height: 50%;
    }
    #gridItemInfo {
      color: #524949;
    }
  }
  .recommendGoodsBox {
    padding: 0 30px;
    padding-bottom: 50px;
    .recommendGoods {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .item {
        width: 48%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: white;
        margin-bottom: 10px;
        img {
          flex: 1;
          margin-bottom: 8px;
        }
        .goodsInfo {
          .goodTitle {
            font-size: 12px;
            margin-bottom: 10px;
          }
          .buyInfo {
            font-size: 14px;
            display: flex;
            justify-content: space-between;
            #price {
              color: #ff5500;
            }
            #buyer {
              color: #999999;
            }
          }
        }
      }
    }
  }
}
</style>