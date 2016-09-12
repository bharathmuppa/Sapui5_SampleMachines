sap.ui.define([
	"sap/ui/core/Control",

], function(Control) {
	"use strict";

	return Control.extend("PMA.controls.CustomBar", {

		"metadata": {
			"properties": {
				data: {
					type: "array"
				},
				measure: {
					type: "string"
				},
				height: {
					type: "string"
				},
				width: {
					type: "string"
				},
				type: {
					type: "string"
				}
			}

		},
		"init": function() {

		},
		"addTime": function(start_time, end_time) {

			if (start_time === 0 && end_time) {
				return end_time;
			}

			var startArr = start_time.split(':');
			var endArr = end_time.split(':');


			startArr[0] = (startArr[0]) ? parseInt(startArr[0], 10) : 0;
			startArr[1] = (startArr[1]) ? parseInt(startArr[1], 10) : 0;
			startArr[2] = (startArr[2]) ? parseInt(startArr[2], 10) : 0;
			endArr[0] = (endArr[0]) ? parseInt(endArr[0], 10) : 0;
			endArr[1] = (endArr[1]) ? parseInt(endArr[1], 10) : 0;
			endArr[2] = (endArr[2]) ? parseInt(endArr[2], 10) : 0;

			var seconds = ((startArr[2] + endArr[2]) % 60);
			var minuteslag = Math.floor((startArr[2] + endArr[2]) / 60);
			var minutes = minuteslag + ((startArr[1] + endArr[1]) % 60);
			var hourslag = Math.floor((startArr[1] + endArr[1]) / 60);
			var hours = hourslag + (startArr[0] + endArr[0]);
			return hours + ':' + minutes + ':' + seconds;

		},
		"calculatePercentage": function(total, currentValue) {
			return ((this.convertToSeconds(currentValue) / this.convertToSeconds(total)) * 100);
		},
		"convertToSeconds": function(time) {
			var calctime = time.split(':');
			var sum = 0;
			for (var i = 0; i < calctime.length; i++) {
				if (i === 0) {
					sum += (parseInt(calctime[i]) * 60 * 60)
				}
				if (i === 1) {
					sum += (parseInt(calctime[i]) * 60)
				}
				if (i === 2) {
					sum += (parseInt(calctime[i]))
				}
			}
			return parseInt(sum).toFixed(2);
		},
		"renderer": function(oRM, oControl) {
			var data = jQuery.extend({}, oControl.getData());
			var measure = oControl.getMeasure();
			var sum = 0;
			var childs = "";
			var height = oControl.getHeight() || '10px';
			var width = oControl.getWidth() || '100%'
			var type=oControl.getType();
			if (type.toLowerCase()==='bar' || type.toLowerCase()==='bars') {
				for (var i = 0; i < Object.keys(data).length; i++) {
					sum = oControl.addTime(sum, data[Object.keys(data)[i]][measure]);
				}


				for (var i = 0; i < Object.keys(data).length; i++) {
					childs = childs + "<span style='display:inline-block;height:" + height + ";background-color:#" + data[Object.keys(data)[i]]['color'] + ";width:" + oControl.calculatePercentage(sum, data[Object.keys(data)[i]][measure]) + "%'></span>";

				}
			}
			else if(type.toLowerCase()==='week' || type.toLowerCase()==='weeks'){
				for (var i = 0; i < Object.keys(data).length; i++) {
					childs = childs + "<span style='display:inline-block;height:" + height + ";color:black;width:"+(100/7)+"%'>"+data[Object.keys(data)[i]]['day']+" "+data[Object.keys(data)[i]]['date']+"</span>";

				}
			}
			else if(type.toLowerCase()==='legend'|| type.toLowerCase()==='legends'){
				var spanWidth=(100/(Object.keys(data).length*2));
				for (var i = 0; i < Object.keys(data).length; i++) {
					childs = childs + "<span style='display:inline-block;height:" + height + ";width:"+spanWidth+"%'><span style='color:black'>"+data[Object.keys(data)[i]]['name']+"</span><span style='display:inline-block;width:10px;height:"+height+";background:"+data[Object.keys(data)[i]]['color']+"'></span></span>";

				}
			}
			oRM.write("<div style='width:" + width + "'");
			oRM.writeControlData(oControl);
			oRM.writeClasses();
			oRM.write(">");
			oRM.write(childs);
			oRM.write("</div>");

		}

	});

});