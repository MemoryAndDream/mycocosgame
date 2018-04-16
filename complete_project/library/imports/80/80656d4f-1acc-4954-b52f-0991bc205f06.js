"use strict";
cc._RF.push(module, '806561PGsxJVLUvCZG8IF8G', 'Fire');
// scripts/Fire.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        // 星星和主角之间的距离小于这个数值时，就会完成收集
        pickRadius: 60,
        // 暂存 Game 对象的引用
        game: {
            default: null,
            serializable: false
        },
        XSpeed: 2
    },

    // use this for initialization
    onLoad: function onLoad() {},

    getPlayerDistance: function getPlayerDistance() {
        // 根据 player 节点位置判断距离
        var playerPos = this.game.player.getPosition();
        // 根据两点位置计算两点之间距离
        var dist = cc.pDistance(this.node.position, playerPos);
        return dist;
    },

    onPicked: function onPicked() {

        // 调用 Game 脚本的得分方法
        this.game.gameOver();
    },

    // called every frame
    update: function update(dt) {
        // 每帧判断和主角之间的距离是否小于收集距离
        if (this.getPlayerDistance() < this.pickRadius) {
            // 调用收集行为
            this.onPicked();
            return;
        }
        if (this.node.getPosition().x < -cc.winSize.width / 2) {
            console.log("new fire");
            // 调用收集行为
            this.game.spawnNewFire();
            this.node.destroy();
        }

        // this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
        this.node.x -= this.XSpeed * dt;
    }
});

cc._RF.pop();