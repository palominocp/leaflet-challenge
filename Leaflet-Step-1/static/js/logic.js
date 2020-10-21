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
  
function getColor(d) {
    return d === 1 ? '#B7F34D':
           d === 2 ? '#E1F34D':
           d === 3 ? '#F3DB4D':
           d === 4 ? '#F3BA4D':
           d === 5 ? '#F0A76B':
                     '#F06B6B';
};

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data) {

    for (var i = 0; i < data.features.length; i++) {
        // Conditionals for magnitude colors
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
    
        var lat = data.features[i].geometry.coordinates[1];
        var lng = data.features[i].geometry.coordinates[0];
        L.circle([lat,lng], {
            fillOpacity: 1,
            color: "black",
            weight: 0.5,
            fillColor: color,
            radius: data.features[i].properties.mag * 15000
        }).bindPopup("<h2>" + "Location: " + data.features[i].properties.place + "</h2> <hr> <h3>Magnitude: " + data.features[0].properties.mag + "</h3>").addTo(myMap);
    }

    // Set up the legend
    var legend = L.control({position: "bottomright" });
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        var grades = [0, 1, 2, 3, 4, 5];
        var labels = [];
        var from;
        var to;

        for (var i = 0; i < grades.length; i++) {
            from = grades [i];
            to = grades [i+1];
            labels.push("<div class=\"item\"><li style=\"background-color: " + getColor(from + 1) + "\"></li>" + "<span>" + from + (to ? "&ndash;"+ to : "+") + "</span>" + "</div>");
        }
        div.innerHTML += "<ul>" + labels.join("") + "</ul>";
        return div;
    };
    legend.addTo(myMap);

});
