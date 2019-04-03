<template>

    <div id = header>
        <div class = header-left>
            <span>MB设备管理界面</span>
            
        </div>
        <!-- 下面是复制的代码 -->
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <!-- 消息中心 -->
                <div class="btn-bell">
                    <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
                        <router-link to="/tabs">
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div>
                <!-- 用户头像 -->
                <!-- <div class="user-avator">头像</div> -->
                <i class="iconfont icon-yonghu1" style="font-size:25px"></i>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand" style="font-size:20px;color:white">
                    <span class="el-dropdown-link">
                        {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click="dialogFormVisible1 = true">
                            <el-button type="text" @click="dialogFormVisible1 = true">添加用户</el-button>
                        </el-dropdown-item>

                        <el-dropdown-item @click="dialogFormVisible = true">
                            <el-button type="text" @click="dialogFormVisible = true">修改密码</el-button>
                        </el-dropdown-item>
                                               
                        <el-dropdown-item divided  command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                
            </div>
        </div>
        <!-- 修改密码 -->
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible" :modal-append-to-body="false" width="30%" :close-on-click-modal='false' >
            <el-form :model="form" :rules="rules" status-icon>
                <el-form-item label="输入旧密码" :label-width="formLabelWidth" prop="oldPassword">
                    <el-input v-model="form.oldPassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="输入新密码" :label-width="formLabelWidth" prop="newPassword">
                    <el-input v-model="form.newPassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="再次输入新密码" :label-width="formLabelWidth" prop="reNewPassword">
                    <el-input v-model="form.reNewPassword" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 添加用户 -->
        <el-dialog title="添加用户" :visible.sync="dialogFormVisible1" :modal-append-to-body="false" width="30%" :close-on-click-modal='false' >
            <el-form :model="form1">
                <el-form-item label="输入用户名" :label-width="formLabelWidth">
                    <el-input v-model="form.oldPassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="输入密码" :label-width="formLabelWidth">
                    <el-input v-model="form.newPassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="再次输入密码" :label-width="formLabelWidth">
                    <el-input v-model="form.reNewPassword" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible1 = false">确 定</el-button>
            </div>
        </el-dialog>
            
    </div>
</template>


<script>
import bus from './bus';
    export default{
        data(){
            //验证密码
            let validatePass = (rule, value, callback) => {
                if(value === ""){
                    callback(new Error("请再次输入新密码"))
                }else if(value !== this.form.newPassword){
                    callback(new Error("两次输入密码不一致！"))
                }else{
                    callback()
                }
            }
            return {               
                collapse: false,
                fullscreen: false,
                name: '游客',
                message: 2,
                // 修改密码
                dialogFormVisible: false,                
                form: {
                    oldPassword: '',
                    newPassword: '',
                    reNewPassword: '',
                },
                //添加用户
                dialogFormVisible1: false,
                form1: {
                    username: '',
                    password: '',
                    rePassword: '',
                },
                formLabelWidth: '120px',

                

                rules: {
                    oldPassword: [
                        { required: true, message: '请输入旧密码', trigger: 'blur' }
                    ],
                    newPassword: [
                        { required: true, message: '请输入新密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码不能小于6位'}
                    ],
                    reNewPassword: [
                        { validator: validatePass, trigger: 'change'}
                    ]
                },
            }
        },

        computed:{
            username(){
                let username = localStorage.getItem('username');
                return username ? username : this.name;
            }
        },

        methods:{
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if(command == 'loginout'){
                    localStorage.removeItem('ms_username')
                    this.$router.push('/');
                }
            },
            // 侧边栏折叠
            collapseChage(){
                this.collapse = !this.collapse;
                bus.$emit('collapse', this.collapse);
            },
            // 全屏事件
            handleFullScreen(){
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            },
            // 修改密码
            
        },
        mounted(){
            if(document.body.clientWidth < 1500){
                this.collapseChage();
            }
            
            this.name = sessionStorage.getItem('username');
            console.log('username:',this.name)
        },
             
    }
  
</script>

<style type="text/css">
#header{
  background-color: rgba(0,148,218,1.0);
  width:100%;
  height: 50px;
  line-height: 50px;
  display: inline-block;
}
    .header-left{
        display: inline-block;
    }
    .header-right{
        position: absolute;
        right: 0;
        display: inline-block;
        height: 100%;
        margin-right: 20px;
        font-size:25px
    }
        .header-user-con div{
            display: inline-block;
            cursor: pointer;
        }

</style>