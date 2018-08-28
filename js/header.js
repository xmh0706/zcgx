$(document).ready(function(){
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

})
// 