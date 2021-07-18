<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      ref="nav"
    ></detail-nav-bar>
    <scroll class="content-c" ref="scrolla" :probeType="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods" ref="baseinfo" />
      <detail-shop-info :shop="shop" ref="shopinfo" />
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
        ref="goodsinfo"
      />
      <detail-param-info :param-info="paramInfo" ref="param" />
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <goods-list :goods="recommends" ref="recommends" />
    </scroll>
    <detail-bottom-bar/>
  </div>
</template>

<script>
import DetailNavBar from "../detail/childComps/DetailNavBar.vue";
import DetailSwiper from "../detail/childComps/DetailSwiper.vue";
import DetailBaseInfo from "../detail/childComps/DetailBaseInfo.vue";
import DetailShopInfo from "../detail/childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "../detail/childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "../detail/childComps/DetailParamInfo.vue";
import DetailCommentInfo from "../detail/childComps/DetailCommentInfo.vue";
import DetailBottomBar from "../detail/childComps/DetailBottomBar.vue"

import Scroll from "../../components/common/scroll/Scroll.vue";
import GoodsList from "../../components/content/goods/GoodsList.vue";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "../../network/detail";
// import { debounce } from "../../common/utils";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex:0,
    };
  },

  // mounted(){
  //   // console.log(this.$refs.scrolla.refresh);
  //    const refresh = debounce(this.$refs.scrolla.refresh, 0);
  //    this.$bus.$on("imagebLoad", () => {
  //     refresh()
  //     // console.log(refresh);
  //   });
  // },
  methods: {
    debounce(func, delay) {
      let timer = null;
      return function () {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func();
        }, delay);
      };
    },
    mounted() {
      // this.$refs.scrolla.refresh()
    },
    imageLoad() {
      this.$refs.scrolla.refresh();
      // console.log(1);
      //  const refresh = this.debounce(() =>{
      //     this.scrollY.push(0);
      //     this.scrollY.push(this.$refs.baseinfo.$el.offsetTop);
      //     this.scrollY.push(this.$refs.shopinfo.$el.offsetTop);
      //     this.scrollY.push(this.$refs.goodsinfo.$el.offsetTop);
      //   },20);
      //   refresh()
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
      console.log(this.themeTopYs);
      // const param = this.$refs.param.$el.offsetTop

    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scrolla.scrollTo(0, -this.themeTopYs[index], 100);

    },
    contentScroll(position){
      // console.log(position);
      const positionY = -position.y
      let length = this.themeTopYs.length
      for(let i =0;i<length;i++){
        if(this.currentIndex !== i &&((i<length-1 && positionY>=this.themeTopYs[i] &&positionY<this.themeTopYs[i+1] ||(i ===length-1 && positionY>=this.themeTopYs[i])))){
          this.currentIndex = i
          // console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }

    }
  },
  created() {
    //1.保存传入的iid
    // console.log(this.$route.params.iid);
    this.iid = this.$route.params.iid;

    // 2.根据iid请求详细数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      // 获取顶部图片轮播数据
      const data = res.result;
      this.topImages = data.itemInfo.topImages;

      // 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      // 保存商品的详细数据
      this.detailInfo = data.detailInfo;

      // 获取商品参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    getRecommend().then((res) => {
      this.recommends = res.data.list;
      // console.log(this.recommends);
    });
    // this.$nextTick(()=>{
      // 值不对，因为图片没有计算在内
    //   this.themeTopYs = []
    //   this.themeTopYs.push(0);
    //   this.themeTopYs.push(this.$refs.param.$el.offsetTop);
    //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    //   this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
    //   console.log('nextTick'+this.themeTopYs);
    // })
  },
  updated() {},
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;

}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;

}
.content-c {
  /* height: calc(100% - 44px); */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 0px;
  left: 0;
  right: 0;
  margin-bottom: 58px;
}
</style>
