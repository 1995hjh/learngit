define(function(require){
    return productList = {
        ajaxstatus : true,
        pagesize : 5,
        currentPage : 0,
        pageNumber : 0,
        winH: $(window).height(),
        loadCanvas : function(){
            var imgsLength = $(".product").find("canvas").length;
            if(imgsLength > 0){
                $(".product").find("canvas").each(function(){
                    var imgSrc = $(this).data("src");
                    var imgObj = new Image();
                    var imgE = $(this)[0];
                    var cvs = imgE.getContext("2d");
                    if(cvs){
                        imgObj.onload = function(){
                            imgE.width = this.width;
                            imgE.height = this.height;
                            cvs.drawImage(this,0,0);
                            $(imgE).css("background-image","none");
                        }
                        imgObj.src = imgSrc;
                    }
                })
            }
        },
        scrollHandler : function(){
            var pageH = $(document).height();
            var scrollT = $(window).scrollTop();
            var minHeight = $(window).height();
            if((parseInt(minHeight) + parseInt(scrollT) + 50) >= parseInt(pageH) && productList.ajaxstatus){
                if($("#pageNumLength").val() == "1"){
                    productList.ajaxstatus = false;
                    productList.currentPage++;
                    productList.getData(productList.currentPage);
                }else{
                    return;
                }
            }
        },
        getData : function(pageNumber){
            $.ajax({
                type : 'get',
                url:"/wxshop/static/script/test.json",
                data : {
                    page : productList.pageNumber,
                    row : productList.pagesize
                },
                dataType : 'json',
                success : function(result){
                    $("#loaddiv").hide();
                    if(result.length > 0){
                        productList.ajaxstatus = true;
                        productList.insertDiv(result);
                        productList.loadCanvas();
                    }else{
                        $("#pageNumLength").val("0");
                    }
                },
                beforeSend: function () {
                    $("#loaddiv").show();
                },
                error: function () {
                    $("#loaddiv").hide();
                }
            });
        },
        insertDiv: function (json) {
            var $mainDiv = $("#scrollAdd");
            var html = '';
            var  showlength=5;
            if(json.length<5){
                showlength=json.length;
            }
            for (var i = 0; i < showlength; i++) {
                html += ' <li>'+
                    '<a href="#">'+
                    '<div class="triangle_topleft xiangou"></div>'+
                   '<span class="shuxing" data-url="allproduct.html">限购</span>'+
                    '<div class="leftImages fl">'+
                    '<canvas data-src="images/product/product1.png" alt=""></canvas>'+
                    '</div>'+
                    '<div class="content_pro fr">'+
                    '<p class="ptitle pl10">广联达变更算量</p>'+
                    '<p class="pdes pl10">简介这里简介这里简介这里简介这里简介这里简介这里简介这里简介介这里简介</p>'+
                    '<p class="pprice pl10">价格：<span class="green">￥5000</span></p>'+
                    '</div>'+
                    '</a>'+
                    '</li>';
            }
            $mainDiv.append(html);
        },
        add : function(){
            var value = parseInt($(this).prev().val());
            if(!isNaN(value)){
                if(value < 1){
                    value = 1;
                }else{
                    value += 1;
                }
            }else{
                value = 1;
            }
            $(this).prev().val(value);
        },
        reduce : function(){
            var value = parseInt($(this).next().val());
            if(!isNaN(value)){
                if(value <= 1){
                    value = 1;
                }else{
                    value -= 1;
                }
            }else{
                value = 1;
            }
            $(this).next().val(value);
        },
        addCart : function(){
            var number = Number($('#cartnumbers').val());
            var productImg = $('#productimg'),
                imgSrc = $('#productimg').children("img").attr("src"),
                x = productImg.offset().left ,
                y = productImg.offset().top ,
                X = $("#nav_li2").offset().left,
                Y = $("#nav_li2").offset().top;
                if($('#flydiv').length <= 0){
                    $('body').append('<div id="flydiv"><img src="'+ imgSrc +'" width="50px" height="50px"/></div>')
                }
            var $obj=$('#flydiv');
            if(!$obj.is(':animated')){
                $obj.css({'left': x,'top': y}).animate({'left': X,'top': Y-80},500,function() {
                    $obj.stop(false, false).animate({'top': Y-20,'opacity':0},500,function(){
                        $obj.fadeOut(300,function(){
                            $obj.remove();
                            var num=Number($(".cartnums").text());
                            $(".cartnums").text(num+number);
                            $(".cartnums").show();
                        });
                    });
                });
            };
        },
        set_address : function(){
            var addr_id = $("input[name='address']:checked").val();
            if(addr_id == 0)
            {
                $('#address_form').show();
            }
            else
            {
                $('#address_form').hide();
            }
        },
        address_change:function(){
            var name = $(this).parents("ul").find(".uname").text();
            var phone = $(this).parents("ul").find(".uphone").text();
            var allAddress = $(this).parents("ul").find(".uaddress").html();
            var addressArray = allAddress.split("&nbsp;");
            var s1 = addressArray[0];
            var s2 = addressArray[1];
            var s3 = addressArray[2];
            var addressinfo = addressArray[3];
            $("#name").val(name);
            $("#sheng").val(s1);
            $("#sheng").trigger("change");
            $("#shi").val(s2);
            $("#shi").trigger("change");
            $("#qu").val(s3);
            $("#addr").val(addressinfo);
            $("#tel").val(phone);
            $("input[type='text']").css("color","#000");
        },
        saveInfo:function(){
            var name = $("#name").val();
            var phone = $("#tel").val();
            var s1 = $('#sheng').val();
            var  s2 = $('#shi').val();
            var s3 = $('#qu').val();
            var address = $('#addr').val();
           // alert(name + "==" +phone + "=="+s1 + "=="+s2 + "=="+s3 + "=="+address);
            var addresslistHtml ='<ul class="user_addr">'+
                '<li><p><label class="uname">'+name+'</label>(<label class="uphone">'+phone+'</label>)</p>'+
            '<p class="uaddress">'+s1+'&nbsp;'+s2+'&nbsp;'+s3+'&nbsp;'+address+'</p></li>'+
            '<li>'+
                '<span class="edit"><img src="images/edit.png" alt="">&nbsp;&nbsp;编辑</span>'+
            '<span class="del"><img src="images/del.png" alt="">&nbsp;&nbsp;删除</span>'+
                '</li>'+
               '</ul>';
            if($.trim(name)!="" && $.trim(phone)!="" && $.trim(s1)!="" && $.trim(address)!=""){
                $("#address").append(addresslistHtml);
                productList.clearAddress();
            }
        },
        clearAddress : function(){
            $("#name").val("");
            $("#tel").val("");
            $("#sheng").val("");
            $("#shi").val("");
            $("#qu").val("");
            $("#addr").val("");
        },
        login : function(){
            var name = $("#login_userName").val();
            var pwd = $("#login_Password").val();
            var flag = true;
            if($.trim(name)== ""){
                $("#login_userName").next("s").css("display","inline-block");
                flag = false;
                return flag;
            }else{
                var reg = /^1[34578]\d{9}$/g;
                if(reg.test(name)){
                    $("#login_userName").next("s").hide();
                }else{
                    $("#login_userName").next("s").css("display","inline-block");
                    flag = false;
                    return flag;
                }
            }
            if($.trim(pwd) == ""){
                $("#login_Password").next("s").css("display","inline-block");
                flag = false;
                return flag;
            }else{
                $("#login_Password").next("s").hide();
            }
            if(flag){
                alert("ajax提交");
            }
        }
    }
});