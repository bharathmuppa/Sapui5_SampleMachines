sap.ui.define([
	"sap/ui/core/Control",
	"sap/viz/ui5/controls/VizFrame",
	"sap/viz/ui5/data/FlattenedDataset",
	"sap/viz/ui5/controls/common/feeds/FeedItem"
], function(Control, gViz, gData, gFeeds) {
	"use strict";

	return Control.extend("PMA.controls.shadowCharts", {

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
			var dimensionsArray=oControl.getDimensionDefinationData().split(",");
			var dimensions=[];
			for(var i=0;i<dimensionsArray.length;i++){
				dimensions.push({"name":dimensionsArray[i],"value":"{"+dimensionsArray[i]+"}"});
	
			}
			
			var oDataSet = new sap.viz.ui5.data.FlattenedDataset({
				"data": {
					"path": oControl.getFlattenedData()
				},
				"dimensions": dimensions,
				"measures": [{
					"name": oControl.getMeasureDefinationData(),
					"value": "{"+oControl.getMeasureDefinationData()+"}"
				}]
			});
			var gType=oControl.getFrameType();
			var measureUid="";
			var dimesionUid="";
			var colorUid="";
			switch(gType){
				case "donut":measureUid="size";dimesionUid="color";break;
				case "bar":measureUid="valueAxis";dimesionUid="categoryAxis";break;
				case "100_stacked_bar":measureUid="valueAxis";dimesionUid="categoryAxis";colorUid="color";break;
				case "stacked_bar":measureUid="valueAxis";dimesionUid="categoryAxis";colorUid="color";break;
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
				"values": [dimensionsArray[0]]
			});
			var vizFrame = new sap.viz.ui5.controls.VizFrame({
				"vizType": oControl.getFrameType(),
				"dataset": oDataSet,
				"feeds": [feedItem1, feedItem2],
				"iConfig": "{applicationSet:'fiori'}",
				"selectData": oControl._dataSelect.bind(oControl.getControlInstance)
			})
			if(dimensionsArray.length===2){
			var feedItem3 = new sap.viz.ui5.controls.common.feeds.FeedItem({
				"uid": colorUid,
				"type": "Dimension",
				"values": [dimensionsArray[1]]
			});
			vizFrame.addFeed(feedItem3);
			}
			
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