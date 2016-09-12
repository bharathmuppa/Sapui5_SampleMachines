
sap.ui.define(["sap/ui/base/Object"], function(obaseObject) {
	var _modelInstance = null;
	var _oModel = null;
	var userModel=obaseObject.extend("PMA.model.userModel", {
		constructor: function() {
			this.arr1 = [];
			this.arr2 = [];
		},
		setModel: function(oModel) {
			_oModel = oModel;
		},
		getModel: function() {
			return _oModel;
		}
	});
	
  function getInstance() {
			if (!_modelInstance) {
				_modelInstance = new PMA.model.userModel();
			}
			return _modelInstance;
		}
	return getInstance();
});