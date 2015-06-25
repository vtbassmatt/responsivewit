$(document).ready(function() {
	$(document).ajaxError(function(event, jqxhr, settings, err) {
		console.error({
			event, jqxhr, settings, err
		});
		alert("There was an issue, see the error console.");
	});
	
	$("#projectForm").hide();
	$("#queryForm").hide();
	var statusText = $("#statusText");
	
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
		$("#accountForm").slideUp(500);
		var vsoUri = "https://" + $("#accountName").val() + ".visualstudio.com/DefaultCollection/_apis/projects?api-version=1.0";

		statusText.text("Fetching projects...");		
		authenticatedGet(vsoUri).then(function(data){
			if (data && data.count) {
				var picker = $("#projectPicker");
				for(var i = 0; i < data.count; i++) {
					var id = data.value[i].id;
					var name = data.value[i].name;
					picker.append("<option value=\"" + id + "\">" + name + "</option>");
				}
			}
			statusText.text("");
			$("#projectForm").show();
		});
		
		return false;
	});
	
	var addQuery = function(item, picker) {
		if(item.isFolder && item.hasChildren && item.children) {
			// folder
			picker.append("<optgroup label=\"" + item.name + "\">");
			for(var i = 0; i < item.children.length; i++) {
				addQuery(item.children[i], picker);
			}
			picker.append("</optgroup>");
		} else if (item.isFolder) {
			// empty folder
			picker.append("<optgroup label=\"" + item.name + " (empty folder)\"></optgroup>");
		} else {
			// not a folder, must be a query
			picker.append("<option value=\"" + item.url + "\">" + item.name + "</option>");
		}
	};
	
	$("#fetchQueries").click(function() {
		$("#projectForm").slideUp(500);
		var vsoUri = "https://" + $("#accountName").val() + ".visualstudio.com/DefaultCollection/"
			+ $("#projectPicker").val()
			+ "/_apis/wit/queries?$depth=2&api-version=1.0";

		statusText.text("Fetching queries...");
		authenticatedGet(vsoUri).then(function(data){
			if (data && data.count) {
				console.log(data);
				var picker = $("#queryPicker");
				for(var i = 0; i < data.count; i++) {
					addQuery(data.value[i], picker);
				}
			}
			statusText.text("");
			$("#queryForm").show();
		});
		
		return false;
	});});
