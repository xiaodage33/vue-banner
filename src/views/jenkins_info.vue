<template>
    <div>
       <div class="pull-left" style="margin-left: 20px;font-size: 30px"> jenkins打包查询系统   </div>
      <div>
    <el-input v-model="data.username" class="pull-left" style="margin-left: 30px;width: 600px" id="username" placeholder="输入查找的jenkins项目 关键字" type="mini"></el-input>
    <el-button class="pull-left" @click="get_Jenkins" type="primary" style="margin-left: 20px" :loading="wait_his"> 查找jenkins 项目 </el-button>
              <div>
              <el-badge
                  :class=""
                   class="pull-left"
                  type="primary"
                    style="margin-left:10px;">
            <el-button size="small" @click="new_jks_page" :loading="anniuwait_1" style="font-size: 13px;margin-left: 20px" >有新打包完成任务</el-button>
                <div v-for="(item,index) in data.new_jks" :key="index" > {{ item.pro_name}}:{{ item.pro_version}}  </div>
        </el-badge>

      </div>
            <el-table
            :data="data.currentItems"
             style="width: 100%;border: 5px;"
             element-loading-background="rgba(0, 0, 0, 0.8)" >
            <el-table-column
                    prop="data_name"
                    label="jenkins项目"
                    width="350">
            </el-table-column>
            <el-table-column
                    prop="project_num"
                    label=" 项目打包次数"
                    width="350">
            </el-table-column>
            <el-table-column
                    type="index"
                    label="当前页码"
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
 <!--//创建分页-->
        <el-row>
            <el-col :span="12">
                <el-pagination
                        class="pull-right"
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="paginationPageSizes"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </el-col>
        </el-row></div>
  </div>
</template>
<script>
  import {reactive, ref, isRef, toRefs, onMounted,watch,onBeforeMount} from '@vue/composition-api';
  import {get_JenkinsAll,get_Newjks } from '../../api/getinfo.js'
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

    setup (props, { root, }) {

      onBeforeMount(()=>{
          timer.value = setInterval(()=>{
              timer.value ++;
              new_jks_page()
              console.log(timer.value)
          },20000);
      })

      const timer = ref(null);
      const dialog_info_add = ref(false)  //弹框传值
      const infoPod = ref('')
      const data = reactive({
        item: [],
        currentItems: [],  //定义列表分页
        username:'',
        new_jks:[],
      })
      const wait_his = ref(false)
      const anniuwait_1 = ref(false)
     //分页内容方法
      const paginationPageSizes = ref([10,20,50,100]) //定义分页 每页显示数量
      //页码 总共几页
      const total = ref(0)
      const page= reactive({
        pageNumber:1,
        pageSize: paginationPageSizes.value[0]
      })
      const handleSizeChange=(val) =>{
         page.pageSize = val;
         handleTableChange();
      }
      const handleCurrentChange=(val)=>{
        page.pageNumber = val;
        handleTableChange();
        get_Jenkins();
      }
      const get_Jenkins = () => {
        wait_his.value = true
        get_JenkinsAll().then(response => {
          data.item = response.data.data
          data.currentItems = response.data.data //获取总的数据，给了分页
          // console.log("哈哈",data.currentItems)
          handleTableChange()
          wait_his.value = false
        })
      }

      const handleTableChange=()=>{
        const {item = []} = data;
        let tempItems = item;
        if(data.username){
           // console.log("sss===>",data.username)
           // let data_name = stripscript(data.username)  //引入过滤特殊字符
           tempItems = item.filter(i=>i.data_name.indexOf(data.username)>-1);
        }
        total.value = tempItems.length;
        const {pageSize = paginationPageSizes[0], pageNumber = 1} = page; //显示条数和 当前页码
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = startIndex + pageSize -1;
        const currentItem = [] ; // 当时当前0-9的页码
        for(let index = 0;index<tempItems.length;index++){
          if(index >=startIndex && index <= endIndex){
            currentItem.push(tempItems[index])
          }
        }
        data.currentItems = currentItem
      }

      const Cat_Jenkins_one = (pod) => {
        infoPod.value = pod
        dialog_info_add.value = true   //弹出dialog
      }

      const new_jks_page =()=>{
        anniuwait_1.value = true
        get_Newjks().then(response =>{
           let info = response.data
           if(response.data.data.code == 999){
             root.$message({
               message: "没有更新任务！！！",
               type:"success"
             })
             anniuwait_1.value = false
             return
           }
           data.new_jks = response.data.data
           console.log("有任务",data.new_jks)
           anniuwait_1.value = false
        })
      }




      return {
        get_Jenkins,
        data,
        infoPod,
        dialog_info_add,
        Cat_Jenkins_one,
        paginationPageSizes,
        page,total,
        handleSizeChange,handleCurrentChange,wait_his,new_jks_page,anniuwait_1,timer
      }
    }
  }
</script>

<style scoped>





</style>
