// 取消浏览器的默认选中效果
document.onselectstart = function () { return false; }
const divNum = 24;//生成的盒子个数
var foundCard = 0;//判断是否结束游戏
const faDiv = document.querySelector('.content-game');//获取中部游戏主体
const welB = document.querySelector('.welcome-main-button');//游戏按钮
const welcome=document.querySelector('.welcome');//欢迎页面
const body=document.querySelector('body');

welB.onclick = function () {
    // 欢迎页消失
    welcome.style.display='none'
    // 启动盒子生成
    setTimeout(creatFa(divNum, faDiv),3000);
}

// 样式对象
const change = {
    nameDiv: {
        className: 'game-card'
    },
    faDiv: {
        className: 'game-card active'
    },
    foundDiv: {
        className: 'game-card found'
    },
    upchange: {
        height: 0
    },
    upchange2: {
        height: 100
    },
    down: {
        animation: `shadow-drop-br 1s forwards`
    },
    down2: {
        animation: 'shadow-drop-br2 1s forwards'
    }
}

function creatFa(Num) {
    let tbox = document.createDocumentFragment();
    var musicOnOff=document.createElement('div');
  
    for (var i = 0; i < Num; i++) {
        // 父级盒子
        let ele = document.createElement('div');
        ele.className = change.nameDiv.className;


        // 创建第一个盒子
        let eleDiv = document.createElement('div');
        eleDiv.className = 'game-card-childUp';
        ele.appendChild(eleDiv);

        // 创建第二个盒子
        let eleDiv2 = document.createElement('div');
        eleDiv2.className = 'game-card-childDown';
        if (i < Num / 2) {
            // 插入的图片地址
            eleDiv2.style.backgroundImage = `URL('pic/icon-${i}.jpg')`;
            ele.setAttribute('picName', `icon-${i}`);
        }
        else {
            eleDiv2.style.backgroundImage = `URL('pic/icon-${i - Num / 2}.jpg')`;
            ele.setAttribute('picName', `icon-${i - Num / 2}`);
        }
        ele.appendChild(eleDiv2);

        tbox.appendChild(ele);

        // 为父级盒子绑上事件
        divEvent(ele);
    }
    faDiv.appendChild(tbox);

}
// var isClick

// 点击事件
function divEvent(ele) {
    isClick = true;
    ele.onclick = function () {
        if (isClick) {
            move(this.firstElementChild, change.upchange);
            move(this.lastElementChild, change.down);
            this.className = change.faDiv.className;
            isLike(ele);
        }
    }
}

// 改变样式
function move(ele, target, cd) {
    const timerObj = {}
    for (let attr in target) {
        if (!isNaN(target[attr])) {
            ele.style[attr] = target[attr] + '%';
        }
        else {
            ele.style[attr] = target[attr];
        }
    }
}

// 判断是否相同
function isLike(ele) {
    const gameCard = document.querySelectorAll('.game-card');
    console.log(foundCard);
    gameCard.forEach((item, index) => {

        // 如果他们的类名相等
        if (item.className === ele.className && item !== ele) {

            isClick = false;
            // 如果他们的picName属性名相等
            if (item.getAttribute('picName') === ele.getAttribute('picName')) {
                item.className = change.foundDiv.className;
                ele.className = change.foundDiv.className;
                isClick=true;
                foundCard+=2;
                console.log('相同');
                
                    // 当全部点击完毕
                    if(foundCard>=24){
                        console.log(foundCard);
                        // 游戏页消失，欢迎页出现
                        document.querySelector('.content').style.display='none';
                        welcome.style.display='block';
                    }
            }
            else {
                setTimeout(function () {
                    isClick=true;
                    move(item.firstElementChild, change.upchange2);
                    move(item.lastElementChild, change.down2);
                    item.className = change.nameDiv.className;

                    move(ele.firstElementChild, change.upchange2);
                    move(ele.lastElementChild, change.down2);
                    ele.className = change.nameDiv.className;
                }, 1000)
            }
        }

    })
}
// 游戏结束