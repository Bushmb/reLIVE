function watchPlaySetlist() {

	$(".setlist").on('click', '.btn', function(){ 
	     
	     document.location = "http://localhost:8080/setlist/" + $(this).attr("data-artist") + "/" + $(this).attr("data-song")
	     // alert($(this).attr("data-song"));
	});

	$('.artist-results').on('click', '.setListApi', function(){
		// collect the mbid 
		const mbid = $(this).attr("data-mbid");

		const url = "/setlist/" + mbid;


		$.ajax(url)
		  .fail(function(data) {
		    alert( data );
		  })

	})		
}

$(document).ready(function() {

	watchPlaySetlist();

});



