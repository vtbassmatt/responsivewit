$(document).ready(function() {
	$(document).ajaxError(function(event, jqxhr, settings, err) {
		console.error({
			event, jqxhr, settings, err
		});
	});
	
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
		}).always(function() {
			console.log("done trying");
		});
	});
});
