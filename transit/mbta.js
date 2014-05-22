var stations = [];
var stationsLatLng = [];
var stationsLatLng1 = [];
var stationsLatLng2 = [];

var map;
function mbta() {
	getData();
	mapOptions = {
		zoom: 12
	};
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {

		 me = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);
			//set me marker
			marker = new google.maps.Marker({
				position: me,
				title: "You"
			});
			marker.setMap(map);
			findClosest();
			// me infowindow
			infowindow = new google.maps.InfoWindow({
        		map: map,
        		position: me,
        		content: meContent
      		});
      		closestLine();
			// display meMarker on click
      		google.maps.event.addListener(marker, 'click', function() {
    			infowindow.setContent(meContent);
				infowindow.open(map, this);
    		});
			map.setCenter(me);
		});
	} 
	else {
    	alert('Error: Your browse doesn\'ft support geolocation.');
  	}
}


function getData() {
	xhr = new XMLHttpRequest();
	xhr.open("get", "http://mbtamap.herokuapp.com/mapper/rodeo.json", true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			scheduleData = JSON.parse(xhr.responseText);
			lineColor = scheduleData["line"];
			setStations();
		}
		else if (xhr.readyState == 4 && xhr.status == 500) {
			alert("Oops! Server error, pleas refresh.");		
		}
	}
	xhr.send(null); 
}


function setStations() {
	icon = "Ticon.png";
	stationList = '[{"LineColor":"Blue","Station":"Wonderland","latitude":42.41342,"longitude":-70.991648},{"LineColor":"Blue","Station":"Revere Beach","latitude":42.40784254,"longitude":-70.99253321},{"LineColor":"Blue","Station":"Beachmont","latitude":42.39754234,"longitude":-70.99231944},{"LineColor":"Blue","Station":"Suffolk Downs","latitude":42.39050067,"longitude":-70.99712259},{"LineColor":"Blue","Station":"Orient Heights","latitude":42.386867,"longitude":-71.004736},{"LineColor":"Blue","Station":"Wood Island","latitude":42.3796403,"longitude":-71.02286539},{"LineColor":"Blue","Station":"Airport","latitude":42.374262,"longitude":-71.030395},{"LineColor":"Blue","Station":"Maverick","latitude":42.36911856,"longitude":-71.03952958},{"LineColor":"Blue","Station":"Aquarium","latitude":42.359784,"longitude":-71.051652},{"LineColor":"Blue","Station":"State Street","latitude":42.358978,"longitude":-71.057598},{"LineColor":"Blue","Station":"Government Center","latitude":42.359705,"longitude":-71.059215},{"LineColor":"Blue","Station":"Bowdoin","latitude":42.361365,"longitude":-71.062037},{"LineColor":"Orange","Station":"Oak Grove","latitude":42.43668,"longitude":-71.071097},{"LineColor":"Orange","Station":"Malden Center","latitude":42.426632,"longitude":-71.07411},{"LineColor":"Orange","Station":"Wellington","latitude":42.40237,"longitude":-71.077082},{"LineColor":"Orange","Station":"Sullivan","latitude":42.383975,"longitude":-71.076994},{"LineColor":"Orange","Station":"Community College","latitude":42.373622,"longitude":-71.069533},{"LineColor":"Orange","Station":"North Station","latitude":42.365577,"longitude":-71.06129},{"LineColor":"Orange","Station":"Haymarket","latitude":42.363021,"longitude":-71.05829},{"LineColor":"Orange","Station":"State Street","latitude":42.358978,"longitude":-71.057598},{"LineColor":"Orange","Station":"Downtown Crossing","latitude":42.355518,"longitude":-71.060225},{"LineColor":"Orange","Station":"Chinatown","latitude":42.352547,"longitude":-71.062752},{"LineColor":"Orange","Station":"Tufts Medical","latitude":42.349662,"longitude":-71.063917},{"LineColor":"Orange","Station":"Back Bay","latitude":42.34735,"longitude":-71.075727},{"LineColor":"Orange","Station":"Mass Ave","latitude":42.341512,"longitude":-71.083423},{"LineColor":"Orange","Station":"Ruggles","latitude":42.336377,"longitude":-71.088961},{"LineColor":"Orange","Station":"Roxbury Crossing","latitude":42.331397,"longitude":-71.095451},{"LineColor":"Orange","Station":"Jackson Square","latitude":42.323132,"longitude":-71.099592},{"LineColor":"Orange","Station":"Stony Brook","latitude":42.317062,"longitude":-71.104248},{"LineColor":"Orange","Station":"Green Street","latitude":42.310525,"longitude":-71.107414},{"LineColor":"Orange","Station":"Forest Hills","latitude":42.300523,"longitude":-71.113686},{"LineColor":"Red","Station":"Alewife","latitude":42.395428,"longitude":-71.142483},{"LineColor":"Red","Station":"Davis","latitude":42.39674,"longitude":-71.121815},{"LineColor":"Red","Station":"Porter Square","latitude":42.3884,"longitude":-71.119149},{"LineColor":"Red","Station":"Harvard Square","latitude":42.373362,"longitude":-71.118956},{"LineColor":"Red","Station":"Central Square","latitude":42.365486,"longitude":-71.103802},{"LineColor":"Red","Station":"Kendall/MIT","latitude":42.36249079,"longitude":-71.08617653},{"LineColor":"Red","Station":"Charles/MGH","latitude":42.361166,"longitude":-71.070628},{"LineColor":"Red","Station":"Park Street","latitude":42.35639457,"longitude":-71.0624242},{"LineColor":"Red","Station":"Downtown Crossing","latitude":42.355518,"longitude":-71.060225},{"LineColor":"Red","Station":"South Station","latitude":42.352271,"longitude":-71.055242},{"LineColor":"Red","Station":"Broadway","latitude":42.342622,"longitude":-71.056967},{"LineColor":"Red","Station":"Andrew","latitude":42.330154,"longitude":-71.057655},{"LineColor":"Red","Station":"JFK/UMass","latitude":42.320685,"longitude":-71.052391},{"LineColor":"Red","Station":"Savin Hill","latitude":42.31129,"longitude":-71.053331},{"LineColor":"Red","Station":"North Quincy","latitude":42.275275,"longitude":-71.029583},{"LineColor":"Red","Station":"Wollaston","latitude":42.2665139,"longitude":-71.0203369},{"LineColor":"Red","Station":"Quincy Center","latitude":42.251809,"longitude":-71.005409},{"LineColor":"Red","Station":"Quincy Adams","latitude":42.233391,"longitude":-71.007153},{"LineColor":"Red","Station":"Braintree","latitude":42.2078543,"longitude":-71.0011385},{"LineColor":"Red","Station":"Fields Corner","latitude":42.300093,"longitude":-71.061667},{"LineColor":"Red","Station":"Shawmut","latitude":42.29312583,"longitude":-71.06573796},{"LineColor":"Red","Station":"Ashmont","latitude":42.284652,"longitude":-71.064489}]';
    Tparsed = JSON.parse(stationList);

	if(lineColor =="red") {
		//add red line stations infomation to "stations" list and draw stations on map
    	for (i = 31; i < 53; i++) {
    		addStation(Tparsed[i]);
    	}
		//draw branch 1 line
		for(var i = 0; i < 19; i++) {
			stationsLatLng1[i] = stationsLatLng[i];
		}
		redline1 = new google.maps.Polyline({
			path: stationsLatLng1,
			strokeColor: "#E42217",
			strokeWeight: 7
		});
		redline1.setMap(map);

		//draw branch 2 line
		stationsLatLng2[0] = stationsLatLng[13];
		for(var i = 19; i < 22; i++) {
			stationsLatLng2[i-18] = stationsLatLng[i];
		}
		redline2 = new google.maps.Polyline({
			path: stationsLatLng2,
			strokeColor: "#E42217",
			strokeWeight: 7
		});
		redline2.setMap(map);
	}

	else if(lineColor == "blue") {
	   	//add blue line stations infomation and draw stations on map
	   	for (i = 0; i < 12; i++) {
	   		addStation(Tparsed[i]);
	   	}
		//draw line on map
		line = new google.maps.Polyline({
			path: stationsLatLng,
			strokeColor: "#003399",
			strokeWeight: 7
		});
		line.setMap(map);
	}

	else if(lineColor == "orange") {
	    //add orange line stations infomation and draw stations on map
	   	for (i = 12; i < 31; i++) {
	   		addStation(Tparsed[i]);
	   	}
		//draw line on map
		line = new google.maps.Polyline({
			path: stationsLatLng,
			strokeColor: "#FFA500",
			strokeWeight: 7
		});
		line.setMap(map);
	}

    function addStation(aStation) {
    	stopPosition = new google.maps.LatLng(aStation.latitude, aStation.longitude);
    	stationsLatLng.push(stopPosition);
    	stop = new google.maps.Marker({position: stopPosition, title: aStation.Station, icon: icon});
    	stop.setMap(map);
    	stations.push(stop);

    	// set station infowindow
    	google.maps.event.addListener(stop, 'click', function() {
    		//name of station
    		content = '<p>' + this.title + '</p>';
    		//if schedule available
    		if (scheduleData["schedule"].length > 0) {
	    		content += '<table><tr><th>Line</th><th>Trip ID</th><th>Direciton</th><th>Time Remaining</th></tr>';
	    		//go through each train
	    		for (var i in scheduleData["schedule"]) {
	    			data = scheduleData["schedule"][i];
	    			//get the list of stops
	    			stops = data["Predictions"];
	    			for(var j in stops) {
	    				//find the stop of interest
	    				if (stops[j]["Stop"] == this.title) {
	    					//calculate time
	    					time = stops[j]["Seconds"];
	    					var sec = time % 60;
	    					var min = ((time - sec) / 60) % 60;
	    					var h = (time - 60 * min - sec) % 360;
	    					time = h + ": " + min + ": " + sec;
	    					//display information
	    			 		content += '<table><tr><td>' + scheduleData["line"] + '</td><td>' + data["TripID"] + '</td><td>' + data["Destination"] + '</td><td>' + time + '</td></tr>';
	    				}
	    			}
	    		}
    		}	
    		else {
    			content += "No schedule information of this station."
    		}	
    		content += '</table>';
    		infowindow.setContent(content);
			infowindow.open(map, this);
    	});
    }
}

//calculate the distance between current location and the given location
//from: The Haversine Formula(http://www.movable-type.co.uk/scripts/latlong.html)
function calculateD(loc) {
	var R = 6371; // km
	var meLat = me.k;
	var locLat = loc.k;
	var dLat = (locLat-meLat) * Math.PI / 180;
	var dLon = (loc.A-me.A) * Math.PI / 180;
	var meLat = meLat * Math.PI / 180;
	var locLat = locLat * Math.PI / 180;

	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
	        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(meLat) * Math.cos(locLat); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c;
	return d;
}

//find the closest station(smallest distance) to current location
function findClosest() {
	min = calculateD(stationsLatLng[0]);
	for(var i in stationsLatLng) {
		if(calculateD(stationsLatLng[i]) < min) {
			min = calculateD(stationsLatLng[i]);
			minIndex = i;
		}
	}
	//update the infowindow
	meContent = "You are here! </br>The closest T station to you is <strong>" + stations[minIndex].title + "</strong>. </br>(About " + Math.round(min*100)/100 + " miles away from your location.)";
}

//draw the line from current location to the closest station
function closestLine() {
	meline = new google.maps.Polyline({
		path: [me, stationsLatLng[minIndex]],
		strokeColor: "#808080",
		strokeOpacity: 0.6,
		strokeWeight: 5
	});
	meline.setMap(map);
}
