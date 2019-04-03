<template>
    <div class = "serverManagement">
        <div>           
            <p style="margin-left:10px">数据分布</p>
            <!-- 上传 -->
            <el-dialog title="创建上传任务" 
            :visible.sync="dialogFormVisible1" 
            :modal-append-to-body="false" 
            width="44%" 
            :close-on-click-modal='false'
            :before-close="closeUpload">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="任务名称" >
                        <el-input v-model="formInline.taskName"></el-input>
                    </el-form-item>
                    <el-form-item label="上级IP地址" >
                        <el-input v-model="formInline.upAddress"></el-input>
                    </el-form-item>
                    <el-form-item label="本地地址" >
                        <el-input v-model="formInline.localAddress"></el-input>
                    </el-form-item>  
                    <el-form-item label="数据量计算" >
                        <!-- <el-input v-model="formInline.dataCount"></el-input> -->
                        <el-radio v-model="formInline.dataCount" label=true>是</el-radio>
                        <el-radio v-model="formInline.dataCount" label=fasle>否</el-radio>
                    </el-form-item>  
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="closeUpload">取 消</el-button>
                    <el-button type="primary" @click="upload">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 下载 -->
            <el-dialog title="创建下载任务" 
            :visible.sync="dialogFormVisible2" 
            :modal-append-to-body="false" 
            width="44%" 
            :close-on-click-modal='false'
            :before-close="closeDownload">
                <el-form :inline="true" :model="formInline2" class="demo-form-inline">
                    <el-form-item label="任务名称" >
                        <el-input v-model="formInline2.taskName"></el-input>
                    </el-form-item>
                    <el-form-item label="数据类型" >
                        <el-input v-model="formInline2.dataType"></el-input>
                    </el-form-item>
                    <el-form-item label="数据包地址" >
                        <el-input v-model="formInline2.dataAddress"></el-input>
                    </el-form-item>  
                    <el-form-item label="数据量计算" >
                        <el-radio v-model="formInline2.dataCount" label=true>是</el-radio>
                        <el-radio v-model="formInline2.dataCount" label=fasle>否</el-radio>
                    </el-form-item>  
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="closeDownload">取 消</el-button>
                    <el-button type="primary" @click="download">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <el-table
            :span-method="objectSpanMethod"
            :data="tableData"
            border
            style="width: 100%">
            <!-- <el-table-column               
                type="index"
                width="80">                
            </el-table-column> -->
            <el-table-column               
                label="关系"
                width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column               
                label="类型"
                width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.storage }}</span>
                </template>
            </el-table-column>
            <el-table-column             
                label="本地"
                width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.allStorage }}</span>
                </template>
            </el-table-column>
            <el-table-column             
                label="远程"
                width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.startTime }}</span>
                </template>
            </el-table-column>
            
            <el-table-column label="功能">
                <template slot-scope="scope">
                    <!-- <i class="el-icon-close" 
                    size="mini"
                    @click="handleDelete(scope.$index, scope.row)"></i>
                    <i class="el-icon-edit-outline" 
                    size="mini"                   
                    @click="handleEdit(scope.$index, scope.row)"></i> -->
                    <el-button style="margin-left:10px" size="small" type="primary" @click="openUpload">上传</el-button>
                    <el-button style="margin-left:10px" size="small" type="primary" @click="openDownload">下载</el-button>
                    <i class="el-icon-refresh"></i>
                </template>
            </el-table-column>
        </el-table> 
        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage1"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout=" sizes, prev, pager, next, total, jumper"
                :total="400">
            </el-pagination>
        </div>       
    </div>

</template>

<script>
import Utils from "../utils/utils.js"
    export default({
        name:"data3",
        data(){
            return{
                tableData: [{name:'A&B',storage:'总数'},
                            {name:'A&B',storage:'add'},
                            {name:'A&B',storage:'update'}],
                // formInline:{
                //     taskName:"",
                //     upAddress:"",
                //     localAddress:"",
                //     dataCount: "true",
                // },
                formInline2:{
                    taskName:"",
                    dataType:"",
                    dataAddress:"",
                    dataCount: "true",
                },
                // dialogFormVisible1: false,
                // dialogFormVisible2: false,
                currentPage1: 1,
            }
        },
        computed: {
            dialogFormVisible1(){
                return this.$store.getters.uploadIsShow;
            },
            dialogFormVisible2(){
                return this.$store.getters.downloadIsShow;
            },
            formInline(){
                return this.$store.state.formInline
            }
            
        },
        mounted () {
            this.$http.post('/data3').then((response) => {                
                // this.tableData = response.data.list2;
                console.log("3333333333",response.data)
                for (var i=0 ;i<this.tableData.length;i++){
                    this.$set(this.tableData[i],'allStorage',response.data.allStorage);
                    this.$set(this.tableData[i],'startTime',response.data.startTime);
                }
            });
        },
        methods: {
            // 合并table
            objectSpanMethod({row, column, rowIndex, columnIndex}){
                if(columnIndex === 0){
                    if(rowIndex % 3 === 0){
                        return {
                            rowspan:3,
                            colspan:1
                        }
                    }else {
                        return {
                            rowspan:0,
                            colspan:0
                        }
                    }
                }
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            // 分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            
            //打开、关闭上传界面
            openUpload(){
                this.$store.dispatch('showDialogFormVisible1')
            },
            closeUpload(){
                this.$store.dispatch('hideDialogFormVisible1')
            },
            //上传
            upload(){
                var data = {}
                data.name = this.$store.state.formInline.taskName
                data.createTime = Utils.getNowFormatDate()

                               
                this.$http.post('/api/product/upload?operate=upload',data).then((response) => {             
                    this.$store.dispatch('hideDialogFormVisible1');
                    console.log("response",response) 
                    // 把返回的数据显示在server界面上
                    var obj = {};
                    obj.name = this.$store.state.formInline.taskName
                    obj.type = response.data.type
                    obj.address = response.data.address
                    obj.describe = response.data.describe
                    obj.port = response.data.port
                    obj.dataDirectory = response.data.dataDirectory
                    obj.createTime = Utils.getNowFormatDate()
                    obj.startTime = '2010-04-08'
                    obj.status = '停止'
                    obj.startStop = ''
                    this.$store.state.tableData.push(obj)
                    console.log("response222222222",Utils.getNowFormatDate())
                });
            },
            //打开、关闭下载界面
            openDownload(){
                this.$store.dispatch('showDialogFormVisible2')
            },
            closeDownload(){
                this.$store.dispatch('hideDialogFormVisible2')
            },
            //下载
            download(){                
                this.$http.get('/api/test/download?filename=down').then((response) => {                
                    this.$store.dispatch('hideDialogFormVisible2');
                });
            },
            
        }
    })
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
p{
    height: 80px;
    margin:0;
    line-height: 80px;
}
.serverManagement{
    height: 615px;
    background-color: white
}
.block{
    text-align: center;
    margin-top:50px;
}
/* .demo-form-inline{
    text-align: center
} */
</style>
