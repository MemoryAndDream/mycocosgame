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
        YSpeed : 0, //����Ϊ��
		g:50,
		a:50,
		
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
	 var manager = cc.director.getCollisionManager();
	 manager.enabled = true;
	 manager.enabledDrawBoundingBox = true;
	 manager.enabledDebugDraw = true;
	 // ��ʼ������������ￄ1�7

	 },

    start () {

    },

     update (dt) {
		this.fall(dt)
	 
	 },
  onCollisionEnter: function (other, self) {
   // console.log('on collision enter');//����Ҫ������������ￄ1�7
   //   console.log(this.node.getPosition().x)
	this.YSpeed= -this.YSpeed
    // ��ײϵͳ��������ײ�������������ϵ�µ���ص�ֵ�����ŵ� world ����������ￄ1�7
    var world = self.world;

    // ��ײ����ￄ1�7 aabb ��ײ��
    var aabb = world.aabb;

    // ��һ�μ������ײ����� aabb ��ײ��
    var preAabb = world.preAabb;

    // ��ײ����������
    var t = world.transform;

    // ��������ΪԲ����ײ����������ￄ1�7
    var r = world.radius;
    var p = world.position;

    // ��������Ϊ ���� �� ����ￄ1�7 ��ײ����������ￄ1�7
    var ps = world.points;
},

	fall: function (dt){
	this.YSpeed-= this.g*dt;
	var action = cc.moveBy(dt, cc.p(0, this.YSpeed*dt));
	this.node.runAction(action);
	
	},


		



});
