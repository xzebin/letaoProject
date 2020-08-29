<template>
    <div id="menuInfoBox">
        <goodsList v-if="menuNames == 0"></goodsList>
        <newsList v-else-if="menuNames == 1"></newsList>
    </div>
</template>

<script>
    import newsList from "@/components/news/newsList.vue";
    import goodsList from "@/components/goods/goodsList.vue";
    export default {
        data(){
            return {
                menuNames:"",
                menuDatas:[
                    {menuName:"商品列表"},
                    {menuName:"新闻列表"},
                    {menuName:"美图列表"},
                    {menuName:"服饰列表"},
                    {menuName:"9.9列表"},
                    {menuName:"服饰列表"},
                    {menuName:"物流查询"},
                    {menuName:"全部"},
                ]
            }
        },
        components:{
            newsList,goodsList
        },
        created() {
            this.menuNames = this.$route.params.routeInfo.split("=")[1];
            this.$parent.titleInfo = this.menuDatas[this.menuNames].menuName;
        }
    }
</script>

<style lang="scss" scoped>

</style>