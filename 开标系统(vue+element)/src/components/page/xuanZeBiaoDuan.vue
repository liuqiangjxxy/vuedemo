<template>
    <div class="wrapper">
        <v-head></v-head>
        <div class="content-box">
            <div class="content ">
                <div class="xuanzebiaoduan">
                    <div class="firstTitle">
                        <div class="fl">
                            <span class="title">选择标段</span>
                        </div>
                    </div>
                    <div class="main_1_box" style="padding: 25px;">
                        <el-row class="search_box">
                            <el-form :inline="true" :model="formInline" class="">
                                <el-col :span="4">
                                    <el-form-item label="标段名称：">
                                        <el-autocomplete
                                            class="inline-input input_w"
                                            v-model="formInline.user"
                                            :fetch-suggestions="querySearch"
                                            placeholder="请输入标段名称"
                                            @select="handleSelect"
                                        ></el-autocomplete>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="4">
                                    <el-form-item label="标段编号：">
                                        <el-input v-model="formInline.serialNumber" class="input_w"
                                                  placeholder="请输入标段编号"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="4">
                                    <el-form-item label="开标日期：">
                                        <el-date-picker
                                            v-model="formInline.startDate"
                                            type="date"
                                            suffix-icon="el-icon-date"
                                            class="input_w"
                                            placeholder="请选择开标日期">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="2">
                                    <el-form-item>
                                        <el-button type="primary" class="b-c-5 search_bnt" @click="onSubmit">搜&nbsp;索
                                        </el-button>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10">
                                    <el-radio-group v-model="type" size="medium">
                                        <el-radio-button label="未开标"></el-radio-button>
                                        <el-radio-button label="已开标"></el-radio-button>
                                        <el-radio-button label="评标中"></el-radio-button>
                                        <el-radio-button label="评标完"></el-radio-button>
                                        <el-radio-button label="已流标"></el-radio-button>
                                        <el-radio-button label="全部"></el-radio-button>
                                    </el-radio-group>

                                </el-col>
                            </el-form>
                        </el-row>
                        <div class="table_box">

                            <el-table
                                :data="xuanzebiaoduan.slice((page.pageNo-1)*page.pageSize,page.pageNo*page.pageSize)"
                                :height="table_box_h"
                                :row-key="xuanzebiaoduan.UUID"
                                :default-sort="{prop: 'closingTime,startTime', order: 'enterprisesNumber'}"
                                border
                                style="width: 100%">
                                <el-table-column
                                    prop=""
                                    label="选择"
                                    width="80">
                                    <template slot-scope="scope">
                                        <div type="text" class="radio_click b-7 b-c-9"
                                             @click="xuanze(scope.row.UUID,xuanzebiaoduan,'/flowPath/queDingBiaoDuan')">
                                            选&nbsp;择
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    type="index"
                                    label="序号"
                                    width="60">
                                </el-table-column>
                                <el-table-column
                                    prop="name"
                                    label="标段名称"
                                    width="180">
                                </el-table-column>
                                <el-table-column
                                    prop="number"
                                    label="标段编号">
                                </el-table-column>
                                <el-table-column
                                    prop="closingTime"
                                    sortable
                                    label="截标时间">
                                </el-table-column>
                                <el-table-column
                                    prop="enterprisesNumber"
                                    sortable
                                    label="投标企业数">
                                </el-table-column>
                                <el-table-column
                                    prop="startTime"
                                    sortable
                                    label="开始时间">
                                </el-table-column>
                                <el-table-column
                                    prop="startStatus"
                                    label="开标状态">
                                </el-table-column>
                                <el-table-column
                                    prop="bidOpeningPeople"
                                    label="开标人">
                                </el-table-column>
                            </el-table>

                            <el-pagination
                                class="pull-right clearfix"
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page.sync="page.pageNo"
                                :page-sizes="page.pageSizesList"
                                :page-size="page.pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="page.totalDataNumber">
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import vHead from '../common/Header.vue';
    import bus from '../common/bus';

    export default {
        name: "xuanZeBiaoDuan",
        data:function() {
            return {
                // tagsList: [],
                // collapse: false,

                formInline: {
                    UUID: '',
                    user: '',
                    serialNumber: '',
                    startDate: '',
                },
                type: "",
                table_box_h: 250,
                xuanzebiaoduan: [{
                    "UUID": 1,
                    "name": "云南昆明第一小学机房建设项目第一标段",
                    "number": "1111",
                    "closingTime": "2018-01-10 10:10:59",
                    "enterprisesNumber": 1,
                    "startTime": "2018-09-10 10:10:59",
                    "startStatus": "已流标",
                    "bidOpeningPeople": "张三1"
                }],
                page: {
                    pageNo: 1,//默认开始页面
                    pageSize: 10, //每页的数据条数
                    pageSizesList: [5, 7, 10, 15, 30, 500],
                    totalDataNumber: 0,//数据的总数,
                },
            }
        },
        components:{
            vHead
        },
        methods: {
            //改变每页显示数量
            handleSizeChange(val) {
                var pageSize = `${val}`;
                this.page.pageSize = parseInt(pageSize);
                //console.log('pageSize: ' + pageSize);
            },
            //改变页码
            handleCurrentChange(val) {

            },
            onSubmit() {
                //console.log('submit!');
            },
            querySearch(queryString, callback) {
                //queryString 为在框中输入的值
                //callback 回调函数,将处理好的数据推回
                //获取下拉数据
                let list = [{}];
                let url = "/static/data/demo.json";
                this.$ajax({
                    method: 'get',
                    url: url,
                    data: {
                        "queryString": queryString
                    }
                }).then(response => {
                    for (let i of response.data) {
                        i.value = i.value
                    }
                    list = response.data;
                    callback(list);
                }).catch(function (err) {
                    //console.log(err)
                });
            },
            handleSelect(item) { //选择项
                //console.log(item);
            },
            getRowKeys(row) {
                //console.log(row.UUID);
            },
            xuanze(dataUUID, data, href) { //点击选择 调用方法
                //console.log(dataUUID);
                //console.log(data);
                //console.log(href);
                localStorage.setItem('step_1', 1);
                this.$router.replace({path: href, params: {id: dataUUID}});
            },
            init() {
                sessionStorage.setItem('vue_name', "xuanZeBiaoDuan");
                window.onresize();
                $(".xzbd").hide();
                localStorage.setItem('step_1', 0);
                localStorage.setItem('step_2', 0);
                localStorage.setItem('step_3', 0);
                localStorage.setItem('step_4', 0);
                localStorage.setItem('step_5', 0);
                localStorage.setItem('step_current', 0);
            }
        },
        beforeDestroy() {
            //console.log("beforeDestroy");
            sessionStorage.removeItem('vue_name');
        },
        mounted() {
            //设置表格高度
            window.onresize = () => {
                let $dome = $(".table_box");
                this.table_box_h = this.getTableaH($dome);
            };

            //获取表格数据
            this.$nextTick(function () {
                let vm = this;
                vm.init();
                vm.page.total = 100;//设置数据总数目！！！
                let xuanzebiaoduan = [{}];
                vm.$ajax({
                    method: 'get',
                    url: "/static/data/xuanzebiaoduan.json",
                    data: {}
                }).then(response => {
                    //console.log(response.data);
                    xuanzebiaoduan = response.data;
                    this.xuanzebiaoduan = xuanzebiaoduan;
                    // 分页部分
                    vm.page.totalDataNumber = response.data.length;//设置数据总数目！！！
                }).catch(function (err) {
                    //console.log(err)
                });
            })
        }
    }
</script>
<style>
    .search_box {
    /*padding: 10px 0;*/
    box-sizing: border-box;
    }

    .search_bnt {
    padding: 8px 25px;
    }

    .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    color: black;
    background-color: #cbcbcb;
    border-color: #cbcbcb;
    -webkit-box-shadow: -1px 0 0 0 #cbcbcb;
    box-shadow: -1px 0 0 0 #cbcbcb;
    }
    .content-box{
    margin-left: 0;
    }


</style>
