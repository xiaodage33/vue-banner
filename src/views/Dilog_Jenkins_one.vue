<template>
  <div>
    <div style="overflow: scroll">
      <el-dialog title="项目详情" :visible.sync="data.dialog_info_flag"
                 @opened="openDialog"
                 :pod="data.pod_log_info"
                 :pod_name="data.pod_name"
                 :before-close="handleDialogClose">
        <div>
          <el-form :model="data.form" size="small">
            <el-form-item class="pull-left" label="项目名字" :label-width="formLabelWidth">
              <el-input class="pull-left" style="width: 300px" v-model="data.form.project_name"
                        autocomplete="off"></el-input>
              <span style="margin-left:20px; color: red"> 最后构建版本号：{{ data.form.version}}  </span>
            </el-form-item>

            <el-form-item class="pull-left" label="历史版本" :label-width="formLabelWidth"><span
              style="font-size: 4px;color: red;margin-left: 10px"> *要清空后选择版本构建  </span>
              <el-select style="padding-left: 10px;"  class="pull-left" v-model="data.select_version" clearable
                         placeholder="请选择版本号" size="mini">
                <el-option
                  v-for="(item,index) in data.jenkinshistory" :key="index"
                  :value="item.version || '无' ">
                </el-option>
              </el-select>
                       <el-button type="primary" :plain="true" :loading="wait_his" @click="get_Jks_history(data.form.project_name)" style="font-size: 10px">
            显示历史版本
          </el-button>
          <el-button type="primary" :plain="true" @click="cat_git()" :loading="wait_his"  style="width:120px;font-size: 10px">当前版本git变化</el-button>
            </el-form-item>
          </el-form>
        </div>
          <br/>  <br/>  <br/>  <br/>
        <div>

        </div>
        <div slot="footer" class="dialog-footer " style="margin: 20px">
          <!--<el-button type="primary" @click="dialogFormVisible1 = false" style="width:80px">取 消</el-button>-->
          <!--<el-button type="primary" @click="goujian" style="width:80px">确 定</el-button>-->

        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import { reactive, ref, watch, toRefs } from '@vue/composition-api'
  import { get_JenkinsOne } from '../../api/getinfo.js'
  import { get_JenkinsOneHistory,get_Git } from '../../api/getinfo.js'

  export default {
    name: 'Dilog_ShowLog_one',
    props: {
      flag: {
        type: Boolean,
        default: false
      },
      pod: {
        type: String,
        default: ''
      }
    },
    setup (props, { emit, root, refs }) {
      const data = reactive({
        dialog_info_flag: false,   //弹窗标记
        pod_log_info: '',
        pod_log_arr: [],
        pod_name: '',
        podname: '',
        yangshi_podname: '',
        exceptionList: [],    ////定义总的筛选数
        currentException: '',   //跳转当前的位置
        options: [],
        sel_id: '',
        jenkinsone: {},
        jenkinshistory: [],
        form: {
          project_name: '',
          version: '',
          version_item: [],
          select_version:''
        }
      })
      const dialog_show_detail = ref(false)  //弹框传值
      const wait_his = ref(false)
      watch(() => {
        data.dialog_info_flag = props.flag
      })
      const openDialog = () => {  //弹开后立即执行查日志
        wait_his.value = true
        data.jenkinshistory = []
        get_JenkinsOne_info()  //查单独dialog的
        //需要触发历史版本
        get_Jks_history()
      }
      // 查看单个的版本好
      const close = () => {
        data.dialog_info_flag = false
        emit('update:flag', false)   //emit更新prop flag
      }
      const handleDialogClose = () => { //右上角关闭按钮-重要
        data.pod_log_arr = ''
        data.pod_name = ' '
        emit('update:flag', false)
        data.form.project_name = ''
        data.form.version = ''
        data.jenkinshistory = ''
        data.form.project_name = ''
        data.jenkinshistory = []
        emit('data.jenkinshistory', '')
      }
      const get_JenkinsOne_info = () => {
        let requestData = props.pod
        console.log("哈哈",requestData)
        wait_his.value = true
        get_JenkinsOne(requestData).then(response => {
          data.jenkinsone = response.data
          data.form = response.data
          console.log("呵呵",data.form)
        }).catch(error => {
          root.$message({
            message: '错误了，没有这个状态',
            type: 'warning'

          })
          wait_his.value = true

        })
      }
      const get_Jks_history = () => {
        wait_his.value = true
        let requestData = props.pod
        get_JenkinsOneHistory(requestData).then(response => {
          data.jenkinshistory = response.data.data
          data.form.version_item = response.data.data
          console.log("110==》",data.form.version_item)
          if(data.form.version_item.status === "错误" ){
            root.$message.error('有错误，请查看是否有成功版本！！')
            wait_his.value = true

          }
          wait_his.value = false
        }).catch(error => {
          root.$message.error('错误了,请求不成功。。。')
          wait_his.value = true
        })
      }
      const form = reactive({})
      const formLabelWidth = ref('120px')
      const goujian = (aa) => {
        alert(aa)
      }
      const cat_git=()=>{
        wait_his.value=true
        let get_pro_name = data.form.project_name
        let re1 = data.select_version
        let data_git = {
          'get_pro_name': get_pro_name,
          're1': re1
        }
        get_Git(data_git).then(response => {
          let da1 = response.data
          root.$message({
            message:  "git版本注解："+da1.data ,
            type: 'success'
          })
          wait_his.value=false
        }).catch(error => {
        })
      }
      return {
        data,
        openDialog,
        dialog_show_detail,
        handleDialogClose,
        get_Jks_history,
        goujian,
        form,
        formLabelWidth,
        close,
        wait_his,cat_git
      }
    }
  }
</script>
<style scoped lang="scss">
  .el-dialog {
    height: 60vh;
    background-color: red;
    overflow: auto;
  }
  .margin-box {
    height: 100px;
    background-color: red;
  }
</style>
<style>
  .el-dialog__headerbtn {
    position: absolute;
    top: 3px;
    right: 2px;
    padding-bottom: 3px;
    background: 0 0;
    border: none;
    outline: 0;
    cursor: pointer;
    font-size: 30px
  }
</style>
