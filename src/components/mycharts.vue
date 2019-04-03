<template>
    <div id="mychart">mychart</div>
    
</template>


<script>
import echarts from 'echarts';
    export default{
        data(){
            return {               
                option : {
                    title : {
                        text: '',
                        subtext: ''
                    },
                    tooltip : {
                        trigger: 'item'  //悬浮提示框不显示
                    },
                    grid:{   //绘图区调整
                        x:150,  //左留白
                        y:10,   //上留白
                        x2:30,  //右留白
                        y2:10   //下留白
                    },
                    xAxis : [
                        {
                            show:false,
                            type : 'value',
                            boundaryGap : [0, 0],
                            position: 'top'
                        }
                    ],
                    yAxis : [
                        {
                            type : 'category',
                            data : ['IO','内存使用率','CPU使用率','存储状态'],
                            axisLine:{show:false},     //坐标轴
                            axisTick:[{    //坐标轴小标记
                                show:false
                            }],
                            axisLabel:{
                                textStyle:{
                                    fontSize:'20'
                                }
                            }
                        }
                    ],
                    series : [
                        {
                            type:'bar',
                            itemStyle:{
                                normal:{color:'rgba(0,0,0,0.5)'}
                            },
                            barGap:'-100%',
                            barCategoryGap:'43%',
                            data:[100,100,100,100],
                            animation:false
                        },
                        {
                            name:'',
                            type:'bar',
                            // stack:'总量',
                            tooltip:{show:false},
                            barMinHeight:30,  //最小柱高
                            barWidth: 20,  //柱宽度
                            barMaxWidth:100,   //最大柱宽度
                            data:[23,29,30,10],
                            itemStyle:{
                                normal:{    //柱状图颜色
                                    color:'#ff6600',
                                    label:{
                                        show: true,   //显示文本
                                        position: 'right',  //数据值位置
                                        textStyle:{
                                            color:'#000',
                                            fontSize:'20',
                                        }
                                    },
                                    // shadowBlur: 0,
                                    // shadowOffsetX:30,
                                    // shadowOffsetY:0,
                                    // shadowColor:'rgba(20,255,255,1)',
                                    
                                    
                                },
                                
                            }
                        },
                        
                    ]
                },    
            }
        },

        computed:{
            
            
        },

        methods:{
            // showChart(){
            //     var myChart = echarts.init(document.getElementById('mychart'));
            //     myChart.setOption(this.option);
            // }
        },
        mounted(){
            var myChart = echarts.init(document.getElementById('mychart'));
            myChart.setOption(this.option);
        },
             
    }
  
</script>

<style type="text/css">
    #mychart{
        width:300px;
        height: 300px;
        /* color:rgba(20,255,255,0.5) */
    }
</style>