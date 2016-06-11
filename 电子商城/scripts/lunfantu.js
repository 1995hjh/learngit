/**
 * Created by jh on 2016/5/31.
 */
var t = n = 0,count;
$(document).ready(function(){
    /*获取a标签的个数*/
    count = $("#banner_list a").length;
    $("#banner_list a:not(:first-child)").hide();
    $("#banner_info").html($("#banner_list a:first-child").find("img").attr('alt'));
    $("#banner li:first-child").attr("class","on");
    $("#banner_info").click(function(){
        window.open($("#banner_list a:first-child").attr('href'),'_blank');
    });
    $("#banner li").click(function(){
        var i = $(this).text() - 1;
        n = i;
        if(i >= count){
            return;
        }
        $("#banner_info").html($("#banner_list a").eq(i).find("img").attr('alt'));
        $("#banner_info").unbind().click(function(){
            window.open($("#banner_list a").eq(i).attr('href'),'_blank');
        });
        $("#banner_list a").filter(":visible").fadeOut(500).parent().children().eq(i).fadeIn(1000);
        document.getElementById("banner").style.background = "";
        $(this).toggleClass("on");
        $(this).siblings().removeAttr("class");
    });
});
t = setInterval("autoShow()",2000);
$("#banner").hover(function(){
    clearInterval(t)
},function(){
    t = setInterval("autoShow()",2000);
});
function autoShow(){
    n = n >= (count - 1) ? 0 : ++n;
    $("#banner li").eq(n).trigger('click');
}