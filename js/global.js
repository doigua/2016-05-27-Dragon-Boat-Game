var ctx = "/o2o-customer-web";
var dayList = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
var globalGender = ["女","男"];
var chineseFigures0 = ["零","壹","贰","叁","肆","伍","陆","柒","捌","玖"];
var chineseFigures1 = ["","拾","佰","仟"];
var chineseFigures2 = ["","万","亿","兆"];
var interval,timer;
function goback(){
	$('.icon-back').click(function(){
		var href = location.href;
		if(href.indexOf("login.html")>-1){
			if(href.split("?").length >　1 && href.split("?")[1].indexOf("link") > -1){
				history.go(-2);
			}else{
				history.go(-1);
				//window.location.href = document.referrer;
			}
		}else{
			history.go(-1);
		}
	});
	$(".icon-financ").click(function(){
		window.location.href = "financeList.html";
	});
	$(".icon-found").click(function(){
		window.location.href = "foundList.html";
	});
}
$(document).ready(function(){
	goback();	
});
function getPara(arr){
	try{
		var paras = location.href.split("?")[1].split("#")[0].split("&");
		var result = [];
		var flag = 0;
		for(var j=0;j<arr.length;j++){
			flag = 0;
			for(var i=0;i<paras.length;i++){
				var temp = paras[i].split("=");
				if(arr[j]==temp[0]){
					result[j] = decodeURI(temp[1]);
					flag = 1;
				}
			}
			if(flag == 0){
				result[j] = "";
			}
		}
		return result;
	}catch(e){}
}
//表单验证
function isNull(str,tar){
	//验证是否为空
	if($.trim(str) == "" ){
		$("#"+tar).val("");
		return true;
	}else{
		return false;
	}
}
function isNumber(str,tar){
	//验证数字
	var regu = /^[0-9]+$/;
	var re = new RegExp(regu);
	return re.test(str);
}
function isCh(str){
	//验证汉字
	var regu = /^[\u4E00-\u9FA5]+$/;
	var re = new RegExp(regu);
	return re.test(str);
}
function isMulti(str){
	//验证汉字数字字母组合
	var regu = /^(\w|[\u4E00-\u9FA5])*$/;
	var re = new RegExp(regu);
	return re.test(str);
}
function isPwd(str){
	//验证数字字母组合
	var regu = /\w*[0-9]+\w*$/;
	var re = new RegExp(regu);
	var len1 = re.test(str);
	regu = /\w*[A-Za-z]+\w*$/;
	re = new RegExp(regu);
	var len2 = re.test(str);
	return len1&&len2;
}
function isPhone(str,tar){
	//验证手机
	var regu = /^(1[3,4,5,7,8])\d{9}$/;
	var re = new RegExp(regu);
	if(!re.test(str)){
		//$("#"+tar).focus().val("");
	}
	return re.test(str);
}
function isCert(str,tar){
	//验证身份证号码
	var reminder = ["1","0","X","9","8","7","6","5","4","3","2"];
	var regu = /^\d{6}(18|19|20)?\d{2}([0][1-9]|[1][0-2])([0][1-9]|[1-2]\d{1}|[3][0,1])\d{3}(\d{1}|X|x)?$/;
	var re = new RegExp(regu);
	if(!re.test(str)){
		$("#"+tar).val("");
	}
	if(re.test(str)){
		if(str.length == 15){
			return true;
		}else{
			var arr = str.split("");
			var arrCode = 0;
			for(var i=0;i<17;i++){
				arrCode += Math.pow(2,17-i)*parseInt(arr[i]);
			}
			var resCode = arrCode%11;
			arr[17] = arr[17] == "x" || arr[17] == "X" ? "X" : arr[17];
			if(reminder[resCode] == arr[17]){
				return true;
			}else{
				$("#"+tar).val("");
				return false;
			}
		}
	}else{
		return re.test(str);
	}
}
function getLength(str){
	var len = 0;
	for(var i=0;i<str.length;i++){
		var c = str.charCodeAt(i);
		if((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)){
			len += 1;
		}else{
			len += 2;
		}
	}
	return len;
}
//提示
function alertCode(str){
	$("#alertError").html("温馨提示");
	$("#alertmap img").attr("src","images/xx.png");
	$("#alertTxt").html(str);
	if(str == "请添加家庭成员！" || str.indexOf("绑定银行卡") > -1){
		$("#alertClose button.quit").show();
	}else{
		$("#alertClose button.quit").hide();
	}
	$("#alertMask").show();
}
function alertCodeSuccess(str){
	$("#alertError").html("操作成功！");
	$("#alertmap img").attr("src","images/xx2.png");
	$("#alertTxt").html(str);
	$("#alertClose button.quit").hide();
	$("#alertMask").show();
}
function closealert(obj){
	var txt = $("#alertTxt").html();
	if(txt.indexOf("绑定银行卡") > -1 && $(obj).html() == "确定"){
		window.location.href = "user-mybankcard.html";
	}
	$("#alertMask").hide();
	$(".mask").hide();
}
//倒计时
function countDown(t,id,txt){
	timer = window.setInterval(function(){
		if(t > 0){
			t--;
			$("#"+id).html(t+"秒");
		}else{
			window.clearInterval(timer);
			$("#"+id).addClass("active").html(txt);
		}
	},1000)
}
function stopCountDown(){
	window.clearInterval(timer);
}
function closeUpdate(id){
	$("#"+id).hide()
}
//登录
function openLogin(){
	//$("#loginMask").show();
	var link = encodeURIComponent(window.location.href);
	window.location.href = "login.html?link="+link;
}
function logIn(){	
	var userName = $("#username").val();
	var password = $("#password").val();
	if(isNull(userName,"username")){
		alertCode("请输入用户名！");
		return false;
	}
	if(isNull(password,"password")){
		alertCode("请输入密码！");
		return false;
	}
	var today = new Date();	
	$.ajax({
		url:ctx+"/unauth/getKey?date="+today.getTime(),
		dataType:"json",
		type:"get",
		success:function(data_key){
			if(data_key.code!="10000"){
				alertCode("获取加密数据失败");
			}else{
				var encryptPass = hsRSAEncrypt(password,data_key.key);
				$.ajax({
					url:ctx+"/login",
					data:{
						"userName":userName,
						"password":encryptPass
						},
					dataType:"json",
					type:"post",
					success:function(data){
						if(data.code == 10001){
							alertCode(data.msg);
						}else{
							localStorage.logIn = "10000";
							data.username = userName;
							localStorage.user = JSON.stringify(data);
							location.reload(true);
						}
					}
				});
			}
		}
	});
}

//注册
function regalert(){
	window.location.href = "reg0.html";
}
function regDir(){
	$.ajax({
		url:ctx+"/unauth/desUrl",
		type:"post",
		data:{"url":location.href,"jump":"app.register.url"},
		dataType:"json",
		success:function(res){
			if(res.code == "10000"){
				window.location.href = res.desUrl;
			}
		}
	})
}
//忘记密码
function findPwd(){
	window.location.href = "findPwd.html";
}
//更新生日、性别
function openUpdate(){
	$("#updateMask").show();
}
function updateUserInfo(){
	var birthDay = $("#birthday").val().split("-").join("");
	if($("#gender0").prop("checked")){
		var gender = 0;
	}else{
		var gender = 1;
	}
	if(isNull(birthDay,"birthDay")){
		alertCode("生日不能为空！");
		return false;
	}
	$.ajax({
		url:ctx+"/updateUserInfo",
		data:{
			"birthDay":birthDay,
			"gender":gender
			},
		dataType:"json",
		type:"post",
		success:function(data){
			if(data.code == 00001){
				$("#updateMask").hide();
				$("#loginMask").hide();
			}else if(data.code == 10001){
				alertCode("提交失败！");
			}else{
				localStorage.logIn = "10000";
				var userInfo = JSON.parse(localStorage.user);
				userInfo.birthDay = birthDay;
				userInfo.gender = gender;
				localStorage.user = JSON.stringify(userInfo);
				$("#updateMask").hide();
			}
		}
	});
}
//退出
function exit(){
	$.ajax({
		url:ctx+"/logout",
		dataType:"json",
		type:"get",
		success:function(data){
			if(data.code == 10000){
				try{
					localStorage.logIn = "00001";
				}catch(e){}
				window.location.href = "index.html";
			}else if(data.code == 10001){
				alertCode("退出失败！");
			}
		}
	});
}
//关闭
$(document).delegate("#loginMask,#updateMask","click",function(e){
	var tar = e.target;
	if($(tar).attr("id")=="loginBox" || $(tar).attr("id")=="updateBox" || $(tar).parents("#loginBox").length > 0 || $(tar).parents("#updateBox").length > 0 ){
	}else{
		$(this).hide();
	}
})
//没有内容
function nothing(str){
	$(str).html('<img src="images/nothing1.png" style="width:100%" />');
}
function nothing2(str){
	$(str).html('<img src="images/nothing2.png" style="width:100%" />');
}
//活动倒计时
function recount(etime,reType){
	var interval = window.setInterval(function(){
		var cTime = $("#currentTime").val();
		var now = new Date(cTime.substring(0,4),parseInt(cTime.substring(4,6))-1,cTime.substring(6,8),cTime.substring(8,10),cTime.substring(10,12),cTime.substring(12,14));
		var nowTm = now.getTime();
		var localTime = $("#localTime").val();
		var toDay = new Date();
		nowTm += toDay.getTime() - parseInt(localTime);
		
		var count = Math.round((etime-nowTm)/100);
		if(count > 0){
			var mSeconds = count%10;
			var days = Math.floor(count/(36000*24));
			var hours = Math.floor((count%(36000*24))/36000);
			var minutes = Math.floor((count%36000)/600);
			var seconds = Math.floor((count%36000)%600/10);
			$("#recountDis").html(days+"天"+hours+"小时"+minutes+"分"+seconds+"."+mSeconds+"秒");
		}else{
			window.clearInterval(interval);
			if(reType == 1){
				$("#actOperate").show();
				$("#recountType").html("结束");
				recount($("#eDate").val(),0);
			}else{
				$(".recount").html("活动已结束");
				$("#actOperate").hide();
			}
		}
	},100)
}
//列表页面活动倒计时
function recountTot(stime,etime,reType){
	if(reType == 1){
		var timeStamp = stime;
	}else{
		var timeStamp = etime;
	}
	getCountDownPara(stime,etime,timeStamp,reType);
	interval = window.setInterval(function(){
		getCountDownPara(stime,etime,timeStamp,reType);
	},1000);
}
function getCountDownPara(stime,etime,timeStamp,reType){
	var status = ["结束","开始"]
	
	var cTime = $("#currentTime").val();
	var now = new Date(cTime.substring(0,4),parseInt(cTime.substring(4,6))-1,cTime.substring(6,8),cTime.substring(8,10),cTime.substring(10,12),cTime.substring(12,14));
	var nowTm = now.getTime();
	var localTime = $("#localTime").val();
	var toDay = new Date();
	nowTm += toDay.getTime() - parseInt(localTime);
	
	var count = Math.round((timeStamp-nowTm)/1000);
	if(count > 0){
		if(reType == 0){
			$(".purchaseBtn").removeClass("disabled");
		}else{
			$(".purchaseBtn").addClass("disabled");
		}
		//var mSeconds = count%10;
		var days = Math.floor(count/(3600*24));
		var hours = Math.floor(count%(3600*24)/3600);
		var minutes = Math.floor((count%3600)/60);
		var seconds = Math.floor((count%3600)%60);
		var days1 = Math.floor(days/10);
		var days2 = days%10;
		var hours1 = Math.floor(hours/10);
		var hours2 = hours%10;
		var minutes1 = Math.floor(minutes/10);
		var minutes2 = minutes%10;
		var seconds1 = Math.floor(seconds/10);
		var seconds2 = seconds%10;
		$("#countDown").html("距离"+status[reType]+"还剩<i><span>"+days1+"</span><span>"+days2+"</span>天<span>"+hours1+"</span><span>"+hours2+"</span>时<span>"+minutes1+"</span><span>"+minutes2+"</span>分<span>"+seconds1+"</span><span>"+seconds2+"</span>秒</i>");
	}else{
		window.clearInterval(interval);
		if(reType == 1){
			recountTot(stime,etime,0);
			$(".purchaseBtn").html("即将开始");
		}else{
			$(".purchaseBtn").addClass("disabled");
			$("#countDown").html("活动已结束");
			if($("#actType").val() == 2){
				$(".purchaseBtn").html("秒杀结束");
			}else{
				$(".purchaseBtn").html("团购结束");
			}
		}
	}
}
//本地缓存保存
function storageSave(key,val){
	if(localStorage){
		localStorage.setItem(key,val);
	}else{
		Cookie.write(key,val);
	}
}

//获取缓存数据
function storageGet(key){
	if(localStorage.getItem(key)!=null){
		return localStorage.getItem(key);
	}else if(Cookie.read(key)!=null){
		return Cookie.read(key);
	}
}
//touchmove模拟滚动条
function isTouchDevice(){
	try{
		document.createEvent("TouchEvent");
		return true;
	}catch(e){
		return false;
	}
}
function touchScroll(id){
	if(isTouchDevice()){
		var el = document.getElementById(id);
		var scrollStartPos = 0;
		
		el.addEventListener("touchstart",function(event){
			scrollStartPos = this.scrollTop + event.touches[0].pageY;
			//event.preventDefault();
		},false);
		
		el.addEventListener("touchmove",function(event){
			this.scrollTop = scrollStartPos - event.touches[0].pageY;
			//event.preventDefault();
		},false);
	}
}
//数字转中文
function numToChi(str){
	var arr = str.split(".");
	var strrev = arr[0].split("").reverse().join("");
	var zero = "";
	var newary = "";
	var i4 = -1;
	for(var i=0;i<strrev.length;i++){
		if(i%4 == 0){
			i4++;
			newary = chineseFigures2[i4] + newary;
			zero  = "";
		}
		if(strrev[i] == 0){
			switch(i%4){
				case 0:
					break;
				case 1:
				case 2:
				case 3:
					if(strrev[i-1] != 0){
						zero = "零"
					};
					break;
			}
			newary = zero + newary;
			zero = "";
		}else{
			newary = chineseFigures0[strrev[i]] + chineseFigures1[i%4] + newary;
		}
	}
	if(newary.indexOf("零") == 0){
		newary = newary.substr(1);
	}
	if(arr.length == 1){
		newary += "圆整";
	}else{
		var temp = (parseFloat("0."+arr[1])*100).toString().split(".")[0];
		newary += "圆" + chineseFigures0[Math.floor(temp/10)] + "角" + chineseFigures0[temp%10] + "分";
	}
	return newary;
}