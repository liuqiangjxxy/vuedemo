<template>
    <div class="modal">
        <div class="modal-header">
            <h4>{{ modalTitle }}</h4>
            <i class="iconfont icon-55 pop-up-close" @click="cancelHandle"></i>
        </div>
        <div class="modal-content">
            <div>
                <slot name="modal-content">内容区域</slot>
            </div>
        </div>
        <div class="modal-footer" :class="{footer_hide:bntIsYN}">
            <input class="btn blue" type="button" v-model="okBtn" @click="okHandle"/>
            <input class="btn" type="button" v-model="cancelBtn" @click="cancelHandle"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "popup",
        data: function () {
            return {}
        },
        props: {
            modalTitle: {
                type: String,
                default: '标题区域'
            },
            okBtn: {
                type: String,
                default: '确认'
            },
            cancelBtn: {
                type: String,
                default: '取消'
            },
            bntIsYN:{
                default:false
            }
        },
        methods: {
            okHandle() {
                //console.log("点击确定");
                this.$emit("on-ok");
            },
            cancelHandle() {
                this.popupClose();
                //console.log("点击取消");
                this.$emit("on-cancel");
            }
        }
    }
</script>

<style scoped>

    .footer_hide{display: none;}
    /*弹窗部分*/
    .popup_box {
        position: fixed;
        z-index: 1000;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        /*width: 100%;*/
        /*height: 100%;*/
        background-color: rgba(0, 0, 0, 0.5);
        display: none;
    }

    .modal {
        position: fixed;
        z-index: 5000;
        /*width: 60%;*/
        max-width: 1200px;
        min-width: 900px;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        background-color: #FFFFFF;
        border-radius: 3px;
        /*overflow: hidden;*/
        overflow: auto;
    }

    .modal-header {
        background-color: #f8f8f8;
        position: relative;
        height: 53px;
        line-height: 53px;
        border-bottom: 1px solid #d3d3d3;
    }

    .modal-header h4 {
        display: block;
        margin: auto;
        height: 53px;
        padding-left: 30px;
        line-height: 53px;
        font-size: 18px;
        font-weight: 400;
        color: black;
    }

    .pop-up-close {
        color: #4274b2;
        transition: 0.7s;
    }

    .pop-up-close:hover {
        opacity: 0.8;
    }

    .pop-up-close {
        position: absolute;
        right: 30px;
        top: 11px;
        height: 30px;
        width: 30px;
        line-height: 30px;
        font-size: 35px;
        text-align: center;
        background-size: 100%;
        cursor: pointer;
        border-radius: 50%;
        z-index: 999999;
    }

    .modal-footer {
        padding: 15px;
        text-align: center;
        margin-bottom: 20px;
        /*border-top: 1px solid #e5e5e5;*/
    }

    .btn {
        border: 1px solid #d55757;
        border-radius: 3px;
        /*background-color: #f7f7f7;*/
        height: 35px;
        padding: 0 20px;
        cursor: pointer;
        /*line-height: 35px;*/
        display: inline-block;
        margin: 0 10px;
        outline: none;
        background-color: #d55757;
        transition: 0.7s;
        color: white;
    }

    .btn:hover {
        opacity: 0.8;
    }

    .blue {
        border: 1px solid #4588cd;
        background-color: #4588cd;
    }
</style>
