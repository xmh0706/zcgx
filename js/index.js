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
	flash =(flash==6)?5:flash;
	chooseATTR()
}//下一页
// setInterval(function(){nextArrow()},1000)
// 
function closeHideImg () {
	document.getElementById('hide_04').style.display = 'none'
	document.getElementById('hide_05').style.display = 'none'
	document.getElementById('hide_06').style.display = 'none'
	document.getElementById('hide_07').style.display = 'none'
}

function openHideImg04 () {
	document.getElementById('hide_04').style.display = 'block'
}
function openHideImg05 () {
	document.getElementById('hide_05').style.display = 'block'
}
function openHideImg06 () {
	document.getElementById('hide_06').style.display = 'block'
}
function openHideImg07 () {
	document.getElementById('hide_07').style.display = 'block'
}

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
	var width= document.getElementById("banner").offsetWidth
	if (width > 768) {
		$(".page .button").hover(function(){
			$(".hideImg").css('display','block')
		},function(){
			$(".hideImg").css('display','none')
		})
	}
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
				if (flash < 5) {
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
	$(".menuIcon").click(function(e){
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
			if( flash==6 ) {
				flash = 5;
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
	    // if (flash == 6) {
	    // 	$("html").css("overflow","auto")
	    // 	$("body").css("overflow","auto")
	    // }else {
	    // 	$('html,body').animate({scrollTop:0 }, 500);
	    // 	$("html").css("overflow","hidden")
	    // 	$("body").css("overflow","hidden")
	    // }
	    // console.log(e)
	    // console.log(startY)
	});
	$("#bannerContent").bind("touchmove",function(e){  	
			e.preventDefault()
		moveY = 0
	    var moveEndY = e.originalEvent.changedTouches[0].pageY;
	    moveY=moveEndY-startY;
	    // console.log(moveEndY)
	    $('#bannerContent').css("top", (-height*flash)+moveY + "px");
	});
	$("#bannerContent").on("touchend",function(e){
		 //向上滑动
		if(moveY < 0){  
	    	flash ++;
			if( flash==6 ) {
				flash = 5;
				$('html,body').animate({scrollTop:$('#footer').offset().top }, 500);
			}
	    }
	    //向下滑动
	    else if(moveY > 0){
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
