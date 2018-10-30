<template>
    <div class="sidebar" :class="{'left_210':!collapse}">
        <div class="leftsideBar_name m-t_125">操作步骤</div>
        <div class="left_main">
            <ul class="fixed-f-s-6">
                <li class="step_1"><a href="javascript:void (0);">
                    <div class="">1</div>
                    <span class="">确定标段</span></a></li>
                <li class="step_2"><a href="javascript:void (0);">
                    <div class="">2</div>
                    <span class="">导入招标文件</span></a></li>
                <li class="step_3"><a href="javascript:void (0);">
                    <div class="">3</div>
                    <span class="">导入投标文件</span></a></li>
                <li class="step_4"><a href="javascript:void (0);">
                    <div class="">4</div>
                    <span class="">唱标</span></a></li>
                <li class="step_5"><a href="javascript:void (0);">
                    <div class="">5</div>
                    <span class="">开标结束</span></a></li>

                <!--<li class="step_1" :class="{'notStarted':this.step_1==0,'currentGeneration':this.step_1==1,'completed':this.step_1==2}"><a href="javascript:void (0);"><div class="">1</div><span class="">确定标段</span></a></li>-->
                <!--<li class="step_2" :class="{'notStarted':this.step_2==0,'currentGeneration':this.step_2==1,'completed':this.step_2==2}"><a href="javascript:void (0);"><div class="">2</div><span class="">导入招标文件</span></a></li>-->
                <!--<li class="step_3" :class="{'notStarted':this.step_3==0,'currentGeneration':this.step_3==1,'completed':this.step_3==2}"><a href="javascript:void (0);"><div class="">3</div><span class="">导入投标文件</span></a></li>-->
                <!--<li class="step_4" :class="{'notStarted':this.step_4==0,'currentGeneration':this.step_4==1,'completed':this.step_4==2}"><a href="javascript:void (0);"><div class="">4</div><span class="">唱标</span></a></li>-->
                <!--<li class="step_5" :class="{'notStarted':this.step_5==0,'currentGeneration':this.step_5==1,'completed':this.step_5==2}"><a href="javascript:void (0);"><div class="">5</div><span class="">开标结束</span></a></li>-->
            </ul>
        </div>
        <div class="state_explain">
            <ul class="fixed-f-s-2">
                <li class="currentGeneration"><a href="javascript:void (0);">
                    <div class=""></div>
                    <span class="">当前</span></a></li>
                <li class="completed"><a href="javascript:void (0);">
                    <div class=""></div>
                    <span class="">已完成</span></a></li>
                <li class="notStarted"><a href="javascript:void (0);">
                    <div class=""></div>
                    <span class="">未开始</span></a></li>
            </ul>
        </div>
        <div v-on:click="collapseChage" class="menu_h_s_switch" :class="{'menu_show':collapse,'menu_hidden':!collapse}">
            <div class="caret"></div>
        </div>
    </div>
</template>

<script>
    import bus from '../common/bus';

    export default {
        name: "Sidebar",
        data:function() {
            return {
                collapse: true,
                // step_1:localStorage.getItem('step_1'),
                // step_2:localStorage.getItem('step_2'),
                // step_3:localStorage.getItem('step_3'),
                // step_4:localStorage.getItem('step_4'),
                // step_5:localStorage.getItem('step_5'),
            }
        },
        methods: { //可以直接通过 VM 实例访问这些方法
            // 侧边栏折叠
            collapseChage() {
                this.collapse = !this.collapse;
                bus.$emit('collapse', this.collapse);
            },
            init() {
                //console.log("Sidebar init");
            }
        },
        mounted() {
            this.init()
        },
        beforeCreate() {
            //console.log("Sidebar beforeCreate");
        },
        created() {
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        },
        computed: { //computed是在HTML DOM加载后马上执行的，如赋值；

        },
    }
</script>

<style scoped>
    .sidebar {
        overflow: hidden;
        width: 210px;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 8;
        transition: .7s;
        background-color: #ffffff;
    }

    .leftsideBar_name {
        height: 50px;
        line-height: 50px;
        font-weight: bold;
        padding-left: 30px;
        background-color: #d2d2d2;
        color: #333333
    }

    .sidebar > ul {
        height: 100%;
    }

    .left_main ul li {
        height: 30px;
        padding: 20px 0 20px 30px;
    }

    .left_main ul li a {
        display: block;
        height: 30px;
        cursor: initial;
    }

    .left_main ul li a div {
        color: white;
    }

    .left_main ul li a span {
        padding: 0 20px;
        color: #666666;
    }

    .left_main ul li a div {
        height: 30px;
        width: 30px;
        display: inline-block;
        border-radius: 50%;
        text-align: center;
        line-height: 30px;
        background-color: #666666;
    }

    .completed div {
        background-color: #2ba552 !important;
    }

    .completed span {
        color: #2ba552 !important;
    }

    .currentGeneration div {
        background-color: #cd4e48 !important;
    }

    .currentGeneration span {
        color: #cd4e48 !important;
    }

    .notStarted div {
        background-color: #666666 !important;
    }

    .notStarted span {
        color: #666666 !important;
    }

    .state_explain ul li {
        display: block;
        height: 30px;
        line-height: 30px;
    }

    .state_explain ul li a {
        display: block;
        padding-left: 25px;
        cursor: initial;
    }

    .state_explain ul li a div {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        display: inline-block;
    }

    .state_explain ul li a span {
        padding: 0 15px;
    }

    .left_main {
        display: block;
        padding: 15px 0;
    }

    .menu_h_s_switch {
        position: fixed;
        top: 50%;
        width: 30px;
        height: 68px;
        z-index: 999;
        transition: .7s;
        /* margin-top: -13px; */
        border-radius: 3px;
        cursor: pointer;
        left: -6px;
    }

    .menu_show {
        left: 185px !important;
    }

    .menu_h_s_switch {
        position: fixed;
        top: 50%;
        width: 30px;
        height: 68px;
        z-index: 999;
        transition: .7s;
        /* margin-top: -13px; */
        border-radius: 3px;
        cursor: pointer;
        background-color: #e1e5ee;
    }

    .menu_show .caret {
        border-top: 8px solid transparent;
        border-right: 8px solid #4789cd;
        border-left: 8px solid transparent;
        border-bottom: 8px solid transparent;
    }

    .menu_h_s_switch .caret {
        display: inline-block;
        width: 0;
        height: 0;
        vertical-align: top;
        margin: 27px 8px 0 10px;
        content: "";
        float: right;
    }

    .caret {
        border-top: 5px solid #b0b0b0;
        border-right: 5px solid transparent;
        border-left: 5px solid transparent;
    }

    .menu_hidden .caret {
        border-top: 8px solid transparent;
        border-left: 8px solid #4789cd;
        border-right: 8px solid transparent;
        border-bottom: 8px solid transparent;
    }

    .menu_hidden .caret {
        transition: All 0.4s ease-in-out;
        -webkit-transition: All 0.4s ease-in-out;
        -moz-transition: All 0.4s ease-in-out;
        -o-transition: All 0.4s ease-in-out;
        -ms-transition: All 0.4s ease-in-out;
        cursor: pointer;
    }

    .menu_hidden .caret {
        margin: 27px 8px 0 10px;
    }

    .menu_hidden:hover .caret {
        transform: translateX(10px);
        -webkit-transform: translateX(10px);
        -moz-transform: translateX(10px);
        -o-transform: translateX(10px);
        -ms-transform: translateX(10px);
    }


</style>
