sap.ui.define(["controller/PMA.base.controller","model/userModel"], function(baseController,userModel) {

    return baseController.extend('PMA.controller.Login', {
        onInit: function(oEvt) {
            
            this.getRouter().attachRouteMatched(function (oEvent) {
                // when detail navigation occurs, update the binding context
                if (oEvent.getParameter("name") === "login") {
                   var userData=this.getJSONModel({"userName":"","userPassword":""});
                    this.getComponent().setModel(userData,"userData");
                }
                
            }, this);
        	
        },
        onSuccessLogin:function(){
        	 this.getRouter().navTo("home");
        },
        loginSubmit:function(){
            this.onSuccessLogin();
        }
    });
})
