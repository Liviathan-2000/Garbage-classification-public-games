//4只垃圾桶
var ash_bin_can = document.getElementById("ash-bin-can");
var ash_bin_foodWaste = document.getElementById("ash-bin-foodWaste");
var ash_bin_cannot = document.getElementById("ash-bin-cannot");
var ash_bin_else = document.getElementById("ash-bin-else");
// 游戏界面
var gameRange = document.getElementById("gameRange");
var welcome = document.getElementById("welcomeScreenBack"); //欢迎界面
const gameOverScreen = document.querySelector('.gameOverScreen'); //游戏结束页面

// img list
//垃圾图//?动态集合？//
var kitchenWaste = document.querySelectorAll("#kitchenWaste img"); //厨余垃圾
var harmful = document.querySelectorAll("#harmful img"); //有害垃圾
var other = document.querySelectorAll("#other img"); //其他垃圾
var recycled = document.querySelectorAll("#recycled img"); //可回收垃圾
var integral = document.querySelector("#integral"); //积分
var poScience = document.querySelectorAll(".poScience li"); //科普垃圾分类列表
var TF = document.querySelector(".hint img"); //对错小提示
var dingdong = document.querySelector(".dingdong"); //对错小提示音乐
// var backgroundMusic = document.querySelector('.backgroundMusic');
var bugle = document.querySelectorAll('.backgroundMusicCol img'); //喇叭控制背景音乐
let isAgane = true; //判断是否重来

//  所有的垃圾列表
var imgArr = [...recycled, ...kitchenWaste, ...harmful, ...other]; //是否有分类？
var imgArrlength = imgArr.length; //所有垃圾数量

// 取消浏览器的默认选中效果
document.onselectstart = function() { return false; }

// 给每个 垃圾图片 循环绑定事件
//对数组中的每个元素执行一遍rubbishMove函数
imgArr.forEach((item, index) => { //item内容:垃圾对应的图片  index数字
    item.onmouseover = function() { //之前是同时运行，现在是一个准确的函数
        rubbishMove(item, index);
    }
});

$('.musicOnOff').click(function(){
    window.history.go(-1);
})
//点击喇叭控制背景音乐的播放
// function bugleControl() {
//     bugle.forEach((item, index) => {
//         item.onclick = function() {
//             // alert(1)
//             if (bugle[1].style.display === 'none') {
//                 backgroundMusic.pause();
//                 bugle[1].style.display = 'block';
//             } else {
//                 backgroundMusic.play();
//                 bugle[1].style.display = 'none';
//             }
//         }
//     })
// }


//拖拽移动
function rubbishMove(elm) {
    var l = 0;
    var t = 0;
    elm.onmousedown = function(e) {
        //首先要获取鼠标相对于元素的位置
        var disX = e.clientX - elm.offsetLeft; //clientX,Y鼠标相对于浏览器窗口可视区域的X，Y坐标（窗口坐标）
        var disY = e.clientY - elm.offsetTop; //offsetLeft,top是元素相对父元素的偏移宽度
        document.onmousemove = function(e) {
            l = e.clientX - disX;
            t = e.clientY - disY;
            if (l < 0) {
                //防止div跑出可视框
                l = 0;
            } else if (l > gameRange.clientWidth - elm.offsetWidth) {
                l = gameRange.clientWidth - elm.offsetWidth;
            }
            if (t < 0) {
                t = 0;
            } else if (t > gameRange.clientHeight - elm.offsetHeight) {
                t = gameRange.clientHeight - elm.offsetHeight;
            }

            elm.style.left = l + "px";
            elm.style.top = t + "px";

            //判断垃圾桶是否打开
            isAshBin(ash_bin_can);
            isAshBin(ash_bin_foodWaste);
            isAshBin(ash_bin_cannot);
            isAshBin(ash_bin_else);

            //  鼠标松开后执行的函数
            elm.onmouseup = function() {

                selectAshBin(ash_bin_can, recycled, 0);
                selectAshBin(ash_bin_foodWaste, kitchenWaste, 1);
                selectAshBin(ash_bin_cannot, harmful, 2);
                selectAshBin(ash_bin_else, other, 3);
                gameOver();
                document.onmousemove = null; //清除onmousemove事件
                elm.onmouseup = null;
            };
            return false;
        };
    };

    //判断对应的垃圾桶类型
    function showTF(tf, num) {
        dingdong.play()

        // tf ? (show(TF[1])) : (show(TF[0]));//1是对
        if (tf) {
            show(TF);
        }

        function show(valueTF) {
            valueTF.style.display = 'block';
            setTimeout(() => {
                valueTF.style.display = 'none';
            }, 800);
        }

        if (!tf) {
            poScience.forEach((item, dex) => {
                if (dex == num) {
                    poScience[num].style.display = 'block';
                    let button = poScience[num].querySelector('.button');
                    document.addEventListener('mousedown', () => {
                        poScience[num].style.display = 'none'
                    })
                } else
                    poScience[dex].style.display = 'none';
            })
        }

    }

    //  判断垃圾是否在垃圾桶范围内
    function selectAshBin(ashBinElm, ashBin, num) {

        if ( //判断鼠标是否在内
            l > ashBinElm.offsetLeft - 30 &&
            l < ashBinElm.offsetLeft + ashBinElm.offsetWidth &&
            t > (ashBinElm.offsetTop -30) &&
            t < ashBinElm.offsetTop + ashBinElm.offsetHeight
        ) {
            if (getType(ashBin, elm)) {
                selectResults(elm, 100);
                showTF(true);
            } else {
                selectResults(elm, -100);
                showTF(false, num);
            }
            // ashBinElm.style.background = "#fff";
        }
    }

    //  判断当前垃圾是否属于某类型垃圾
    //  第一个参数是 某类型垃圾的列表 ，第二个参数是要判断的垃圾
    function getType(arrElm, elm) {
        var type = false;
        arrElm.forEach((item) => {
            if (item === elm) {
                type = true;
                return;
            }
        });
        return type;
    }

    //   垃圾移入移出垃圾桶 改变背景颜色
    function isAshBin(garbageElm) {
        const img = garbageElm.querySelector('img');
        if (
            l > garbageElm.offsetLeft-30  &&
            l < garbageElm.offsetLeft + garbageElm.offsetWidth &&
            t > (garbageElm.offsetTop -30) &&
            t < garbageElm.offsetTop + garbageElm.offsetHeight
        ) {
            console.log(garbageElm.offsetLeft );
            img.style.animation = 'Pulse 0.7s';
        } else {
            img.style.animation = '';
        }
    }

    //  垃圾放进垃圾桶执行的函数
    function selectResults(elm, number) {
        console.log(elm);
        elm.style.display = "none";
        integral.innerHTML = Number(integral.innerHTML) + number;
        //当前屏幕垃圾数量
        imgArrlength--;
    }
}

//自动生成垃圾
function rubbishFloat() {
    var rNumber = 16.5;
    var tNumber = 10;
    for (var i = 0; i < imgArr.length; i++) {
        if (rNumber >= 80) {
            rNumber = 16.5;
            tNumber = 150;
        }

        imgArr[i].style.left = rNumber + "%";
        imgArr[i].style.top = tNumber + "px";
        imgArr[i].style.animation = "run 20s linear ";
        rNumber += 10;
    }
}

//按钮点击，启动游戏
function startTheGame() {
    var button = document.querySelector("#button");
    if (isAgane) {
        button.onclick = () => {

            // 音效开关
            // bugleControl();
            welcome.style.display = "none";
            // backgroundMusic.play();
            isAgane = false;
        }
    } else {
        button.innerText = 'AGAIN';
        button.previousElementSibling.innerText = '游戏结束';
        button.onclick = () => {
            location.reload();

        }
    }
}

function gameOver() {
    if (imgArrlength === 0) {
        gameOverScreen.style.display = "flex";
        gameOverButton = gameOverScreen.querySelectorAll('button');
        gameOverButton[0].onclick = function() {
            location.reload();
        }
        gameOverButton[1].onclick = function() {
            history.back();
        }
        startTheGame();
    }
}

window.onload = function() {
    startTheGame();
    rubbishFloat();
};