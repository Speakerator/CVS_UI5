sap.ui.controller("mobileapp_ui5.EventCalendar", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf mobileapp_ui5.EventCalendar
	 */
	// onInit: function() {
	//
	// },

	onBack : function() {
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "back", {
			source : "EventCalendar"
		});

	},

	onListItemPress : function(evt) {

		var oList = this.getView().byId("eventList");
		var eventId = evt.getSource().getAttributes()[0].getText();
		oList.setBusy(true);
		var oResponse = new sap.ui.model.json.JSONModel();
		var apiKey = sap.ui.getCore().byId("appView").getController().getApiKey();
		var queryUrl = "http://api.songkick.com/api/3.0/events/" +eventId +".json?apikey=" + apiKey;
		try {
			oResponse.loadData(queryUrl, null, false);
			oList.setBusy(false);
			sap.ui.getCore().setModel(oResponse);
			
			var bus = sap.ui.getCore().getEventBus();

			bus.publish("nav", "to", {
				dest : "EventDetails",
				context : undefined
			});
		} catch (e) {
			alert("Something bad happened!");
			oList.setBusy(false);
		}
		

	},
	
	onBannerPress: function(){
		window.open("http://www.songkick.com", "_system");
		
	}

/**
 * Similar to onAfterRendering, but this hook is invoked before the controller's
 * View is re-rendered (NOT before the first rendering! onInit() is used for
 * that one!).
 * 
 * @memberOf mobileapp_ui5.EventCalendar
 */
// onBeforeRendering: function() {
//
// },
/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf mobileapp_ui5.EventCalendar
 */
// onAfterRendering: function() {
//
// },
/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf mobileapp_ui5.EventCalendar
 */
// onExit: function() {
//
// }
});