<template>
  <div>  展示jenkins

    <el-button @click="abcde"> abcde </el-button>


    <!---->
      <!--v-loading="loading"-->
             <!--element-loading-text="拼命加载中"-->
             <!--element-loading-spinner="el-icon-loading"-->

            <el-table
            :data="data.item"
             style="width: 100%;border: 5px;"

             element-loading-background="rgba(0, 0, 0, 0.8)" >
            <el-table-column
                    prop="data_name"
                    label="jenkins项目"
                    width="350">
            </el-table-column>

            <el-table-column
                    type="index"
                    label=" 编号"
                    width="350">
            </el-table-column>

            <el-table-column
                    prop="status"
                    label="状态"
                    width="180">
            </el-table-column>
            <el-table-column
                    label="操作">
                <template slot-scope="scope">
                    <el-popconfirm
                      title="你还没有权限？">
                        <el-button type="danger" size="mini" @click='del_message(scope.row.id)' slot="reference" >删除</el-button>
                        <el-button type="success" size="mini"  @click='editInfo(scope.row.id)' slot="reference" :loading="true">编辑</el-button>
                        <el-button type="success" size="mini" :title="infoPod"  @click=Cat_Jenkins_one(scope.row.data_name) slot="reference" >查看日志</el-button>
                         <!--scope.row.pod 可以这么传pod名字-->
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>


        <Dilog_Jenkins_one :flag.sync="dialog_info_add"  :pod="infoPod"  />

  </div>



</template>

<script>
  import {reactive, ref, isRef, toRefs, onMounted} from '@vue/composition-api';
  import {get_JenkinsAll } from '../../api/getinfo.js'
  import Dilog_Jenkins_one from "./Dilog_Jenkins_one.vue"
  export default {
    name: 'jenkins_info',
    components:{ Dilog_Jenkins_one },
            props:{
            flag:{
                type: Boolean,
                default: false
            }
        },



    setup(props,{root,}){

   const dialog_info_add = ref(false)  //弹框传值

    const infoPod = ref("")

    const data = reactive({
      item:[],
    })

   const abcde=()=>{
     get_JenkinsAll().then(response=>{
         data.item = response.data.data
       console.log("data",data.item)
     })
   }


     const Cat_Jenkins_one=(pod)=>{
               infoPod.value=pod;
               console.log("首页要传出名字：",infoPod.value)
            // console.log("查看pod_name",infoPod.value)
            dialog_info_add.value=true;   //弹出dialog
            // anniuwait_1.value = false;   //按钮可以点击
     }
   return{
     abcde,data,infoPod,dialog_info_add,Cat_Jenkins_one,
   }






    }





  }
</script>

<style scoped>





</style>
