/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-04-24 21:49:40
 * @version $Id$
 */
(function($){
	$.fn.getCd=function(options){
		var options=$.extend({
			cssName:"cd",
			top:"20px",
			left:"-90px",
			width:"91px",
			opt:"置顶",
			zIndex:20
		},options);
		var len=options.opt.length;
		var div=$("<div>");
		div.addClass(options.cssName);
		div.css("position","absolute");
		div.css("top",options.top);
		div.css("left",options.left);
		div.css("width",options.width);
		div.css("zIndex",options.zIndex);
		div.css("backgroundColor","#fff");
		div.css("display","none");
		div.css("boxShadow","0.5px 0.5px 1px 0.5px #ccc");
		for(var i=0;i<len;i++){
			div.append('<div>'+options.opt[i]+"</div>");
		}
		this.append(div);
		this.click(function(){
			if(div.css("display")=="none"){
				$(".cd").css("display","none");
				div.css("display","block");
			}else{
				div.css("display","none");
			}
		});
		return this;
	};
}(jQuery));
