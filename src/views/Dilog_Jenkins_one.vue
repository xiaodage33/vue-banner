<template>
<div >
    <!--<el-button type="text" @click="dialogVisible">点击打开 Dialog</el-button>-->

   <div style="overflow: scroll">
    <el-dialog class="el-dialog__headerbtn"
               :fullscreen="false"
               :visible.sync="data.dialog_info_flag"
               width="50%"
               top="10%"
               @opened="openDialog"
               :pod="data.pod_log_info"
               :pod_name="data.pod_name"
               :before-close="handleDialogClose">
      <div >
        <el-button class="pull-right" type="primary" @click="log_flush" v-loading="loading" style="font-size: 5px;" size="mini">历史打包查看
        </el-button>
      </div>
      <div style="width: 460px;height: 60px; background-color: white;font-size: 16px" class="margin-box" v-model="data.jenkinsone">
        <span style="color: slateblue;"> 项目名： </span>
        <span style="color: red"> {{ data.jenkinsone.project_name }} </span>
        <span style="margin-left: 10px;" > Last version： {{ data.jenkinsone.version }}  </span>
      </div>
      <div>
      </div>
    </el-dialog>




   </div>
    <!--//显示错误链路-->
    <!--<Dilog_ShowTrace :flag.sync="dialog_show_detail"  :pod="infoPod"  />-->
</div>
</template>
<script>
    import { reactive, ref, watch,toRefs} from '@vue/composition-api';
    import {get_JenkinsOne} from  '../../api/getinfo.js'
    export default {
        name: "Dilog_ShowLog_one",
        props: {
            flag: {
                type: Boolean,
                default: false
            },
            pod: {
            type: String,
            default: "" }
        },
      setup(props,{emit,root,refs}) {
        const data = reactive({
            dialog_info_flag: false,   //弹窗标记
            pod_log_info:"",
            pod_log_arr: [],
            pod_name:"",
            podname:"",
            yangshi_podname:"",
            exceptionList:[],    ////定义总的筛选数
            currentException:"",   //跳转当前的位置
            options:[],
            sel_id:'',
          jenkinsone:{}
        })
        const dialogVisible = ref(false)
        const quanping = ref(false)    //全屏默认true
        const dialog_show_detail = ref(false)  //弹框传值
        // const infoPod = ref("")   //错误的pod名字
        const guanjianzi = ref("")   //关键字数据

        // const exceptionList =ref([])    //滚动查找
        // const currentException =ref("")
        //
        // const up_scrollTo = ref(false)   //是否可以点击false是可以点击 true不可以点击  watch 中：  exceptionList.value = vue.$set(refs.exception),console.log("lll==>",exceptionList.value)
        // const up_scrollTo_down = ref(false)
        watch(() => {data.dialog_info_flag = props.flag,console.log("传进来le:",props.pod,"弹窗值",data.dialog_info_flag) });
        const openDialog = () => {  //弹开后立即执行查日志
          console.log("进来了dailog")
          get_JenkinsOne_info()
        }
        // 查看单个的版本好

   const close = () => {
            data.dialog_info_flag=false;
            emit("update:flag", false);   //emit更新prop flag
        }
   const handleDialogClose=()=>{ //右上角关闭按钮-重要
            data.pod_log_arr ="";
            data.pod_name = " "
            emit("update:flag", false);
        }
    const get_JenkinsOne_info=()=>{
          let requestData = props.pod
          get_JenkinsOne(requestData).then(response=>{
            data.jenkinsone = response.data
            console.log("收到",data.jenkinsone)
          })
    }



        return {
     data,openDialog,dialog_show_detail,handleDialogClose
      }
    }
    }
</script>
<style scoped lang="scss">
  .el-dialog{
       height: 60vh;
       background-color: red;
       overflow: auto;
  }
  .margin-box{
    height: 100px;
    background-color: red;
  }


</style>
<style>
    .el-dialog__headerbtn{position:absolute;top:3px;right:2px;padding-bottom: 3px;background:0 0;border:none;outline:0;cursor:pointer;font-size:30px}
    </style>
