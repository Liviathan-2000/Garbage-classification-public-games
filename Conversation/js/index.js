var isdo = true
document.onselectstart = function() { return false; }
// 把每一个问答开始的按钮放入一个数组
var personStart = document.querySelectorAll('.p');//所有人物的点击按钮
var musicOnOff=document.querySelector('.musicOnOff');
var backMusic=document.querySelector('.back-music');

var music=true;
$(musicOnOff).click(function(){
    window.history.go(-1);
})


$('.p .questions').each(function (index, item) {
    $(item).find('img').each(function (index, item) {
        var _item = item;
        $(_item).hover(function () {
            show(this)
            this.onclick = function () {
                 clickThing(this, index)
            }
        }, function () {
            hide(this)
        })
    })
})



function clickThing(obj, index) {
    $('.answerstext').remove()
    $('.answers').find('img').each(function(i,item){hide(item)})
    $(obj).parent().parent().nextAll('div').each(function(i,item){
        show(item)
    })

    var ele = $(obj).parents('.questions').next().find('img').eq(index);
    show(ele[0])
    var answertxt= creatTxt(obj,index)
    setHide(answertxt,ele[0])
}

function setHide(obj1,obj2){
    setTimeout(function () { 
        document.onclick = function () {
            $(obj1).remove()
            hide(obj2)
            document.onclick='';
        }
    }, 1500)
}

function hide(obj) {
    obj.className = '';
}

function show(obj) {
    obj.className = 'show';
    // obj.zIndex=
}
function creatTxt(obj,index){
    var answerBox= $(obj).parents('.questions').next().find('div:eq('+index+')')
    var answertxt= $('<div>').addClass('answerstext').attr('id','answers-text'+(index+1)).prependTo(answerBox)
    return answertxt
}

  