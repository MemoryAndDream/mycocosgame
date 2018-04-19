"use strict";
cc._RF.push(module, '4e12fLSQu1L+KV6QmxDiavU', 'Game');
// scripts/Game.js

"use strict";

var Test = require("test");
cc.Class({
    extends: cc.Component,

    properties: {
        // 这个属性引用了星星预制资源
        starPrefab: {
            default: null,
            type: cc.Prefab
        },
        firePrefab: {
            default: null,
            type: cc.Prefab
        },
        // 星星产生后消失时间的随机范围
        maxStarDuration: 0,
        minStarDuration: 0,
        // 地面节点，用于确定星星生成的高度
        ground: {
            default: null,
            type: cc.Node
        },
        // player 节点，用于获取主角弹跳的高度，和控制主角行动开关
        player: {
            default: null,
            type: cc.Node
        },
        // player 节点，用于获取主角弹跳的高度，和控制主角行动开关
        test: {
            default: null,
            type: Test
        },

        // score label 的引用
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        // 得分音效资源
        scoreAudio: {
            default: null,
            url: cc.AudioClip
        },
        far_bg: [cc.Node],
        far_bg2: [cc.Node],
        fire_num: 1,
        far_speed: 0.2,
        max_powerup_time: 3
    },

    // use this for initialization
    onLoad: function onLoad() {
        // 获取地平面的 y 轴坐标
        this.groundY = this.ground.y + this.ground.height;
        // 初始化计时器
        this.timer = 0;
        this.starDuration = 0;
        // 生成一个新的星星
        this.spawnNewStar();
        //生成一个火

        this.spawnNewFire();

        // 初始化计分
        this.score = 0;
        this.setInputControl();
        this.fixBgPos(this.far_bg[0], this.far_bg[1]);
        this.fixBgPos(this.far_bg2[0], this.far_bg2[1]);
    },
    fixBgPos: function fixBgPos(bg1, bg2) {

        //利用前一张图片的边框大小设置下一张图片的位置  
        var bg1BoundingBox = bg1.getBoundingBox();
        console.log(bg2.getBoundingBox());
        bg2.setPosition(bg1BoundingBox.xMax, bg1BoundingBox.yMin);
        console.log(bg1.getBoundingBox());

        console.log(bg2.getBoundingBox());
    },

    bgMove: function bgMove(bgList, speed, dt) {
        for (var index = 0; index < bgList.length; index++) {
            var element = bgList[index];
            element.x -= speed * dt;
        }
    },
    //检查是否要重置位置  
    checkBgReset: function checkBgReset(bgList) {
        var win_min_x = -480; //背景图片锚点0,0

        var first_xMin = bgList[1].getBoundingBox().xMin;
        if (first_xMin <= win_min_x) {
            console.log("重置背景");
            var preFirstBg = bgList.shift();
            bgList.push(preFirstBg);
            var curFirstBg = bgList[0];
            preFirstBg.x = curFirstBg.getBoundingBox().xMax;
        }
    },

    spawnNewStar: function spawnNewStar() {
        // 使用给定的模板在场景中生成一个新节点
        var newStar = cc.instantiate(this.starPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newStar);
        // 为星星设置一个随机位置
        newStar.setPosition(this.getNewStarPosition());
        // 将 Game 组件的实例传入星星组件
        newStar.getComponent('Star').game = this;
        newStar.getComponent('Star').XSpeed = this.far_speed;
        // 重置计时器
        this.starDuration = this.minStarDuration + cc.random0To1() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
        this.starNow = newStar;
    },

    getNewStarPosition: function getNewStarPosition() {

        var randX = 0;
        // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
        var randY = this.groundY + cc.random0To1() * this.player.getComponent('Player').jumpHeight + 50;
        // 根据屏幕宽度，随机得到一个星星 x 坐标
        var maxX = this.node.width / 2;
        //randX = cc.randomMinus1To1() * maxX;
        // 返回星星坐标
        return cc.p(maxX, randY);
    },
    spawnNewFire: function spawnNewFire() {
        //火焰难度要不断提高 火焰不能重叠
        console.log("spawnFire");
        console.log(this.node.getChildren().length);
        // 使用给定的模板在场景中生成一个新节点
        for (i = 0; i < this.fire_num + 8 - this.node.getChildren().length; i++) {
            var newFire = cc.instantiate(this.firePrefab);
            console.log(newFire.name);
            newFire.name = 'newFire';
            // 将新增的节点添加到 Canvas 节点下面
            this.node.addChild(newFire);
            // 为星星设置一个随机位置
            newFire.setPosition(this.getNewFirePosition());
            // 将 Game 组件的实例传入星星组件
            newFire.getComponent('Fire').game = this;
            newFire.getComponent('Fire').XSpeed = this.far_speed;
        }
        // 重置计时器
        this.starDuration = this.minStarDuration + cc.random0To1() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    },

    getNewFirePosition: function getNewFirePosition() {

        var randX = 0;
        var randY = this.groundY + cc.random0To1() * this.player.getComponent('Player').jumpHeight + 30;
        // 根据屏幕宽度，随机得到一个火 x 坐标
        var maxX = this.node.width / 2 + cc.random0To1() * this.node.width / 2;
        // 根据地平面位置和主角跳跃高度，随机得到一个火的 y 坐标 但是火不能和星星重叠
        console.log(this.starNow);
        while (cc.pDistance(this.starNow.position, cc.p(maxX, randY)) < 30) {
            //这里设置太大会死循环 设置高度150时
            //var randY = this.groundY + cc.random0To1() * this.player.getComponent('Player').jumpHeight + 50;
            var randY = this.groundY + cc.random0To1() * this.player.getComponent('Player').jumpHeight + 30;
        }

        //randX = cc.randomMinus1To1() * maxX;
        // 返回星星坐标
        return cc.p(maxX, randY);
    },

    // called every frame
    update: function update(dt) {
        // 每帧更新计时器，超过限度还没有生成新的星星
        // 就会调用游戏失败逻辑
        if (this.timer > this.starDuration) {
            // this.gameOver();
            // return;
        }
        this.timer += dt;
        //移动背景
        this.bgMove(this.far_bg, this.far_speed, dt);
        this.bgMove(this.far_bg2, this.far_speed, dt);
        this.checkBgReset(this.far_bg);
        this.checkBgReset(this.far_bg2);
    },

    gainScore: function gainScore() {
        this.score += 1;
        // 更新 scoreDisplay Label 的文字
        this.scoreDisplay.string = 'Score: ' + this.score.toString();
        // 播放得分音效
        cc.audioEngine.playEffect(this.scoreAudio, false);
        if (this.fire_num + 8 - this.node.getChildren().length > 1) {
            this.fire_num -= 1;
        }
    },

    gameOver: function gameOver() {
        this.player.stopAllActions(); //停止 player 节点的跳跃动作
        cc.director.loadScene('homepage'); //这里有bug
    },
    jump: function jump(dt) {
        var player = this.player.getComponent('Player');
        if (dt > this.max_powerup_time) {
            dt = this.max_powerup_time;
        }

        player.YSpeed += dt * player.a;
        player.fall_state = true;
        console.log(player.YSpeed);
    },
    setInputControl: function setInputControl() {
        //
        // touch input
        this.node.on('mousedown', function (event) {
            //this.node调用的是节点上才有用?
            console.log('Mouse down');
            this.startTime = new Date().getTime();
        }, this);

        this.node.on('mouseup', function (event) {
            var lastTime = (new Date().getTime() - this.startTime) / 1000;
            console.log(lastTime);
            this.jump(lastTime);
        }, this);
    }
});

cc._RF.pop();