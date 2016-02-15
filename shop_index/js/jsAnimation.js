// 对象,json保存属性和属性目标,回调函数
function mAnimate(obj,json,fn){ 
	clearInterval(obj.timer)
	obj.timer = setInterval(function(){
		// 假设全部到达目标值
		var flag = true; 
		for(var attr in json){
			// 取当前值
			var iCur = 0;
			if(attr == 'opacity'){
				iCur = Math.round(parseFloat(getStyle(obj,attr))*100);
			}else{
				iCur = parseInt(getStyle(obj,attr))
			}
			// 计算速度
			var speed = (json[attr] - iCur)/8;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			// 判断是否继续
			if(iCur != json[attr]){ // 不是所有都到达目标值则继续
				flag = false;
			}
			if(attr == 'opacity') {
				obj.style.filter = 'alpha:(opacity' + (iCur + speed) +')';
				obj.style.opacity = (iCur + speed)/100;
			}else{
				obj.style[attr] = iCur + speed + 'px';
			}
		}
		// 判断所有都到达目标值则停止
		if(flag == true){ 
			clearInterval(obj.timer);
			if(fn){
				fn();
			}
		}
	},20)
}

//获取样式
function getStyle(obj,iAttr){
	if(obj.currentStyle){
		return obj.currentStyle[iAttr];
	}else{
		return getComputedStyle(obj,false)[iAttr];
	}
}