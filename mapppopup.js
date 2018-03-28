// clay tyeps: maxium tileset limitation meet, reduced to Kaolin and Betonite onl
// code to add interactivity once map loads
map.on('load', function() {	// the event listener that does some code after the map loads
	
	// the categories we created from the cville-parks map layer
	var layers = [
		'Regional Park', 
		'Cemetery', 
		'Community Park', 
		'Neighborhood Park', 
		'Urban Park'
	];
	
	// the colors we chose to style the parks on the map for each category
	var colors = [
		'#dae8ba', 
		'#c9e392', 
		'#a0ba69', 
		'#809c44', 
		'#485a20'
	];

	// add a legend to the map
	for (i = 0; i < layers.length; i++) {
	  var layer = layers[i];
	  var color = colors[i];
	  var item = document.createElement('div');
	  var key = document.createElement('span');
	  key.className = 'legend-key';
	  key.style.backgroundColor = color;

	  var value = document.createElement('span');
	  value.innerHTML = layer;
	  item.appendChild(key);
	  item.appendChild(value);
	  legend.appendChild(item);
	}

	// replace contents of info window when user hovers on a state
	map.on('mousemove', function(e) {	// event listener to do some code when the mouse moves

	  var parks = map.queryRenderedFeatures(e.point, {
	    layers: ['cville-parks']	// replace 'cville-parks' with the name of your layer, if using a different layer
	  });

	  if (parks.length > 0) {	// if statement to make sure the following code is only added to the info window if the mouse moves over a state
	    document.getElementById('info-window-body').innerHTML = '<h3><strong>' + parks[0].properties.PARKNAME + '</strong></h3><p>' + parks[0].properties.PARK_TYPE + ' PARK</p><p>URL: <a href="' + parks[0].properties.WEBURL + '">' 
	    	+ parks[0].properties.WEBURL + '</a></p>';
	  } else {
	    document.getElementById('info-window-body').innerHTML = '<p>Hover over a park or click on a bus stop to learn more about it.</p>';
	  }
	
	});



// --------------------------------------------------------------------
	// BUS STOPS - POPUPS
	// code to add popups
    // event listener for clicks on map
    map.on('click', function(e) {
       var clayTypes = map.queryRenderedFeatures(e.point, {
       	layers: ['kaolin', 'ball-clay', 'common-clay']
       })

      });

      // if the layer is empty, this if statement will return NULL, exiting the function (no popups created) -- this is a failsafe to avoid endless loops
      if (!soilTypes.length) {
        return;
      }

      // Sets the current feature equal to the clicked-on feature using array notation, in which the first item in the array is selected using arrayName[0]. The event listener above ("var stops = map...") returns an array of clicked-on bus stops, and even though the array might only have one item, we need to isolate it by using array notation as follows below.
      var soilType = soilTypes[0];
      
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

      	soilType = soilTypes.properties.name[i];
      	soilTypeImgLocation = "img/" + soilType + ".jpg";

       
	      popup.setHTML('<h3>Company Name: ' + clayType.properties.SITE_NAME   // 'stop_id' field of the dataset will become the title of the popup
	                           + '</h3><a href="' + clayType.properties.URL + '">' + clayType.properties.URL + '</a>');

	      // Add the popup to the map
	      popup.addTo(map);  // replace "map" with the name of the variable in line 28, if different
    	}
    });

});


// Show "About this Map" modal when clicking on button
$('#about').on('click', function() {

	$('#screen').fadeToggle();  // toggles visibility of background screen when clicked (shows if hidden, hides if visible)

	$('.modal').fadeToggle();  // toggles visibility of background screen when clicked (shows if hidden, hides if visible)	                        
	
});

// Close "About this Map" modal when close button in modal is clicked
$('.modal .close-button').on('click', function() {

	$('#screen').fadeToggle();  // toggles visibility of background screen when clicked (shows if hidden, hides if visible)

	$('.modal').fadeToggle();  // toggles visibility of background screen when clicked (shows if hidden, hides if visible)	                        
	
});