//样式获取
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
}
//*obj 操作对象
//*attr 对象属性
//*iTarget 目标值
//*fn 运动结束后，执行的回调函数
//*json 对象属性和目标值以json格式传入
//startMove(obj,{attr1:iTarget1,attr2:iTarget2},fn)
function startMove(obj,json,fn){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var flag = true;//假设停止标杆
		for(attr in json){
			//1.取当前的值
			var icur = 0;
			if(attr === 'opacity'){
				icur = Math.round(parseFloat(getStyle(obj,attr))*100);
			}else{
				icur = parseInt(getStyle(obj,attr));
			}

			//2.运动速度计算
			var speed = (json[attr]-icur)/8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);

			//3.检测停止
			if (icur!=json[attr]){
				flag = false;
			}
				
			if(attr === 'opacity'){
				obj.style.filter = 'alpha(opacity:'+(icur+speed)+')';//ie兼容
				obj.style[attr] = (icur + speed)/100;
			}else{
				obj.style[attr] = icur + speed + 'px';
			}
		}
		if(flag){
			clearInterval(obj.timer);
			if(fn){
				fn();
			}
		}
	},3);
}