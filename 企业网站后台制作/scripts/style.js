/**
 * Created by jh on 2016/6/8.
 */
$(document).ready(function(){
    $(".zhandian").show().siblings().hide();
    //表单验证
    $(".login_btn").click(function(){
        var $name = $.trim($("input[name='u_name']").val());
        var $pwd = $.trim($("input[name='u_pwd']").val());
        var $v = $.trim($("input[name='u_v']").val());
        var string = "请输入";
        if($name == ''){
            $(".error").text(string + '账号!');
            $("input[name='u_name']").focus();
            return false;
        }
        if($name.length < 5){
            $(".error").text('账号不能小于5位!');
            $("input[name='u_name']").focus();
            return false;
        }
        if($pwd == ''){
            $(".error").text(string + '密码!');
            $("input[name='u_pwd']").focus();
            return false;
        }
        if($pwd.length < 6 || $pwd.length > 18){
            $(".error").text('密码长度为6-18位!');
            $("input[name='u_pwd']").focus();
            return false;
        }
        if($v == ''){
            $(".error").text(string + '验证码!');
            $("input[name='u_v']").focus();
            return false;
        }
        if($v.toLowerCase() != 'yjsf'){
            $(".error").text('验证码不正确!');
            $("input[name='u_v']").val("");
            $("input[name='u_v']").focus();
            return false;
        }
        $(".error").text('登录成功,请稍候!');
    });
    /*头部导航切换效果,主导航跟左侧导航的关联*/
    $("#menu li").click(function(){
        $(this).addClass("current_menu").siblings().removeClass("current_menu");
        var _id = $(this).index();
        $(".left_menu div").eq(_id).css('display','block').siblings("div").css('display','none');
    });
    /*左侧导航折叠效果*/
    $(".left_menu dt").click(function(){
        if(true == $(this).next().is(":visible")) {
            $(this).css('background-position', 'right -40px');
        }else{
            $(this).css('background-position', 'right 10px');
        }
        $(this).next().slideToggle("fast");
    });
    /*隐藏或显示左侧导航*/
    $("#nav_1").click(function(){
        var text =  $("#nav_1").text();
        var str_hide = "隐藏菜单";
        var str_show = "显示菜单";
        if(text == str_hide){
            $(".left_menu").hide();
            $("#nav_1 a").text(str_show);
            $("body").addClass("hideleftmenu").removeClass("showleftmenu");
        }else{
            $(".left_menu").show();
            $("#nav_1 a").text(str_hide);
            $("body").addClass("showleftmenu").removeClass("hideleftmenu");
        }
    });
    /*左侧导航的切换*/
    $(".left_menu dd li a").click(function(){
        var _link = $(this).attr('_link');
        $("#main").attr('src',_link);
        $(this).addClass('current_menu_left').parent().siblings().children().removeClass('current_menu_left');
        $(this).parents("dl").siblings().find("dd ul li a").removeClass('current_menu_left');
    });
    /*网站管理页面选项卡切换效果*/
    $(".website_btn").click(function(){
        $(this).addClass("current_website_btn").siblings().removeClass("current_website_btn");
        var _id = $(this).index();
        $(".qie_huan div").eq(_id).show().siblings().hide();
    });
    /*新闻中心时间*/
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var ri = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var timeString = year + "-" + month + "-" + ri +" "+ hours + ":" + minutes  + ":" + seconds;
    $(".Clock").text(timeString);
    /*栏目管理页面点击复选框全选效果*/
    $("#all").click(function(){
        if($(this).prop('checked')){
            $("tbody :checkbox").prop('checked',true);
        }else{
            $("tbody :checkbox").prop('checked',false);
        }
    });
    var ue = UE.getEditor('editor');
});