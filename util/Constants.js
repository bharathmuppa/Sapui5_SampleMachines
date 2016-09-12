/**
 * @file: This file consists of constants parameters used in the application.
 */
var PMAConstants;
(function() {

	function pmaConstants() {
		var baseUrl = "";
		var _oModel = null;
		this.setModel = function(oModel) {
			_oModel = oModel;
		};
		this.getBaseUrl = function() {
			return baseUrl;
		};
		this.getModel = function() {
			return _oModel;
		}

	}

	PMAConstants = new pmaConstants();
})();
