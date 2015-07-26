sap.ui.controller("mobileapp_ui5.EventDetails", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf mobileapp_ui5.EventDetails
*/
//	onInit: function() {
//		
//	},
	
	
	
	onBack : function() {
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "back", {
			source : "EventDetails"
		});

	},

	
	//-22.-09.2015
	formatDate : function(date){
		var year, month, day = null;
		var s1, s2 = null;
		s1 = date.indexOf("-") ;
		s2 = date.lastIndexOf("-");
		
		year = date.slice(0,s1);
		month = date.slice(s1+1,s2);
		day = date.slice(s2+1,date.length);
		
		return day + "." + month + "." + year;
//		return date;
	},
	
	formatTime : function(time){
		if(time === "" || time === null){
			return "TBA";
		}else{
			return time;
			
		}
		
	},
	
	formatWebsite : function(website){
		if(website === "" || website === null){
			return "No website";
		}else{
			return website;
			
		}
		
	},
	
	formatPop : function(popularity){
		
		var popDouble = (parseFloat(popularity));
		return Math.round(popDouble * 100) +  "%";
		
		
	},
	
	onUrlPress : function(evt){
		window.open(evt.getSource().getText(), "_system");
	},
	
	onBannerPress: function(){
		window.open("http://www.songkick.com", "_system");
		
	}
	
	/**
	* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
	* (NOT before the first rendering! onInit() is used for that one!).
	* @memberOf mobileapp_ui5.EventDetails
	*/
//		onBeforeRendering: function() {
	//
//		},

	/**
	* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
	* This hook is the same one that SAPUI5 controls get after being rendered.
	* @memberOf mobileapp_ui5.EventDetails
	*/
//		onAfterRendering: function() {
	//
//		},

	/**
	* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
	* @memberOf mobileapp_ui5.EventDetails
	*/
//		onExit: function() {
	//
//		}

});