<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        :is-checked="isSelectAll"
        class="check-btn"
        @click.native="checkClick"
      />
      <span>全选</span>
    </div>
    <div class="price">
      <span>合计:{{ totalPrice }}</span>
    </div>
    <div class="calculate" @click="calcClick">结算:({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "../../../components/content/CheckButton/CheckButton.vue";
import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  methods:{
    checkClick(){
      console.log(1);
      if(this.isSelectAll){
        return this.cartList.forEach(item =>item.checked = false) //全部选中
      }else{
        return this.cartList.forEach(item => item.checked = true) //部分选中或者全部不选
      }
      // return this.cartList.forEach(item => item.checked = !this.isSelectAll)   不能这样写
    },
    calcClick(){
      if(this.checkClick.length==0){
        this.$toast.show('请选择商品',2000)
      }
    }
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      if (this.cartList.length === 0) return false;

      // 使用filter  需判断0
      // return !(this.cartList.filter(item =>!item.checked).length)

      // 使用find    需判断0
      // return !this.cartList.find(item =>!item.checked)

      // 使用every不用考虑空购物车
      // return this.cartList.every(item => item.checked)

      // 普通遍历
      for (let item of this.cartList) {
        if (!item.checked) {
          return false;
        }
      }
      return true;
    },
  },
};
</script>

<style>
.bottom-bar {
  height: 40px;
  background-color: #eee;
  position: relative;
  line-height: 40px;
  display: flex;
  justify-content: space-evenly;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 9px;
}
.check-btn {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price {
  margin-left: 40px;
}
.calculate {
  width: 90px;
  height: 40px;
  background-color: rgb(228, 150, 32);
  margin-left: auto;
  text-align: center;
  color: ghostwhite;
}
</style>
