<template>
    <div class="qdbd">
        <div class="firstTitle">
            <div class="fl">
                <span class="title">{{title}}</span>
                <span class="annotation">{{annotation}}</span>
            </div>
            <div class="fr">
                <span class="step">{{step}}</span>
                <div class="upAndDown">
                    <a class="larr b-r-4 f-c-5"><i class="iconfont icon-zuojiantou1"></i>上一步</a>
                    <a class="rarr f-c-5" @click="nextStep()">下一步<i class="iconfont icon-youjiantou1"></i></a>
                </div>
            </div>
        </div>

        <div class="main_1_box">
            <div class="list_1">
                <el-row>
                    <el-col :span="3">
                        <div class="title">标段名称：</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="details">
                            <p class="">{{queDingBiaoDuan.name}}</p>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class="title">标段编号：</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="details"><p>{{queDingBiaoDuan.number}}</p></div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">
                        <div class="title">截标时间：</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="details">
                            <p class="">{{queDingBiaoDuan.closingTime}}</p>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class="title">投标企业数：</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="details">
                            <p class="">{{queDingBiaoDuan.enterprisesNumber}}</p>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">
                        <div class="title">开标时间：</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="details">
                            <p>{{queDingBiaoDuan.startTime}}</p>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class="title">开标状态：</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="details"><p>{{queDingBiaoDuan.startStatus}}</p></div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">
                        <div class="title">开标人：</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="details">
                            <p>{{queDingBiaoDuan.bidOpeningPeople}}</p>
                        </div>
                    </el-col>
                </el-row>
            </div>

            <div class="button_box m-t_20">
                <a class="f-s-6 p-r"><span  @click="confirmTenders()">{{confirmTenders_txt}}</span>
                    <div class="annotation_box" :class="{'hide':qdbd_first}">
                        <div class="annotation_c">
                            <div class="annotation_close" @click="annotation_close">×</div>
                            <div class="annotation_text">
                                确认标段以后，标段正式

                                开标状态。
                            </div>
                        </div>
                    </div>
                </a>
            </div>

        </div>
    </div>

</template>

<script>
    export default {
        name: "queDingBiaoDuan",
        data:function() {
            return {
                title: "1：  确定标段",
                annotation: "（注：确认标段以后，该标段正式开标。）",
                step: '1/5',
                nextStep_sta:false,
                nextStep_link: '/flowPath/daoRuZhaoBiaoWenJian',
                confirmTenders_txt:'确定标段',
                qdbd_first: localStorage.getItem('qdbd_first'),
                queDingBiaoDuan: {
                    name: "",
                    number: "",
                    closingTime: "",
                    enterprisesNumber: '',
                    startTime: "",
                    startStatus: "",
                    bidOpeningPeople: ""
                }
            }
        },
        methods: { //可以直接通过 VM 实例访问这些方法
            annotation_close() {
                //console.log("1111");
                this.qdbd_first = !this.qdbd_first;
                localStorage.setItem('qdbd_first', 1)
            },
            nextStep() {
                if(this.nextStep_sta){
                    let href = this.nextStep_link;
                    localStorage.setItem('step_1', 2);
                    localStorage.setItem('step_2', 1);
                    this.$router.push({path: href});
                }else{
                    this.confirmTenders();
                }

            },
            confirmTenders(){
                if(this.nextStep_sta){
                    this.$confirm('取消确定选择该标段吗?', '取消确定标段提示', {
                        confirmButtonText: '确定取消',
                        cancelButtonText: '不取消',
                        type: 'warning'
                    }).then(() => {
                        //确定
                        this.nextStep_sta=false;
                        this.confirmTenders_txt="确定标段";
                        this.$message({
                            type: 'success',
                            message: '确定取消成功!'
                        });

                    }).catch(() => {
                        //取消
                        this.nextStep_sta=true;
                    });
                }else{
                    this.$confirm('确定选择该标段吗?', '确定标段提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        //确定
                        this.nextStep_sta=true;
                        this.confirmTenders_txt="取消确定标段";
                        this.$message({
                            type: 'success',
                            message: '确定成功!'
                        });

                    }).catch(() => {
                        //取消
                        this.nextStep_sta=false;
                    });
                }

            },
            init() {
                this.setstep();
                localStorage.setItem('step_current', 1); //设置当前到达第几步
            }
        },
        created() {
            //console.log("created");
        },
        beforeCreate() {
            //console.log("beforeCreate");
        },
        mounted() {
            //console.log("mounted");
            this.$nextTick(function () {
                let vm = this;
                vm.init();
                //获取数据
                let queDingBiaoDuan = [{}];
                //console.log("$nextTick");
                vm.$ajax({
                    method: 'get',
                    url: "/static/data/queDingBiaoDuan.json",
                    data: {}
                }).then(response => {
                    //console.log(response.data[0]);
                    queDingBiaoDuan = response.data[0];
                    this.queDingBiaoDuan = queDingBiaoDuan;
                }).catch(function (err) {
                    //console.log(err)
                });
            })
        },
        computed: {}
    }
</script>

<style scoped>
    .content-box {
        margin-left: 220px;

    }

</style>
