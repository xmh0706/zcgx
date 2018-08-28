var flash =0
function chooseATTR() {
	var height= document.getElementById("banner").offsetHeight
	$('#bannerContent').css("transition", " top ease-out 0.4s");
	$('#bannerContent').css("top", -height*flash + "px");
	$('#bannerDot li').eq(flash).addClass('nowList').siblings().removeClass('nowList')
	$('#bannerContent > div').eq(flash).removeClass('otherOpacity').siblings().addClass('otherOpacity')
}//改变样式
function preArrow(){
	flash--;
	flash =(flash==-1)?0:flash;
	chooseATTR()
}//上一页
function nextArrow(){
	flash++;
	flash =(flash==7)?6:flash;
	chooseATTR()
}//下一页
// setInterval(function(){nextArrow()},1000)
// 


//

function setVideo () {
	var vHeight= document.getElementById('page_01').offsetHeight
	var vWidth = document.getElementById('page_01').offsetWidth
	if (vWidth*9 > vHeight*16) {
		var top = (vWidth/16*9 - vHeight)/2
		// console.log(top)
		// document.getElementById("indexVideo").style.top = -top +"PX"
		$("#indexVideo").css("top", -top + "px")
		$("#indexVideo").css("width", vWidth + "px")
		$("#indexVideo").css("left", 0)
	}else {
		var left = (vHeight*16/9 - vWidth)/2
		var vWidthChange = vHeight/9*16
		// console.log(vWidthChange)
		$("#indexVideo").css("top", 0)
		$("#indexVideo").css("width", vWidthChange + "px")
		$("#indexVideo").css("left", -left + "px")
	}
}//控制底部视频大小
///
///

$(document).ready(function(){
	var height= document.getElementById("banner").offsetHeight
	$("#bannerContent .button").click(function(){
		$("#bannerContent .button .hideImg").css("display","block")
	})//响应式布局 了解详情点击事件(未做完)


	$("#bannerDot li").click(function(){
  		flash = ($(this).index());
  		chooseATTR()
	});
	//右边列表点击切换

	var waitTime = 0
	$('#bannerContent').bind('mousewheel DOMMouseScroll', function(event) { 
	// console.log(event.originalEvent.wheelDelta);
		if (waitTime == 0) {
			waitTime = 1
			setTimeout(function(){waitTime = 0},500)
			if(event.originalEvent.wheelDelta > 0 || event.detail < 0){
				preArrow();
				$('html,body').animate({scrollTop:0 }, 300)
				return false
			}else{
				if (flash < 6) {
					nextArrow()
					$('html,body').animate({scrollTop:0 }, 300)
					return false
				}else{
					nextArrow();
				}
			}
		}else{
			return false
		}
	});//滚轮切换
	
	var click = 0
	$(".menuIcon").click(function(){
		if(click % 2 == 0) {
			$(".navList").css("display","block");
			$(".menuIcon").css("transform","rotateZ(90deg)")
			click ++
		}else{
			$(".navList").css('display',"none");
			$(".menuIcon").css("transform","none")
			click = 0
		}	
	});//响应式布局menu变化//

	$("#bannerContent").mousedown(function(event){
		var downY = event.originalEvent.clientY	
		chooseY = 0
		$(this).mousemove(function(event){	
			chooseY = event.originalEvent.clientY - downY
			// console.log(event.originalEvent.clientY)
			$('#bannerContent').css("top", (-height*flash)+chooseY + "px");
		})
	})
	$("#bannerContent").mouseup(function(event){
		$(this).unbind('mousemove');
		// console.log(event.originalEvent.clientY)
		if (chooseY < -30) {
			flash ++;
			if( flash==7 ) {
				flash = 6;
				$('html,body').animate({scrollTop:$('#footer').offset().top }, 500);
			}
		}else if(chooseY > 30){
			flash --;
			flash =(flash==-1)?0:flash;
			$('html,body').animate({scrollTop:0 }, 500);
		}
		chooseATTR()
	})//鼠标按住滑动界面
	
	$("#bannerContent").on("touchstart",function(e){
	    startY = e.originalEvent.changedTouches[0].pageY;
	    moveY = 0
	    // console.log(e)
	    // console.log(startY)
	});
	$("#bannerContent").bind("touchmove",function(e){  	
		moveY = 0
	    var moveEndY = e.originalEvent.changedTouches[0].pageY;
	    moveY=moveEndY-startY;
	    // console.log(moveEndY)
	    if (flash = 6){
	    	$('html,body').animate({scrollTop:0 }, 200);
	    }else{
	    	scrollTo(0,0)
	    }
	    $('#bannerContent').css("top", (-height*flash)+moveY + "px");
	});
	$("#bannerContent").on("touchend",function(e){
		 //向上滑动
		if(moveY < -30){  
	    	flash ++;
			if( flash==7 ) {
				flash = 6;
				$('html,body').animate({scrollTop:$('#footer').offset().top }, 500);
			}
	    }
	    //向下滑动
	    else if(moveY > 30){
	    	flash --;
			flash =(flash==-1)?0:flash;
			$('html,body').animate({scrollTop:0 }, 500);
	    }
	    chooseATTR()
	})//移动端touch滑动

	setVideo ()//视频大小控制函数
})
// 
$(window).resize(function(){
	var height= document.getElementById("banner").offsetHeight
	$('#bannerContent').css("transition", "none");
	$('#bannerContent').css("top", -height*flash + "px");

	setVideo ()//视频大小控制函数

	//浏览器大小变化时触发
})
