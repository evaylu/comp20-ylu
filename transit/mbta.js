
var mapOptions;
var map;
var me;
var marker;
var scheduleData;
var lineColor;
var stations = [];
var stationsLatLng = [];
var stationsLatLng2 = [];

var map;
function initialize() {
	getData();
	mapOptions = {
		zoom: 12
	};
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {

		 me = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

			console.log(position.coords.latitude);
			console.log(position.coords.longitude);			
			var marker = new google.maps.Marker({
				position: me,
				title: "You are here."
			});
			marker.setMap(map);

			var infowindow = new google.maps.InfoWindow({
        		map: map,
        		position: me,
        		content: marker.title
      		});
			map.setCenter(me);
		});
	} else {
    	alert('Error: Your browse doesn\'t support geolocation.');
  }
}


function getData() {
	console.log("getting data");
	xhr = new XMLHttpRequest();
	xhr.open("get", "http://mbtamap.herokuapp.com/mapper/rodeo.json", true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			scheduleData = JSON.parse(xhr.responseText);
			lineColor = scheduleData["line"];				
			console.log(lineColor);
			setStations();
		}
		else if (xhr.readyState == 4 && xhr.status == 500) {
			alert("Oops! Server error, pleas refresh.");		
		}
	}
	xhr.send(null); 
}


function setStations() {
	console.log("setting stations");
	icon = "Ticon.png";
	stationList = '[{"LineColor":"Blue","Station":"Wonderland","latitude":42.41342,"longitude":-70.991648},{"LineColor":"Blue","Station":"Revere Beach","latitude":42.40784254,"longitude":-70.99253321},{"LineColor":"Blue","Station":"Beachmont","latitude":42.39754234,"longitude":-70.99231944},{"LineColor":"Blue","Station":"Suffolk Downs","latitude":42.39050067,"longitude":-70.99712259},{"LineColor":"Blue","Station":"Orient Heights","latitude":42.386867,"longitude":-71.004736},{"LineColor":"Blue","Station":"Wood Island","latitude":42.3796403,"longitude":-71.02286539},{"LineColor":"Blue","Station":"Airport","latitude":42.374262,"longitude":-71.030395},{"LineColor":"Blue","Station":"Maverick","latitude":42.36911856,"longitude":-71.03952958},{"LineColor":"Blue","Station":"Aquarium","latitude":42.359784,"longitude":-71.051652},{"LineColor":"Blue","Station":"State Street","latitude":42.358978,"longitude":-71.057598},{"LineColor":"Blue","Station":"Government Center","latitude":42.359705,"longitude":-71.059215},{"LineColor":"Blue","Station":"Bowdoin","latitude":42.361365,"longitude":-71.062037},{"LineColor":"Orange","Station":"Oak Grove","latitude":42.43668,"longitude":-71.071097},{"LineColor":"Orange","Station":"Malden Center","latitude":42.426632,"longitude":-71.07411},{"LineColor":"Orange","Station":"Wellington","latitude":42.40237,"longitude":-71.077082},{"LineColor":"Orange","Station":"Sullivan","latitude":42.383975,"longitude":-71.076994},{"LineColor":"Orange","Station":"Community College","latitude":42.373622,"longitude":-71.069533},{"LineColor":"Orange","Station":"North Station","latitude":42.365577,"longitude":-71.06129},{"LineColor":"Orange","Station":"Haymarket","latitude":42.363021,"longitude":-71.05829},{"LineColor":"Orange","Station":"State Street","latitude":42.358978,"longitude":-71.057598},{"LineColor":"Orange","Station":"Downtown Crossing","latitude":42.355518,"longitude":-71.060225},{"LineColor":"Orange","Station":"Chinatown","latitude":42.352547,"longitude":-71.062752},{"LineColor":"Orange","Station":"Tufts Medical","latitude":42.349662,"longitude":-71.063917},{"LineColor":"Orange","Station":"Back Bay","latitude":42.34735,"longitude":-71.075727},{"LineColor":"Orange","Station":"Mass Ave","latitude":42.341512,"longitude":-71.083423},{"LineColor":"Orange","Station":"Ruggles","latitude":42.336377,"longitude":-71.088961},{"LineColor":"Orange","Station":"Roxbury Crossing","latitude":42.331397,"longitude":-71.095451},{"LineColor":"Orange","Station":"Jackson Square","latitude":42.323132,"longitude":-71.099592},{"LineColor":"Orange","Station":"Stony Brook","latitude":42.317062,"longitude":-71.104248},{"LineColor":"Orange","Station":"Green Street","latitude":42.310525,"longitude":-71.107414},{"LineColor":"Orange","Station":"Forest Hills","latitude":42.300523,"longitude":-71.113686},{"LineColor":"Red","Station":"Alewife","latitude":42.395428,"longitude":-71.142483},{"LineColor":"Red","Station":"Davis","latitude":42.39674,"longitude":-71.121815},{"LineColor":"Red","Station":"Porter Square","latitude":42.3884,"longitude":-71.119149},{"LineColor":"Red","Station":"Harvard Square","latitude":42.373362,"longitude":-71.118956},{"LineColor":"Red","Station":"Central Square","latitude":42.365486,"longitude":-71.103802},{"LineColor":"Red","Station":"Kendall/MIT","latitude":42.36249079,"longitude":-71.08617653},{"LineColor":"Red","Station":"Charles/MGH","latitude":42.361166,"longitude":-71.070628},{"LineColor":"Red","Station":"Park Street","latitude":42.35639457,"longitude":-71.0624242},{"LineColor":"Red","Station":"Downtown Crossing","latitude":42.355518,"longitude":-71.060225},{"LineColor":"Red","Station":"South Station","latitude":42.352271,"longitude":-71.055242},{"LineColor":"Red","Station":"Broadway","latitude":42.342622,"longitude":-71.056967},{"LineColor":"Red","Station":"Andrew","latitude":42.330154,"longitude":-71.057655},{"LineColor":"Red","Station":"JFK/UMass","latitude":42.320685,"longitude":-71.052391},{"LineColor":"Red","Station":"Savin Hill","latitude":42.31129,"longitude":-71.053331},{"LineColor":"Red","Station":"North Quincy","latitude":42.275275,"longitude":-71.029583},{"LineColor":"Red","Station":"Wollaston","latitude":42.2665139,"longitude":-71.0203369},{"LineColor":"Red","Station":"Quincy Center","latitude":42.251809,"longitude":-71.005409},{"LineColor":"Red","Station":"Quincy Adams","latitude":42.233391,"longitude":-71.007153},{"LineColor":"Red","Station":"Braintree","latitude":42.2078543,"longitude":-71.0011385},{"LineColor":"Red","Station":"Fields Corner","latitude":42.300093,"longitude":-71.061667},{"LineColor":"Red","Station":"Shawmut","latitude":42.29312583,"longitude":-71.06573796},{"LineColor":"Red","Station":"Ashmont","latitude":42.284652,"longitude":-71.064489}]';
    Tparsed = JSON.parse(stationList);

   function addStation(list, aStation) {
    	stop = new google.maps.LatLng(aStation.latitude, aStation.longitude);
    	list.push(new google.maps.Marker({position: stop, title: aStation.Station, icon: icon}));
    }

	if(lineColor =="red") {
		console.log("inRed");
		//add red line stations infomation to "stations" list
    	for (i = 31; i < 53; i++) {
    		addStation(stations, Tparsed[i]);
    	}
    	//put stations for firsr branch
		for(var i = 0; i < 19; i++) {
			stationsLatLng[i] = stations[i].position;
			stations[i].setMap(map);
		}
		//put stations for second branch
		stationsLatLng2[0] = stations[13].position;
		for(var i = 19; i < 22; i++) {
			stationsLatLng2[i-18] = stations[i].position;
			stations[i].setMap(map);
		}
		//draw branch 1
		redline1 = new google.maps.Polyline({
			path: stationsLatLng,
			strokeColor: "#E42217",
			strokeWeight: 7
		});
		redline1.setMap(map);
		//draw branch 2
		redline2 = new google.maps.Polyline({
			path: stationsLatLng2,
			strokeColor: "#E42217",
			strokeWeight: 7
		});
		redline2.setMap(map);
	}

	else if(lineColor == "blue") {
	    console.log("inBlue");
	   	//add blue line stations infomation
	   	for (i = 0; i < 12; i++) {
	   		addStation(stations, Tparsed[i]);
	   	}
	   	//put stations on map
		for(var j in stations){
			stationsLatLng[j] = stations[j].position;
			stations[j].setMap(map);
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
    	console.log("inOrange");
	    //add orange line stations infomation
	   	for (i = 12; i < 31; i++) {
	   		addStation(stations, Tparsed[i]);
	   	}
	   	//put stations on map
		for(var j in stations){
			stationsLatLng[j] = stations[j].position;
			stations[j].setMap(map);
		}
		//draw line on map
		line = new google.maps.Polyline({
			path: stationsLatLng,
			strokeColor: "#FFA500",
			strokeWeight: 7
		});
		line.setMap(map);
	}
	console.log("end of setStations");
}
