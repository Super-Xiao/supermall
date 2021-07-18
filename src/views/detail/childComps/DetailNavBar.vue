<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick"><img src="../../../assets/img/common/back.svg" alt=""></div>
    <div slot="center" class="title">
      <div
        v-for="(item, index) in titles"
        :key="index"
        class="title-item"
        :class="{ active: index === currentIndex }"
        @click="titleClick(index)"
      >
        {{ item }}
      </div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "../../../components/common/navbar/NavBar.vue";
export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods:{
    titleClick(index){
      this.currentIndex = index
      this.$emit('titleClick',index)
    },
    backClick(){
      this.$router.back(-1)
    }
  }
};
</script>

<style>
.title {
  display: flex;
  /* justify-content: space-around; */
  font-size: 13px;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-tint);
}
.back{
  margin-top: 6px;

}
</style>
