<template>
  <div>
    <div class="title"> 热门推荐   </div>
    <ul class="menu">
      <li @click="menu1">笔记本</li>
      <li @click="menu2">手机</li>
      <li @click="menu3"> 家电</li>
    </ul>
  </div>
</template>

<script>
  import msg from "./msg.js"
  export default {
    name: 'left',
    methods:{

      menu1:function () {
          msg.$emit("val","1")
      },
         menu2:function () {
          msg.$emit("val","2")
      },
          menu3:function () {
          msg.$emit("val","3")
      }
    }


}

</script>

<style scoped type="text/css">
.title{
   width:100px;
   color:red;
}
  .menu li{
    /*去掉li前面的点点*/
    List-style: none;
    height:50px;
    margin-bottom: 2px;
    background-color: white;
    /*居中*/
    line-height: 50px;
    cursor: pointer;

  }
</style>
