<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">用户登录</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username" autofocus="true">
                        <el-button slot="prepend" icon="el-icon-lx-people"><i class="iconfont icon-yonghu" style="color:#0094DA"></i></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')" autofocus="true">
                        <el-button slot="prepend" icon="el-icon-lx-lock"><i class="iconfont icon-suo" style="color:#0094DA"></i></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <!-- <i iconfont -->
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p class="login-tips">
                    <el-radio @click.native.prevent="passWord(1)" :label="1" v-model="radio">记住密码</el-radio>
                </p>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                },
                radio: 0,
            }
        },
        mounted(){
            //进入登录页面先检查本地存储是否有账号密码，有则显示在账号密码栏中
            var userName=localStorage.getItem('username');
            var passWord=localStorage.getItem('password');
            if(userName && passWord){
                this.ruleForm.username = userName;
                this.ruleForm.password = passWord;
                this.radio = 1
            }else{
                this.radio = 0
            }

        },
        // computed:{
        //     username(){
        //         return this.$store.state.username;
        //     },
        //     password(){
        //         return this.$store.state.password;
        //     },
        // },
        methods: {
            submitForm() {
                console.log('localStorage!!',localStorage.getItem("username"));
                var params={usrname:this.ruleForm.username,pwd:this.ruleForm.password}
                this.$http.post('/api/product/login',params).then((response) => {

                    console.log('response!!',response);
                    // this.$refs[formName].validate((valid) => {
                    if (response.data.success != false) {
                        this.$router.push('/home');

                        //把username存在缓存里供header.vue调用
                        sessionStorage.setItem('username',this.ruleForm.username);
                        if(this.radio ===1){
                            localStorage.setItem('username',this.ruleForm.username);
                            localStorage.setItem('password',this.ruleForm.password);
                        }else{
                            localStorage.removeItem('username');
                            localStorage.removeItem('password');
                        }
                        // console.log('sessionStorage!!',sessionStorage.getItem("username"));
                    } else {
                        this.$message.error('请输入正确的用户名或密码')
                        console.log('error submit!!');
                        return false;
                    }
                    });
                // });

            },
            //记住密码
            passWord(e) {
                e === this.radio ? this.radio = 0 : this.radio = e
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        /* background-image: url(../../assets/img/login-bg.jpg); */
        background-size: 100%;
    }
    .ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        color: black;
        border-bottom: 1px solid #ddd;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:350px;
        /* margin:-190px 0 0 -175px; */
        margin-left:-175px;
        margin-top:175px;
        border-radius: 5px;
        background: darkslategray;
        overflow: hidden;
    }
    .ms-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
    .login-tips{
        font-size:12px;
        line-height:30px;
        color:black;
    }
</style>