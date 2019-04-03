import Vue from 'vue'
import Vuex from 'vuex'

//状态管理
Vue.use(Vuex);

const state={          //要设置的全局访问的state对象
    // username: "",
    // password: "",
    tableData: [],
    formInline:{
        taskName:"",
        upAddress:"",
        localAddress:"",
        dataCount: "true",
    },
    formInline2:{
        taskName:"",
        dataType:"",
        dataAddress:"",
        dataCount: "true",
    },
    dialogFormVisible1: false,
    dialogFormVisible2: false,
    currentPage1: 1,
};
const getters={          //实时监听state值的变化
    uploadIsShow(state){
        return state.dialogFormVisible1
    },
    downloadIsShow(state){
        return state.dialogFormVisible2
    },
};
const mutations={          //自定义改变state初始值的方法
    showDialogFormVisible1(state){
        state.dialogFormVisible1 = true
    },
    hideDialogFormVisible1(state){
        state.dialogFormVisible1 = false
    },
    showDialogFormVisible2(state){
        state.dialogFormVisible2 = true
    },
    hideDialogFormVisible2(state){
        state.dialogFormVisible2 = false
    }
};
const actions={          //自定义触发mutations里函数的方法
    showDialogFormVisible1(context){
        context.commit('showDialogFormVisible1')
    },
    hideDialogFormVisible1(context){
        context.commit('hideDialogFormVisible1')
    },
    showDialogFormVisible2(context){
        context.commit('showDialogFormVisible2')
    },
    hideDialogFormVisible2(context){
        context.commit('hideDialogFormVisible2')
    }
};

const store = new Vuex.Store({
	state,
    getters,
	mutations,
    actions
});

export default store;