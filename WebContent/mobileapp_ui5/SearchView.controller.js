sap.ui.controller("mobileapp_ui5.SearchView", {

//	
	
	
_view : null,

onInit: function() {
	this._view = this;	
 },

	
	onArtistSearch : function(evt){
		var oPanel = this.getView().byId("mainPanel");
		var oInput = evt.mParameters.query;
		//Search query is empty or delete button pressed
		if(oInput === ""){
			return;
		}
		var oResponse = new sap.ui.model.json.JSONModel();
		var apiKey = sap.ui.getCore().byId("appView").getController().getApiKey();
		var queryUrl = "http://api.songkick.com/api/3.0/search/artists.json?query=" + oInput + "&apikey=" + apiKey;
		var oDialog = this.getView().byId("BusyDialog_Search");
	    oDialog.open();
		try {
			oResponse.loadData(queryUrl, null,false);	
		} catch (e) {
			oDialog.close();
			alert("Something bad happened!");
		}
		oDialog.close();
		sap.ui.getCore().setModel(oResponse, "ArtistSearch");
		var rLength = parseInt(oResponse.getProperty("/resultsPage/totalEntries"));
		
		if(rLength == 0){
			sap.m.MessageToast.show("Sorry, no artists match your search");
		}else{
			var bus = sap.ui.getCore().getEventBus();
			
			bus.publish("nav", "to", {
				dest : "ArtistSelect",
				context : undefined
			});
		}
	
	},
	

	onCitySearch : function(){
		
	},
	//metro area search


	onLocationSearch : function(){
		var lat;
		var long;
		var oPanel = this.getView().byId("mainPanel");
		var oDialog = this.getView().byId("BusyDialog_Search");
	    oDialog.open();	
		try {
			var onSuccess = function(position) {
				lat = position.coords.latitude;
				long = position.coords.longitude;
				
				
				var oResponse = new sap.ui.model.json.JSONModel();
				var apiKey = sap.ui.getCore().byId("appView").getController().getApiKey();
				var queryUrl = "http://api.songkick.com/api/3.0/search/locations.json?apikey="+ apiKey + "&location=geo:" + lat + "," + long;  

				try {
					oResponse.loadData(queryUrl, null,false);	
				} catch (e) {
					alert("Something bad happened!");
					oDialog.close();
				}
				oDialog.close();
				sap.ui.getCore().setModel(oResponse,"MetroArea");
				var rLength = parseInt(oResponse.getProperty("/resultsPage/totalEntries"));
				
				if(rLength == 0){
					sap.m.MessageToast.show("Sorry, no events in your area...");
				}else{
					var bus = sap.ui.getCore().getEventBus();
					
					//navigate to event overview page
					bus.publish("nav", "to", {
						dest : "MetroArea",
						context : undefined
					});
				}

			};

			// onError Callback receives a PositionError object
			//
			function onError(error) {
			    alert('code: '    + error.code    + '\n' +
			          'message: ' + error.message + '\n');
			}

			navigator.geolocation.getCurrentPosition(onSuccess, onError);
		} catch (e) {
			sap.m.MessageToast.show("This only works on mobile devices dummy...");
		}
		
	},
	
	
	
	onFakeLocationSearch : function(){
				var oPanel = this.getView().byId("mainPanel");
				var oResponse = new sap.ui.model.json.JSONModel();
				var apiKey = sap.ui.getCore().byId("appView").getController().getApiKey();
				var queryUrl = "http://api.songkick.com/api/3.0/events.json?apikey=" + apiKey + "&location=geo:40.74,-73.98";  				
				oPanel.setBusy(true);
				try {
					oResponse.loadData(queryUrl, null,false);	
				} catch (e) {
					alert("Something bad happened!");
					oPanel.setBusy(false);
				}
				oPanel.setBusy(false);
				sap.ui.getCore().setModel(oResponse,"EventCalendar");
				var rLength = parseInt(oResponse.getProperty("/resultsPage/totalEntries"));
				
				if(rLength == 0){
					sap.m.MessageToast.show("Sorry, no events in your area...");
				}else{
					var bus = sap.ui.getCore().getEventBus();
					
					//navigate to event overview page
					bus.publish("nav", "to", {
						dest : "EventCalendar",
						context : undefined
					});
				}
	},
	
	onBannerPress: function(){
		window.open("http://www.songkick.com", "_system");
		
	}
	
	
	

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf mobileapp_ui5.SearchView
	 */
	
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