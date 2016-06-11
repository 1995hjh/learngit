/**
 * Created by jh on 2016/6/3.
 */
$(function(){
    $(".info_2").hide();
    $(".info_3").hide();
    $(".info_4").hide();
    $(".info_5").hide();
    /*将背景色保存到属性中*/
    $(".quotation_table tr:even").attr("bg","#F5F5F5");
    $(".quotation_table tr:odd").attr("bg","#fff");
    /*鼠标移动到上面显示浅蓝色*/
    $(".quotation_table tr td").mouseover(function(){
        $(this).parent().find("td").css("background-color","#d5f4fe");
    });
    /*鼠标离开表格上移动行时,离开的那一行背景恢复*/
    $(".quotation_table tr td").mouseout(function(){
        var bgc = $(this).parent().attr("bg");
        $(this).parent().find("td").css("background-color",bgc);
    });
    /*表单验证*/
    var demo = $(".register_form").Validform({
        tiptype:3,
        label:".label",
        showAllError:true,
        datatype:{
            "zh1-6":/^[\u4E00-\u9FA5\uf900-\ufa2d]{1,6}$/
        }
       // ajaxPost:true
    });
    //通过$.Tipmsg扩展默认提示信息;
    //$.Tipmsg.w["zh1-6"]="请输入1到6个中文字符！";
    demo.tipmsg.w["zh1-6"]="请输入1到6个中文字符！";
    demo.addRule([{
            ele:".inputxt:eq(0)",
            datatype:"*2-16"
        },
        {
            ele:".inputxt:eq(1)",
            datatype:"*6-20"
        },
        {
            ele:".inputxt:eq(2)",
            datatype:"*6-20",
            recheck:"userpassword"
        },
        {
            ele:".inputxt:eq(3)",
            datatype:"e"
        }
    ]);
    var demo1 = $("#pay_from").Validform({
        tiptype:3,
        label:".label",
        showAllError:true,
        datatype:{
            "zh1-6":/^[\u4E00-\u9FA5\uf900-\ufa2d]{1,6}$/
        }
        // ajaxPost:true
    });
    demo1.tipmsg.w["zh1-6"]="请输入1到6个中文字符！";
    demo1.addRule([{
            ele:".pay:eq(0)",
            datatype:"*6-16"
        },
        {
            ele:".pay:eq(1)",
            datatype:"m"
        },
        {
            ele:".pay:eq(2)",
            datatype:"e"
        },
        {
            ele:".pay:eq(3)",
            datatype:"*6-50"
        },
        {
            ele:".pay:eq(4)",
            datatype:"p"
        }
    ]);
    /*页面加载时,初始化购物车价格统计*/
    totalPrices();
});
function changeImgs() {
    var ele = $("#big_src");
    ele.attr("src",event.srcElement.src);
}
function displayObj(id){
    var ele = $("#" + id);
    ele.show();
}
function hiddenObj(id){
    var ele = $("#" + id);
    ele.hide();
}
/*初始化放大镜图片*/
function initImg(){
    var ele = $("#targetImg");
    ele.attr("src",event.srcElement.src);
}
function move(){
    displayObj("fdj");
    initImg();
    /*获取放大镜图片*/
    var ele = $("#targetImg");
    /*获取鼠标相对位移*/
    var offx = ele.width() / event.srcElement.width;
    var offy = ele.height() / event.srcElement.height;
    /*获取放大镜的div对象*/
    var div = $("#fdj");
    /*重新设置容器的滚动条*/
    div.scrollLeft(event.offsetX * offx);
    div.scrollTop(event.offsetY * offy);
}
function out(){
    hiddenObj("fdj");
}
function showDiv(num){
    $(".p_js").hide();
    $(".info_" + num).show();
}
function totalPrices(){
    /*购物车统计功能的实现*/
    $(".sp_dj").each(function(){
        var price = $(this).text();
        var num = $(this).parent().parent().children("td").find("input").val();
        $(this).parents("tr").children("td").find(".small_total").text(price * num);
    });
    var total = 0.00;
    var rows = 0;
    $(".small_total").each(function(index,element){
        total = total + parseFloat($(this).text());
        rows++;
        $("#count").text(rows);
        $(".total").text(total);
    });
}