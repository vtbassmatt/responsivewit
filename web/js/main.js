$(document).ready(function() {
	$("#fetchWIs").click(function() {
		var vsoUri = "https://" + $("#accountName").val() + ".visualstudio.com/DefaultCollection/_apis/projects?api-version=1.0";
		var paToken = $("#personalAccessToken").val();
		console.log("Calling: " + vsoUri);
		$.ajax({
			"method": "GET",
			"url": vsoUri,
			"crossDomain": true,
			"dataType": "json",
			"jsonp": false,
			"headers": {
				"Authorization": "Basic " + paToken
			}
		}).then(function(data){
			console.log("Got: " + data);
			alert("Got: " + data);
		}).fail(function(jqxhr, status, err){
			console.error("Whoops: " + status);
			console.error(err);
		}).always(function() {
			console.log("done trying");
		});
	});
});
