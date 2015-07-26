sap.ui.controller("mobileapp_ui5.App",
		{
	
			//apiKey : "Yw4AuPNCzLHvBv86",

			onInit : function() {
				var view = this.getView();
				this.app = view.byId("theApp"); // remember the app
				

				// subscribe to the event bus
				var bus = sap.ui.getCore().getEventBus();
				bus.subscribe("nav", "to", this.navToHandler, this);
				bus.subscribe("nav", "back", this.navBackHandler, this);
				bus.subscribe("nav","backTo", this.navBackToHandler, this);

				},
				
				
			getApiKey : function(){
				return "Yw4AuPNCzLHvBv86";
			},
		
				
				
		// navigation handler
		//this navigation approach is needed since some pages need to be reloaded to trigger the createContnt-Method die to the fact that dynamicBinding of the OData-Models did not work properly.
		
				
			navToHandler : function(channelId, eventId, data) {
	
			var rerenderFlag = data.rerender;
			if(rerenderFlag === undefined)
				rerenderFlag = false;
			
			var destroyFlag = data.destroy;
			if(destroyFlag === undefined)
				destryFlag = false;
			
			if(!rerenderFlag){
				if(!destroyFlag){
					//regular navigation
					if (data && data.dest) {
						if (this.app.getPage(data.dest) === null) { // page has not yet been loaded
							jQuery.sap.log.info("now loading page '" + data.dest + "'");
							this.app.addPage(sap.ui.xmlview(data.dest, "mobileapp_ui5."+ data.dest));
						}
						this.app.to(data.dest, data.context);
					} else {
						jQuery.sap.log.error("Navigation Error: Invalid Data: '" + data + "' or id: '" + data.dest + "'.");
					}
					
					//source page will be destroyed
				}else {
					if (data && data.dest && data.source) {
						if (this.app.getPage(data.dest) === null) { // page has not yet been loaded
							jQuery.sap.log.info("now loading page '" + data.dest + "'");
							this.app.addPage(sap.ui.xmlview(data.dest, "mobileapp_ui5."+ data.dest));
						}
						
						var sourcePage = this.app.getPage(data.source);
						this.app.to(data.dest, data.context);
						sourcePage.destroy();
						this.app.removePage(data.source);
						
					} else {
						jQuery.sap.log.error("Navigation Error: Invalid Data: '" + data + "' or id: '" + data.dest + "'.");
					}
				}
				//destination page will be destroyed and is rebuild clean ( create content is called)
			}else{
				
				var destPage = this.app.getPage(data.dest);
				destPage.destroy();
				this.app.removePage(data.dest);
				this.app.addPage(sap.ui.xmlview(data.dest, "mobileapp_ui5."+ data.dest));
				this.app.to(data.dest,data.context);
				
				//if true, source page is destroyed too
				if (destroyFlag) {
					var sourcePage = this.app.getPage(data.source);
					sourcePage.destroy();
					this.app.removePage(data.source);
				}
			}
		},
		
				
		//when navigating back from a page, said page is destroyed
		navBackHandler : function(channelId, eventId, data) {
			var page = this.app.getPage(data.source);
			this.app.back();
			page.destroy();
			this.app.removePage(data.caller);
		},
		
		
		navBackToHandler : function(channelId, eventId, data){
			var sourcePage = this.app.getPage(data.source);
			this.app.backToPage(data.dest, data.context);
			sourcePage.destroy();
			this.app.removePage(data.caller);
			
		},
		
		onBannerPress: function(){
			window.open("http://www.songkick.com", "_system");
			
		}
		
			
			
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the
		 * controller's View is re-rendered (NOT before the first rendering!
		 * onInit() is used for that one!).
		 * 
		 * @memberOf mobileapp_ui5.App
		 */
		// onBeforeRendering: function() {
		//
		// },
		/**
		 * Called when the View has been rendered (so its HTML is part of the
		 * document). Post-rendering manipulations of the HTML could be done
		 * here. This hook is the same one that SAPUI5 controls get after being
		 * rendered.
		 * 
		 * @memberOf mobileapp_ui5.App
		 */
		// onAfterRendering: function() {
		//
		// },
		/**
		 * Called when the Controller is destroyed. Use this one to free
		 * resources and finalize activities.
		 * 
		 * @memberOf mobileapp_ui5.App
		 */
		// onExit: function() {
		//
		// }
		});