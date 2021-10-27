
//获取地球，滚动条，准备动画
var scroll;//滚动条
var earth = document.querySelector('.earth1');
var earth_text_p = document.querySelectorAll('.earth_text p');//主题文字下的P
var earth_text = document.querySelector('.earth_text');//主题文字下
var img = document.querySelectorAll('.transitionLayer img');
var garbageDiv = document.querySelectorAll('.garbage div');//垃圾桶的数组
const xiangxia = document.querySelector('.xiangxia');//向下的标志
var numberInt = 0;
var num = 0;
var pa = 0;
let isTilte = true;//是否要跟随滚动条改变颜色
var music = document.querySelector('.backgroundMusic');


    document.documentElement.scrollTop=0;

console.log(document.documentElement.scrollTop);
//当地球跳起来之后，开始自转
setTimeout(function () {
    earth.style.animation = "rotation 13s infinite linear";
}, 1300)
var x;
var flag = false;

// 标题过渡
function titleChange(num) {
    var titleCanvas = document.querySelector("#title")
    var ctx = titleCanvas.getContext("2d")
    imgTitle = new Image(565, 166); // image to show

    imgTitle.onload = start;
    imgTitle.src = "homePage/pic/title.png";
    // imgTitle.width=565;
    // imgTitle.height=166;
    titleCanvas.style.opacity = 1;

    function start() {

        var r = titleCanvas.getBoundingClientRect();

        if (isTilte) {
            // console.log(1);
            x = 565 * num;
            window.onmousemove = "";
        }
        else {
            window.onmousemove = function (e) {
                x = e.clientX - r.left;

                if (x > 350 && !flag) {
                    flag = true
                }
                if (flag) {
                    ctx.clearRect(0, 0, titleCanvas.width, titleCanvas.height);
                    ctx.drawImage(imgTitle, 0, 0, x, titleCanvas.height, 0, 0, x, titleCanvas.height);
                }
            }
        }

        ctx.clearRect(0, 0, titleCanvas.width, titleCanvas.height);
        ctx.drawImage(imgTitle, 0, 0, x, titleCanvas.height, 0, 0, x, titleCanvas.height);
    };
}


//监视滚动条,滚动条的数据实时更新
window.onscroll = function () {
    // 自动动调节title的颜色
    isTilte = true;

    scroll = document.documentElement.scrollTop || document.body.scrollTop;
    numberInt = parseInt(scroll);
    num = parseInt(scroll) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);//小于1
    // console.log(num);


    //当滚动条滑到底的时候
    var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    if (document.documentElement.scrollHeight === Math.round(document.documentElement.clientHeight + scrollTop)) {
        garbageDiv.forEach((item) => {
            item.style.zIndex = 1006;


        })
        // 手动调节title的颜色
        isTilte = false;
        flag = false;
        // 垃圾桶变化
    }
    else {
        garbageDiv.forEach((item) => {
            item.style.zIndex = 1000;
        })
    }

    // 小人的高度，当屏幕是100时，采用第一种样式，在120时，采用第二种样式
    garbageDiv.forEach((item, index) => {
        // 点击链接
        item.onclick = function () {
            if (index === 0) {
                window.location.href = 'Conversation/index.html'
            }
            if (index === 1) {
                window.location.href = 'CardGame/index.html'
            }
            if (index === 2) {
                window.location.href = 'Classify/gameModule.html'
            }
            if (index === 3) {
                window.location.href = 'PickUpWaste/index.html'
            }
        }
        item.style.top = 100 - 40 * num + '%';
        if (window.innerWidth > 1900) {
            // 100宽1920
            if (index === 0) {
                item.style.top = 100 - 30 * num + '%';
                item.style.left = '23' + '%';
            }
            if (index === 1) {
                item.style.top = 100 - 45 * num + '%';
                item.style.left = '35' + '%';
            }
            if (index === 2) {
                item.style.top = 100 - 52 * num + '%';
                item.style.left = '50' + '%';
            }
            if (index === 3) {
                item.style.top = 100 - 32 * num + '%';
                item.style.left = '66' + '%';
            }
        }
        else {
            // 120宽,1536
            if (index === 0) {
                item.style.top = 100 - 37 * num + '%';
                item.style.left = '20' + '%';
            }
            if (index === 1) {
                item.style.top = 100 - 50 * num + '%';
                item.style.left = '35' + '%';
            }
            if (index === 2) {
                item.style.top = 100 - 50 * num + '%';
                item.style.left = '50' + '%';
            }
            if (index === 3) {
                item.style.top = 100 - 37 * num + '%';
                item.style.left = '64' + '%';
            }
        }
    })

    // 地球往下移动
    earth.style.top = 50 + num * 20 + '%';
    // xiangxia指路标的透明度,在滑动的时候，跟随滚动条0-1之间变化
    xiangxia.style.opacity = 1 - num * 4;
    // console.log(earth.style.top);

    //地球放大
    //计算滚动条卷去的长度，并把它换算成小数，用小数来乘球的最终大小。

    if (num * 1500 <= 200) {
        earth.style.width = 200 + 'px';
        earth.style.height = 200 + 'px';
    }
    else {
        earth.style.width = num * 1300 + 'px';
        earth.style.height = num * 1300 + 'px';
    }

    // 控制背景城市图片
    img.forEach((item, index) => {
        (index == 0 || index == 1) ? item.style.opacity = 1 - num : item.style.opacity = 1;
        (index == 0 || index == 2) ? pa = 6 : pa = 5;
        (index == 1 || index == 3) ? item.style.top = 10 + num * 7 + '%' : item.style.top = 10 + '%';

        item.style.width = 100 + num * pa + '%';
        item.style.height = 90 + num * pa + '%';
        item.style.left = -num * 3 + '%';
    })

    //文字向上移
    earth_text.style.top = 10 - num * 5 + '%';
    earth_text.querySelector('.img1').style.opacity = 1 - num;


    //文字大小控制
    earth_text_p.forEach((item, index) => {
        if (index === 0) {
            item.style.fontSize = 90 + parseInt(scroll) / 3 / 10 + 'px';
        }
        if (index === 1) {
            item.style.fontSize = 18 + parseInt(scroll) / 6.8 / 10 + 'px';
        }
        if (index > 1) {//向下的标志
            item.style.animation = '';
            item.style.opacity = 1 - num;
        }
    })

    titleChange(num);

}

///////////////////////////////////////////////////////////////////////////

function ClickJump(item, location) {
    item.onclick = () => {
        // open(location)
        window.open(location, '_self');
    }
}

//垃圾桶响应式
function resBox(inner, item) {
    if (inner > 1500 && inner < 1700) {
        (item.parentElement).style.margin = '38% auto'
    }
    if (inner > 1700 && inner < 1900) {
        (item.parentElement).style.margin = '36% auto'
    }
    if (inner > 1900) {
        (item.parentElement).style.margin = '25% auto'
    }
}

window.onload = function () {
   
    var sc = document.documentElement.scrollTop || document.body.scrollTop;
    sc = 0;

    document.onclick = function () {
        music.play()
    }
    // console.log(document.documentElement.scrollTop);
}

