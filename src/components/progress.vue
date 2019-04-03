<template>
    <div class="container">
        <div id="skill">
            <div class="skillwrap">
                <span class="title" >存储状态</span>
                <div class="skillbar">
                    <div class="filled" :style="{width:deviceStatus.storageStatus}"></div>
                </div>
                <span class="percent">{{deviceStatus.storageStatus}}</span>
            </div>

            <div class="skillwrap">
                <span class="title" >CPU使用率</span>
                <div class="skillbar">
                    <div class="filled" :style="{width:deviceStatus.cpuUsage}"></div>
                </div>
                <span class="percent">{{deviceStatus.cpuUsage}}</span>
            </div>

            <div class="skillwrap">
                <span class="title" >内存使用率</span>
                <div class="skillbar">
                    <div class="filled" :style="{width:deviceStatus.memUsage}"></div>
                </div>
                <span class="percent">{{deviceStatus.memUsage}}</span>
            </div>

            <div class="skillwrap">
                <span class="title" >IO</span>
                <div class="skillbar">
                    <div class="filled" :style="{width:deviceStatus.ioUsage}"></div>
                </div>
                <span class="percent">{{deviceStatus.ioUsage}}</span>
            </div>


        </div>
        </div>

</template>


<script>
    export default{
        props:['deviceStatus'],
        data(){
            return {
                status: {
                    storageStatus: "",
                    cpu: "",
                    memory: "",
                    io: "",
                }
            }
        },

        methods:{

        },
        mounted(){
            this.$http.get('/device2').then((response) => {
                this.status = response.data;
                console.log("3333333333---",this.status)
            });
        },

    }

</script>

<style type="text/css">
#skill {
  width: 100%;
}

.skillwrap *{
    /* text-align: center; */
    /* height:30px;  */
    vertical-align: middle;
    /* margin:5px 0;    */
}
.skillwrap{
    margin:10px 0;
}
.skillwrap span{
    display: inline-block;
    width:100px
}
.skillbar{
    width:100px;
    /* padding:10px;
    margin:10px 0; */
    position:relative;
    display:inline-block;
    overflow:hidden;
    height:30px;
    background-color:gray;
    border-radius:5px 0 0 5px;

}
.skillbar .filled{
    /* display: inline-block; */
    height:100%;
    background-color:#0094DA
}
.skillwrap .percent{
    color:#0094DA
}
</style>