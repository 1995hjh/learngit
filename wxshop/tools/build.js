({
   baseUrl:"../static",
    dir:"../static-built",
    modules:[
        {
            name:"script/views/enterjs/mainconfig"
        }
    ],
    fileExclusionRegExp:/^(r|bulid)\.js$/,
    optimizeCss:'standard',
    removeCombined:true,
    paths : {
        jquery:"script/libs/jquery-2.1.4.min",
        swiper:"script/plugs/swiper-3.3.1.min",
        diqu:"script/views/js/diqu2",
        productList:"script/views/js/productList"
    }
})
