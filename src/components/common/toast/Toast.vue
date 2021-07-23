<template>
  <div class="toast" v-show="isShow"><div>{{ message }}</div></div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    // message: {
    //   type: String,
    //   default() {
    //     return "";
    //   },
    // },

    // show: {
    //   type: Boolean,
    //   default() {
    //     return false;
    //   },
    // },
  },
  data(){
    return{
      message:'',
      isShow:false
    }
  },
  methods:{
    show(message,duration=2000){
      this.isShow = true
      this.message = message

      setTimeout(()=>{
        this.isShow = false
        this.message = ""
      },duration)
    }
  }
};
</script>

<style scoped>
.toast {
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  /* transform: translate(-50%,-50%); */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px 15px;
  font-size: 18px;
  color: aliceblue;
  z-index: 999;
}
</style>
