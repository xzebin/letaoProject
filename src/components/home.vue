<template>
    <div id="homeBox">
        <indexmC></indexmC>
    </div>
</template>

<script>
  import indexmC from "./indexMainComponent.vue";
    export default {
        components:{
            indexmC
        },
        created() {
            this.$parent.isbool = true;
            this.$parent.active = 0;
        },
    }
</script>

<style lang="scss" scoped>
    #homeBox {
        max-width: 750px;
        min-width: 320px;
    }
</style>