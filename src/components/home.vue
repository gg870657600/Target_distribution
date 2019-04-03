<template>
    <div class="warp">
        <div id = header>
            <v-head></v-head>
            <!-- <div class = header-left>
                <span>MB设备管理界面</span>
            </div>
            <div class = header-right></div> -->
            
        </div>
        <div id = nav>
            <router-link to="/device">设备管理<i class="el-icon-setting"></i></router-link>
            <router-link to="/server">服务管理</router-link>
            <router-link to="/data">数据管理</router-link>
            <router-link to="/data2">数据管理2</router-link>
            <router-link to="/data3">数据管理3</router-link>
        </div>
        <div id = content><router-view/></div>
    </div>
</template>


<script>
import vHead from './common/Header.vue'
    export default{
        name: 'home',
        data(){
            return {
                url:'http://192.168.1.99:8080',
                

            }
        },

        components:{
            vHead
        },

        methods: {
            
   
        } 
             
    }
  
</script>

<style type="text/css">
* {
    text-decoration: none;
    list-style: none
}
a{
    color: black;
    padding:16px 5px;
    
}
#header{
  background-color: rgba(0,148,218,1.0);
  width:100%;
  height: 50px;
  line-height: 50px;
}
#nav{
  background-color: white;
  width:100%;
  height: 50px;
  line-height: 50px;
  padding-left: 30px;
  box-sizing: border-box;
}
.router-link-active{
    color:rgba(0,148,218,1.0);
    border-bottom: 2px solid rgba(0,148,218,1.0);
    border-bottom-color: rgba(0,148,218,1.0)
}
#content{
  background-color: rgb(242, 242, 242);
  /* width:100%; */
  height: 100%;
  margin:30px 30px 0 30px;
}

#header .header-left{
  margin-left :20px;
  font-size:20px;
  font-weight: 700;
  letter-spacing: 3px;
  color: aliceblue
}


.deviceManagement{
    width:100%;
    height: 100%;
    display: inline-block;
}
.device{
    width:30%;
    height: 100%;
    display: inline-block;
}
.device-right{
    width:69%;
    height: 100%;
    display: inline-block;
}
</style>