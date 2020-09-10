<template>
  <div id="navbarBox">
    <NavBar :title="this.$parent.titleInfo" left-text="返回" left-arrow @click-left="onClickLeft" />
  </div>
</template>

<script>
import { NavBar } from "vant";
export default {
  components: {
    NavBar,
  },
  methods: {
    onClickLeft() {
        this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.van-nav-bar {
  width: 100%;
}
</style>