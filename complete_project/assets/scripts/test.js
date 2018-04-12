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
        YSpeed : 0, //锟斤拷锟斤拷为锟斤拷
		g:50,
		a:50,
		
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
	 var manager = cc.director.getCollisionManager();
	 manager.enabled = true;
	 manager.enabledDrawBoundingBox = true;
	 manager.enabledDebugDraw = true;
	 // 锟斤拷始锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟�

	 },

    start () {

    },

     update (dt) {
		this.fall(dt)
	 
	 },
  onCollisionEnter: function (other, self) {
   // console.log('on collision enter');//锟斤拷锟斤拷要锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟�
   //   console.log(this.node.getPosition().x)
	this.YSpeed= -this.YSpeed
    // 锟斤拷撞系统锟斤拷锟斤拷锟斤拷锟斤拷撞锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟较碉拷碌锟斤拷锟截碉拷值锟斤拷锟斤拷锟脚碉拷 world 锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟�
    var world = self.world;

    // 锟斤拷撞锟斤拷锟斤拷锟� aabb 锟斤拷撞锟斤拷
    var aabb = world.aabb;

    // 锟斤拷一锟轿硷拷锟斤拷锟斤拷锟阶诧拷锟斤拷锟斤拷 aabb 锟斤拷撞锟斤拷
    var preAabb = world.preAabb;

    // 锟斤拷撞锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷
    var t = world.transform;

    // 锟斤拷锟斤拷锟斤拷锟斤拷为圆锟斤拷锟斤拷撞锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟�
    var r = world.radius;
    var p = world.position;

    // 锟斤拷锟斤拷锟斤拷锟斤拷为 锟斤拷锟斤拷 锟斤拷 锟斤拷锟斤拷锟� 锟斤拷撞锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟�
    var ps = world.points;
},

	fall: function (dt){
	this.YSpeed-= this.g*dt;
	var action = cc.moveBy(dt, cc.p(0, this.YSpeed*dt));
	this.node.runAction(action);
	
	},


		



});
