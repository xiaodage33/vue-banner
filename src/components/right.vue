<template>
  <div  v-if="kk ==1"> 111111 </div>

  <div  v-else-if="kk ==2">  22222 </div>

  <div  v-else-if="kk ==3">  3333  </div>
</template>

<script>
  import msg from "./msg.js"
  export default {
    name: 'right',
    data(){
      return{
        kk:0
      }
    },
    mounted:function () {
      var _this=this   //下划线是副本 当前_this或其他obj名字也可
      msg.$on('val',function (m) {
         _this.kk = m;

      })

    }
  }
</script>

<style scoped>

</style>
