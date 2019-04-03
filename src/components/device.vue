<template>
    <div class="deviceManagement">
        <div class="device-left">
            <div class="deviceStatus">设备状态</div>
            <div class="statusMap" >
                <span style="display:inline-block;width:100px;position:relative;right:70px;margin:10px">设备名</span> 
                <span style="color:#0094DA;position:relative;right:78px">{{deviceStatus.deviceName}}</span>
                <!-- <my-chart></my-chart> -->
                <pro-gress :deviceStatus="deviceStatus"></pro-gress>
            </div>
        </div>
        <!-- table表格 -->
        <div class="device-right">
            <section>
                <el-row>
                <el-col :span="24">
                    
                    <!--表格-->
                    <el-table
                    stripe
                    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                    border
                    style="width: 100%">
                    <!-- <el-table-column type="selection">
                    </el-table-column> -->
                    <el-table-column
                        prop="nicType"
                        label="网卡类型"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="ipAddress"
                        label="IP地址"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="subnetMask"
                        label="子网掩码">
                    </el-table-column>
                    <el-table-column
                        prop="gateWay"
                        label="网关">
                    </el-table-column>
                    <el-table-column
                        prop="urlAddress"
                        label="URL地址">
                    </el-table-column>
                    <el-table-column label="操作" width="180">
                        <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                    </el-table>
                    <!-- 分页 -->
                    <div class="block">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-size="pagesize"
                        layout="prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                    </div>
                </el-col>
                </el-row>
                <el-dialog title="修改个人信息" :visible="dialogFormVisible" size="tiny">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="网卡类型">
                    <el-input v-model="form.nicType"></el-input>
                    </el-form-item>
                    <el-form-item label="IP地址">
                    <el-input v-model="form.ipAddress"></el-input>
                    </el-form-item>
                    <el-form-item label="子网掩码">
                    <el-input v-model="form.subnetMask"></el-input>
                    </el-form-item>
                    <el-form-item label="网关">
                    <el-input v-model="form.gateWay"></el-input>
                    </el-form-item>
                    <el-form-item label="URL地址">
                    <el-input v-model="form.urlAddress"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="出生日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;" ></el-date-picker>
                    </el-form-item> -->
                    <el-form-item>
                    <el-button type="primary" @click="handleSave" :loading="editLoading">修改</el-button>
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    </el-form-item>
                </el-form>
                </el-dialog>
            </section>
        </div>    
    </div>
</template>


<script>
import myChart from "./mycharts.vue"
import proGress from "./progress.vue"
const ERR_OK = "000";
  export default {
    components:{
        'my-chart':myChart,
        'pro-gress':proGress
    },
    data () {
      return {
        deviceStatus: {},
        // formInline: {
        //   user: {
        //     nicType: '',
        //     ipAddress: '',
        //     // date: '',
        //     subnetMask: [],
        //     gateWay: '',
        //     urlAddress: '',
        //     place: ''
        //   }
        // },
        tableData:[],

        options: [],
        places: [],
        dialogFormVisible: false,
        editLoading: false,
        form: {
          nicType: '',
          ipAddress: '',
          subnetMask: '',
          gateWay: '',
          urlAddress: '',
        },
        total: '',
        pagesize: 6,
        currentPage: 1,
        table_index: 999,
      };
    },
    created () {
        // console.log(mychart);
        this.$http.get('/api/product/device/manage').then((response) => {
          console.log('response:77777777',response)
          // console.log('response:77777777',response.data.result)
          // console.log('cpuUsage',response.data.result[0].deviceStatus.cpuUsage)



        this.deviceStatus = response.data.deviceStatus;
        this.tableData = response.data.deviceInfo.list;
        this.total = response.data.deviceInfo.list.length;
        console.log('tableData.............',this.tableData.list[0])

      });
    //   this.$http.get('/api/getOptions').then((response) => {
    //     response = response.data;
    //     if (response.code === ERR_OK) {
    //       this.options = response.datas;
    //       this.places = response.places;
    //     }
    //   });
    },
    methods: {
      onSubmit () {
        this.$message('模拟数据，这个方法并不管用哦~');
      },
      handleDelete (index, row) {
        this.tableData.splice(index, 1);
        this.$message({
          message: "操作成功！",
          type: 'success'
        });
      },
      handleEdit (index, row) {
        this.dialogFormVisible = true;
        this.form = Object.assign({}, row);
        this.table_index = index;
      },
      handleSave () {
        this.$confirm('确认提交吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancel'
        }).then(() => {
          this.editLoading = true;
        //   let date = this.form.date;
        //   if (typeof date === "object") {
        //     date = [date.getFullYear(), (date.getMonth() + 1), (date.getDate())].join('-');
        //     this.form.date = date
        //   }
//          this.tableData[this.table_index] = this.form;
          this.tableData.splice(this.table_index, 1, this.form);
          this.$message({
            message: "操作成功！",
            type: 'success'
          });
          this.editLoading = false;
          this.dialogFormVisible = false;
        }).catch(() => {

        });
      },
      download: function() {
        console.log("xiazai")
        var obj = document.getElementById('download');
        var str = "网卡类型，IP地址,出生日期,子网掩码,网关,URL地址\n";
        for (var i = 0; i < this.tableData.length; i++) {
          var item = this.tableData[i];
          str += item.nicType + ',' + item.ipAddress + ',' + item.date + ',' + item.subnetMask + ',' + item.gateWay + ',' + item.urlAddress;
          str += "\n";
        }
        console.log(obj)
        str = encodeURIComponent(str);
        console.log(str)
        obj.href = "data:text/csv;charset=utf-8,\ufeff" + str;
        obj.download = "download.csv";
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
      }
    }
  };
</script>

<style type="text/css">



.deviceManagement{
    width:100%;
    height: 100%;
    display: inline-block;
}
    .device-left{
        width:30%;
        height: 100%;
        display: inline-block;
        text-align: center;
    }
        .deviceStatus{
            width:100%;
            height: 60px;            
            line-height: 60px;
            background: white;
            margin-bottom: 3px;
        }
        .statusMap{
            height:552px;
            background: white;
        }
    .device-right{
        width:69%;
        height: 615px;
        background-color: white;
        /* display: inline-block; */
        float: right;
    }
    .device-right *{
        text-align: center
    }
.el-pagination {
    text-align: center;
    margin-top: 30px;
}
.el-message-box__btns .cancel {
    float: right;
    margin-left: 10px;
}
</style>