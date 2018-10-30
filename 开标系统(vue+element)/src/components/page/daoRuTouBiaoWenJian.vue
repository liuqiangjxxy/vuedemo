<template>
    <div class="daoRuTouBiaoWenJian">
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
                            <el-button type="primary" slot="append" class="b-c-5 search_bnt" @click="onSubmit">
                                搜&nbsp;索
                            </el-button>
                        </el-input>
                    </el-col>

                    <el-col :span="9" style="padding: 0 20px">
                        <el-button type="primary" style="margin: 0 15px">远程解密</el-button>
                        <el-dropdown placement="bottom-start" @command="daoruCommand" style="margin: 0 15px"
                                     :hide-timeout="400">
                            <el-button type="primary">
                                导入 <i class="iconfont icon-sanjiao"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="a">平台导入(导入全部)</el-dropdown-item>
                                <el-dropdown-item command="b">平台导入(导入选中企业)</el-dropdown-item>
                                <el-dropdown-item command="c">本地导入</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>

                        <div class="p-r" style="display: inline-block;">
                            <el-button type="primary" style="margin: 0 15px" @click="buyushouli_bnt"><span></span>不予受理
                            </el-button>
                            <div class="annotation_box" :class="{'hide':drtbwj_1_first}">
                                <div class="annotation_c">
                                    <div class="annotation_close" @click="annotation_close(1)">&times;</div>
                                    <div class="annotation_text">
                                        无法达到投标要求的企业，通过不予受理功能，该企不能再参与投。
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-col>

                    <el-col :span="9">
                        <el-radio-group v-model="type" size="medium">
                            <el-radio-button label="未解密"></el-radio-button>
                            <el-radio-button label="未导入"></el-radio-button>
                            <el-radio-button label="不予受理"></el-radio-button>
                            <el-radio-button label="评标完"></el-radio-button>
                            <el-radio-button label="全部"></el-radio-button>
                        </el-radio-group>
                    </el-col>
                </el-form>
            </el-row>
            <p style="line-height: 30px; margin-top: 10px;">
                <span style="">已解密20 / 未解密300 / 解密失败10</span>
                <span>已导入20 / 未导入300 / 导入失败20</span>
            </p>
            <div class="table_box" style=" margin-top: 10px;">
                <el-table :data="daoRuTouBiaoWenJian.slice((page.pageNo-1)*page.pageSize,page.pageNo*page.pageSize)"
                          :height="table_box_h"
                          :row-key="daoRuTouBiaoWenJian.UUID"
                          :default-sort="{prop: 'closingTime,startTime', order: 'enterprisesNumber'}"
                          border
                          style="width: 100%">
                    <el-table-column
                        type="index"
                        label="序号"
                        width="60">
                    </el-table-column>
                    <el-table-column
                        prop="companyName"
                        label="企业名称"
                        width="300">
                    </el-table-column>
                    <el-table-column
                        prop="companyNo"
                        sortable
                        label="企业编号">
                    </el-table-column>
                    <el-table-column
                        label="投标文件">
                        <el-table-column
                            prop="tenderDocuments_decode"
                            label="解密状态"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="tenderDocuments_import"
                            label="导入状态"
                            width="120">
                        </el-table-column>

                    </el-table-column>
                    <el-table-column
                        label="工程清单文件">
                        <el-table-column
                            prop="billFile_decode"
                            label="解密状态"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="billFile_import"
                            label="导入状态"
                            width="120">
                        </el-table-column>

                    </el-table-column>
                    <el-table-column
                        prop="nadmi_reason"
                        label="不予受理">
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
            <!--从本地导入-->
            <my-popup style="display: none"
                modal-title="从本地导入"
                ok-btn="导 入"
                cancel-btn="取 消"
                @on-ok="ok('bendidaorutopbiao')"
                @on-cancel="cancel"
                class="PopupCommon_2">
                <div slot="modal-content">
                    <el-form :model="ruleForm"
                             size="medium"
                             :rules="rules"
                             ref="ruleForm"
                             label-width="120px"
                             class="demo-ruleForm"
                             style="margin-top: 20px">
                        <el-form-item label="文件类型">
                            <el-radio-group v-model="radio_1">
                                <el-radio v-for="radio_t in radio_1_type" :label="radio_t" :key="radio_t">
                                    {{radio_t}}
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="文件：">
                                    <el-input v-model="ruleForm.val" class="input_w" placeholder="选择文件"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-form-item>
                                <el-button type="primary" class="b-c-5 search_bnt" style="margin: 0 20px">
                                    <el-upload
                                        class="upload"
                                        :show-file-list="false"
                                        multiple
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        :on-error="uploadError"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload">
                                        浏&nbsp;览
                                    </el-upload>
                                </el-button>
                            </el-form-item>

                        </el-row>
                    </el-form>
                </div>
            </my-popup>

            <!--不予受理-->
            <my-popup modal-title="不予受理"  style="display: none" class="buyushouliPopup">
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
                            <el-button class="btn blue" type="primary" @click="submitForm_2('byslruleForm')">确&nbsp;定
                            </el-button>
                            <!--<el-button class="btn" @click="resetForm('byslruleForm')">重&nbsp;置</el-button>-->
                            <el-button class="btn" @click="popupClose()">取&nbsp;消</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </my-popup>
        </div>
    </div>
</template>

<script>
    import myPopup from './../common/popup.vue';
    const radio_1_type = ['招标文件', '工程清单文件', '控制清单文件', '答疑补充文件'];
    const buyushouli_reason = ['不满足招标要求', '无法导入投标文件', '无法揭秘投标文件', '其他'];
    export default {
        name: "daoRuTouBiaoWenJian",
        data:function() {
            return {
                title: "3：  导入投标文件",
                annotation: "（注：如果不是现场解密，请先远程解密后再导入。）",
                step: '3/5',
                nextStep_link: '/flowPath/changBiao',
                type: "",
                byslruleForm: {
                    buyushouli_c: ['其他'],//默认选择
                    buyushouli_reason_text: '',
                },
                drtbwj_1_first: localStorage.getItem('drtbwj_1_first'),
                buyushouli_reason: buyushouli_reason,


                radio_1_type: radio_1_type,
                radio_1: '招标文件', //默认选择
                upFile: '',
                ruleForm: {
                    val: ''
                },
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

                daoRuTouBiaoWenJian: [{
                    "UUID": 1,
                    "companyName": "天马科技",
                    "companyNo": "5940389509480",
                    "tenderDocuments_decode": "已解密",  //投标文件 解密状态
                    "tenderDocuments_import": "已导入",   //投标文件 导入状态
                    "billFile_decode": "已解密",         //工程清单文件 解密状态
                    "billFile_import": "已导入",          //工程清单文件 导入状态
                    "nadmi_reason": "不受理 - 无法解密投",
                }],
                table_box_h: 250, //表格高度
                page: {
                    pageNo: 1,//默认开始页面
                    pageSize: 10, //每页的数据条数
                    pageSizesList: [5, 7, 10, 15, 30, 500],
                    totalDataNumber: 0,//数据的总数,
                },
            }
        },
        components:{
            myPopup
        },
        methods: { //可以直接通过 VM 实例访问这些方法
            nextStep() {
                let href = this.nextStep_link;
                localStorage.setItem('step_1', 2);
                localStorage.setItem('step_2', 2);
                localStorage.setItem('step_3', 2);
                localStorage.setItem('step_4', 1);
                this.$router.replace({path: href});
            },
            annotation_close(num) {  //导视关闭
                this.drtbwj_1_first = !this.drtbwj_1_first;
                localStorage.setItem('drtbwj_1_first', 1);
            },
            onSubmit() { //点击搜索按钮
                //console.log('submit!');
            },
            init() {
                sessionStorage.setItem('vue_name', "daoRuTouBiaoWenJian");
                window.onresize();
                this.setstep();
                localStorage.setItem('step_current', 3); //设置当前到达第几步
            },
            buyushouli_bnt() {
                //console.log("123");
                let $dom = $(".buyushouliPopup");
                this.popupOpen($dom)
            },
            cancel() {

            },
            daoruCommand(command) {
                //console.log(command);
                if (command == "a") {

                } else if (command == "c") {
                    //console.log("本地");
                    // 打开弹窗
                    let $dom = $(".PopupCommon_2");
                    this.popupOpen($dom)
                }
            },
            //上传
            uploadError() {
                this.$message.error('上传失败，请重新上传')
            },
            handleAvatarSuccess(res, file) {
                //console.log(res, file)
            },
            submitForm_2(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            ok(t) {
                //console.log("777777");
                if (t == "bendidaorutopbiao") {
                    //console.log("本地导入上传");
                    let file = this.upFile;

                    if(file.name==undefined||file.name==''){

                        this.$alert('请点击 浏览 按钮选择导入文件', '本地文件上传提示', {
                            confirmButtonText: '确定',
                            callback: action => {

                            }
                        });
                        return
                    }

                    //console.log(file);
                    let uid = file.uid;
                    let fileName = file.name;
                    let fileType = this.radio_1;
                    let status = "已上传";
                    let importTime = this.getNowFormatDate(); //调用公用方法 获取当前时间

                    this.popupClose(); //关闭弹窗
                    return
                    let newJson = '{"UUID":"' + uid + '","fileName":"' + fileName + '","status":"' + status + '","importTime":"' + importTime + '","fileType":"' + fileType + '"}';
                    this.daoRuZhaoBiaoWenJian.unshift(JSON.parse(newJson));
                    this.page.totalDataNumber += 1; //数据总数加1

                    return
                    //上传到服务器
                    this.axios.post("utl", file).then((res) => {
                        if (res.data.code == 200) {
                            this.$message({
                                message: "上传成功",
                                type: 'success'
                            })
                            setTimeout(() => {

                            }, 1000)
                        } else if (res.data.code == 401) {
                            this.$message({})
                            setTimeout(() => {

                            }, 400)
                        } else {
                            this.$message({
                                message: res.data.msg,
                                type: 'error'
                            })
                        }
                    })
                    return false;
                }
                else if (t == "buyushouli_tc") {
                    //console.log("不予受理 导入");
                    //console.log("不予受理 原因："+this.buyushouli_c)
                }

                this.popupClose(); //关闭弹窗
            },
            beforeAvatarUpload(file) {
                //console.log(file);
                this.upFile = file;
                let fileName = file.name;
                this.ruleForm.val = fileName;
                //console.log(this.ruleForm.val);
            },
            //表格 分页
            //改变每页显示数量
            handleSizeChange(val) {
                var pageSize = `${val}`;
                this.page.pageSize = parseInt(pageSize);
            },
            //改变页码
            handleCurrentChange(val) {

            },
        },
        created() {
            console.log("created");
        },
        beforeDestroy() {
            //console.log("beforeDestroy");
            sessionStorage.removeItem('vue_name');
        },
        beforeCreate() {
            //console.log("beforeCreate");
        },
        mounted() {
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
                let daoRuTouBiaoWenJian = [{}];
                vm.$ajax({
                    method: 'get',
                    url: "/static/data/daoRuTouBiaoWenJian.json",
                    data: {}
                }).then(response => {
                    console.log(response.data);
                    daoRuTouBiaoWenJian = response.data;
                    this.daoRuTouBiaoWenJian = daoRuTouBiaoWenJian;
                    // 分页部分
                    vm.page.totalDataNumber = response.data.length;//设置数据总数目！！！
                }).catch(function (err) {
                    //console.log(err)
                });

            })
        },
        computed: { //computed是在HTML DOM加载后马上执行的，如赋值；

        }
    }
</script>

<style scoped>

</style>
