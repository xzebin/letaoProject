<template>
  <div id="orderListBox">
    <van-tabs v-model="active">
      <div id="temp"></div>
      <van-tab v-for="item in tabtitles" :key="item.status" :title="item.title">
        <van-card
          v-for="order in getOrderDatasByStatus(item.status)"
          :key="order.id"
          :price="order.total_price"
          :title="order.goods.title"
          :thumb="order.goods.thumb_path"
        >
          <template #tags>
            <div id="goodsNum">共有{{ order.number }}件商品</div>
            <van-tag plain type="danger">付款方式：{{ order.pay_way }}</van-tag>
          </template>
          <template #footer>
            <van-button size="mini" :type="getTypeByStatus(order.status)">{{ getTextByStatus(order.status) }}</van-button>
            <van-button size="mini" type="danger">联系客服</van-button>
          </template>
        </van-card>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs, Card, Tag, Button } from "vant";
import { getOrdersByUserId, isLogin, getCarGoodsById } from "@/api/index.js";
export default {
  data() {
    return {
      active: 0, //默认选中第一个
      orderAllDatas: [],
      tabtitles: [
        { title: "全部", status: "all",type:""},
        { title: "未付款", status: "0",type:"danger"},
        { title: "已付款", status: "1",type:"primary"},
        { title: "已完成", status: "2",type:"info"},
        { title: "已取消", status: "3" },
        { title: "已退款", status: "4" },
        { title: "已发货", status: "5" },
      ],
    };
  },
  components: {
    "van-tabs": Tabs,
    "van-tab": Tab,
    "van-card": Card,
    "van-tag": Tag,
    "van-button": Button,
  },
  methods: {
    async getOrderDatas() {
      await isLogin();
      let res = await getOrdersByUserId(this.$store.state.currentUser.id);
      let tempArr = [];
      res.map((e) => {
        tempArr.push(getCarGoodsById(e.goods_ids));
      });
      let res2 = await Promise.all(tempArr);
      for (let index = 0; index < res.length; index++) {
        res[index].goods = res2[index][0];
        if (index == res.length - 1) {
          this.orderAllDatas = res;
        }
      }
    },
    //根据订单状态获取对应数据
    getOrderDatasByStatus(status) {
      if (status == "all") {
        return this.orderAllDatas;
      }
      let temp = [];
      this.orderAllDatas.map((e) => {
        if (e.status == status) {
          temp.push(e);
        }
      });
      return temp;
      // let tempArr = [];
      // if (status === "all") {
      //   this.orderAllDatas.map((e) => {
      //     tempArr.push(getCarGoodsById(e.goods_ids));
      //   });
      //   let res = await Promise.all(tempArr);
      //   return res;
      // }
      // this.orderDatas.map(async (e) => {
      //   if (e.status == status) {
      //     tempArr.push(getCarGoodsById(e.goods_ids));
      //   }
      //   let res = await Promise.all(tempArr);
      //   return res;
      // });
    },
    getTextByStatus(status) {
      let obj = this.tabtitles.find((e) => status == e.status);
      return obj.title;
    },
    getTypeByStatus(status) {
      let obj = this.tabtitles.find((e) => status == e.status);
      return obj.type;
    },
  },
  created() {
    //修改头部标题信息
    this.$parent.titleInfo = "我的订单";
    this.getOrderDatas();
  },
  mounted() {
    //将底部中的退出登录隐藏
    document.getElementsByClassName("van-tabbar")[0].style.display = "none";
  },
};
</script>

<style lang="scss" scoped>
#orderListBox {
  background-color: rgb(238, 238, 238);
}
.van-tabs #temp {
  margin: 10px 0;
}
.van-card .van-card__header .van-card__content div {
  padding: 2px 0;
}
</style>