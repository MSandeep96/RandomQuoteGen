jQuery(function($){

	// Fetches quotes and displays it
	function setNewQuote(){
		
		$(".btn_sty").html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>').prop('disabled',true);
		$.ajax({
			
			url:"http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_jsonp=?",
			
			dataType:"jsonp",
			
			success:function(quot_json){
				$(".quots_here").html(quot_json[0].content).animateCss('fadeIn');
				$(".auths_here").html("- "+quot_json[0].title).animateCss('fadeIn');
				$(".post_to_twit").html(getTheShareLink(quot_json)).prop('disabled',false).animateCss('tada');
				$(".fetch_new").html('<i class="fa fa-arrow-circle-right"></i>').prop('disabled',false).animateCss('tada');
			},
			
			cache:false
		})
	}

	// Creates link with quote in it
	function getTheShareLink(quo_in_json){
		
		var link='<a class="twitter-share-button" href="https://twitter.com/intent/tweet?text=';
		
		quo_in_json[0].content=quo_in_json[0].content.replace("<p>","");
		
		quo_in_json[0].content=quo_in_json[0].content.replace("</p>","");
		
		quo_in_json[0].content=quo_in_json[0].content.replace("&#8217;","'");
		
		var quote=quo_in_json[0].content+"-"+quo_in_json[0].title;
		
		quote=quote.substr(0,130);
		
		link+=encodeURIComponent(quote);
		
		link+='" target="_blank"><i class="fa fa-twitter"></i></a>';
		
		console.log(link);

		return link;
	}

	// Removes animations when done
	$.fn.extend({
		animateCss: function (animationName) {
			var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
			this.addClass('animated ' + animationName).one(animationEnd, function() {
				$(this).removeClass('animated ' + animationName);
			});
		}
	});

	setNewQuote();

	$(".fetch_new").on('click',function(){
		
		setNewQuote();

	});



});