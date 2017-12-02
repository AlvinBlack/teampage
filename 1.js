
/********************************导航条****************************/
var navEleId = "#navtemplate";
var childrenClassName = "navitem";
var navEleData = [
    ["团队概述","productoverview","active"],
    ["成员介绍","productadvantage","inactive"],
    ["职业技能","productfunction","inactive"],
    ["成果展示","applicationscene","inactive"],
    // ["相关链接","helpdocument","inactive"],
];
var navReplaceStr = ["{{itemcontent}}","{{linkid111}}","{{isactive}}"];
renderDom(navEleId, navEleData, navReplaceStr);
// activeListen(navEleId,childrenClassName);



/********************************高超高超***********************l****/
var advantageId = "#advantagetemplate";
var childrenClassName = "advantageitem";
var advantageData = [
    ["刘尚宇","./image/liu.jpg","http://shangyuliu.postach.io","https://github.com/ironlionliu","https://ironlionliu.github.io/index","active"],
    ["李玉川","./image/li.jpg","http://alvinblack.postach.io","https://github.com/alvinblack","https://alvinblack.github.io/myhomepage","inactive"],
    ["张路姚","./image/zhang.jpg","http://zhangluyao.postach.io","https://github.com/imechzhangly","https://imechzhangly.github.io/index","inactive"],
    ["吕益航","./image/lv.jpg","http://benjaminpaul.postach.io","https://github.com/benjaminhang","https://benjaminhang.github.io/Resume","inactive"],
    ["程石磊","./image/cheng.jpg","http://chengshilei.postach.io","https://github.com/CSL551","to be done","inactive"]
];
var navReplaceStr = ["{{itemtitle}}","{{photourl}}","{{blogurl}}","{{giturl}}","{{mainurl}}","{{isactive}}"];
renderDom(advantageId, advantageData, navReplaceStr);
activeListen(advantageId,childrenClassName);


/********************************研究难点***************************/
var functionId = "#functiontemplate";
var childrenClassName = "functionitem";
var functionData = [
    ["网页布局","熟练掌握HTML，CSS，轻松实现任意页面效果","inactive"],
    ["页面交互","熟练掌握JavaScript，可以按要求完成页面交互","inactive"],
    ["Angular","掌握Angular框架，高效高质完成页面构架","inactive"],
    ["后端","掌握php，能用django搭建后端","inactive"],
    ["数据可视化","掌握d3.js，能制作各种炫酷的数据图表","inactive"],
    ["机器学习","向机器学习挺进中","inactive"],
];
var navReplaceStr = ["{{function-title}}","{{function-content}}","{{isactive}}"];
renderDom(functionId, functionData, navReplaceStr);
activeListen(functionId,childrenClassName);

/********************************研究成果***************************/
var sceneId = "#scenetabtemplate";
var childrenClassName = "tabitem"
var sceneData = [
    ["active","四维史量",],
    ["inactive","爬取列车信息",],
    ["inactive","有限元网站",],
    ["inactive","文献评阅系统",],
];
var navReplaceStr = ["{{isactive}}","{{scene-content}}",];
renderDom(sceneId, sceneData, navReplaceStr);
activeListen(sceneId,childrenClassName);



var sceneBody = "#scenebodytemplate";
var childrenClassName = "bodyitem";
//var commonStr = "";
var sceneContentData = [
    ["active","作者：刘尚宇","http://3.tangshimap.sinaapp.com"],
    ["inactive","作者：吕益航","https://github.com/BenjaminHang/craw_train"],
    ["inactive","作者：张路姚","https://github.com/imechZhangLY/truss-online"],
    ["inactive","作者：李玉川","https://github.com/AlvinBlack/litassistant"],
];
var navReplaceStr = ["{{isactive}}","{{scene-content}}","{{url}}"];
renderDom(sceneBody, sceneContentData, navReplaceStr);
activeListen(sceneId,childrenClassName);


/********************************帮助文档***************************/





/******************************** common function ***************************/
function renderDom(domId, domData, replaceStr){
    var template = $(domId).html();
    var Doms = [];
    for(var i = 0; i < domData.length; i++){
        var replacedDom = replaceTemplate(replaceStr, template, domData[i]);
        Doms.push(replacedDom);
    }
    Doms = Doms.join("");
    $(domId).html(Doms);

}

function replaceTemplate(replaceStr, template, realData){
    var replacedDom = "";
    for(var i = 0; i < replaceStr.length; i++){
        var regular = new RegExp(replaceStr[i],"g");
        template = template.replace(regular,realData[i]);
    }
    replacedDom = template;
    return replacedDom;
}

function activeListen(templateId,className){
    $(templateId).bind('click', function(event) {
        $(templateId).children("." + className).removeClass('active');
        $(templateId).children("." + className).addClass('inactive');

        var currentDom = $(event.target);
        var regularClass = new RegExp(className);
        if(!regularClass.test(currentDom.attr("class"))){
            currentDom = currentDom.parent("."+className).addClass("active");
        }
        currentDom.removeClass('inactive');
        currentDom.addClass("active");
    });
    
}


/************************** 自主实现顶部吸附与页面滑动效果 ***************************/

scrollNavigation();
var displayState = 0;
var activeItem = 0;
var clickScroll = 0;
function scrollNavigation(){
    $(window).scroll(scrollHandler);
}

function scrollHandler(){
    
    domIds = ["#navbar","#productoverview","#productadvantage","#productfunction","#applicationscene","#helpdocument"];
    var navId = domIds[0];
    if(reachedTop(navId)){
        var reachedOne = whichReached(domIds) - 1;
        console.log("目前激活的是："+reachedOne);
        if(displayState == 0){
            appear();
            if(!clickScroll){
                slide(0);
            }
        }

        if(activeItem != reachedOne && !clickScroll){
            slide(reachedOne);
            activeItem = reachedOne;
        }

    }else{
        if(displayState == 1){
            disappear();    
        }
        // console.log("导航没到顶部"); 
    }
}

function whichReached(domIds){
    if(!reachedTop(domIds[0])){
        return -1;
    }
    for(var i = 0; i < domIds.length - 1; i++){
        if(reachedTop(domIds[i]) && !reachedTop(domIds[i+1])){
            return i;
        }
    }
    return domIds.length - 1;
}

function reachedTop(domId){
    var reached;
    var settingDistance = 150;
    if(domId == "#navbar"){
        settingDistance = 0;
    }
    if(computePosition(domId) <= settingDistance){
        reached = 1;
    }else{
        reached = 0;
    }
    return reached;
}

function computePosition(domId){  //计算此元素距离顶部的高度
    var Ydistance = $(domId).offset().top - $(window).scrollTop();
    return Ydistance;
}
/************************** 自主实现顶部吸附与页面滑动效果 ***************************/




/***************************** fixed navigationbar ******************************/
var fixedNavEleId = "#fixednavtemplate";
var childrenClassName = "fixednavitem";
var navEleData = [
    ["团队概述","productoverview","active"],
    ["成员介绍","productadvantage","inactive"],
    ["职业技能","productfunction","inactive"],
    ["成果展示","applicationscene","inactive"],
    // ["相关链接","helpdocument","inactive"],
];
var navReplaceStr = ["{{itemcontent}}","{{linkid111}}","{{isactive}}"];
renderDom(fixedNavEleId, navEleData, navReplaceStr);
activeListen(fixedNavEleId,childrenClassName);

/***************************** fixed navigationbar ******************************/

function appear(){
    displayState = 1;
    $("#topnavbar").css("display","block");
    $("#topnavbar").animate({
        top:"0px"
    },200);
}
function disappear(){
    displayState = 0;
    $("#topnavbar").animate({
        top:"-60px"
    },200,function(){
        $("#topnavbar").css("display","none");
    }); 
}
function slide(reachedOne){
    var parentDom = $("#fixednavtemplate");
    var hiddenParentDom = $("#navtemplate");
    var domAlign = parentDom.children(".fixednavitem").eq(reachedOne);
    var hiddenDomAlign = hiddenParentDom.children(".navitem").eq(reachedOne);
    parentDom.children(".fixednavitem").removeClass('active');
    parentDom.children(".fixednavitem").addClass('inactive');
    domAlign.removeClass('inactive');
    domAlign.addClass('active');
    var left = hiddenDomAlign.offset().left;
    $("#slider").width(hiddenDomAlign.width());
    left = left + "px";
    $("#slider").animate({
        left:left
    },"fast");
}



listenNavClick("#navtemplate","navitem");
listenNavClick("#fixednavtemplate","fixednavitem");
function listenNavClick(bindId,childrenClassName){
    var domIds = ["#productoverview","#productadvantage","#productfunction","#applicationscene","#helpdocument"];
    var bindDom = $(bindId);
    var childrenDoms = bindDom.children('.'+childrenClassName);
    for(var i = 0; i < childrenDoms.length; i++){
        childrenDoms[i]._index = i;
        $(childrenDoms[i]).click(function(e){
            console.log(domIds[this._index]);
            clickScroll = 1;
            scroll(domIds[this._index]);
            slide(this._index);
            activeItem = this._index;
        });
    }

}
function scroll(domId){
    console.log(computePosition(domId));
    var movingY = $(domId).offset().top - 100;
    $('html, body').animate({
        scrollTop: movingY
    },'slow', function(){clickScroll = 0});
}

