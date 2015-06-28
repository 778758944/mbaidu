/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-04-21 15:33:52
 * @version $Id$
 */
$(function(){
	var nodee=$("#hot .col-xs-6:even");
	var nodeo=$("#hot .col-xs-6:odd");
	console.log(nodeo[0]);
	function getHot(node1,node2,node3){
		console.log(node1);
		$(node1).children('a').animate({left:"-10px",opacity:0},100,function(){
			this.remove();
			$(node2).children('a').animate({left:"-10",opacity:0},100,function(){
				this.remove();
				$(node3).children('a').animate({left:"-10",opacity:0},100,function(){
					this.remove();
					
						getData(node1,node2,node3);

				});
			});
		});
	}
	$("#hot .change").click(function(){
		$(this).children(".glyphicon").addClass("rotate");
		getHot(nodee[0],nodee[1],nodee[2]);
		getHot(nodeo[0],nodeo[1],nodeo[2]);
	});
	getData(nodee[0],nodee[1],nodee[2]);
	getData(nodeo[0],nodeo[1],nodeo[2]);
	function getData(node1,node2,node3){
		var argArr=Array.prototype.slice.call(arguments);
		$.get("hotdata.json",function(data){
			var a,
			    b,
			    len=data.length,
			    arr=[];
			    console.log(len);
			for(var i=0;i<argArr.length;i++){
				var index=Math.floor(Math.random()*len);
				while(inArray(arr,index)){
					index=Math.floor(Math.random()*len);
				}
				arr.push(index);
				var text=data[index];
				console.log(data);
				console.log(argArr[i]);
				$(argArr[i]).append("<a href='javascript:' style='opacity:0'>"+text+"</a>");
			}
			$(argArr[0]).children("a").animate({opacity:1},100,function(){
				$(argArr[1]).children("a").animate({opacity:1},100,function(){
					$(argArr[2]).children('a').animate({opacity:1},100);
					$("#hot .change .glyphicon").removeClass("rotate");
				});
			});
		});
	}
	function inArray(a,b){
		for(var i=0;i<a.length;i++){
			if(a[i]==b){
				return true;
			}
		}
		return false;
	}
	if(navigator.geolocation){
		var geo=navigator.geolocation;
	}else{
		$(".msg").innerHTML("当前浏览器不支持定位");
	}
	function update(msg){
		$(".msg").text(msg);
	}
	function getPot(location){
		var a=location.coords.latitude.toFixed(2);//获取纬度
		var b=location.coords.longitude.toFixed(2);//获取经度
		var c=location.coords.accuracy;//获取精确度
		var msg="经度："+b+"纬度"+a;
		update(msg);
	}
	function error(e){
		switch(e.code){
			case 0:
			var msg="an error orrced";
			break;

			case 1:
			var msg="user prevented";
			break;

			case 2:
			var msg="failed to get location";
			break;

			case 3:
			var msg="timeout";
			break;
		}
		update(msg);
	}
	geo.getCurrentPosition(getPot,error);
	$("#round .change").click(function(){
		update("定位中......");
		geo.getCurrentPosition(getPot,error);
	});

	function getFilm(obj){
		$(".kk").animate({opacity:0},800,function(){
		$.get("film.json",function(data){
			var index=Math.floor(Math.random()*3);
			var arr=[];
			while(inArray(arr,index)){
				if(arr.length==3){
					arr.length=0;
				}
				index=Math.floor(Math.random()*3);
			}
			arr.push(index);
			var newData=data[index];
			obj.img.attr("src",newData.img);
			var span=document.createElement("span");
			$(span).html("<em>"+newData.score+"</em>");
			$(span).addClass("fg");
			obj.dfg.html($(span));
			for(var i=0;i<newData.tbar.length;i++){
				obj.dfg.append("<span class='fg'>"+newData.tbar[i]+"</span>");
			}
			obj.mx.text(newData["pl"]);
			if(newData.dd){
				obj.d.text("3D");
			}else{
				obj.d.text("2D");
			}
			obj.h6.text(newData.name).append(obj.d);
			$(".kk").attr("href",newData.href).animate({opacity:1},500,function(){
				$("#gl .change .glyphicon").removeClass("rotate");
			});
		});
		});
	}
	var obj={
		img:$(".kk img"),
		dfg:$(".dfg"),
		mx:$(".mx"),
		h6:$("h6"),
		d:$(".d")
	};
	$("#gl .change").click(function(){
		// alert("haha");
		$(this).children(".glyphicon").addClass("rotate");
		getFilm(obj);
	});
	function showOpt(cls,obj){
		var ys=$(cls);
		var see=$(cls+":eq(0)").css('display');
		if(see=="none"){
			ys.css("display","block");
			obj.removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
		}else{
			ys.css("display","none");
			obj.removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
		}
	}
	$(".cl span").click(function(){
		that=$(this);
		showOpt(".ni",that);
	});
	$(".cl2 span").click(function(){
		that=$(this);
		showOpt(".ni2",that);
	});
	$("#nav .tbr").getCd({
		opt:["置顶","编辑","删除"]
	});
	$("#gl .tbr").getCd({
		opt:["置顶","删除"]
	});
	$("#round .tbr").getCd({
		opt:["置顶","删除"]
	});
	$("#hot .tbr").getCd({
		opt:["置顶","修改","删除"]
	});
	var hot=document.querySelector("#hot");
	var gl=document.querySelector("#gl");
	var nav=document.querySelector("#nav");
	var round=document.querySelector("#round");
	console.log(hot.offsetTop);
	function Move(obj){
		this.obj=obj;
		this.top=obj.offsetTop;
		// console.log(this.obj);
	}
	Move.prototype={
		// top:this.obj.offsetTop,
		doMove:function(endt){
			this.obj.className="toTop";
			this.obj.style.top=endt+"px";
		}
	};
	// var ss=new Move(hot);
	// console.log(ss);
	$(".cd").each(function(index,element){
		$(element).children("div:eq(0)").on("click",function(){
			// alert("kk");
			var arr2=[new Move(hot),new Move(gl),new Move(nav),new Move(round)];
			var oparent=$(this).parent().parent().parent();
			console.log(oparent);
			var disY=oparent.position().top;
			var downY=oparent.height()+10;
			console.log(disY);
			console.log(downY);
			var num=arr2.length;
			console.log(arr2);
			for(var i=0;i<num;i++){
				if(arr2[i].top<disY){
					arr2[i].doMove(downY+arr2[i].top);
				}else if(arr2[i].top==disY){
					arr2[i].doMove(0);
				}
			}
		});
	});
	$("#up").click(function(){
		$("#weather").css("height",0);
		$("#header").css("opacity",1);
	});
	$(".c2").click(function(){
		$("#weather").css("height","250px");
		$("#header").css("opacity",0);
	});
});
