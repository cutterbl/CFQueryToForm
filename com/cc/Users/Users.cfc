<cfcomponent displayname="Users" output="false">

	<cffunction name="getUser" displayname="getUser" hint="Gets a User by userId" access="remote" output="false" returntype="struct">
		<cfargument name="userId" type="numeric" hint="The userId of the user to return" required="false" default="0" />
		<cfset var LOCAL = StructNew() />
		<cfset LOCAL.retVal = StructNew() />
		<cfset LOCAL.retVal['success'] = true />
		<cftry>
			<cfquery name="LOCAL.user">
				SELECT	userId,
						email,
						firstName,
						lastName,
						sex,
						isActive,
						state,
						info
				FROM	Users
				<cfif ARGUMENTS.userId>
					WHERE	userId = <cfqueryparam cfsqltype="cf_sql_integer" value="#ARGUMENTS.userId#" />
				<cfelse>
					ORDER BY firstName
				</cfif>
			</cfquery>
			<cfif LOCAL.user.recordCount>
				<cfset LOCAL.retVal['result'] = LOCAL.user />
			<cfelse>
				<cfthrow type="My_Custom" errorcode="0001" message="No User was found matching your request." />
			</cfif>
			<cfcatch type="any">
				<cfset LOCAL.retVal['success'] = false />
				<cfset LOCAL.retVal['message'] = CFCATCH.message />
			</cfcatch> 
		</cftry>
		<cfreturn LOCAL.retVal />
	</cffunction>

</cfcomponent>