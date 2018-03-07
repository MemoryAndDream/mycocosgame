"use strict";
cc._RF.push(module, 'ba700cot+ZB27i+awTDaxbv', 'test');
// scripts/test.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
        YSpeed: 0, //����Ϊ��
        g: 50,
        a: 50

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDrawBoundingBox = true;
        manager.enabledDebugDraw = true;
        // ��ʼ�������������
    },
    start: function start() {},
    update: function update(dt) {
        this.fall(dt);
    },

    onCollisionEnter: function onCollisionEnter(other, self) {
        // console.log('on collision enter');//����Ҫ�������������
        //   console.log(this.node.getPosition().x)
        this.YSpeed = -this.YSpeed;
        // ��ײϵͳ��������ײ�������������ϵ�µ���ص�ֵ�����ŵ� world �����������
        var world = self.world;

        // ��ײ����� aabb ��ײ��
        var aabb = world.aabb;

        // ��һ�μ������ײ����� aabb ��ײ��
        var preAabb = world.preAabb;

        // ��ײ����������
        var t = world.transform;

        // ��������ΪԲ����ײ�����������
        var r = world.radius;
        var p = world.position;

        // ��������Ϊ ���� �� ����� ��ײ�����������
        var ps = world.points;
    },

    fall: function fall(dt) {
        this.YSpeed -= this.g * dt;
        var action = cc.moveBy(dt, cc.p(0, this.YSpeed * dt));
        this.node.runAction(action);
    }

});

cc._RF.pop();