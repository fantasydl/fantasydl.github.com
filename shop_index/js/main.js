// 加载后执行
window.onload = function(){
	// 改变模板颜色
	var colors = document.getElementById('color').getElementsByTagName('li');
	for(var i = 0,l = colors.length;i < l;i++){
		eventUtil.addHandler(colors[i],'click',changeColor);
	}

	// 滑动显示
	var anavs = document.getElementById('anav').getElementsByTagName('a');
	for(var i = 0,l = anavs.length;i < l;i++){
		eventUtil.addHandler(anavs[i],'click',slideMenu);
	}

	// 不可搜索提示
	var search =document.getElementById('search');
	eventUtil.addHandler(search,'change',function(){
		alert("抱歉！暂不可用！");
	});

	// 焦点轮播图
	var buttons = document.getElementById('buttons').getElementsByTagName('a');
	for(var i = 0,l = buttons.length;i < l;i++){
		eventUtil.addHandler(buttons[i],'mouseover',changePic);
	}
	var ad = document.getElementById('ad');
	eventUtil.addHandler(ad,'mouseover',stop);
	eventUtil.addHandler(ad,'mouseout',play);
	play();

	// 鼠标提示
	var newList = document.getElementById('newList').getElementsByTagName('a');
	for(var i = 0,l = newList.length;i < l;i++){
		eventUtil.addHandler(newList[i],'mouseover',showMeg);
		eventUtil.addHandler(newList[i],'mouseout',function(){
			var dNode = document.getElementById('prompt');
			document.body.removeChild(dNode);
			eventUtil.removeHandler(document,'mousemove',fnMove)
		});
	}
}

var index = 0,
	timer = null,
	prompt = null;

// 改变颜色
function changeColor(event){
	event = event || window.event;
	var target = event.target || event.srcElement;

	if(target.className == 'choosed'){
		return;
	}

	var grey = document.getElementById('grey'),
		blue = document.getElementById('blue'),
		red = document.getElementById('red'),
		navbar = document.getElementById('navbar'),
		sideT = document.getElementById('sideTitle');

	if(target.id == 'grey'){
		navbar.style.backgroundColor = '#4A4A4A';
		sideT.style.backgroundColor = '#6E6E6E';
 	}else if(target.id == 'blue'){
 		navbar.style.backgroundColor = '#37C7D4';
		sideT.style.backgroundColor = '#98E0E6';
 	}else if(target.id == 'red'){
 		navbar.style.backgroundColor = '#E44072';
		sideT.style.backgroundColor = '#F296B2';
 	}
 	grey.className = '';
 	blue.className = '';
 	red.className = '';
 	target.className = 'choosed';
 }

// 实现图片替换和标签替换
 function changePic(){
	var _this = this;
	var now = parseInt(_this.getAttribute('index'));

 	if(index == now){
 		return;
 	}

 	changePicA(index,now);
 }

 function changePicA(now,next){
 	var imgs = document.getElementById('list').getElementsByTagName('img');
 	var buttons = document.getElementById('buttons').getElementsByTagName('a');

 	buttons[now].className = '';
 	buttons[next].className = 'on';
 	mAnimate(imgs[now],{opacity:0});
 	mAnimate(imgs[next],{opacity:100});
 	index = next;
 }

 function play(){
 	timer = setInterval(function(){
 		var next = parseInt(index) < 4 ? parseInt(index) + 1 : 0;
		changePicA(index,next);
 	},2000)
 }

 function stop(){
  	clearInterval(timer);
 }

function slideMenu(){
	var _this = this;
   if(_this.className == 'selected'){
		return;
	}
	var cIndex = parseInt(_this.getAttribute('index')) - 1,
		list2 = document.getElementById('list2'),
		offset = -786*cIndex;
	console.log(offset);
	mAnimate(list2,{left:offset});
	var anavs = document.getElementById('anav').getElementsByTagName('a');
	for(var i = 0,l = anavs.length;i < l;i++){
		anavs[i].className = '';
	} 
	_this.className = 'selected';
}

function showMeg(event){
	event = event || window.event;
	var target = event.target || event.srcElement,
		hBody = document.body;
	prompt = document.createElement('div');
	prompt.id = 'prompt';
	prompt.className = 'prompt';
	prompt.style.display = 'block';
	prompt.innerHTML = target.innerHTML;
	hBody.appendChild(prompt);
	eventUtil.addHandler(document,'mousemove',fnMove);
}

function fnMove(event){
	var _clientX = event.clientX + document.body.scrollLeft + 15,
		_clientY = event.clientY + document.body.scrollTop + 15;
	console.log(_clientX+""+_clientY);
	prompt.style.left = _clientX + 'px';
	prompt.style.top = _clientY + 'px';
}