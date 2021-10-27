$(function () {
    game.start()
})

// 我需要：创建节点，点击事件，计分系统
var game = {
    content: $(data.content),
    welcome: $(data.welcome),
    cardmusic: $(data.cardmusic),
    backmusic: $(data.backmusic),
    musicOnOff: $(data.musicOnOff),
    note:$(data.note),
    score: 0,
    control: true,
    music:true,

    // 内部启动器
    start: function () {
        game.musicOnOff.click(function () {
            window.history.back();
        })
        $(game.welcome.find('.button')).click(function () {
            // game.backmusic[0].play()
            $('.welcome').css('background-image', `url('./pic/shadow-game.jpg.png')`)

            game.welcome.css('display', 'none')
            game.content.css('display', 'block')
            game.content = game.content.children();

            for (let i = 0; i < 24; i++) {
                game.content.append(game.creatEle.product(i))
            }
        })

    },


    creatEle: {
        // 生产卡片
        product: function (i) {
            var cardBox = $('<div>').addClass(data.cardBoxName.className)

            cardBox.attr('tag', data.tag[i].tag)
            cardBox.attr('i',i)
            cardBox.css('background-image', `url(${data.tag[i].backgroundImage})`)

            var cardUp = $('<div>').addClass(data.cardUp.className)
            var cardDown = $('<div>').addClass(data.cardDown.className)
            cardBox.append(cardUp, cardDown)

            game.clickEvent(cardBox)
            return cardBox
        }
    },


    // 点击事件
    clickEvent: function (ele) {
        
        $(ele).bind('click', function () {
           
            game.cardmusic[0].play()
            if (game.control) {
                game.noteShow(this)
                var boxArr = $(this).addClass(data.show.className).siblings()
                boxArr.each(function () {
                    var _this = $(this);
                    if (_this.hasClass(data.show.className)) { 
                        game.control = false
                        if (_this.attr('tag') === ele.attr('tag')) {
                            game.control = true
                            game.isGameOver()

                            _this.removeClass(data.show.className).addClass(data.found.className)
                            ele.removeClass(data.show.className).addClass(data.found.className)
                            _this.unbind()
                            ele.unbind()
                        } else {
                            setTimeout(function () {
                                // console.log(game.control);
                                game.control = true
                                _this.removeClass(data.show.className)
                                ele.removeClass(data.show.className)
                            }, 1250)

                        }
                    };
                })
            }


        })
    },
    // 写提示牌
    noteShow:function(ele){
        var txt=($(ele).attr('i')).toString()
       var name= data.tag[txt].name
       var kind= data.tag[txt].kind
       game.note.addClass('show')
       game.note.attr('id',data.tag[txt].kinds)
        game.note.find('a').eq(0).text(name)
        game.note.find('a').eq(1).text(kind)
    },

    // 游戏结束
    isGameOver: function () {
        game.score += 1
        if (game.score >= 12) {
            $(game.content.parent()).css('display', 'none')
            game.note.css('display','none')
            var again = $('<div>').addClass(data.again.className)
            var againButton=$('<div>').addClass('again')
            $(againButton).appendTo(again)

            $(againButton).click(function () {
                location.reload()
                console.log(1);
            })
            $(again).replaceAll(game.welcome)
            game.welcome.css('display', 'block')
        }
    },

}