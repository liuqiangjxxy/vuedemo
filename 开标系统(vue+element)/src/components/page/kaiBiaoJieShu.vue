<template>
    <div>
        <div class="firstTitle">
            <div class="fl">
                <span class="title">{{title}}</span>
                <span class="annotation">{{annotation}}</span>
            </div>
            <!--<div class="fr">-->
            <!--<span class="step">{{step}}</span>-->
            <!--<div class="upAndDown">-->
            <!--<a class="larr b-r-4 f-c-5"><i class="iconfont icon-zuojiantou1"></i>上一步</a>-->
            <!--&lt;!&ndash;<a class="rarr f-c-5" @click="nextStep">下一步<i class="iconfont icon-youjiantou1"></i></a>&ndash;&gt;-->
            <!--</div>-->
            <!--</div>-->
        </div>



        <div class="m-t_20 main_1_box">
            <div class="subTitle">
                <span class="subTitle_t">
                   开标报告
                </span>
                <el-button type="primary">
                    打印开标报告
                </el-button>
            </div>

            <el-table
                :data="bidEndData"
                align="center"
                header-align="center"
                style="width: 100%">
                <el-table-column
                    align="center"
                    header-align="center"
                    prop="numberOfBidEnterprises"
                    label="投标企业数(家)"
                >
                </el-table-column>
                <el-table-column
                    align="center"
                    header-align="center"
                    prop="NumberOfEnterprisesAccepted"
                    label="受理企业数(家)"
                >
                </el-table-column>
                <el-table-column
                    align="center"
                    header-align="center"
                    prop="NumberOfEnterprisesNotAccepted"
                    label="不受理企业数(家)">
                </el-table-column>
            </el-table>

            <div style="text-align: center;margin-right: 120px;" class="m-t_20">
                <el-button class="btn blue" :disabled="bidOpening" type="primary" @click="bidOpeningReport()">{{bidOpening_text}}
                </el-button>
                <el-button class="btn"  @click="endBidClick()" :disabled="endBid">结束开标</el-button>
            </div>


        </div>

    </div>
</template>

<script>
    export default {
        name: "kaiBiaoJieShu",
        data:function() {
            return {
                title: "5：开标结束",
                annotation: "（注：点击开标结束按钮以后，该表单开标完毕。）",
                step: '5/5',
                nextStep_link: '/chuShiYeMian',
                bidOpening: false,
                bidOpening_text:"打印开标报告",
                endBid: true,
                bidEndData: [{
                    numberOfBidEnterprises: 1100, //投标企业数(家)
                    NumberOfEnterprisesAccepted: 1000, //受理企业数(家)
                    NumberOfEnterprisesNotAccepted: 100, //不受理企业数(家)
                }]
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
            bidOpeningReport() {
                this.endBid = false;
                this.bidOpening = true;
                this.bidOpening_text='已打印开标报告';
            },
            endBidClick(){ //开标结束按钮
                console.log("开标结束");

                this.$confirm('确定结束该标段吗？', '确认信息', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确 定',
                    cancelButtonText: '取 消'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '标段开标结束已确定'
                    });
                    this.$confirm('是否选择新标段开标？', '选择新标段', {
                        confirmButtonText: '确 定',
                        cancelButtonText: '取 消',
                        type: 'warning'
                    }).then(() => {
                        //确定
                        this.getHref(this.nextStep_link);
                    }).catch(() => {
                        //取消

                    });

                }).catch(action => {

                });

            },
            init() {
                this.setstep()
            }
        },
        created() {
            console.log("created");
        },
        beforeCreate() {

            console.log("beforeCreate");
        },
        mounted() {
            console.log("mounted");
            this.$nextTick(function () {
                let vm = this;
                vm.init();
                //获取数据
                console.log("$nextTick");

            })
        },
        computed: { //computed是在HTML DOM加载后马上执行的，如赋值；

        }
    }
</script>

<style scoped>

</style>
