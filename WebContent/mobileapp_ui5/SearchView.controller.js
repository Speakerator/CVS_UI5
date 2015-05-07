sap.ui.controller("mobileapp_ui5.SearchView", {

//	
	
	
_apiKey : "Yw4AuPNCzLHvBv86",
_view : null,
	
	onArtistSearch : function(){
		
		var oInput = this.getView().byId("artistInput").getValue();
		var oResponse = new sap.ui.model.json.JSONModel();
		var queryUrl = "http://api.songkick.com/api/3.0/search/artists.json?query=" + oInput + "&apikey=Yw4AuPNCzLHvBv86";
		try {
			oResponse.loadData(queryUrl, null,false);	
		} catch (e) {
			alert("Something bad happened!");
		}
		
		sap.ui.getCore().setModel(oResponse, "ArtistSearch");
		var rLength = parseInt(oResponse.getProperty("/resultsPage/totalEntries"));
		
		if(rLength == 0){
			sap.m.MessageToast().show("Sorry, no artists match your search");
		}else if(rLength == 1){
			
			sap.m.MessageToast().show("We should do some navigation");
			var id = oResponse.getProperty("/resultsPage/results/artist/0/id");
			this.getArtistCalendar(id);
			
		}else{
			var bus = sap.ui.getCore().getEventBus();
			
			bus.publish("nav", "to", {
				dest : "ArtistSelect",
				context : undefined
			});
		}
		
		// oResponse.getProperty("/resultsPage/status")
		// http://api.songkick.com/api/3.0/search/artists.json?query=Coldplay&apikey=Yw4AuPNCzLHvBv86
	
	},
	
	
	getArtistCalendar : function(id){
		var oCalendaroResponse = new sap.ui.model.json.JSONModel();
		var queryUrl = "http://api.songkick.com/api/3.0/artists/"+ id + "/calendar.json?apikey=Yw4AuPNCzLHvBv86";
		try {
			oCalendaroResponse.loadData(queryUrl, null,false);	
		} catch (e) {
			alert("Something bad happened!");
		}			
		
		sap.ui.getCore().setModel(oCalendarResponse, "ArtistCalendar");
		var rLength = parseInt(oCalendarResponse.getProperty("/resultsPage/totalEntries"));
		
		if(rLength === 0){
			sap.m.MessageToast().show("Sorry, no current events");
		}else{
			sap.m.MessageToast().show("There are events, let's go there!");
			var bus = sap.ui.getCore().getEventBus();
			
			bus.publish("nav", "to", {
				dest : "ArtistCalendar",
				context : undefined
			});
		}
	},
	onCitySearch : function(){
		
	},
	
	onLocationSearch : function(){
		
	},
	
	
	

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf mobileapp_ui5.SearchView
	 */
	 onInit: function() {
			this._view = this;	
		 },

/**
 * Similar to onAfterRendering, but this hook is invoked before the controller's
 * View is re-rendered (NOT before the first rendering! onInit() is used for
 * that one!).
 * 
 * @memberOf mobileapp_ui5.SearchView
 */
// onBeforeRendering: function() {
//
// },

/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf mobileapp_ui5.SearchView
 */
// onAfterRendering: function() {
//
// },

/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf mobileapp_ui5.SearchView
 */
// onExit: function() {
//
// }

});