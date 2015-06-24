$(document).ready(function() {
	$(document).ajaxError(function(event, jqxhr, settings, err) {
		console.error({
			event, jqxhr, settings, err
		});
		alert("There was an issue, see the error console.");
	});
	
	$("#fetchWIs").click(function() {
		var vsoUri = "https://" + $("#accountName").val() + ".visualstudio.com/DefaultCollection/_apis/projects?api-version=1.0";
		//var paToken = $("#personalAccessToken").val();
		var paUserPass = $("#username").val() + ":" + $("#password").val();
		var paAuthz = Base64.encode(paUserPass);
		
		console.log("Calling: " + vsoUri);
		$.ajax({
			"method": "GET",
			"url": vsoUri,
			"crossDomain": true,
			"dataType": "json",
			"jsonp": false,
			"headers": {
				// TODO: use personal access token instead of alt creds
				"Authorization": "Basic " + paAuthz
			}
		}).then(function(data){
			console.log(data);
			alert("Check console for results!");
		}).always(function() {
			console.log("done trying");
		});
	});
});
