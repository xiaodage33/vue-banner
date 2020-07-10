<template>
  <div class="banner-container" @mouseenter="autoStop" @mouseleave="autoStart" >
    <ul class="images" :style="{width: banners.length * 100 + '%',
       marginLeft: -index * 100 + '%',
    }">
      <li v-for="(item,i) in banners" :key="i">
      <a href="item.link"><img :src="item.url" alt=""></a> {{ item.url}}</li>
    </ul>
    <ul class="dots">
      <li
          v-for="(item, i) in banners"
          :key="i"
          :class="{
             active: i === index,
          }"
          @click="index =i"
      ></li>
    </ul>
  </div>
  <!--<el-carousel height="520px" :interval="3000" arrow="always">-->
  <!--<el-carousel-item>-->
  <!--<img src="../assets/img/banner1.png" alt="">-->
  <!--</el-carousel-item>-->
  <!--<el-carousel-item>-->
  <!--<img src="../assets/img/banner2.png" alt="">-->
  <!--</el-carousel-item>-->
  <!--<el-carousel-item>-->
  <!--<img src="../assets/img/banner3.png" alt="">-->
  <!--</el-carousel-item>-->
  <!--</el-carousel>-->
</template>
<script>
  export default {
    name: 'Banner',
    props:{
      banners:{
        type: Array,   //属性类型是数组
        required: true   //必须要传递该属性
      },
    },
    created () { //创建计时器
      this.autoStart()
      console.log('kaishi')
    },
    destroy (){   //销毁定时器
      this.autoStop();
    },

    data(){
       return{
         index: 0, //当前显示的第几张图片
         timer: null
       }
    },
    methods: {  //自动开始切换
      autoStart(){
       if(this.timer){
         return;
       }
        this.timer = setInterval(()=>{
          this.index = (this.index +1 )% this.banners.length;
          console.log(this.index)
        },2000)

      }, //停止自动切换
      autoStop(){
        clearInterval(this.timer)
        // this.timer = null;
      }


    }

  }
</script>
<style scoped>
  .banner-container {
    height: 500px;
    position: relative;
    overflow: hidden;
  }
  .banner-container li {
    display: block;
    width: 1080px;
    height: 100%;
    float: left;
  }

  .images {
    height: 100%;
    transition: 0.5s;
  }
  .banner-container img{
    width: 1080px;
    height: 100%;
  }
  .dots{
    position: absolute;
    bottom: 10px;
    right: 10px;
    display: flex;
  }
  .dots li{
    width: 10px;
    cursor: pointer;
    height: 10px;
    margin: 0 3px;
    border-radius: 50%;
    border: 1px solid;
    color: green;
    }
    .dots li.active {
      background: red;

    }
  /*.el-carousel__item h3 {*/
  /*color: #475669;*/
  /*font-size: 18px;*/
  /*opacity: 0.75;*/
  /*line-height: 300px;*/
  /*margin: 0;*/
  /*}*/

  /*.el-carousel__item:nth-child(2n) {*/
  /*background-color: #99a9bf;*/
  /*}*/

  /*.el-carousel__item:nth-child(2n+1) {*/
  /*background-color: #d3dce6;*/
  /*}*/
  /*.el-carousel__item img {*/
  /*text-align: center;*/
  /*height: 520px;*/
  /*margin: 0 auto;*/
  /*display: block;*/
  /*}*/
</style>
