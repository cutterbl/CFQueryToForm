<cfsetting enablecfoutputonly="true" />

<cfset REQUEST.allUsers = CreateObject("component","com.cc.Users.Users").getUser() />
<!---<cfdump var="#REQUEST.allUsers#" abort="true" />--->
<cfoutput>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>Untitled Document</title>
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
		<script type="text/javascript" src="/resources/scripts/jquery/cfquerytoform.jquery-0.2.js"></script>
		<script src="/resources/scripts/jquery/jquery.serializeJSON-0.8.js"></script>
		<script type="text/javascript">
			$(document).ready(function(){
				$('select##userId').change(function(e){
					$('form[name="user"]').CFRequestToForm('/com/cc/Users/Users.cfc',"getUser",{userId: $(this).val()},"result");
				});
			});
		</script>
	</head>
	<body>
		<div id="pgContent">
			<select id="userId">
				<option value=""></option>
				<cfloop query="REQUEST.allUsers.result">
					<option value="#REQUEST.allUsers.result.userId#">#REQUEST.allUsers.result.firstName#</option>
				</cfloop>
			</select>
			<hr />
			<form name="user">
				<input type="hidden" name="userId" value="" />
				<label for="firstName">First Name:</label> <input type="text" name="firstName" value="" /><br />
				<label for="lastName">Last Name:</label> <input type="text" name="lastName" value="" /><br />
				<label for="email">Email:</label> <input type="text" name="email" value="" /><br />
				<label for="sex">Sex:</label> <input type="radio" name="sex" value="M" /> Male <input type="radio" name="sex" value="F" /> Female<br />
				<label for="state">State:</label>
				<select name="state">
					<option value=""></option>
					<cfloop query="REQUEST.allUsers.result">
						<option value="#REQUEST.allUsers.result.state#">#REQUEST.allUsers.result.state#</option>
					</cfloop>
				</select>
				<input type="checkbox" name="isActive" value="1" /> <label for="isActive">Active</label><br />
				<label for="info">Info:</label><br />
				<textarea name="info" cols="80" rows="10"></textarea>
			</form>
		</div>
	</body>
</html>
</cfoutput>

<cfsetting enablecfoutputonly="false" />