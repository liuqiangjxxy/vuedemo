<template>
    <div class="daoRuZhaoBiaoWenJian">
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

        <div class="main_1_box">
            <div class="subTitle">
                <span class="subTitle_t">
                    2.1、导入招标文件
                </span>

                <el-dropdown placement="bottom-start" @command="handleCommand" class="p-r" :hide-timeout="400">
                    <el-button type="primary">
                        导入<i class="iconfont icon-sanjiao"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a">
                            平台导入
                        </el-dropdown-item>
                        <el-dropdown-item command="b">
                            本地导入
                        </el-dropdown-item>
                    </el-dropdown-menu>

                    <div class="annotation_box" :class="{'hide':drzbwj_1_first}">
                        <div class="annotation_c">
                            <div class="annotation_close " @click="annotation_close(1)">&times;</div>
                            <div class="annotation_text">
                                可以从平台导入投标文件，也可以从本地电脑导入
                            </div>
                        </div>
                    </div>
                </el-dropdown>
            </div>

            <div class="table_box">
                <el-table :data="daoRuZhaoBiaoWenJian.slice((page.pageNo-1)*page.pageSize,page.pageNo*page.pageSize)"
                          :height="table_box_h"
                          :row-key="daoRuZhaoBiaoWenJian.UUID"
                          :default-sort="{prop: 'closingTime,startTime', order: 'enterprisesNumber'}"
                          border
                          style="width: 100%">
                    <el-table-column
                        prop=""
                        label="选择"
                        width="80">
                        <template slot-scope="scope">
                            <div type="text" class="radio_click b-7 b-c-9"
                                 @click="deleteData(scope.$index,scope.row.UUID,daoRuZhaoBiaoWenJian)">
                                清&nbsp;除
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        type="index"
                        label="序号"
                        width="60">
                    </el-table-column>
                    <el-table-column
                        prop="fileName"
                        label="文件名称"
                        width="300">
                    </el-table-column>
                    <el-table-column
                        prop="status"
                        label="状态">
                    </el-table-column>
                    <el-table-column
                        prop="importTime"
                        sortable
                        label="导入时间">
                    </el-table-column>
                    <el-table-column
                        prop="fileType"
                        sortable
                        label="文件类型">
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

            <div class="subTitle">
                <span class="subTitle_t">
                    2.2、设置评标参数
                </span>
                <el-button type="primary">
                    保存评标参数
                </el-button>
            </div>
            <div class="list_1">
                <el-row>
                    <el-col :span="3">
                        <div class="title">行业类别：</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="details">
                            <p class="">制造业</p>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class="title">招标方式：</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="details">
                            <p class="">公开招标</p>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">
                        <div class="title">项目类别：</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="details">
                            <p class="">投标项目 </p>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class="title">评标办法：</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="details">
                            <p class="">现场评标</p>
                        </div>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="3">
                        <div class="title"></div>
                    </el-col>
                    <el-col :span="19">
                        <div class="details">
                            <p class="">
                                <el-form :model="checked_array" :rules="rules" ref="checked_array" label-width="0" class="">
                                    <el-form-item label="" prop="checked_v">
                                        <el-checkbox-group v-model="checked_array.checked_v">
                                            <el-checkbox v-for="checkbox_t in checked_array.checkbox_type"
                                                         :label="checkbox_t" :key="checkbox_t">
                                                {{checkbox_t}}
                                            </el-checkbox>
                                        </el-checkbox-group>
                                    </el-form-item>
                                </el-form>
                            </p>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>

        <!--弹窗部分-->
        <div class="popup_box">
            <!--从本地导入-->
            <my-popup
                modalTitle="从本地导入"
                ok-btn="导 入"
                cancel-btn="取 消"
                @on-ok="ok('bendidaorushangchuan')"
                @on-cancel="cancel"
                class="PopupCommon_1">
                <div slot="modal-content">
                    <el-form :model="ruleForm" size="medium" :rules="rules" ref="ruleForm" label-width="120px"
                             class="demo-ruleForm" style="margin-top: 20px">
                        <el-form-item label="文件类型：">
                            <el-radio-group v-model="radio_1">
                                <el-radio v-for="radio_t in radio_1_type" :label="radio_t" :key="radio_t">
                                    {{radio_t}}
                                </el-radio>
                                <!--<el-radio :label="1" >招标文件</el-radio>-->
                                <!--<el-radio :label="2">工程清单文件</el-radio>-->
                                <!--<el-radio :label="3">控制清单文件</el-radio>-->
                                <!--<el-radio :label="4">答疑补充文件</el-radio>-->
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
        </div>
    </div>
</template>

<script>
    import myPopup from './../common/popup.vue';
    const checkbox_type = ['存在招标控制价', '存在工程量请单', '排名评标结果', '设置评审权重', '价格评审', '设置双信封评审'];
    const radio_1_type = ['招标文件', '工程清单文件', '控制清单文件', '答疑补充文件'];
    export default {
        name: "daoRuZhaoBiaoWenJian",
        data:function() {
            return {
                title: "2：  导入招标文件",
                annotation: "（注：请先导入投标文件，再设置评标参数。）",
                step: '2/5',
                nextStep_link: '/flowPath/daoRuTouBiaoWenJian',
                drzbwj_1_first: localStorage.getItem('drzbwj_1_first'),

                checked_array: {
                    checked_v: ['存在招标控制价'],//默认选择
                    checkbox_type: checkbox_type,
                },


                radio_1_type: radio_1_type,
                radio_1: '招标文件', //默认选择
                upFile: '',
                ruleForm: {
                    val: ''
                },
                daoRuZhaoBiaoWenJian: [
                    {
                        UUID: 1, //UUID 唯一性
                        fileName: "", //文件名称
                        status: "",//状态
                        importTime: "",//导入时间
                        fileType: "" //文件类型
                    }
                ],
                table_box_h: 250,
                page: {
                    pageNo: 1,//默认开始页面
                    pageSize: 4, //每页的数据条数
                    pageSizesList: [4, 6, 8, 10, 12, 500],
                    totalDataNumber: 0,//数据的总数,
                },
                rules: {
                    checked_v: [
                        {type: 'array', required: true, message: '请至少选择一个文件类型', trigger: 'change'}
                    ]
                }
            }
        },
        components:{
            myPopup
        },
        methods: { //可以直接通过 VM 实例访问这些方法
            deleteData($index, dataUUID, data) { //清除 导入招标文件
                //console.log($index);
                //console.log(dataUUID);
                //console.log(data);
                this.page.totalDataNumber -= 1; //数据总数减一1
                data.splice($index, 1);
                return
                //后端开发 数据库 同步  数据  $ajax
            },

            cancel() {
                //console.log("点击取消1111");
            },
            nextStep() { //点击下一步
                let href = this.nextStep_link;
                localStorage.setItem('step_1', 2);
                localStorage.setItem('step_2', 2);
                localStorage.setItem('step_3', 1);
                this.$router.replace({path: href});
            },
            annotation_close(num) {  //导视关闭
                console.log(num);
                // this.qdbd_first = !this.qdbd_first;
                if (num == 1) {
                    localStorage.setItem('drzbwj_1_first', 1);
                    this.drzbwj_1_first = !this.drzbwj_1_first;
                } else if (num == 2) {
                    localStorage.setItem('drzbwj_2_first', 1)
                }
            },
            handleCommand(command) {
                console.log(command);
                if (command == "a") {
                    console.log("平台导入");
                } else if (command == "b") {
                    console.log("本地");
                    // 打开弹窗
                    let $dom = $(".PopupCommon_1");
                    this.popupOpen($dom)
                }
            },
            init() { //初始设置
                sessionStorage.setItem('vue_name', "daoRuZhaoBiaoWenJian");
                window.onresize();
                this.setstep();
                localStorage.setItem('step_current', 2); //设置当前到达第几步
            },
            //上传
            uploadError() {
                this.$message.error('上传失败，请重新上传')
            },
            handleAvatarSuccess(res, file) {
                //console.log(res,file)
            },

            ok(t) {
                //console.log("777777");
                if (t == "bendidaorushangchuan") {
                    //console.log("本地导入上传");
                    let file = this.upFile;
                    //console.log(file.name);
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
                    let newJson = '{"UUID":"' + uid + '","fileName":"' + fileName + '","status":"' + status + '","importTime":"' + importTime + '","fileType":"' + fileType + '"}';
                    this.daoRuZhaoBiaoWenJian.unshift(JSON.parse(newJson));
                    this.page.totalDataNumber += 1; //数据总数加1
                    this.popupClose(); //关闭弹窗
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
            },
            beforeAvatarUpload(file) {
                //console.log(file);
                this.upFile = file;
                let fileName = file.name;
                this.ruleForm.val = fileName;
                console.log(this.ruleForm.val);
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
            //设置表格高度
            //获取 table_box_h
            window.onresize = () => {
                let $dome = $(".table_box");
                this.table_box_h = this.getTableaH($dome);
            };
            //获取 导入招标文件 数据
            this.$nextTick(function () {
                let vm = this;
                vm.init();
                //vm.page.total = 10;//设置数据总数目！！！
                let daoRuZhaoBiaoWenJian = [{}];
                vm.$ajax({
                    method: 'get',
                    url: "/static/data/daoRuZhaoBiaoWenJian.json",
                    data: {}
                }).then(response => {
                    //console.log(response.data);
                    daoRuZhaoBiaoWenJian = response.data;
                    this.daoRuZhaoBiaoWenJian = daoRuZhaoBiaoWenJian;
                    // 分页部分
                    vm.page.totalDataNumber = response.data.length;//设置数据总数目！！！
                }).catch(function (err) {
                    //console.log(err)
                });
            })

        },
        computed: { //computed是在HTML DOM加载后马上执行的，如赋值；

        },
        watch: {}
    }
</script>

<style scoped>
    .daoRuZhaoBiaoWenJian {

    }
</style>
