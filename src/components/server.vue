<template>
    <div class = "serverManagement">
        <div>           
            <p><el-button style="margin-left:10px" size="small" type="primary" @click="dialogFormVisible = true">创建</el-button></p>
            
            <el-dialog title="创建设备信息" :visible.sync="dialogFormVisible" :modal-append-to-body="false" width="44%" :close-on-click-modal='false'>
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="服务名称" >
                        <el-input v-model="formInline.name"></el-input>
                    </el-form-item>
                    <el-form-item label="服务类型" >
                        <el-input v-model="formInline.type"></el-input>
                    </el-form-item>
                    <el-form-item label=服务地址 >
                        <el-input v-model="formInline.address"></el-input>
                    </el-form-item>  
                    <el-form-item label="服务端口" >
                        <el-input v-model="formInline.port"></el-input>
                    </el-form-item>  
                    <el-form-item label="服务描述" >
                        <el-input v-model="formInline.describe"></el-input>
                    </el-form-item>  
                    <el-form-item label="数据目录" >
                        <el-input v-model="formInline.dataDirectory"></el-input>
                    </el-form-item>       
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">创 建</el-button>
                </div>
            </el-dialog>
        </div>
        <el-table class="el-table"
            stripe
            :data="this.$store.state.tableData"
            style="width: 100%">
            <el-table-column               
                type="index"
                width="80">                
            </el-table-column>
            <el-table-column               
                label="服务名称"
                width="120">
                <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column               
                label="服务类型"
                width="120">
                <template slot-scope="scope">
                    <span>{{ scope.row.type }}</span>
                </template>
            </el-table-column>
            <el-table-column             
                label="服务地址"
                width="120">
                <template slot-scope="scope">
                    <span>{{ scope.row.address }}</span>
                </template>
            </el-table-column>
            <el-table-column               
                label="服务描述"
                width="120">
                <template slot-scope="scope">
                    <span>{{ scope.row.describe }}</span>
                </template>
            </el-table-column>
            <el-table-column               
                label="服务端口"
                width="120">
                <template slot-scope="scope">
                    <span>{{ scope.row.port }}</span>
                </template>
            </el-table-column>
            <el-table-column               
                label="数据目录"
                width="120">
                <template slot-scope="scope">
                    <span>{{ scope.row.dataDirectory }}</span>
                </template>
            </el-table-column>
            <el-table-column               
                label="创建时间"
                width="120">
                <template slot-scope="scope">
                    <span>{{ scope.row.createTime }}</span>
                </template>
            </el-table-column>
            <el-table-column               
                label="启动时间"
                width="120">
                <template slot-scope="scope">
                    <span>{{ scope.row.startTime }}</span>
                </template>
            </el-table-column>
            <el-table-column               
                label="服务状态"
                width="120">
                <template slot-scope="scope">
                    <span>{{ scope.row.status }}</span>
                </template>
            </el-table-column>
            <el-table-column               
                label="启动/停止服务"
                width="120">
                <template slot-scope="scope">
                    <span>{{ scope.row.startStop }}
                    <i class="iconfont icon-start" style="font-size:14px;font-weight:400"></i>
                    <i class="iconfont icon-tingzhi" style="font-size:14px;font-weight:400"></i></span>
                </template>
            </el-table-column>
            
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <i class="el-icon-close" 
                    size="mini"
                    @click="handleDelete(scope.$index, scope.row)"></i>
                    <i class="el-icon-edit-outline" 
                    size="mini"                   
                    @click="handleEdit(scope.$index, scope.row)"></i>
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
    export default({
        name:"server",
        data(){
            return{
                // tableData: [{
                //     name: '服务名称1',
                //     type: 'xxx类型',
                //     address: '192.168.1.120',
                //     describe: 'start server',
                //     port: '120',
                //     dataDirectory: '目录1',
                //     createTime: '1998-10-20',
                //     startTime: '2010-04-08',
                //     status: '停止',
                //     startStop: ''
                //     }, {
                //     name: '服务名称2',
                //     type: 'xxx类型',
                //     address: '192.168.1.101',
                //     describe: 'start server',
                //     port: '120120',
                //     dataDirectory: '目录2',
                //     createTime: '1998-10-20',
                //     startTime: '2010-04-08',
                //     status: '停止',
                //     startStop: ''                    
                // }],
                formInline:{
                    name:"",
                    type:"",
                    address:"",
                    port:"",
                    describe:"",
                    dataDirectory:""
                },
                dialogFormVisible: false,
                currentPage1: 1,
            }
        },
        created () {
            this.$http.post('http://baidu.com/server').then((response) => {                
                this.tableData = response.data.list2;
                console.log("3333333333",response.data)
            });
        },
        methods: {
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
            }
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
.el-table *{
    text-align: center
}
</style>
