<template>
<!-- ref/children -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name:'Scroll',
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return {
      scroll:null
    }
  },
  mounted(){
    // 创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      click:true,
      observeImage:true,
      observeDom:true,
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad
    })
    this.scroll.on('scroll',(position)=>{
      // console.log(position);
      this.$emit('scroll',position)
    })
    this.scroll.on('pullingUp',()=>{
      // console.log('加载更多');
      this.$emit('pullingUp')
    })
  },
  methods:{
    scrollTo(x,y,time = 300){
      this.scroll.scrollTo(x,y*1,time)
    },
    refresh(){
      this.scroll.refresh()
    }
    ,
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    }
  },
}
</script>

<style>

</style>
