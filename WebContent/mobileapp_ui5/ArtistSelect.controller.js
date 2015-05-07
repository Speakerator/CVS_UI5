jQuery.sap.require("mobileapp_ui5.Formatter");
sap.ui.controller("mobileapp_ui5.ArtistSelect", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf mobileapp_ui5.ArtistSelect
*/
//	onInit: function() {
//
//	},
	
	onListItemPress : function(evt){
		
		//sample event id: 1134363
		//sample url: http://api.songkick.com/api/3.0/artists/1134363/calendar.json?apikey=Yw4AuPNCzLHvBv86
		
		var id = evt.getSource().getAttributes()[0].getText();
		
		var oResponse = new sap.ui.model.json.JSONModel();
		var queryUrl = "http://api.songkick.com/api/3.0/artists/"+ id + "/calendar.json?apikey=Yw4AuPNCzLHvBv86";
		try {
			oResponse.loadData(queryUrl, null,false);	
		} catch (e) {
			alert("Something bad happened!");
		}
		
		
		
		sap.ui.getCore().setModel(oResponse, "ArtistCalendar");
		var rLength = parseInt(oResponse.getProperty("/resultsPage/totalEntries"));
		
		if(rLength === 0){
			sap.m.MessageToast.show("Sorry, no current events");
		}else{
			sap.m.MessageToast.show("There are events, let's go there!");
			var bus = sap.ui.getCore().getEventBus();
			
			bus.publish("nav", "to", {
				dest : "ArtistCalendar",
				context : undefined
			});
		}
		
	},
	
	onBack : function(){
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "back", {
			source : "ArtistSelect"
		});
		
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf mobileapp_ui5.ArtistSelect
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf mobileapp_ui5.ArtistSelect
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf mobileapp_ui5.ArtistSelect
*/
//	onExit: function() {
//
//	}

});