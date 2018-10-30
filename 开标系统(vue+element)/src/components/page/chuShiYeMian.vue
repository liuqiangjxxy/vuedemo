<template>
    <div class="wrapper">
        <v-head></v-head>
        <div class="content-box " :class="{'content-collapse':collapse}">
            <div class="content">
                <div class="csym">
                    <div class="csym_main_content">
                        <div class="csym_main_1 f-s-10 f-c-8">
                            <p><span>王涛</span>&nbsp;您好，欢迎登陆电子采购平台开标子系统！ </p>
                        </div>

                        <div class="csym_main_2"><img src="/static/img/procedure_title.png"></div>
                        <div class="csym_main_3">
                            <div class="procedure_b">
                                <div class="procedure_1">
                                    <div class="procedure_one f-c-6 f-s fixed-f-s-11">
                                        <p>1</p>
                                        <p>确定标段</p>
                                        <img src="/static/img/icon_cs_1.png">
                                    </div>
                                    <div class="procedure_two"></div>
                                </div>
                                <div class="procedure_2">
                                    <div class="procedure_one f-c-6 f-s fixed-f-s-11">
                                        <p>2</p>
                                        <p>导入招标文件</p>
                                        <img src="/static/img/icon_cs_2.png">
                                    </div>
                                    <div class="procedure_two procedure_y">
                                        <div>
                                            <span class="f-c-3 fixed-f-s-7">2.1 导入招标文件</span>
                                        </div>
                                        <div>
                                            <span class="f-c-3 fixed-f-s-7">2.2 设置评标参数</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="procedure_3">
                                    <div class="procedure_one f-c-6 f-s fixed-f-s-11">
                                        <p>3</p>
                                        <p>导入投标文件</p>
                                        <img src="/static/img/icon_cs_3.png">
                                    </div>
                                    <div class="procedure_two"></div>
                                </div>
                                <div class="procedure_4">
                                    <div class="procedure_one f-c-6 f-s fixed-f-s-11">
                                        <p>4</p>
                                        <p>唱标</p>
                                        <img src="/static/img/icon_cs_4.png">
                                    </div>
                                    <div class="procedure_two"></div>
                                </div>
                                <div class="procedure_5">
                                    <div class="procedure_one f-c-6 f-s fixed-f-s-11">
                                        <p>5</p>
                                        <p>开标结束</p>
                                        <img src="/static/img/icon_cs_5.png">
                                    </div>
                                    <div class="procedure_two procedure_y">
                                        <div>
                                            <span class="f-c-3 fixed-f-s-7">5.1 打印文件</span>
                                        </div>
                                        <div>
                                            <span class="f-c-3 fixed-f-s-7">5.2 结束开标</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="csym_main_4 f-s-9">
                            <p class="promp_text f-c-6">您还没有选择标段，请先
                                <a class="f-c-9" @click="getHref('/xuanZeBiaoDuan')">选择标段</a>再进行后续操作
                            </p>
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
        name: "chuShiYeMian",
        data:function() {
            return {
                tagsList: [],
                collapse: false
            }
        },
        methods: {
            // getHref(href) {
            //     this.$router.replace({path: href});
            // },
            init() {
                localStorage.setItem('step_1', 0);
                localStorage.setItem('step_2', 0);
                localStorage.setItem('step_3', 0);
                localStorage.setItem('step_4', 0);
                localStorage.setItem('step_5', 0);
                localStorage.setItem('step_current', 0);
            }
        },
        mounted() {
            this.init()
        },
        beforeCreate() {
            let step_current_s = localStorage.getItem('step_current_s');
            if (step_current_s == 1) {
                window.location.href = '#/xuanZeBiaoDuan';
            } else {
                localStorage.setItem('step_current_s', 1);
            }
        },
        components: {
            vHead
        },
        created() {
            bus.$on('collapse', msg => {
                this.collapse = msg;
            });

            // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
            bus.$on('tags', msg => {
                let arr = [];
                for (let i = 0, len = msg.length; i < len; i++) {
                    msg[i].name && arr.push(msg[i].name);
                }
                this.tagsList = arr;
            })
        }
    }
</script>
<style scoped>
    /* 初始页面 */
    .csym {
        width: 100%;
        height: 100%;
        z-index: 1;
        background: url("/static/img/bg.png");
        min-width: 1300px;
    }

    .csym_main_content {
        width: 100%;
    }

    .csym_main_1 {
        padding: 15px 25px;
        height: 25px
    }

    .csym_main_2 {
        padding: 15px 0 60px;
    }

    .csym_main_2 img {
        display: block;
        margin: auto;
        height: 46px;
    }

    .csym_main_3 {
        height: 420px;
        background: url("/static/img/csym_bj2.png") no-repeat center 80px;
        overflow: hidden;
    }

    .procedure_b {
        width: 1250px;
        margin: auto;
        height: 420px;
    }

    .procedure_b > div {
        width: 250px;
        display: inline-block;
        margin: 0;
        float: left;
        height: 500px;
    }

    .procedure_one {
        height: 195px
    }

    .procedure_one p {
        text-align: center;
        line-height: 30px;
    }

    .procedure_one img {
        padding-top: 48px;
        margin: auto;
        display: block;
    }

    .procedure_1 .procedure_one img {
        margin: auto 0 0 93px;
    }

    .procedure_5 .procedure_one img {
        margin: auto 0 0 105px;
    }

    .procedure_two {
        height: 185px;
        width: 220px;
        margin: auto;
        padding-top: 40px
    }

    .procedure_two.procedure_y {
        background: url("/static/img/dotted.png") no-repeat center 2px;
    }

    .procedure_two.procedure_y > div {
        width: 155px;
        height: 58px;
        line-height: 58px;
        margin: 34px auto 0;
        background: url("/static/img/boder-r.png") no-repeat center;
        background-size: 100% 100%;
        text-align: center;
    }

    .procedure_5 .procedure_two.procedure_y {
        margin: auto 20px;
    }

    .procedure_1 .procedure_two.procedure_y {
        background: url("/static/img/dotted.png") no-repeat 120px 2px;
    }

    .procedure_4 .procedure_two.procedure_y {
        background: url("/static/img/dotted.png") no-repeat 130px 2px;
    }

    .csym_main_4 {
        padding: 30px 25px;
        height: 25px;
    }

    .promp_text {
        text-align: center;
    }

    .content-box {
        margin-left: 0px;
        min-width: 1450px;
        padding: 0;
    }


</style>
