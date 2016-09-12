sap.ui.define([
	"sap/ui/core/Control",
	"sap/viz/ui5/controls/VizFrame",
	"sap/viz/ui5/data/FlattenedDataset",
	"sap/viz/ui5/controls/common/feeds/FeedItem"
], function(Control, gViz, gData, gFeeds) {
	"use strict";

	return Control.extend("NWS.control.shadowCharts", {

		"metadata": {
			"properties": {
				"value": {
					"type": "float"

				},

				"frameType": {
					"type": "string"
				},
				"flattenedData": {
					"type": "string"
				},
				"dimensionDefinationData": {
					"type": "string"
					
				},
				"measureDefinationData": {
					"type": "string"
					
				},
				"height": {
					"type": "string"

				},
				"width": {
					"type": "string"

				},
				"press":{
					"type":"string"
				}
			},
			"aggregations": {
				"_vizFrames": {
					"type": "sap.viz.ui5.controls.VizFrame",
					"multiple": false,
					"visibility": "hidden"
				}

			},
			"events":{
				press:{}
			}
		},

		init: function() {
          this.getControlInstance=this;
		},

		_dataSelect: function(oEvent) {

              this.fireEvent("press");

		},



		renderer: function(oRM, oControl) {
           
			var oDataSet = new sap.viz.ui5.data.FlattenedDataset({
				"data": {
					"path": oControl.getFlattenedData()
				},
				"dimensions": [{
					"name": oControl.getDimensionDefinationData(),
					"value": "{"+oControl.getDimensionDefinationData()+"}"
				}],
				"measures": [{
					"name": oControl.getMeasureDefinationData(),
					"value": "{"+oControl.getMeasureDefinationData()+"}"
				}]
			});
			var gType=oControl.getFrameType();
			var measureUid="";
			var dimesionUid="";
			switch(gType){
				case "donut":measureUid="size";dimesionUid="color";break;
				case "bar":measureUid="valueAxis";dimesionUid="categoryAxis";break;
				default:throw "error beacause of unknown graph type"

			}
			var feedItem1 = new sap.viz.ui5.controls.common.feeds.FeedItem({
				"uid": measureUid,
				"type": "Measure",
				"values": [oControl.getMeasureDefinationData()]
			});
			var feedItem2 = new sap.viz.ui5.controls.common.feeds.FeedItem({
				"uid": dimesionUid,
				"type": "Dimension",
				"values": [oControl.getDimensionDefinationData()]
			});
			var vizFrame = new sap.viz.ui5.controls.VizFrame({
				"vizType": oControl.getFrameType(),
				"dataset": oDataSet,
				"feeds": [feedItem1, feedItem2],
				"iConfig": "{applicationSet:'fiori'}",
				"selectData": oControl._dataSelect.bind(oControl.getControlInstance)
			})
				vizFrame.setVizProperties({
						
						title: {
							visible: false,
							text: 'Statastics'
						}
					});
			oControl.setAggregation("_vizFrames", vizFrame);
			oRM.write("<div");
			oRM.writeControlData(oControl);
			oRM.addClass("customVizFrame");
			oRM.writeClasses();
			oRM.write(">");
			oRM.renderControl(oControl.getAggregation("_vizFrames"));

			oRM.write("</div>");
		}
	});

});