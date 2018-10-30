
export default {
    install: function (Vue, options) {

        Vue.prototype.getNowFormatDate = function () {

            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();

            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            if (m >= 0 && m <= 9) {
                m = "0" + m;
            }
            if (s >= 0 && s <= 9) {
                s = "0" + s;
            }
            var currentdate = year + "-" + month + "-" + strDate + " " + h + ':' + m + ":" + s;
            return currentdate
        };

        Vue.prototype.getTableaH = function ($dome) {
            var colHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            var vue_name = sessionStorage.getItem('vue_name');
            //console.log(vue_name);
            var table_box_h = 120;
            var table_box_Top = $dome.offset().top;

            if (vue_name == "daoRuZhaoBiaoWenJian") { //控制导入招标文件
                var styleName = localStorage.getItem('fontstyle');
                var residue_h = 320;
                if (styleName == "font-normal") {
                    residue_h = 320;
                } else {

                }
                table_box_h = colHeight - table_box_Top - residue_h;

            } else if (vue_name == "xuanZeBiaoDuan") {  //选择标段
                table_box_h = colHeight - table_box_Top - 140;
            } else if (vue_name == "daoRuTouBiaoWenJian") {  //选择标段
                table_box_h = colHeight - table_box_Top - 120;
            } else if (vue_name == "changBiao") {  //唱标
                table_box_h = colHeight - table_box_Top - 110;
            }

            if (table_box_h < 120) {
                table_box_h = 120;
            }
            return table_box_h;
        };

        Vue.prototype.setstep = function () {
            var step_1 = localStorage.getItem('step_1');
            var step_2 = localStorage.getItem('step_2');
            var step_3 = localStorage.getItem('step_3');
            var step_4 = localStorage.getItem('step_4');
            var step_5 = localStorage.getItem('step_5');
            if (step_1 == "0") {
                $(".step_1").attr("class", "step_1 notStarted");
            } else if (step_1 == "1") {
                $(".step_1").attr("class", "step_1 currentGeneration");
            } else if (step_1 == "2") {
                $(".step_1").attr("class", "step_1 completed");
            }
            if (step_2 == 0) {
                $(".step_2").attr("class", "step_2 notStarted");
            } else if (step_2 == 1) {
                $(".step_2").attr("class", "step_2 currentGeneration");
            } else if (step_2 == 2) {
                $(".step_2").attr("class", "step_2 completed");
            }
            if (step_3 == 0) {
                $(".step_3").attr("class", "step_3 notStarted");
            } else if (step_3 == 1) {
                $(".step_3").attr("class", "step_3 currentGeneration");
            } else if (step_3 == 2) {
                $(".step_3").attr("class", "step_3 completed");
            }
            if (step_4 == 0) {
                $(".step_4").attr("class", "step_4 notStarted");
            } else if (step_4 == 1) {
                $(".step_4").attr("class", "step_4 currentGeneration");
            } else if (step_4 == 2) {
                $(".step_4").attr("class", "step_4 completed");
            }
            if (step_5 == 0) {
                $(".step_5").attr("class", "step_5 notStarted");
            } else if (step_5 == 1) {
                $(".step_5").attr("class", "step_5 currentGeneration");
            } else if (step_5 == 2) {
                $(".step_5").attr("class", "step_5 completed");
            }
        }


        Vue.prototype.popupClose = function () {
            $(".modal").hide();
            $(".popup_box").hide();
        };

        Vue.prototype.popupOpen = function ($dom) {
            $($dom).show();
            $($dom).parents(".popup_box").show();
        };


        Vue.prototype.getHref = function (href) {
            this.$router.replace({path: href});
        };

    }
}




