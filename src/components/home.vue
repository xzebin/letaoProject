<template>
    <div id="homeBox">
        <indexmC></indexmC>
    </div>
</template>

<script>
  import indexmC from "./indexMainComponent.vue";
    export default {
        name:"home_component",
        components:{
            indexmC
        }
    }
</script>

<style lang="scss" scoped>
    #homeBox {
        max-width: 750px;
        min-width: 320px;
    }
</style>