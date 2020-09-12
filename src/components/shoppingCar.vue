<template>
  <div id="shoppingCarBox">
    <!-- 购物车中没有商品的时候显示 -->
    <div class="emptyCar" v-if="isEmpty">
      <h3>
        亲，您的购物车空空如也，去
        <a href="#/home">首页</a>逛逛吧！
      </h3>
      <div class="shoppingCarImg">
        <img src="@/assets/images/car.png" />
      </div>
    </div>
    <!-- 购物车中有商品的时候显示 -->
    <div class="noEmptyCar" v-else>
      <!-- 地址 -->
      <Divider
        :style="{ color: 'black', borderColor: '#ccc', padding: '0 16px',margin: '0px 0' }"
      >收货地址</Divider>
      <div class="hasAddress" v-if="hasAddress">
        <AddressList v-model="chosenAddressId" :list="list" default-tag-text="默认" @edit="onEdit" />
      </div>
      <div class="noAddress" v-else>
        <!-- <Button type="danger">添加地址</Button> -->
        默认地址还未设置，
        <a href="#/address">请前往?</a>
      </div>

      <!-- 商品 -->
      <Divider
        :style="{ color: 'black', borderColor: '#ccc', padding: '0 16px ',margin: '10px 0' }"
      >购买的商品</Divider>
      <CheckboxGroup v-model="result" :max="0" ref="checkboxGroup">
        <div class="good_item" v-for="item in shoppingCarDatas" :key="item.id">
          <div class="buyCheckBox">
            <Checkbox checked-color="red" :name="item.id" @click="updGoodsStatus(item.id)"></Checkbox>
          </div>
          <div class="thumb_img" @click="getGoodsDetail(item.id)">
            <img :src="item.thumb_path" />
          </div>
          <div class="goodsInfo">
            <div class="title" @click="getGoodsDetail(item.id)">{{ item.title }}</div>
            <div class="info">
              <span id="price" @click="getGoodsDetail(item.id)">￥{{ item.sell_price }}</span>
              <Stepper
                theme="round"
                max="10"
                v-model="item.number"
                button-size="22"
                disable-input
                @change="listeningValue(item)"
              />
              <Button type="danger" @click="delGoodsToCar(item.id)">删除</Button>
            </div>
          </div>
        </div>
        <div class="checkAll">
          <SubmitBar @submit="onSubmit" :price="getTotalPrice.totalPrice" button-text="生成订单">
            <div class="box" @click="checkAll">
              <Checkbox v-model="checked">全选</Checkbox>
            </div>
          </SubmitBar>
        </div>
        <RadioGroup v-model="radio">
          <CellGroup>
            <Cell clickable @click="radio = '1'">
              <img src="../assets/images/z_pay.png" style="width:30px;" />支付宝支付
              <template #right-icon>
                <Radio name="1" />
              </template>
            </Cell>
            <Cell clickable @click="radio = '2'">
              <img src="../assets/images/w_pay.png" style="width:30px;" />微信支付
              <template #right-icon>
                <Radio name="2" />
              </template>
            </Cell>
          </CellGroup>
        </RadioGroup>
        <span id="goodsCount">共计 {{ getTotalPrice.totalNum }} 件商品</span>
      </CheckboxGroup>
    </div>
  </div>
</template>

<script>
import {
  getCarGoodsById,
  getAddrsByUserId,
  isLogin,
  commitOrder,
} from "@/api/index.js";
import { getOrderNum } from "@/util/tools.js";
import { sleep } from "@/util/sleep.js";
import {
  Stepper,
  Button,
  Checkbox,
  CheckboxGroup,
  SubmitBar,
  Toast,
  Divider,
  AddressList,
  RadioGroup,
  Radio,
  Cell,
  CellGroup,
  Dialog,
} from "vant";
export default {
  data() {
    return {
      radio: "2",
      isEmpty: false, //判断购物车是否为空
      shoppingCarDatas: [], //保存购物车中的数据
      checked: true, //记录全选的状态
      result: this.$store.getters.getChecked, //记录商品选中状态为true的商品id
      chosenAddressId: 0,
      hasAddress: true, //用来判断是否有地址
      list: [],
    };
  },
  methods: {
    async getGoods(res) {
      //判断本地存储是否有存储购物车数据
      if (res.length == 0) {
        this.isEmpty = true;
        return;
      }
      //有的话就通过id发送请求后台接口数据，根据id获取对应的商品
      let idStr = res.map((e) => e.id).join(",");
      let res2 = await getCarGoodsById(idStr);
      res2.map((e) => {
        e.number = this.getNum(res, e.id);
      });
      this.shoppingCarDatas = res2;
      //根据当前登录用户获取出该用户的默认收货地址
      let { id } = JSON.parse(localStorage.getItem("userInfo"));
      let res3 = await getAddrsByUserId(id);
      if (res3.length == 0) {
        this.hasAddress = false;
        return;
      }
      this.list = [];
      //临时保存为默认的收货地址
      let temp = {};
      res3.map((e) => {
        e.address = e.province + e.city + e.country + e.addressDetail;
        e.isDefault ? (e.isDefault = true) : (e.isDefault = false);
        if (e.isDefault) {
          temp = e;
          this.chosenAddressId = e.id;
        }
      });
      // 保存到数组中
      temp.id ? this.list.push(temp) : (this.hasAddress = false);
    },
    //根据指定id获取对应的商品数量
    getNum(res, id) {
      return res.find((e) => e.id == id).number;
    },
    //全选操作
    checkAll() {
      //根据全选按钮状态修改所有所有商品的状态
      this.$store.commit("checkAllUpdStatus", this.checked);
      //并且修改自身复选框的状态
      this.checked = !this.checked;
      //重新获取有选中状态的商品
      this.result = this.$store.getters.getChecked;
    },
    //从购物车中删除指定的商品
    delGoodsToCar(goodsId) {
      Dialog.confirm({
        title: "从购物车中移除商品",
        message: "确认删除吗",
      })
        .then(() => {
          // on confirm
          this.$store.commit("delGoodToCar", goodsId);
          this.getGoods(this.$store.state.carArr);
          Toast("删除成功");
        })
        .catch(() => {
          // on cancel
          Toast("取消删除");
        });
    },
    //点击生成订单触发事件
    async onSubmit() {
      if (!this.hasAddress) {
        Toast("当前的收货地址为空，请前往添加");
        return;
      }
      let { status, messages } = await isLogin();
      if (status == 1) {
        Toast(messages);
      } else {
        if (this.result.length == 0) {
          Toast("请选择下单的商品哦！");
          return;
        }
        let str = this.result.join(",");
        let orderInfo = {
          user_id: this.$store.state.currentUser.id,
          order_id: getOrderNum(),
          address_id: this.list[0].id,
          total_price: this.getTotalPrice.totalPrice / 100,
          number: this.getTotalPrice.totalNum,
          goods_ids: str,
        };
        let res = await commitOrder(orderInfo);
        Toast("订单支付中,请稍后...");
        await sleep(2000);
        location.href = res.data;
      }
    },
    //点击编辑默认地址触发事件
    onEdit(item) {
      this.$router.push(`/addressEdit/${JSON.stringify(item)}`);
    },
    //监听步进器的值动态修改存储在本地中的值
    listeningValue(item) {
      this.$store.commit("updateGoods", item);
    },
    //根据商品id跳转商品详情页面
    getGoodsDetail(id) {
      this.$router.push(`/getGoodsInfo/${id}`);
    },
    //修改商品的选中状态
    updGoodsStatus(id) {
      this.$store.commit("updGoodsStatus", id);
    },
  },
  created() {
    this.$parent.titleInfo = "我的购物车";
    //页面刷新时先获取本地存储中的购物车数据
    let res = this.$store.state.carArr;
    //如果为空的话
    if (res == null) {
      //就直接修改状态，让空提示显示出来
      this.isEmpty = true;
    } else {
      this.getGoods(res);
    }
  },
  components: {
    Stepper,
    Button,
    Checkbox,
    CheckboxGroup,
    SubmitBar,
    Divider,
    AddressList,
    RadioGroup,
    Radio,
    Cell,
    CellGroup,
    Dialog,
  },
  computed: {
    getTotalPrice() {
      let obj = {};
      obj.totalNum = 0;
      obj.totalPrice = 0;
      this.shoppingCarDatas.map((e) => {
        if (this.result.includes(e.id)) {
          obj.totalNum += e.number;
          if (e.sell_price == null) {
            e.sell_price = 9999999999;
          }
          obj.totalPrice += parseInt(e.sell_price) * e.number * 100;
        }
      });
      return obj;
    },
  },
};
</script>

<style lang="scss" scoped>
#shoppingCarBox {
  width: 100%;
  margin-bottom: 50px;
  background-color: rgb(238, 238, 238);
  .emptyCar {
    text-align: center;
    h3 {
      font-size: 19px;
      color: #333;
    }
  }
  .van-cell__value {
    display: flex;
    align-items: center;
    img {
      margin-right: 5px;
    }
  }
  .noEmptyCar {
    padding: 10px 5px;
    .van-address-list {
      padding-bottom: 0;
      .van-address-list__bottom {
        display: none;
      }
    }
    .noAddress {
      text-align: center;
      margin: 20px;
      color: #888888;
      a {
        color: #ec1212de;
        border-bottom: 1px solid #ec1212de;
      }
    }
    .checkAll {
      width: 100%;
      border-radius: 5px;
      margin-bottom: 1px;
      background-color: white;
      .van-submit-bar__bar {
        padding: 0;
        .van-submit-bar__text {
          display: flex;
        }
      }
    }
    #goodsCount {
      margin-left: 65%;
    }
    .van-radio-group {
      margin-bottom: 20px;
      border-radius: 5px;
    }
    .good_item {
      display: flex;
      padding: 8px;
      align-items: center;
      margin-bottom: 10px;
      border-radius: 5px;
      background-color: white;
      img {
        width: 100%;
      }
      .buyCheckBox {
        width: 6%;
      }
      .thumb_img {
        margin: 3px;
        width: 24%;
        img {
          width: 100%;
        }
      }
      .goodsInfo {
        width: 70%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .title {
          font-size: 16px;
          color: #000;
          overflow: hidden; /*内容超出后隐藏*/
          text-overflow: ellipsis; /* 超出内容显示为省略号*/
          white-space: nowrap; /*文本不进行换行*/
        }
        .info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          #price {
            color: #ff0000;
            font-weight: 700;
            font-size: 16px;
            width: 43%;
          }
          .van-stepper {
            flex: 1;
          }
          .van-button--normal {
            width: 24%;
          }
        }
      }
    }
  }
}
</style>