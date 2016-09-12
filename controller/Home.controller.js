/*
 *@file "controller.Home": this is controller for Home view
 */

sap.ui.define(["PMA/controller/base.controller", "PMA/model/userModel"], function(baseController, userModel) {

	return baseController.extend('PMA.controller.Home', {
		onInit: function(oEvt) {

			this.getRouter().attachRouteMatched(function(oEvent) {
				// when detail navigation occurs, update the binding context
				if (oEvent.getParameter("name") === "home") {
					var filterData = {
						"type": "All",
						"asmlId": "",
						"customerId": "",
						"range": 70,
						"targetCheck": true,
						"filter": false
					};
					var tableData = this.getJSONModel("./mockData/data4.json");


					this.getView().setModel(tableData);
					
					this.getComponent().setModel(tableData,'mockData');
					this.getView().setModel(this.getJSONModel(filterData), 'filterData');
					
				}
			}, this);
		},
		onAfterRender:function(oEvt){
           this.getView().byId("itemSelectionFilter").addItem(new sap.ui.core.Item({"key":"All","text":"All"}));
		},
		toggleFilter: function() {
			var filterData = this.getView().getModel('filterData').getData();
			if (filterData.filter == true) {
				filterData.filter = false;
				this.getView().byId("toggleFilterButton").setText("Show Filters")
			} else {
				filterData.filter = true;
				this.getView().byId("toggleFilterButton").setText("Hide Filters")
			}
			this.getView().getModel('filterData').updateBindings();
		},
		handleRowSelection: function(oEvent) {
			var selectedRowObject = oEvent.oSource.getSelectedItem().getBindingContext().getModel().getProperty(oEvent.oSource.getSelectedItem().getBindingContextPath());
			this.getComponent().setModel(this.getJSONModel(selectedRowObject), 'selectedRowObject');
			this.navTo('details');
		}
	});
})