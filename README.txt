The 'cftf' folder, to which this README file is in, is considered the root folder of the demo site. Should you change the root, make sure to change any relevant pathing to match.

This encompasses two separate JQuery Plugins: CFRequestToForm, and CFQueryToForm

CFRequestToForm is reliant upon CFQueryToForm, but not vice versa.

CFQueryToForm will take ColdFusion's native JSON serialization of it's native ColdFusion Query object, and apply the result to a form's fields.

CFRequestToForm will take a configuration object that will then make an Ajax request, based upon the configuration, and automatically apply the result to the form is was applied upon.

See the js file for documentation of usage.

A MySQL script can be found in the /resources/db/ folder that will create the sample table used by the demo. This example should be compatible with ColdFusion 8 or higher.