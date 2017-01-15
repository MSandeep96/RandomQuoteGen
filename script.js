jQuery(function($){

	function setNewQuote(){

		$.ajax({
			url:"http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_jsonp=?",
			dataType:"jsonp",
			success:function(quot_json){
				$(".quots_here").html(quot_json[0].content);
				$(".auths_here").html("- "+quot_json[0].title);
			},
			cache:false
		})
	}

	setNewQuote();

	$(".fetch_new").on('click',function(){
		setNewQuote();
	});



});