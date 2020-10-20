// Create a map object
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
  });
  
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
  // Define a markerSize function that will give each city a different radius based on its population
  function markerSize(population) {
    return population / 40;
  }
  
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data) {
    /*
    locations = [];
    for (var i = 0; i < data.features.length; i++) {
        locations.push([data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]]);
    }
    */
    for (var i = 0; i < data.features.length; i++) {

        // Conditionals for countries points
        var color = "";
        var magnitude = data.features[i].properties.mag
        if (magnitude <= 1) {
            color = "rgb(183,243,77)";
        }
        else if ((magnitude > 1) && (magnitude <= 2))  {
            color = "rgb(225,243,77)";
        }
        else if ((magnitude > 2) && (magnitude <= 3))  {
            color = "rgb(243,219,77)";
        }
        else if ((magnitude > 3) && (magnitude <= 4))  {
            color = "rgb(243,186,77)";
        }
        else if ((magnitude > 4) && (magnitude <= 5))  {
            color = "rgb(240,167,107)";
        }
        else {
            color = "rgb(240,107,107";
        }
        lat = data.features[i].geometry.coordinates[1];
        lng = data.features[i].geometry.coordinates[0];
        L.circle([lat,lng], {
            //fillOpacity: data.features[i].properties.mag / 10,
            fillOpacity: 1,
            color: "black",
            weight: 0.5,
            fillColor: color,
            radius: data.features[i].properties.mag * 15000
        }).bindPopup("<h2>" + "Location: " + data.features[i].properties.place + "</h2> <hr> <h3>Magnitude: " + data.features[0].properties.mag + "</h3>").addTo(myMap);
    }

     // Set up the legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        //var limits = geojson.options.limits;
        //var colors = geojson.options.colors;
        grades = [0, 1, 2, 3, 4, 5];
        //var labels = [];

        // Add min & max
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML += "<i style='background:' + getColor(grades[i] + 1)></i>";
        }
        return div;
    };

    // div.innerHTML = legendInfo;
    /*
    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });
    */
/*
    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
    */


  // Adding legend to the map
  legend.addTo(myMap);




    console.log(data.features[0].properties.mag);
    console.log(data.features[0].geometry.coordinates[1]);
    console.log(data.features[0].geometry.coordinates[0]);
    //console.log(locations);
    console.log(data.features.length);
    // Loop through the cities array and create one marker for each city object
    /*
    for (var i = 0; i < cities.length; i++) {
        L.circle(cities[i].location, {
            fillOpacity: 0.75,
            color: "white",
            fillColor: "purple",
            // Setting our circle's radius equal to the output of our markerSize function
            // This will make our marker's size proportionate to its population
            radius: markerSize(cities[i].population)
        }).bindPopup("<h2>" + "Location: " + data.features[i].properties.place + "</h2> <hr> <h3>Magnitude: " + data.features[0].properties.mag + "</h3>").addTo(myMap);
    }
    */
});
