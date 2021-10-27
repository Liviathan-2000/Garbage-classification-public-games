var config = {
	stage: {
		id: "#stage"
	},
	player: [{
		className: "player",
	}],
	playerTagClassName: ['recycle', 'foodWaste', 'harmful', 'else'],
	class: ['kehuishou', 'chuyu', 'youhai', 'qita'],
	Image: [{ className: 'show' }],
	backgroundMusic:'.backgroundMusic',
	caution:['img/kehuishou.jpg','img/chuyu.jpg','img/youhai.jpg','img/qita.jpg'],

	person: [
		{ className: 'person-0' },
		{ className: 'person-1' },
		{ className: 'person-2' },
		{ className: 'person-3' },],
	
	// 垃圾的数量
	// 0-1-2-3,可回收-厨余-有害-其他
	enemy: [{
		className: "enemy-1",
		type: 0
	}, {
		className: "enemy-2",
		type: 0
	},
	{
		className: "enemy-3",
		type: 0
	},
	{
		className: "enemy-4",
		type: 0
	},
	{
		className: "enemy-5",
		type: 1
	},
	{
		className: "enemy-6",
		type: 1
	},
	{
		className: "enemy-7",
		type: 1
	},
	{
		className: "enemy-8",
		type: 1
	},
	{
		className: "enemy-9",
		type: 2
	},
	{
		className: "enemy-10",
		type: 2
	},
	{					
		className: "enemy-11",
		type: 2
	},
	{
		className: "enemy-12",
		type: 2
	},
	{
		className: "enemy-13",
		type: 3
	},
	{
		className: "enemy-14",
		type: 3
	},
	{
		className: "enemy-15",
		type: 3
	},
	{
		className: "enemy-16",
		type: 3
	}],
	score: {
		scoreLabel: {
			className: "score-label",
			text: "得分："
		},
		scoreValue: {
			className: "score-value"
		},
		className: "score"
	},
	mistake: {
		mistakeLabel: {
			className: "mistake-label",
			text: "失误："
		},
		mistakeValue: {
			className: "mistake-value"
		},
		className: "mistake"
	},

	time: {
		timeLabel: {
			className: "time-label",
			text: "时间："
		},
		timeValue: {
			className: "time-value"
		},
		className: "time"
	},
	level: [{
		speed: 300,
		frequency: 1000
	},
	{
		speed: 260,
		frequency: 700
	},
	{
		speed: 190,
		frequency: 500
	},
	{
		speed: 160,
		frequency: 350
	}
	],
}
