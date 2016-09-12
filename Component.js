/*
 * @file:Component controller for PMA re-concilation application
 * */
sap.ui.define(["sap/ui/core/UIComponent","sap/m/routing/RouteMatchedHandler"],function(UIComponent,RouteMatchedHandler){

return UIComponent.extend("PMA.Component", {
    metadata: {
        "manifest": "json"
    },
 
    init: function () {
    	/* init function of UIComponent is called for load manifest data 
    	 * and get route and initialize views
    	 * */
    	sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
        
    	this._oRouteMatchedHandler = new RouteMatchedHandler(this.getRouter());
        // this component should automatically initialize the router
        this.getRouter().initialize();       
       
    },

  
});

})
