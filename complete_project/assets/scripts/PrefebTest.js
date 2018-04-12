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
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        this.node.group   = "ground"
        console.log('testprefab');
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        this.node.runAction(this.moveLeftAndRight());
     },

    start () {

    },

     update (dt) {


     },

    moveLeftAndRight:function(){
        var moveLeft = cc.moveBy(2, cc.p(-300,0)).easing(cc.easeCubicActionOut());
        var moveRight = cc.moveBy(2, cc.p(300,0)).easing(cc.easeCubicActionOut());
        return cc.repeatForever(cc.sequence(moveLeft, moveRight));

    },

});
