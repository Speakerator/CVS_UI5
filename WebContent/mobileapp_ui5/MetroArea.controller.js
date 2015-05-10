sap.ui.controller("mobileapp_ui5.MetroArea", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf mobileapp_ui5.MetroArea
*/
//	onInit: function() {
//
//	},
	onBack : function(){
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "back", {
			source : "MetroArea"
		});
		
	},

	
onListItemPress : function(evt){
		
		
		var oList = this.getView().byId("areaList");
		
		//get the metro area id of the pressed item
		var id = evt.getSource().getAttributes()[1].getText();
		
		 //event search
		var oResponse = new sap.ui.model.json.JSONModel();
		var queryUrl ="http://api.songkick.com/api/3.0/metro_areas/"+ id +"/calendar.json?apikey=Yw4AuPNCzLHvBv86";
		oList.setBusy(true);
		try {
			oResponse.loadData(queryUrl, null,false);	
		} catch (e) {
			alert("Something bad happened!");
			oList.setBusy(false);
		}
		oList.setBusy(false);
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
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf mobileapp_ui5.MetroArea
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf mobileapp_ui5.MetroArea
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf mobileapp_ui5.MetroArea
*/
//	onExit: function() {
//
//	}

});