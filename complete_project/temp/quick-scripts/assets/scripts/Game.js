(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4e12fLSQu1L+KV6QmxDiavU', 'Game', __filename);
// scripts/Game.js

'use strict';

var Test = require("test");
cc.Class({
    extends: cc.Component,

    properties: {
        // 这个属性引用了星星预制资源
        starPrefab: {
            default: null,
            type: cc.Prefab
        },
        testPrefab: {
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
        far_speed: 0.2
    },

    // use this for initialization
    onLoad: function onLoad() {
        // 获取地平面的 y 轴坐标
        this.groundY = this.ground.y + this.ground.height / 2;
        // 初始化计时器
        this.timer = 0;
        this.starDuration = 0;
        // 生成一个新的星星
        this.spawnNewStar();
        this.spawnNewTestPrefeb();
        // 初始化计分
        this.score = 0;
        this.setInputControl();
        this.fixBgPos(this.far_bg[0], this.far_bg[1]);
    },
    fixBgPos: function fixBgPos(bg1, bg2) {
        bg1.x = 0;
        //利用前一张图片的边框大小设置下一张图片的位置  
        var bg1BoundingBox = bg1.getBoundingBox();
        bg2.setPosition(bg1BoundingBox.xMax, bg1BoundingBox.yMin);
    },

    bgMove: function bgMove(bgList, speed) {
        for (var index = 0; index < bgList.length; index++) {
            var element = bgList[index];
            element.x -= speed;
        }
    },
    //检查是否要重置位置  
    checkBgReset: function checkBgReset(bgList) {
        var winSize = cc.director.getWinSize();
        var first_xMax = bgList[0].getBoundingBox().xMax;
        if (first_xMax <= 0) {
            console.log('xMax<0');
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
        // 重置计时器
        this.starDuration = this.minStarDuration + cc.random0To1() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    },

    getNewStarPosition: function getNewStarPosition() {

        var randX = 0;
        // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
        var randY = this.groundY + cc.random0To1() * this.player.getComponent('Player').jumpHeight + 50;
        // 根据屏幕宽度，随机得到一个星星 x 坐标
        var maxX = this.node.width / 2;
        randX = cc.randomMinus1To1() * maxX;
        // 返回星星坐标
        return cc.p(randX, randY);
    },
    spawnNewTestPrefeb: function spawnNewTestPrefeb() {
        console.log('testPrefeb');
        // 使用给定的模板在场景中生成一个新节点
        var newTestPrefab = cc.instantiate(this.testPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newTestPrefab);
        // 为星星设置一个随机位置
        newTestPrefab.setPosition(this.getNewTestPrefebPosition());
    },
    getNewTestPrefebPosition: function getNewTestPrefebPosition() {
        var randX = 0;
        // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
        var randY = this.groundY + cc.random0To1() * this.player.getComponent('Player').jumpHeight + 20;
        // 根据屏幕宽度，随机得到一个星星 x 坐标
        var maxX = this.node.width / 2;
        randX = cc.randomMinus1To1() * maxX;
        // 返回星星坐标
        return cc.p(randX, randY);
    },

    // called every frame
    update: function update(dt) {
        // 每帧更新计时器，超过限度还没有生成新的星星
        // 就会调用游戏失败逻辑
        if (this.timer > this.starDuration) {
            // this.gameOver();
            return;
        }
        this.timer += dt;
        //移动背景
        this.bgMove(this.far_bg, this.far_speed);
        this.checkBgReset(this.far_bg);
    },

    gainScore: function gainScore() {
        this.score += 1;
        // 更新 scoreDisplay Label 的文字
        this.scoreDisplay.string = 'Score: ' + this.score.toString();
        // 播放得分音效
        cc.audioEngine.playEffect(this.scoreAudio, false);
    },

    gameOver: function gameOver() {
        this.player.stopAllActions(); //停止 player 节点的跳跃动作
        cc.director.loadScene('game');
    },
    jump: function jump(dt) {
        var player = this.player.getComponent('Player');
        player.YSpeed += dt * player.a;
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
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Game.js.map
        