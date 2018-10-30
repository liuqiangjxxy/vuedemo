<template>
    <div>
        <el-container>
            <el-header class="" height="125px">
                <div class="head_top_one">
                    <a href="http://www.zhulong.com.cn/" target="_blank" class="logo_title">
                        <img v-bind:src="logo"/>
                        <!--<img @click="getHref('/test')" v-bind:src="logo"/>-->
                    </a>

                    <div class="head_top_one_r">
                        <ul class="">
                            <li class="b-r-2">2018-11-12 09:32</li>
                            <li class="b-r-2" style="">
                                <i class="iconfont icon-yonghu"></i>{{name}}
                            </li>
                            <li class="b-r-2 btn-group">
                                <div class="">
                                    <div class="dropdown-btn" style="">
                                        <a href="javascript:void(0);">
                                            <i class="iconfont icon-shezhi"></i>
                                        </a>
                                    </div>
                                    <div class="dropdown-menu" style="">
                                        <ul>
                                            <li class="font-set">
                                                <span class="">字体设置</span>
                                                <div class="theme b-1">
                                                    <a href="javascript:void(0);" data-sta="font-normal"
                                                       v-on:click="styleswitch('font-normal',$event.currentTarget)"
                                                       class="styleswitch "
                                                       v-bind:class="{ current: isFontNormal }">普通</a>
                                                    <a href="javascript:void(0);" data-sta="font_big"
                                                       v-on:click="styleswitch('font_big',$event.currentTarget)"
                                                       class="styleswitch " v-bind:class="{ current: isFontBig }">
                                                        较大</a>
                                                </div>
                                            </li>
                                        </ul>

                                        <ul>
                                            <li class="b-b-5-1">
                                                <a @click="handleCommand()" href="javascript:void(0);">关于我们</a>
                                            </li>
                                            <li>
                                                <a @click="handleCommand()" href="javascript:void(0);">帮助</a>
                                            </li>
                                        </ul>

                                        <ul>
                                            <li class="logOut">
                                                <a @click="handleCommand('loginout')"
                                                   href="javascript:void(0);">退出系统</a></li>
                                        </ul>

                                    </div>
                                </div>
                            </li>
                            <li class="" style="">
                                <div class="btn-fullscreen" @click="handleFullScreen">
                                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                                        <i class="el-icon-rank"></i>
                                    </el-tooltip>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>


                <div class="head_top_two">
                    <div class="fl">
                    <span>
                        <i class="iconfont icon-tongzhi"></i>
                    </span>
                    </div>
                    <div class="scrollZones fl">
                        <swiper :options="swiperOption" ref="mySwiper">
                            <!-- slides -->
                            <swiper-slide>
                                <a class="beyond_ellipsis">1滚动018-0601-WX项目 018-0601-WX项目018-0601-WX项目测试标段已经开标成功!</a>
                            </swiper-slide>
                            <swiper-slide>
                                <a class="beyond_ellipsis">2滚动018-0601-WX项目 018-0601-WX项目018-0601-WX项目测试标段已经开标成功!</a>
                            </swiper-slide>
                            <swiper-slide>
                                <a class="beyond_ellipsis">3滚动018-0601-WX项目 018-0601-WX项目018-0601-WX项目测试标段已经开标成功!</a>
                            </swiper-slide>
                            <swiper-slide>
                                <a class="beyond_ellipsis">4滚动018-0601-WX项目 018-0601-WX项目018-0601-WX项目测试标段已经开标成功!</a>
                            </swiper-slide>
                            <swiper-slide>
                                <a class="beyond_ellipsis">5滚动018-0601-WX项目 018-0601-WX项目018-0601-WX项目测试标段已经开标成功!</a>
                            </swiper-slide>
                            <swiper-slide>
                                <a class="beyond_ellipsis">6滚动018-0601-WX项目 018-0601-WX项目018-0601-WX项目测试标段已经开标成功!</a>
                            </swiper-slide>
                            <swiper-slide>
                                <a class="beyond_ellipsis">7滚动018-0601-WX项目 018-0601-WX项目018-0601-WX项目测试标段已经开标成功!</a>
                            </swiper-slide>
                        </swiper>

                        <!--<p class="beyond_ellipsis">滚动018-0601-WX项目 018-0601-WX项目018-0601-WX项目测试标段已经开标成功!</p>-->
                    </div>
                    <div class="head_top_two_r fr ">
                        <div><span>标段：</span><span>2018-0601-WX项目测试标段</span></div>
                        <div class="xzbd">
                            <a class="" @click="getHref('/xuanZeBiaoDuan')">
                                <i class="iconfont icon-jiahao"></i>
                                <span class="f-c-4">选择其他标段</span>
                            </a>
                        </div>
                        <div>
                            <a class="messageListsBnt" @click="messageListsBnt()" href="JavaScript:void (0);">
                                <el-badge is-dot class="item">
                                    <i class="iconfont icon-duanxin"></i>
                                </el-badge>
                                <span class="f-c-4">消息</span>
                                <span class="f-c-7">(3)</span>
                            </a>
                        </div>
                    </div>
                </div>
            </el-header>
        </el-container>


        <!--弹窗部分-->
        <div class="popup_box">

            <!--消息列表-->
            <my-popup modal-title="消息列表"
                      @on-cancel="cancel"
                      class="messageLists"
                      bntIsYN="1"
            >
                <div slot="modal-content" style="padding: 20px;">
                    <div>
                        <el-button type="primary" @click="checkAll(messageListsData)">
                            全选
                        </el-button>
                        <el-button type="primary" @click="removeRead(messageListsData)">
                            标记已读
                        </el-button>
                        <el-button type="primary" @click="removeMessageLists(messageListsData)" >
                            选中删除已读
                        </el-button>
                    </div>
                    <div class="m-t_20">
                        <el-table
                            :data="messageListsData.slice((page.pageNo-1)*page.pageSize,page.pageNo*page.pageSize)"
                            :height="250"
                            ref="multipleTable"
                            :row-key="messageListsData.uuid"
                            @current-change="tableCurrentChange"
                            @row-click="tableCurrentClick"
                            :default-sort="{prop: 'closingTime,startTime', order: 'enterprisesNumber'}"
                            :show-header=false
                            highlight-current-row
                            tooltip-effect="dark"
                            @selection-change="handleSelectionChange"
                            style="width: 100%"
                        >
                            <!--:type="messageListsData.unread | rowtype"-->
                            <!--@selection-change="handleSelectionChange"-->
                            <el-table-column
                                type="selection"
                                width="55"
                                align="center"
                            >
                            </el-table-column>
                            <el-table-column class-name="status-col" label="读取状态" width="50" sortable>
                                <template slot-scope="scope">
                                    <el-tag :type="scope.row.unread | statusFilter">{{scope.row.unread | formatStata}}
                                    </el-tag>
                                </template>
                            </el-table-column>

                            <el-table-column
                                prop="title"
                                label="消息标题"
                            >
                                <!--<template slot-scope="scope">-->
                                <!--<el-tag :type="scope.row.unread | statusFilter">{{title}}</el-tag>-->
                                <!--</template>-->
                            </el-table-column>
                            <el-table-column
                                prop="time"
                                label="接收时间"
                                width="175"
                                show-overflow-tooltip>
                            </el-table-column>
                        </el-table>

                        <el-pagination
                            class="pull-right clearfix"
                            @size-change="pageHandleSizeChange"
                            @current-change="pageHandleCurrentChange"

                            :current-page.sync="page.pageNo"
                            :page-sizes="page.pageSizesList"
                            :page-size="page.pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="page.totalDataNumber">
                        </el-pagination>
                    </div>
                </div>
            </my-popup>
        </div>
    </div>
</template>

<script>
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import myPopup from './../common/popup.vue';

    export default {
        data: function () {
            return {
                fullscreen: false,
                //name: '王涛',
                name: localStorage.getItem('ms_username'),
                message: 2,
                logo: '/static/images/logo.png',
                isFontNormal: localStorage.getItem('isFontNormal'),
                isFontBig: localStorage.getItem('isFontBig'),
                swiperOption: {
                    autoplay: 3000,
                    autoplayDisableOnInteraction: false,
                    loop: true,
                    direction: 'vertical',
                },
                messageListsData: [],
                multipleTable: [],
                // 列表全选与否
                allSelect: false,
                page: {
                    pageNo: 1,//默认开始页面
                    pageSize: 4, //每页的数据条数
                    pageSizesList: [4, 6, 8, 10, 12, 500],
                    totalDataNumber: 0,//数据的总数,
                },
                disabled: true,
                selectdata: [],//选中显示的值
            }
        },
        components: {
            swiper,
            swiperSlide,
            myPopup
        },
        computed: {
            username() {
                let username = localStorage.getItem('ms_username');
                return username ? username : this.name;
            },
            swiper() {
                return this.$refs.mySwiper.swiper
            },
        },
        methods: {

            //退出登录
            handleCommand(command) {
                if (command == 'loginout') {
                    localStorage.clear();
                    // localStorage.removeItem('ms_username');
                    // localStorage.removeItem('fontstyle');
                    // localStorage.removeItem('isFontNormal');
                    // localStorage.removeItem('isFontBig');
                    this.$router.push('/login');
                } else {
                    //this.$router.push('/dashboard');
                }
            },

            // 全屏事件
            handleFullScreen() {
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

            //字体大小切换
            styleswitch(styleName, event) {
                $(".styleswitch").removeClass("current");
                $(event).addClass("current");
                localStorage.setItem('fontstyle', styleName);
                if (styleName == 'font_big') {
                    localStorage.setItem('isFontNormal', false);
                    localStorage.setItem('isFontBig', true);
                } else {
                    localStorage.setItem('isFontNormal', true);
                    localStorage.setItem('isFontBig', false);
                }

                $('link[rel*=style][title]').each(function (i) {
                    $(this).attr("disabled", true);
                    if (this.getAttribute('title') == styleName) {
                        $(this).attr("disabled", false);
                    } else {
                        $(this).attr("disabled", true);
                    }
                });
            },

            //打开消息列表按钮
            messageListsBnt() {
                //console.log("123");
                let $dom = $(".messageLists");
                this.popupOpen($dom)
            },

            cancel() {

            },
            handleSelectionChange(index) { //勾选选中
                //console.log(index);
                this.selectdata = index;
                //console.log(this.selectdata);
                if(this.selectdata.length == 0){
                    this.disabled=true;
                    //this.allSelect=false;
                }else {
                    this.disabled=false;
                }

                if (this.selectdata.length==this.messageListsData.length){
                    //this.disabled=true;
                }
            },
            removeMessageLists(rows) {
                //console.log(this.selectdata);
                //console.log(this.selectdata.length);
                if (this.selectdata.length == 0) { //判断有么没有选中
                    this.$message({
                        showClose: true,
                        message: '你未选中,删除信息!',
                        type: 'warning'
                    });
                    return
                }
                var ids = [];//设置删除id
                this.selectdata.forEach(a => {
                    console.log(a.unread);
                    if (a.unread) {
                        //console.log("未阅读不能删除")
                    } else {
                        ids.push(a.uuid);
                        //console.log("可以删除")
                    }
                });
                //console.log("删除信息uuid" + ids)
                this.getMessageListsData()
            },
            checkAll(rows) { //点击全选
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row, !this.allSelect)
                    })
                    //this.allSelect = !this.allSelect
                }
            },
            removeRead(multipleTable) {//点击标记已读

                //console.log("点击标记已读");
            },
            tableCurrentClick(data){//点击表格行
                console.log(data);
                this.currentRow = data;
                this.multipleTable = data;
                this.currentRow.unread = false;
                //点击表格

            },
            tableCurrentChange(data) { //表格改变事件
                console.log("表格改变事件")
            },
            getMessageListsData() {
                //console.log("获取消息列表");
                // let messageListsData = [{}];
                //console.log("$nextTick");
                this.$ajax({
                    method: 'get',
                    url: "/static/data/messageListsData.json",
                    data: {}
                }).then(response => {
                    //console.log(response.data);
                    //messageListsData = response.data[0];
                    this.messageListsData = response.data;
                    this.page.totalDataNumber = response.data.length;//设置数据总数目！！！
                }).catch(function (err) {
                    //console.log(err)
                });
            },
            init() {

            },
            //表格 分页
            //改变每页显示数量
            pageHandleSizeChange(val) {
                var pageSize = `${val}`;
                this.page.pageSize = parseInt(pageSize);
            },
            //改变页码
            pageHandleCurrentChange(val) {

            },


        },
        filters: {
            // el-tag类型转换
            statusFilter(status) {
                const statusMap = {
                    // true: '未读',
                    // false: '已读',
                    true: 'weiduyoujian',
                    false: 'yiduyoujian',
                }
                return statusMap[status]
            },
            // 状态显示转换
            formatStata(status) {
                const statusMap = {
                    //true: '<i class="iconfont icon-youjian"></i>',
                    // false: '<i class="iconfont icon-yiduyoujian"></i>',
                }
                return statusMap[status]
            },
            rowtype() {
                console.log("111")
            }

        },
        mounted() {
            this.$nextTick(function () {
                let vm = this;
                this.getMessageListsData();
                this.init();
            });
        },
        created() {
            let styleName = localStorage.getItem('fontstyle');
            $(".styleswitch").removeClass("current");
            if (styleName == null) {
                localStorage.setItem('fontstyle', "font-normal");
                localStorage.setItem('isFontNormal', true);
                localStorage.setItem('isFontBig', false);
                styleName = "font-normal";
            }

            $('link[rel*=style][title]').each(function (i) {
                $(this).attr("disabled", true);
                if (this.getAttribute('title') == styleName) {
                    $(this).attr("disabled", false);
                } else {
                    $(this).attr("disabled", true)
                }
            });

            let isFontNormal = localStorage.getItem('isFontNormal');
            if (isFontNormal == "true") {
                this.isFontNormal = true;
                this.isFontBig = false;
            } else {
                this.isFontNormal = false;
                this.isFontBig = true;
            }
            if (document.body.clientWidth < 1500) {
                //this.collapseChage();
            }

        },

    }

</script>
<style scoped>

    .el-container {
        height: 120px;
    }

    .el-header {
        height: 125px;
        padding: 0;
        min-width: 960px;
        position: fixed;
        width: 100%;
        z-index: 9;
    }

    .el-container {
        min-width: 1400px;
    }

    .head_top_one {
        height: 75px;
        background-color: #2a303c;
    }

    .logo_title {
        margin-left: 25px;
        margin-top: 20px;
        float: left;
        width: 400px;
    }

    .head_top_one_r {
        float: right;
    }

    .head_top_one_r > ul {
        color: #b0b0b0;
        height: 75px;
        text-align: center;
    }

    .head_top_one_r > ul > li {
        line-height: 75px;
        height: 75px;
        padding: 0 20px;
        display: inline-block;
        float: left;
    }

    .iconfont {
        padding: 0 10px;
    }

    .iconfont.icon-shezhi {
        font-size: 20px;
        color: rgba(255, 255, 255, 0.8);
    }

    .btn-group {
        position: relative;
    }

    .head_top_one .btn-group:hover .dropdown-menu {
        display: block;
    }

    .head_top_one .btn-group .dropdown-menu {
        background-color: white;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        -moz-box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        -webkit-box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        width: 230px;
        min-height: 150px;
        position: absolute;
        top: 75px;
        right: -18px;
        display: none;
        z-index: 99;
    }

    .head_top_one .btn-group .dropdown-menu ul:first-child {
        border-top: none;
    }

    .head_top_one .btn-group > .dropdown-menu > ul {
        width: 100%;
    }

    .dropdown-menu .font-set {
        color: #333333;
    }

    .dropdown-menu li {
        padding: 1px 20px;
        line-height: 40px;
    }

    .dropdown-menu li > .theme {
        display: inline-block;
        float: right;
        line-height: 24px;
        height: 24px;
        margin-top: 8px;
    }

    .dropdown-menu li > .theme a {
        width: 40px;
        display: inline-block;
        text-align: center;
        padding: 0 5px;
        height: 25px;
    }

    .theme .current {
        background-color: #cbcbcb;
    }

    .theme .current {

    }

    .head_top_one .btn-group .dropdown-menu ul {
        border-top: 10px solid #efefef;
    }

    .head_top_two {
        border-top: 1px solid #e1e1e1;
        background-color: #ffffff;
    }

    .head_top_two {
        padding-left: 25px;
        height: 50px;
        /*line-height: 50px;*/
        overflow: hidden;
    }

    /*swiper 样式*/
    .head_top_two .swiper-container {
        height: 50px;
    }

    .head_top_two .swiper-slide {
    }

    .head_top_two {
        padding-left: 25px;
        height: 50px;
        line-height: 49px;
        overflow: hidden;
    }

    .scrollZones {
        height: 50px;
        width: 35%;
    }

    .scrollZones p {
        max-width: 80%;
        height: 50px;
    }

    .head_top_two_r {
        margin-right: 40px;
    }

    .head_top_two_r > div {
        display: inline-block;
        padding: 0 20px;
    }

    .head_top_two_r > div i img {
        padding-top: 19px;
        padding-right: 10px;
    }

    .head_top_two_r .xzbd i img {
        padding-top: 17px;
    }

    .icon-duanxin {
        font-size: 18px
    }

    .messageLists {

    }


</style>























