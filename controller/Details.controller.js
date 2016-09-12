sap.ui.define(["PMA/controller/base.controller"], function(baseController) {

	return baseController.extend('PMA.controller.Details', {
		onInit: function(oEvt) {
			this.getRouter().attachRouteMatched(function(oEvent) {
				// when detail navigation occurs, update the binding context
				if (oEvent.getParameter("name") === "details") {
					var tableData = this.getJSONModel("./mockData/data2.json");
					this.getView().setModel(tableData);
					var selectedRowObject=this.getComponent().getModel("selectedRowObject").getData();

					console.log(selectedRowObject);
				}

			}, this);
		}
	});
});