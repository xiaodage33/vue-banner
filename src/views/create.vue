<template>
  <div class="main">
    <div class="left"><left>  </left></div>

    <div class="right">
      <div right class="top">

            <img src="../../src/assets/img/banner4.png">
          <right />
      </div>

      <div class="buttom"></div>
    </div>
  </div>
</template>

<script>
  import left from "../components/left.vue"
    import right from "../components/right.vue"

  export default {
    name: 'create',
    components: {
      left,right
    },
  }
</script>
<style scoped type="text/css">
   *{
     padding:0;
     margin: 0;
   }
  .left{
    width:100px;
    /*//浮动*/
    float: left;
    margin-right: 10px;
  }
  .right{
    width: 1000px;
    float: left;
    margin-left: 10px;
  }
  .main{
    width: 1200px;
    margin: 20px auto;
  }
  .top{
    height: 200px;
    width: 1000px;
  }
  .left,.right{
    background: #f5f5f5;
    height: 500px;
  }
</style>
