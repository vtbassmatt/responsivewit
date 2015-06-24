$(document).ready(function() {
	$(document).ajaxError(function(event, jqxhr, settings, err) {
		console.error({
			event, jqxhr, settings, err
		});
		alert("There was an issue, see the error console.");
	});
	
	var authzHeader = null;
	
	var authenticatedGet = function(url) {
		if(authzHeader == null) {
			//var paToken = $("#personalAccessToken").val();
			var paUserPass = $("#username").val() + ":" + $("#password").val();
			authzHeader = "Basic " + Base64.encode(paUserPass);
		}		
		
		console.log("Calling: " + url);
		return $.ajax({
			"method": "GET",
			"url": url,
			"crossDomain": true,
			"dataType": "json",
			"jsonp": false,
			"headers": {
				// TODO: use personal access token instead of alt creds
				"Authorization": authzHeader
			}
		});
	};
	
	$("#fetchProjects").click(function() {
		var vsoUri = "https://" + $("#accountName").val() + ".visualstudio.com/DefaultCollection/_apis/projects?api-version=1.0";
		
		authenticatedGet(vsoUri).then(function(data){
			if (data && data.count && data.count > 0) {
				for(var i = 0; i < data.count; i++) {
					console.log(data.value[i].name);
				}
			}
		});
	});
});
