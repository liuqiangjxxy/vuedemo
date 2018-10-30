<template>
    <div class="changBiao">
        <div class="firstTitle">
            <div class="fl">
                <span class="title">{{title}}</span>
                <span class="annotation">{{annotation}}</span>
            </div>
            <!--<div class="fr">-->
                <!--<span class="step">{{step}}</span>-->
                <!--<div class="upAndDown">-->
                    <!--<a class="larr b-r-4 f-c-5"><i class="iconfont icon-zuojiantou1"></i>上一步</a>-->
                    <!--<a class="rarr f-c-5" @click="nextStep">下一步<i class="iconfont icon-youjiantou1"></i></a>-->
                <!--</div>-->
            <!--</div>-->
        </div>
        <div class="main_1_box" style="">
            <div class="subTitle">
                <span class="subTitle_t">
                    选择标段
                </span>
            </div>
            <div class="list_1">
                <el-row>
                    <el-col :span="3">
                        <div class="title">标段名称：</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="details">
                            <p class="">云南昆明第一小学机房建设项目第一标段</p>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class="title">标段编号：</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="details"><p>111111</p></div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">
                        <div class="title">截标时间：</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="details">
                            <p class="">2018-08-09 11:12:59</p>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class="title">投标企业数：</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="details">
                            <p class="">7</p>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">
                        <div class="title">开标时间：</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="details">
                            <p>2018-08-09 11:12:59</p>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class="title">开标状态：</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="details"><p>未开标</p></div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">
                        <div class="title">开标人：</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="details">
                            <p>王顺</p>
                        </div>
                    </el-col>
                </el-row>
            </div>

            <div class="subTitle m-t_20">
                <span class="subTitle_t">
                    唱标信息
                </span>
            </div>
            <div class="list_1">
                <el-row>
                    <el-col :span="3">
                        <div class="title">密封状态：</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="details">
                            <p class="">云南昆明第一小学机房建设项目第一标段</p>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class="title">企业编号：</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="details"><p>111111</p></div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">
                        <div class="title">报价(元)：</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="details">
                            <p class="">2018-08-09 11:12:59</p>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class="title">工期(天)：</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="details">
                            <p class="">7</p>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">
                        <div class="title">开标其他内容：</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="details">
                            <p>2018-08-09 11:12:59</p>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class="title">递交时间：</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="details">
                            <p>投标保证金(元)：</p>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">
                        <div class="title">投标保证金(元)：</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="details">
                            <p>王顺</p>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class="title">投标保证金到账时间：</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="details">
                            <p>王顺</p>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">
                        <div class="title">唱标状态：</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="details">
                            <p>王顺</p>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class="title">唱标时间：</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="details">
                            <p>王顺</p>
                        </div>
                    </el-col>
                </el-row>
            </div>

            <div class="subTitle m-t_20">
                <span class="subTitle_t">
                    受理信息
                </span>
            </div>
            <div class="list_1">
                <el-row>
                    <el-col :span="3">
                        <div class="title">不予受理：</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="details">
                            <p class="">云南昆明第一小学机房建设项目第一标段</p>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class="title">原因：</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="details"><p>111111</p></div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">
                        <div class="title">说明：</div>
                    </el-col>
                    <el-col :span="19">
                        <div class="details">
                            <p class="">2018-08-09 11:12:59</p>
                        </div>
                    </el-col>
                </el-row>
            </div>


            <div class="button_box m-t_20">
                <a class="f-s-6 p-r">
                    <span @click="getHref(nextStep_link)">返&nbsp;回</span>
                </a>
            </div>
        </div>

    </div>
</template>

<script>

    const buyushouli_reason = ['不满足招标要求', '无法导入投标文件', '无法揭秘投标文件', '其他'];
    export default {
        name: "changBiaoDetail",
        data:function() {
            return {
                //接受参数
                pk_refinfo:this.$route.query.pk_refinfo,
                title: "4：唱标",
                annotation: "（注：点击唱标按钮，系统会依次自动唱标。）",
                step: '4/5',
                nextStep_link: '/flowPath/changBiao',

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
            getParams () {

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
                sessionStorage.setItem('vue_name', "changBiaoDetail");
                window.onresize();
                console.log(this.$route)
            },

            onSubmit() { //点击搜索按钮
                //console.log('submit!');
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

        },
        computed: {}
    }
</script>

<style scoped>

</style>
