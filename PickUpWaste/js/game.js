$(function() {
    // game.start()
    welcome.creatWelcome()
    $('.musicOnOff').click(function(){
        window.history.go(-1);
    })

})

var game = {
    stage: $(config.stage.id),
    time: 99,
    score: 0,
    mistake: 0,
    level: 0,
    pause: false,
    enemyMove: null,
    cautions:null,
    canbox:null,
    start: function() {
        
        game.stage.find('.show').remove()
        var caution=$('<img>').attr('src',config.caution[game.player.currentRole]).addClass('can')
        caution.appendTo(game.stage)
        game.cautions=caution

            // $('body').css('background-image', `url('./pic/shadow-game.jpg.png')`)
        game.stage.addClass('begin')
        $("<div>").addClass("player").addClass('player-' + game.player.currentRole).appendTo(game.stage) //生成玩家
        // var key=$('<img>').addClass('key').attr('src','img/方向键.png')
        var dataBox = $("<div>").addClass('dataBox')
        // 得分
        var score = $("<div>").addClass(config.score.className)
        var scoreText = $("<span>").addClass(config.score.scoreLabel.className).text(config.score.scoreLabel
            .text)
        var scoreValue = $("<span>").addClass(config.score.scoreValue.className).text(game.score)
        score.append(scoreText, scoreValue)

        // 失误
        var mistake = $("<div>").addClass(config.mistake.className)
        var mistakeText = $("<span>").addClass(config.mistake.mistakeLabel.className).text(config.mistake.mistakeLabel
            .text)
        var mistakeValue = $("<span>").addClass(config.mistake.mistakeValue.className).text(game.mistake)
        mistake.append(mistakeText, mistakeValue)

        // 时间
        // var time = $("<div>").addClass(config.time.className)
        // var timeText = $("<span>").addClass(config.time.timeLabel.className).text(config.time.timeLabel.text)
        // var timeValue = $("<span>").addClass(config.time.timeValue.className).text(game.time)
        // time.append(timeText, timeValue)
        // 应该接的垃圾
        var canbox=$('<div>').addClass(config.class[game.player.currentRole])

        dataBox.append(score, mistake)
        // dataBox.appendTo(game.stage)
        game.stage.append(dataBox,canbox)

        game.player.move()
            // game.enemyMove=setInterval(game.enemy.generate, config.level[game.level].frequency)
        enemyMove();

        function enemyMove() {
            game.enemy.generate();
            game.enemyMove = setTimeout(enemyMove, config.level[game.level].frequency)
        }


    },
    player: {
        // 人物数值传入
        currentRole: null,
        position: 0,
        monitor: null,
        //玩家移动方法
        move: function(e) {
            var moveL = false;
            var moveR = false;
            var player = game.stage.find(".player")
            $(window).on('keydown', function(e) {
                switch (e.keyCode) {
                    case 37:
                        moveL = true;
                        break;
                    case 39:
                        moveR = true;
                        break;
                }
            })
            $(window).on("keyup", function(e) {
                switch (e.keyCode) {
                    case 37:
                        moveL = false;
                        break;
                    case 39:
                        moveR = false;
                        break;
                }
            })
            game.player.monitor = setInterval(function() {
                if (moveL) {
                    game.player.position -= parseFloat(game.stage.width()) * 0.05
                    if (game.player.position < -((parseFloat(game.stage.width()) / 2) - player.width() /
                            2)) {

                        game.player.position = -((parseFloat(game.stage.width()) / 2) - player.width() /
                            2)
                    }
                }
                if (moveR) {
                    game.player.position += parseFloat(game.stage.width()) * 0.05
                    if (game.player.position > (parseFloat(game.stage.width()) / 2) - player.width() /
                        2)
                        game.player.position = (parseFloat(game.stage.width()) / 2) - player.width() / 2
                }
                player.css({
                    transform: "translateX(" + game.player.position + "px)"
                })
            }, 50)
        },
    },
    enemy: {
        fallControl: null,
        //生成敌人
        generate: function() {
            var enemy = $("<div>").addClass("enemy").appendTo(game.stage)
            var width = parseFloat(game.stage.width())
            var lanes = parseInt(width / enemy.width()) //轨道
            var offset = (width - enemy.width() * lanes) / 2
            var player = game.stage.find(".player")

            setEnemy(enemy)

            //初始化敌人设置
            function setEnemy(obj) {
                var lane = getRnd(0, lanes - 1)
                var category = getRnd(0, config.enemy.length - 1)
                obj.addClass(config.enemy[category].className)
                obj.type = config.enemy[category].type

                var left = offset + lane * obj.width()
                obj.css({
                    left: left
                })
                game.enemy.fall(enemy)
            }

            //敌人消失条件
            enemy.timer = setInterval(function() {
                //没接到
                if (enemy.offset().top > game.stage.height()) {
                    enemy.remove()
                    clearInterval(enemy.timer)
                }
                //接到
                if (enemy.offset().top + enemy.height() > player.offset().top &&
                    enemy.offset().left + enemy.width() > player.offset().left &&
                    enemy.offset().left < player.offset().left + player.width()) {
                    enemy.remove()
                    clearInterval(enemy.timer)

                    if (game.player.currentRole === enemy.type) {
                        game.score++;
                        if (game.score > 7) game.level = 1;
                        if (game.score > 15) game.level = 2;

                    } else {
                        // 游戏结束
                        game.mistake++;

                        // game.cautions.addClass('show')
                        // setTimeout(function(){game.cautions.removeClass('show')},1500)

                        if (game.mistake >= 15) {
                            welcome.gameOver()
                        }
                    }

                    $("." + config.score.scoreValue.className).text(game.score)
                    $("." + config.mistake.mistakeValue.className).text(game.mistake)
                }
            }, 50)

            function getRnd(min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            }
        },
        //敌人下落方法
        fall: function(obj) {
            var position = 0
            game.enemy.fallControl = setInterval(function() {
                position += obj.height()
                obj.css({
                    transform: "translateY(" + position + "px)"
                })
            }, config.level[game.level].speed)
            obj.css({
                transition: "transform " + config.level[game.level].speed / 1000 + "s linear"
            })
        }
    },
}

var welcome = {
    stage: $(config.stage.id),
    personsBox: null,
    img: [],

   
    // 创建欢迎页
    creatWelcome: function() {
        welcome.personsBox = $("<div>").addClass("personsBox").appendTo(welcome.stage)

        // 循环生成小人盒子
        config.person.forEach((item, index) => {
            welcome.img.push($('<div>').addClass(config.playerTagClassName[index]).appendTo(game.stage))
            var perBox = welcome.creat(item, index)
            welcome.eventThing(perBox, index)
        })
    },
    //  点击相应的人物启动游戏
    eventThing: function(obj, index) {
        $(obj).hover(function() {
            // 背景大图的切换
            var sib = $(welcome.img[index]).siblings()
            $(sib).removeClass(config.Image[0].className)
            $(welcome.img[index]).addClass(config.Image[0].className)

        }, )
        $(obj).click(function() {
            // 点击进入游戏
            welcome.personsBox.css('display', 'none')
            game.player.currentRole = index
            $(game.canbox).addClass('config.class[index]')
            game.start();
        })
    },

    //  创建小人的整套盒子 .person
    creat: function(ite, index) {
        // 生成小人盒子
        var perBox = $('<div>').addClass('person').appendTo(welcome.personsBox)
            // 生成小人
        var person = $('<div>').addClass(ite.className).appendTo(perBox)
        return perBox;
    },

    // 游戏结束
    gameOver: function() {
        clearTimeout(game.enemyMove)
        clearInterval(game.player.monitor)
        clearInterval(game.enemy.fallControl)

        var gameOver = $('<div>').addClass('gameOver').appendTo(game.stage)
        var button = $('<div>')
        button.click(function() { location.reload(); })

        // var button2 = $('<button>').text('返回')
        gameOver.append(button);

    }


}