<template>
  <div id="addressBox">
    <RadioGroup v-model="radio" v-if="isShow">
      <SwipeCell v-for="item in list" :key="item.id">
        <div class="addressItemsBox">
          <div class="check">
            <Radio :name="item.id" checked-color="#ff0000" />
          </div>
          <div class="addressInfo">
            <div class="info">
              {{ item.name }} {{ item.tel }}
              <span class="default">默认</span>
            </div>
            <div class="addr">{{ item.address }}</div>
          </div>
          <div class="editBox">
            <img src="../../assets/images/edit.png" @click="editAddress(item)" />
          </div>
        </div>
        <template #right>
          <Button
            square
            text="删除"
            @click="delAddressInfo(item.id)"
            type="danger"
            class="delete-button"
          />
        </template>
      </SwipeCell>
    </RadioGroup>
    <div class="noAddrs" v-else>
      <Empty
        class="custom-image"
        image="https://img.yzcdn.cn/vant/custom-empty-image.png"
        description="地址信息空空如也，请前往添加"
      />
    </div>
    <Button id="addAddrs" @click="addAddrs" type="danger" block>新增地址</Button>
  </div>
</template>

<script>
import {
  Toast,
  SwipeCell,
  Button,
  RadioGroup,
  Radio,
  Dialog,
  Empty,
} from "vant";
import { getAddrsByUserId, delAddr } from "@/api/index.js";
export default {
  data() {
    return {
      isShow: true,
      radio: 0,
      chosenAddressId: "1",
      list: [],
    };
  },
  methods: {
    //新增地址信息
    addAddrs() {
      //跳转到新增地址路由
      this.$router.push("/addressAdd");
    },
    //获取当前用户所有的收货地址信息
    async getAddrs() {
      let user = this.$store.state.currentUser;
      if(!user){
        this.$router.push('/login');
      }
      let res = await getAddrsByUserId(user.id);
      res.map((e) => {
        e.address = e.province + e.city + e.country + e.addressDetail;
        if (e.isDefault) {
          this.radio = e.id;
        }
      });
      console.log(res);
      this.list = res;
      if (this.list.length == 0) {
        this.isShow = false;
      }
    },
    //修改地址信息触发事件
    editAddress(addrInfo) {
      this.$router.push(`/addressEdit/${JSON.stringify(addrInfo)}`);
    },
    //删除地址信息触发事件
    delAddressInfo(id) {
      Dialog.confirm({
        title: "删除地址信息",
        message: "确认删除吗",
      })
        .then(async () => {
          let { status, message } = await delAddr(id);
          Toast(message);
          if (status == 0) {
            this.list = this.list.filter((e) => e.id != id);
          }
          if (this.list.length == 0) {
            this.isShow = false;
          }
        })
        .catch(() => {
          Toast("取消删除");
        });
    },
  },
  components: {
    Toast,
    SwipeCell,
    Button,
    RadioGroup,
    Radio,
    Dialog,
    Empty,
  },
  created() {
    this.$parent.titleInfo = "地址列表";
    this.getAddrs();
  }
};
</script>

<style lang="scss" scoped>
#addressBox {
  padding: 10px 0;
  background-color: #e9e9e9;
  margin-bottom: 50px;
}
.van-swipe-cell {
  margin-top: 12px;
}
.addressItemsBox {
  width: 100%;
  height: 90px;
  padding: 8px;
  background-color: white;
  display: flex;
  align-items: center;
  .check {
    width: 8%;
  }
  .addressInfo {
    width: 77%;
    color: #323232;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    .info {
      margin-bottom: 8px;
      .default {
        display: inline-block;
        width: 32px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        background-color: #ee0a24;
        color: #ffffff;
        font-size: 12px;
        margin-left: 8px;
        border-radius: 8px;
      }
    }
    .addr {
      font-size: 13px;
      line-height: 18px;
    }
  }
  .editBox {
    width: 5%;
    img {
      width: 100%;
    }
  }
}
#addAddrs {
  border-radius: 10px;
  height: 50px;
  position: fixed;
  bottom: 0;
  z-index: 99;
}
.delete-button {
  height: 100%;
}
.custom-image .van-empty__image {
  width: 90px;
  height: 90px;
}
</style>