// Provide access token
mapboxgl.accessToken = 'pk.eyJ1IjoiZXN0aGVyeWFuZyIsImEiOiJhc0lwRTNzIn0.uPn26JQFF7K_8VTund-7Xw';  // replace with your own access token

// Link to a mapbox studio style
var map = new mapboxgl.Map({
	container: 'map',
	minZoom: 2,
	maxZoom: 10,
	style: 'mapbox://styles/estheryang/cjd2d1ikx3aam2rnvnnf4zz3s' 
});


// //display a popup
// var popup = new mapboxgl.Popup({closeOnClick: false})
//     .setLngLat([-96, 37.8])
//     .setHTML('<h1>Hello World!</h1>')
//     .addTo(map);


//show and hide layers
var toggleableLayerIds = [ 'bpro', 'bppro', 'bp', 'bo', 'kp', 'kppro', 'kpro', 'ko'];
//how can I group 3 layers with the same ID?
for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];

    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
    link.textContent = id;

   map.on('click', function(e) {
       var clayTypes = map.queryRenderedFeatures(e.point, {
        layers: ['bpro', 'bppro', 'bp', 'bo', 'kp', 'kppro', 'kpro', 'ko']
       })

       var clickedLayer = clayTypes.layerid

        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
    };

    var layers = document.getElementById('menu');
    layers.appendChild(link);
}

    // code to add popups
    // event listener for clicks on map
    map.on('click', function(e) {
       var clayTypes = map.queryRenderedFeatures(e.point, {
        layers: ['bpro', 'bppro', 'bp', 'bo', 'kp', 'kppro', 'kpro', 'ko']
       })

      // if the layer is empty, this if statement will return NULL, exiting the function (no popups created) -- this is a failsafe to avoid endless loops
      if (clayTypes.length) {
        return;
      }

      // Sets the current feature equal to the clicked-on feature using array notation, in which the first item in the array is selected using arrayName[0]. The event listener above ("var stops = map...") returns an array of clicked-on bus stops, and even though the array might only have one item, we need to isolate it by using array notation as follows below.
      var clayType = soilTypes[0];
      
      // Initiate the popup
      var popup = new mapboxgl.Popup({ 
        closeButton: true, // If true, a close button will appear in the top right corner of the popup. Default = true
        closeOnClick: true, // If true, the popup will automatically close if the user clicks anywhere on the map. Default = true
        anchor: 'bottom', // The popup's location relative to the feature. Options are 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left' and 'bottom-right'. If not set, the popup's location will be set dynamically to make sure it is always visible in the map container.
        offset: [0, -15] // A pixel offset from the centerpoint of the feature. Can be a single number, an [x,y] coordinate, or an object of [x,y] coordinates specifying an offset for each of the different anchor options (e.g. 'top' and 'bottom'). Negative numbers indicate left and up.
      });

      // Set the popup location based on each feature
      popup.setLngLat(soilType.geometry.coordinates);

      // Set the contents of the popup window
      for (i=0; i<soilTypes.properties.name.length; i++) {

        clayType = soilTypes.properties.name[i];

       
          popup.setHTML('<h3>Company Name: ' + clayType.properties.SITE_NAME   // 'stop_id' field of the dataset will become the title of the popup
                               + '</h3><a href="' + clayType.properties.URL + '">' + clayType.properties.URL + '</a>');

          // Add the popup to the map
          popup.addTo(map);  // replace "map" with the name of the variable in line 28, if different
        }
      });
