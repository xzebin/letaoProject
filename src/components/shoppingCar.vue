<template>
  <div id="shoppingCarBox">
    <div class="emptyCar" v-if="isEmpty">
      <h3>
        亲，您的购物车空空如也，去
        <a href="#/home">首页</a>逛逛吧！
      </h3>
      <div class="shoppingCarImg">
        <img src="@/assets/images/car.png" />
      </div>
    </div>
    <div class="noEmptyCar" v-else>
      <CheckboxGroup v-model="result" :max="0" ref="checkboxGroup">
        <div class="good_item" v-for="item in shoppingCarDatas" :key="item.id">
          <div class="buyCheckBox">
            <Checkbox checked-color="red" :name="item.id"></Checkbox>
          </div>
          <div class="thumb_img">
            <img :src="item.thumb_path" />
          </div>
          <div class="goodsInfo">
            <div class="title">{{ item.title }}</div>
            <div class="info">
              <span id="price">￥{{ item.sell_price }}</span>
              <Stepper
                theme="round"
                max="5"
                :default-value="item.number"
                v-model="item.number"
                button-size="22"
                disable-input
              />
              <Button type="danger" @click="delGoodsToCar(item.id)">删除</Button>
            </div>
          </div>
        </div>
        <div class="checkAll">
          <SubmitBar @submit="onSubmit" :price="getTotalPrice.totalPrice" button-text="提交订单">
            <div class="box" @click="checkAll">
                <Checkbox v-model="checked">全选</Checkbox>
            </div>
          </SubmitBar>
        </div>
        <span id="goodsCount">共计 {{ getTotalPrice.totalNum }} 件商品</span>
      </CheckboxGroup>
    </div>
  </div>
</template>

<script>
import { getCarGoodsById } from "@/api/index.js";
import {
  Stepper,
  Button,
  Checkbox,
  CheckboxGroup,
  SubmitBar,
  Toast,
} from "vant";
export default {
  data() {
    return {
      isEmpty: false,
      shoppingCarDatas: [],
      value: "",
      isChecked: false,
      checked: true,
      result: [],
    };
  },
  methods: {
    async getGoods(res) {
      let idStr = res.map((e) => e.id).join(",");
      let res2 = await getCarGoodsById(idStr);
      res2.map((e) => {
        e.number = this.getNum(res, e.id);
      });
      this.shoppingCarDatas = res2;
    },
    getNum(res, id) {
      return res.find((e) => e.id == id).number;
    },
    checkAll() {
      this.checked = !this.checked;
      this.$refs.checkboxGroup.toggleAll();
    },
    delGoodsToCar(goodsId) {
      //从购物车中删除商品
      this.shoppingCarDatas = this.shoppingCarDatas.filter(
        (e) => e.id != goodsId
      );
      localStorage.setItem("myCar", JSON.stringify(this.shoppingCarDatas));
    },
    onSubmit() {
      Toast("提交成功");
    },
  },
  created() {
    this.$parent.titleInfo = "我的购物车";
    this.$parent.isbool = false;
    let res = JSON.parse(localStorage.getItem("myCar"));
    if (res == null) {
      this.isEmpty = true;
    } else {
        res.map(e => {
            if(e.checkedBool){
                this.result.push(e.id);
            }
        });
      //修改底部显示购物车的数量
      this.$parent.updateCarNum(res.length);
      this.getGoods(res);
    }
  },
  components: {
    Stepper,
    Button,
    Checkbox,
    CheckboxGroup,
    SubmitBar,
  },
  computed: {
      getTotalPrice(){
        let obj = {};
        obj.totalNum = 0;
        obj.totalPrice = 0;
        this.shoppingCarDatas.map(e => {
            if(this.result.includes(e.id)){
                obj.totalNum += e.number;
                obj.totalPrice += (parseInt(e.sell_price ) * e.number) * 100;
            }
        });
        return obj;
      }
  },
};
</script>

<style lang="scss" scoped>
#shoppingCarBox {
  background-color: #ccc;
  width: 100%;
  margin-bottom: 50px;
  .emptyCar {
    text-align: center;
    h3 {
      font-size: 19px;
      color: #333;
    }
  }
  .noEmptyCar {
    padding: 10px 5px;
    .checkAll {
      width: 100%;
      border-radius: 5px;
      margin-bottom: 1px;
      background-color: white;
      #goodsCount{
          margin-left: 5px;
      }
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
          }
        }
      }
    }
  }
}
</style>