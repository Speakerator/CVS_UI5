sap.ui.controller("mobileapp_ui5.InitialView", {

/**
 * Called when a controller is instantiated and its View controls (if available)
 * are already created. Can be used to modify the View before it is displayed,
 * to bind event handlers and do other one-time initialization.
 * 
 * @memberOf mobileapp_ui5.InitialView
 */
	
	_apiKey : "Yw4AuPNCzLHvBv86",
	
	onArtistSearch : function(){
		var oInput = "Coldplay";
		var oResponse = new sap.ui.model.json.JSONModel();
		var queryUrl = "http://api.songkick.com/api/3.0/search/artists.json?query=Coldplay&apikey=Yw4AuPNCzLHvBv86";
		oResponse.loadData(queryUrl, null,false);
		var tmp = oResponse.getJSON;
		var x = "y";
		//http://api.songkick.com/api/3.0/search/artists.json?query=Coldplay&apikey=Yw4AuPNCzLHvBv86
		
		
		//http://scn.sap.com/thread/3380807 as a solution
	},
	onCitySearch : function(){
		
	},
	
	onLocationSearch : function(){
		
	},
	
	
	
// onInit: function() {
//		
// },

/**
 * Similar to onAfterRendering, but this hook is invoked before the controller's
 * View is re-rendered (NOT before the first rendering! onInit() is used for
 * that one!).
 * 
 * @memberOf mobileapp_ui5.InitialView
 */
// onBeforeRendering: function() {
//
// },

/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf mobileapp_ui5.InitialView
 */
// onAfterRendering: function() {
//
// },

/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf mobileapp_ui5.InitialView
 */
// onExit: function() {
//
// }

});