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

		// do event details search instead!
		// e.g.: 23017273
		// http://api.songkick.com/api/3.0/events/23017273.json?apikey=Yw4AuPNCzLHvBv86

		var sPath = evt.getSource().getBindingContext().sPath;
		this.getView().bindElement(sPath);
		if (!this._oDialog) {
			this._oDialog = sap.ui.xmlfragment("mobileapp_ui5.EventDetails",
					this);
			this.getView().addDependent(this._oDialog);
		}
		this._oDialog.open();
	},

	onListItemPress2 : function(evt) {


		// get the index of the pressed item
		var id = evt.getSource().getAttributes()[0].getText();

		var oResponse = new sap.ui.model.json.JSONModel();
		var queryUrl = "http://api.songkick.com/api/3.0/events/" +eventId +".json?apikey=Yw4AuPNCzLHvBv86
		try {
			oResponse.loadData(queryUrl, null, false);
		} catch (e) {
			alert("Something bad happened!");
		}

		sap.ui.getCore().setModel(oResponse);
		var rLength = parseInt(oResponse
				.getProperty("/resultsPage/totalEntries"));

		if (rLength === 0) {
			sap.m.MessageToast.show("Sorry, no current events");
		} else {
			var bus = sap.ui.getCore().getEventBus();

			bus.publish("nav", "to", {
				dest : "EventCalendar",
				context : undefined
			});
		}

	},

	onDialogCloseButton : function() {
		this._oDialog.close();
		this.getView().unbindElement();
	},

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