<template>
  <div class="home">
    <Header style="height: 100px" />
    <div  style="width:1080px; margin:0 auto">
      <Banner :banners="banners"/>
    </div>
    <div style="margin-top: 200px;"> <Footer /> </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Header from './header.vue'
import Banner from './Banner.vue'
import Footer from './Footer.vue'

export default {
  name: 'Home',
  components: {
    Header,
    Banner,
    Footer
  },
  data(){
    return{
      banners:[
        {
          url: require("../assets/img/banner1.png"),
          link: ''
        },
        {
          url: require("../assets/img/banner2.png"),
          link: ''
        },
        {
          url: require("../assets/img/banner3.png"),
          link: ''
        }
      ],
      show: true,

    }

  }


}
</script>
