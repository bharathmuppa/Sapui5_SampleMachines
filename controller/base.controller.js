/*
 *@file base controller: this is base controller for all controllers where common functionalities resides
 */

sap.ui.define(['sap/ui/core/mvc/Controller', 'sap/ui/model/json/JSONModel'], function(controller, jsonModel) {

    return controller.extend("PMA.controller.base", {
        initializeBaseClass: function() {
            this._component = this.getOwnerComponent();
            this._router = this._component.getRouter();
        },
        getRouter: function() {
            if (!this._router) {
                this.initializeBaseClass();
            }
            return this._router;
        },
        navTo: function(target, parameters) {

            this._router.navTo(target, parameters);

        },
        getComponent: function() {

            return this._component;
        },
        getJSONModel: function(obj) {
            if (obj)
                return new jsonModel(obj);
            else
                return new jsonModel();
        },
        goBack: function() {
            var sPreviousHash = new sap.ui.core.routing.History.getInstance().getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                this.getRouter().navTo("Home", null, true);
            }
        },
        goHome: function() {
            this.getRouter().navTo("Home", null, true);
        }

    });

})