<template>
    <div class="changBiao">
        <div class="firstTitle">
            <div class="fl">
                <span class="title">{{title}}</span>
                <span class="annotation">{{annotation}}</span>
            </div>
            <div class="fr">
                <span class="step">{{step}}</span>
                <div class="upAndDown">
                    <a class="larr b-r-4 f-c-5"><i class="iconfont icon-zuojiantou1"></i>上一步</a>
                    <a class="rarr f-c-5" @click="nextStep">下一步<i class="iconfont icon-youjiantou1"></i></a>
                </div>
            </div>
        </div>
        <div class="main_1_box" style="padding: 25px;">
            <el-row class="search_box">
                <el-form :inline="true" :model="formInline" class="">
                    <el-col :span="6">
                        <el-input placeholder="请输入内容" v-model="formInline.search_val" class="input-with-select">
                            <el-button type="primary" slot="append" class="b-c-5 search_bnt" @click="onSubmit()">
                                搜&nbsp;索
                            </el-button>
                        </el-input>
                    </el-col>

                    <el-col :span="9" style="padding: 0 20px">
                        <el-button type="primary" style="margin: 0 15px">唱&nbsp;标</el-button>
                        <div class="p-r" style="display: inline-block;">
                            <el-button type="primary" style="margin: 0 15px" @click="buyushouli_bnt"><span></span>不予受理
                            </el-button>
                        </div>
                    </el-col>
                </el-form>
            </el-row>

            <div class="table_box" style=" margin-top: 25px;">
                <el-table :data="changbiaodata.slice((page.pageNo-1)*page.pageSize,page.pageNo*page.pageSize)"
                          :height="table_box_h"
                          highlight-current-row
                          @current-change="handleCurrentChange"
                          :row-key="changbiaodata.UUID"
                          :default-sort="{prop: 'closingTime,startTime', order: 'enterprisesNumber'}"
                          border
                          style="width: 100%">
                    <el-table-column
                        fixed
                        type="index"
                        label="序号"
                        width="60">
                    </el-table-column>
                    <el-table-column
                        fixed
                        prop="companyName"
                        label="企业名称"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="companyNo"
                        sortable
                        width="140"
                        label="企业编号">
                    </el-table-column>
                    <el-table-column
                        label="密封状态"
                        prop="seal"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        label="报价(元)"
                        prop="offer"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        label="报价(元)"
                        prop="offer"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        label="工期(天)"
                        prop="projectTime"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        label="其他开标内容"
                        prop="otherContents"
                        width="140">
                    </el-table-column>
                    <el-table-column
                        label="递交时间"
                        prop="deliveryTime"
                        width="170">
                    </el-table-column>
                    <el-table-column
                        label="保证金"
                        prop="deposit"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        label="保证金到账时间"
                        prop="depositSubmissionTime"
                        width="170">
                    </el-table-column>
                    <el-table-column
                        label="唱标状态"
                        prop="bidAnnouncementState"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        label="唱标时间"
                        prop="bidAnnouncementTime"
                        width="170">
                    </el-table-column>
                    <el-table-column
                        prop="nadmi_reason"
                        label="不予受理"
                        min-width="170">
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

        <!--弹窗部分-->
        <div class="popup_box">
            <!--不予受理-->
            <ys-modal-component modal-title="不予受理" class="buyushouliPopup">
                <div slot="modal-content">
                    <el-form :model="byslruleForm" :rules="rules" ref="byslruleForm" label-width="120px" class="m-t_20">

                        <el-form-item label="原因：" prop="buyushouli_c">
                            <el-checkbox-group v-model="byslruleForm.buyushouli_c">
                                <el-checkbox v-for="checkbox_t in buyushouli_reason" :label="checkbox_t"
                                             :key="checkbox_t">
                                    {{checkbox_t}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>

                        <el-form-item label="说明：" prop="buyushouli_reason_text">
                            <el-input type="textarea" v-model="byslruleForm.buyushouli_reason_text"
                                      :autosize="{ minRows: 3, maxRows: 10}"></el-input>
                        </el-form-item>

                        <el-form-item style="text-align: center;margin-right: 120px;" class="m-t_20">
                            <el-button class="btn blue" type="primary" @click="submitForm_2('byslruleForm')">导入
                            </el-button>
                            <el-button class="btn" @click="resetForm('byslruleForm')">取消</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </ys-modal-component>
        </div>
    </div>
</template>

<script>

    const buyushouli_reason = ['不满足招标要求', '无法导入投标文件', '无法揭秘投标文件', '其他'];
    export default {
        name: "changBiao",
        data:function() {
            return {
                title: "4：唱标",
                annotation: "（注：点击唱标按钮，系统会依次自动唱标。）",
                step: '4/5',
                nextStep_link: '/flowPath/kaiBiaoJieShu',

                byslruleForm: {
                    buyushouli_c: ['其他'],//默认选择
                    buyushouli_reason_text: '',
                },
                buyushouli_reason: buyushouli_reason,
                rules: {
                    radio_1: [
                        {type: 'array', required: true, message: '请至少选择一个文件类型', trigger: 'change'}
                    ],
                    buyushouli_c: [
                        {type: 'array', required: true, message: '请至少选择一个原因', trigger: 'change'}
                    ],
                    buyushouli_reason_text: [
                        {required: true, message: '请填写原因说明', trigger: 'change'}
                    ]
                },
                formInline: {
                    search_val: '',
                },

                changbiaodata: [
                    {
                        "UUID": 0, //唯一标识
                        "companyName": "1天马科技", //企业名称
                        "companyNo": "5940389509480", //企业编号
                        "seal": "良好", //密封状态
                        "offer": 10000, //报价(元)
                        "projectTime": 2,//工期(天)
                        "otherContents": "其他开标内容",//其他开标内容
                        "deliveryTime": "2018-08-20 19:20:36",//递交时间
                        "deposit": 10000,//保证金
                        "depositSubmissionTime": "2018-08-20 19:20:36",//保证金到账时间
                        "bidAnnouncementState": "已唱标",//唱标状态
                        "bidAnnouncementTime": "2018-08-20 19:20:36",//唱标时间
                        "nadmi_reason": "不受理 - 无法解密投",//不受理
                    }
                ],
                table_box_h: 250, //表格高度
                page: {
                    pageNo: 1,//默认开始页面
                    pageSize: 10, //每页的数据条数
                    pageSizesList: [5, 7, 10, 15, 30, 500],
                    totalDataNumber: 0,//数据的总数,
                },
            }
        },
        methods: { //可以直接通过 VM 实例访问这些方法
            nextStep() {
                let href = this.nextStep_link;
                localStorage.setItem('step_1', 2);
                localStorage.setItem('step_2', 2);
                localStorage.setItem('step_3', 2);
                localStorage.setItem('step_4', 2);
                localStorage.setItem('step_5', 1);
                this.$router.replace({path: href});
            },
            annotation_close(num) {

            },
            buyushouli_bnt() {
                //console.log("123");
                let $dom = $(".buyushouliPopup");
                this.popupOpen($dom)
            },
            init() {
                this.setstep();
                sessionStorage.setItem('vue_name', "changBiao");
                window.onresize();
            },

            onSubmit() { //点击搜索按钮
                //console.log('submit!');
            },
            //表格部分
            daoruCommand() {
            },
            handleSizeChange() {
            },
            handleCurrentChange(val) { //选择表格
                this.currentRow = val;
                console.log(this.currentRow.UUID);
                this.$router.push({path:'/flowPath/changBiao/detail',query:{pk_refinfo:this.currentRow.UUID,user:localStorage.getItem('ms_username')}});
            },
            setCurrent(row) {

            }
        },
        created() {
            //console.log("created");
        },
        beforeCreate() {
            //console.log("beforeCreate");
        },
        beforeDestroy() {
            //console.log("beforeDestroy");
            sessionStorage.removeItem('vue_name');
        },

        mounted() {
            //获取 table_box_h
            window.onresize = () => {
                let $dome = $(".table_box");
                this.table_box_h = this.getTableaH($dome);
            };

            //console.log("mounted");
            this.$nextTick(function () {
                let vm = this;
                vm.init();
                //获取数据
                //vm.page.total = 10;//设置数据总数目！！！
                let changbiaodata = [{}];
                vm.$ajax({
                    method: 'get',
                    url: "/static/data/changbiao.json",
                    data: {}
                }).then(response => {
                    console.log(response.data);
                    changbiaodata = response.data;
                    this.changbiaodata = changbiaodata;
                    // 分页部分
                    vm.page.totalDataNumber = response.data.length;//设置数据总数目！！！
                }).catch(function (err) {
                    //console.log(err)
                });

            })
        },
        computed: {}
    }
</script>

<style scoped>

</style>
