<template>
	<div class=dataManagement>
		<div class="ms-login">
            <div class="ms-title">MB设备管理界面</div>
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="0" class="ms-content">
                <el-form-item prop="host" class="ms-content-input">
                    <el-input v-model="ruleForm2.host" placeholder="host">
                        <el-button slot="prepend" icon="el-icon-lx-people">主机</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="username" class="ms-content-input">
                    <el-input type="username" placeholder="username" v-model="ruleForm2.username" @keyup.enter.native="submitForm('ruleForm2')">
                        <el-button slot="prepend" icon="el-icon-lx-lock">用户名</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password" class="ms-content-input">
                    <el-input type="password" placeholder="password" v-model="ruleForm2.password" @keyup.enter.native="submitForm('ruleForm2')">
                        <el-button slot="prepend" icon="el-icon-lx-lock">密码</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="port2" class="ms-content-input">
                    <el-input type="port2" v-model="ruleForm2.port2" @keyup.enter.native="submitForm('ruleForm2')">
                        <el-button slot="prepend" icon="el-icon-lx-lock">端口</el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn ms-content-input">
                    <el-button type="primary" @click="submitForm('ruleForm2')">快速连接</el-button>
                </div>                
            </el-form>
            <div class="content">
                <div class="content-left">
                    <span>本地</span>
                    <hr>
                    <!-- <a href="//198.18.108.204/bianxie_chezai/陈熹/upload测试/1.txt" download="下载">下载</a>
                    <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        drag
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :on-error="handleError"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="10"
                        :on-exceed="handleExceed"
                        :file-list="fileList">
                        <i class="el-icon-upload"></i>
                        <div disabled>将文件拖到此处，或 <el-button size="small" type="primary">点击上传</el-button></div>
                        
                    </el-upload> -->
                    <el-table class="el-table"
                        :data="tableData"
                        style="width: 100%">
                        
                        <el-table-column               
                            label="MB名称"
                            width="90">
                            <template slot-scope="scope">
                                <span>{{ scope.row.name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column               
                            label="MB地区"
                            width="90">
                            <template slot-scope="scope">
                                <span>{{ scope.row.storage }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column             
                            label="MB类型"
                            width="90">
                            <template slot-scope="scope">
                                <span>{{ scope.row.allStorage }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column               
                            label="MB版本"
                            width="90">
                            <template slot-scope="scope">
                                <span>{{ scope.row.proportion }}</span>
                            </template>
                        </el-table-column>
                        
                        <el-table-column label="操作">
                            <template slot-scope="scope">                                
                                <!-- <i class="el-icon-edit-outline" 
                                size="mini"                   
                                @click="handleEdit(scope.$index, scope.row)"></i> -->
                                <i class="el-icon-upload2"></i>
                                <i class="el-icon-download"  @click="download"></i>
                                <i class="el-icon-close" 
                                size="mini"
                                @click="handleDelete(scope.$index, scope.row)"></i>
                            </template>
                        </el-table-column>
                    </el-table>                     
                </div>
                
                <div class="content-right">
                    <span>远端</span>
                    <hr>
                    <el-table class="el-table"
                        :data="tableData"
                        style="width: 100%">
                        
                        <el-table-column               
                            label="MB名称"
                            width="90">
                            <template slot-scope="scope">
                                <span>{{ scope.row.name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column               
                            label="MB地区"
                            width="90">
                            <template slot-scope="scope">
                                <span>{{ scope.row.storage }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column             
                            label="MB类型"
                            width="90">
                            <template slot-scope="scope">
                                <span>{{ scope.row.allStorage }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column               
                            label="MB版本"
                            width="90">
                            <template slot-scope="scope">
                                <span>{{ scope.row.proportion }}</span>
                            </template>
                        </el-table-column>
                        
                        <el-table-column label="操作">
                            <template slot-scope="scope">                                
                                <!-- <i class="el-icon-edit-outline" 
                                size="mini"                   
                                @click="handleEdit(scope.$index, scope.row)"></i> -->
                                <i class="el-icon-upload2" @click="upload"></i>
                                <i class="el-icon-download" @click="download"></i>
                                <i class="el-icon-close" 
                                size="mini"
                                @click="handleDelete(scope.$index, scope.row)"></i>
                            </template>
                        </el-table-column>
                    </el-table> 
                </div>
                <div class="clear"></div>
            </div>
            <div class="content-count">
                <span class="content-count1">4个文件</span>
                <span class="content-count1">4个文件</span>
            </div>
            <div class="content-result">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="列队的文件" name="first">列队的文件</el-tab-pane>
                    <el-tab-pane label="失败的传输" name="second">失败的传输</el-tab-pane>
                    <el-tab-pane label="成功的传输" name="third">成功的传输</el-tab-pane>
                </el-tabs>
            </div>

            <p class="content-count2">队列：空</p>

        </div>
	</div>
</template>

<script>
    export default {
        data: function(){
            return {
                ruleForm2: {
                    host: 'admin',
                    username: '123123',
                    password: '',
                    port2: ''
                },
                rules2: {
                    host: [
                        { required: true, message: '请输入主机名', trigger: 'blur' }
                    ],
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    port2: [
                        { required: true, message: '请输入端口号', trigger: 'blur' }
                    ]
                },
                radio: "1",
                fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                    }, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
                activeName: 'first',
                tableData:[]
            }
        },
        created () {
            this.$http.post('/data2').then((response) => {                
                this.tableData = response.data.list2;
                console.log("3333333333",response.data)
            });
        },
        methods: {
            submitForm(formName) {
                this.$http.get('/device').then(function(res){
                        console.log("22222222222",res)
                    }).catch(function(error){
                        console.log(error);
                    })
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        localStorage.setItem('ms_host',this.ruleForm2.host);
                        this.$router.push('/home');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                    
                });
                
            },
            // 文件上传
            // handleRemove(file, fileList) {
            //     console.log(file, fileList);
            // },
            // handlePreview(file) {
            //     console.log(file);
            // },
            // handleExceed(files, fileList) {
            //     this.$message.warning(`当前限制选择 10 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            // },
            // beforeRemove(file, fileList) {
            //     return this.$confirm(`确定移除 ${ file.name }？`);
            // },
            // handleError(err,file, fileList) {
            //     console.log("1111111111111",err)
            // },
            //
            handleClick(tab, event) {
                console.log(tab, event);
            },
            //上传
            upload(){                
                this.$http.get('').then((response) => {                
                    console.log("upload",response)
                });
            },
            //下载
            download(){                
                this.$http.get('http://192.168.1.81:8082/test/download?filename=down').then((response) => {                
                    console.log("download",response)
                });
            }
        }
    }

</script>

<style type="text/css">
.dataManagement{
    height: 615px;
    background-color: white;
    text-align: center;   
}
.ms-login{    
    height: 600px;
    width: 1000px;
    border:1px solid gray;
    margin:0 auto;
    position: relative;
}
.ms-title{
    height: 50px;
    line-height: 50px;
    font-weight: 700
}
.ms-content .ms-content-input{
    display: inline-block;
    width:180px;
}
.content{
    height: 300px;
    width: 1000px;
    border-top:1px solid gray;
    /* margin-left:200px */
}
.content-left{
    /* display: inline-block; */
    /* border:1px solid gray; */
    width:500px;
    height: 300px;
    float: left;
    
    overflow: scroll
}

.content-right{
    /* display: inline-block; */
    /* border:1px solid gray; */
    width:500px;
    height: 300px;
    float: left;
    overflow: scroll
}
.clear{
    clear:both
}
.el-table *{
    text-align: center
}

.content-count{
    background-color: gainsboro
}
.content-count1{
    display: inline-block;
    width: 49%;
    text-align: left;
}
.content-count2{
    width:100%;
    left:0;
    text-align: right;
    position: absolute;
    bottom: 0;
    display: inline;
    background-color: gainsboro;
    margin:0;
    padding:0 10px;
    box-sizing: border-box;
    height: 20px;
}
.el-table i:hover{
    color:#0094DA;
    cursor:pointer
}
</style>