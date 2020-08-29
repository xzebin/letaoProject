<template>
    <div id="goodsDetailBox">
        <div class="swipeImg">
            <Swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                <SwipeItem v-for="item in goodsImg" :key="item.src">
                    <img v-lazy="item.src" />
                </SwipeItem>
            </Swipe>      
        </div>  
        <div class="goodInfo">
            <div class="goodName">
                <span v-html="currentGoodsInfo.title"></span>
            </div>
            <Divider />
            <div class="price">
                <span><del>市场价：￥{{ currentGoodsInfo.market_price }}</del></span>
                <span>本店价：<span id="nowPrice">￥{{ currentGoodsInfo.sell_price }}</span></span>
            </div>
            <div class="goodsNumber">
                <span>购买数量：</span>
                <Stepper v-model="value" theme="round" max=5 button-size="22" disable-input />
            </div>
        </div>
        <div class="goodsItem">
            <Divider>其他信息</Divider>
            <div class="goodsOtherInfo">
                <span>商品货号：{{ currentGoodsInfo.goods_no }}</span>
                <span>库存情况：{{ currentGoodsInfo.stock_quantity }}件</span>
                <span>上架时间：{{ currentGoodsInfo.add_time }}</span>
            </div>
        </div>
        <div class="goodsItem">
            <Divider>介绍</Divider>
            <div class="content" v-html="currentGoodsInfo.content">

            </div>
        </div>
        <GoodsAction>
            <GoodsActionIcon icon="chat-o" text="客服" color="#07c160" dot  />
            <GoodsActionIcon icon="cart-o" text="购物车" to="/shoppingCar" />
            <GoodsActionButton type="warning" text="加入购物车" />
            <GoodsActionButton type="danger" text="立即购买" />
        </GoodsAction>
    </div>
</template>

<script>
    import { getGoodsDetailByGoodsId,getGoodsImgByGoodsId } from "@/api/index.js";
    import { Swipe, SwipeItem, Divider,Stepper,GoodsAction, GoodsActionIcon, GoodsActionButton   } from 'vant';
    export default {
        data(){
            return {
                currentGoodsInfo:{},
                goodsImg:[],
                value:"",
            }
        },
        methods: {
            async getGoodsDetail(){
                let id = this.$route.params.id;
                let res = await getGoodsDetailByGoodsId(id);
                let res2 = await getGoodsImgByGoodsId(id);
                this.currentGoodsInfo = res;
                this.goodsImg = res2;
            }
        },
        created() {
            this.getGoodsDetail();
            this.$parent.updBoolAndTitle(false,"商品详情");
        },
        components:{
            Swipe,SwipeItem,Divider,Stepper,GoodsAction, GoodsActionIcon, GoodsActionButton
        }
    }
</script>

<style lang="scss">
    #goodsDetailBox{
        padding: 5px 5px 100px 5px;
        background-color: #ccc;
        img{
            width: 100%;
        }
        .swipeImg{
            width: 100%;
            background: white;
            text-align: center;
            img{
                width: 245px;
                height: 240px;
            }
        }
        .goodInfo{
            margin: 10px 0;
            padding: 8px;
            background-color: white;
            border-radius: 10px;
            .goodName{
                span{
                    font-size: 16px;
                    color: #333;
                }
            }
            .price{
                margin-bottom: 15px;
                span{
                    margin-right: 30px;
                    font-size: 16px;
                    color: #333;
                    #nowPrice{
                        color: #ff0000;
                        font-weight: 700;
                    }
                }
            }
            .goodsNumber{
                display: flex;
            }
        }
        .goodsItem{
            margin-bottom: 10px;
            padding: 8px;
            background-color: white;
            border-radius: 10px;
            .goodsOtherInfo{
                display: flex;
                flex-direction: column;
            }
        }
        .van-goods-action{
            position: fixed;
            bottom: 50px;
        }
    }
</style>