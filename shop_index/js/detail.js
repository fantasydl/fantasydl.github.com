// 绑定改变颜色的事件
$(document).ready(function(){
	$("#color li").each(function(){
		$(this).bind("click",changeColor);
	})
})

// 改变颜色
function changeColor(event){
	event = event || window.event;
	var target = event.target || event.srcElement;

	if(target.className == 'choosed'){
		return;
	}

	if(target.id == 'grey'){
		$('#navbar').css({"background-color":"#4A4A4A"})
		$('#sideTitle').css({"background-color":"#6E6E6E"})
 	}else if(target.id == 'blue'){
 		$('#navbar').css({"background-color":"#37C7D4"})
		$('#sideTitle').css({"background-color":"#98E0E6"})
 	}else if(target.id == 'red'){
 		$('#navbar').css({"background-color":"#E44072"})
		$('#sideTitle').css({"background-color":"#F296B2"})
 	}

 	$("#color ul li").each(function(){
 		$(this).removeClass("choosed");
 	})

 	target.className = 'choosed';
}

 // 绑定提示搜索框不可用的事件
$(document).ready(function(){
	$("#search").bind("change",function(){
		alert("抱歉！暂不可用！");
	})
})

// 改变大图显示
$(document).ready(function(){
	$("#s-sm-pic li a").each(function(){
		$(this).bind("click",function(){
			var pUrl = $(this).find("img").attr("src");
			$("#s-bg-pic").attr({"src":pUrl});
			$(this).addClass("selected").parent().siblings().find("a").removeClass("selected");
		})
	})
})

// 标签页改变
$(document).ready(function(){
	$("#product-content a").click(function(){
		$(this).addClass("selected").parent().siblings().find("a").removeClass("selected");
		$("#content-p article").eq($("#product-content a").index($(this))).css({"display":"block"}).siblings().css({"display":"none"});
	})
})

// 查看高清大图
$(document).ready(function(){
	$("#look-bg a img").bind("click",function(){
		var pUrl = $("#s-bg-pic").attr("src");
		var height = $(window).height() > $("body").height() ? $(window).height() : $("body").height();
		$(".bg-pic").css({"height":height});
		$("#bg-pic-i").attr({"src":pUrl});
		$(".bg-pic").css({"z-index":"2"}).animate({opacity:"1"},400);
	})
	$(".bg-pic").bind("click",function(){
		$(".bg-pic").animate({opacity:"0"},400,function(){
			$(this).css({"z-index":"-2"});
		});
	})
})

// 改变产品颜色
$(document).ready(function(){
	$("#chooseColor a").click(function(){
		var toColor = $(this).attr("title");
		if($("#chooseColor h3").html() == "颜色：" + toColor){return;}
		$("#chooseColor h3").html("颜色：" + toColor);
		$(this).addClass("selected").parent().siblings().find("a").removeClass("selected");
		$("#s-sm-pic a").each(function(){
			if($(this).attr("title") == toColor){
				$(this).css({"display":"block"});
			}else{
				$(this).css({"display":"none"});
			}
		})
		$("#s-sm-pic a").each(function(){
			if($(this).attr("title") == toColor){
				$(this).click().addClass("selected").parent().siblings().find("a").removeClass("selected");
				return false;
			}
		})
	})
})

// 改变产品尺寸
$(document).ready(function(){
	$("#chooseSize a").click(function(){
		var toSize = $(this).html();
		if($("#chooseSize h3").html() == "尺寸：" + toSize){return;}
		$("#chooseSize h3").html("尺寸：" + toSize);
		$(this).addClass("selected").parent().siblings().find("a").removeClass("selected");
	})
})

// 改变总价
$(document).ready(function(){
	$("#chooseNum").bind("change",function(){
		var count = $("#chooseNum").val();
		var perPrice = +$(".chooseDetail strong").html();
		var sum = count * perPrice;
		$("#cartCount").html("总计：" + sum + "元")
	})
})

var fenshu = 0;
// 给商品打分
$(document).ready(function(){
	$("#chooseStars a").each(function(){
		$(this).bind("mouseover",function(){
			var toClass = "chooseStars" + $(this).html() + "_h";
			$("#chooseStars").removeClass().addClass(toClass).addClass("clearfix");
		})
		$(this).bind("mouseout",function(){
			var toClass = "chooseStars" + fenshu;
			$("#chooseStars").removeClass().addClass(toClass).addClass("clearfix");
		})
		$(this).bind("click",function(){
			var toClass = "chooseStars" + $(this).html();
			fenshu = $(this).html();
			$("#chooseStars").removeClass().addClass(toClass).addClass("clearfix");
			alert("您打的分是" + fenshu + "分，感谢您的评分！")
		})
	})
})

// 加入购物车
$(document).ready(function(){
	$("#btn_cart").click(function(){
		alert("您所购买的商品是：" + $(".chooseDetail h2").html() + "\n"
			+ "单价：" + $(".chooseDetail strong").html() + "元\n"
			+ "颜色：" + $("#chooseColor h3").html().substr(3,2) + "\n"
			+ "尺寸：" + $("#chooseSize h3").html().substr(3,2) + "\n"
			+ "数量：" + $("#chooseNum").val() + "件\n" 
			+ "总价：" + $("#cartCount").html().slice(3,-1) + "元\n" 
			+ "谢谢您的信赖！");
	})
})