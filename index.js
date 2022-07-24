const map = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  target: 'map',
  view: new ol.View({
    center: [0, 0],
    zoom: 2
  })
});

// define Source
const citiesSource = new ol.source.Vector()

$.ajax({
  url:'cities.php',
  type:'GET',
  // dataType : 'text',
  success: dataResult => {
    const result = JSON.parse(dataResult)
    // console.log(result)
    result.forEach(data => {
      const feature = (new ol.format.GeoJSON()).readFeature(JSON.parse(data['geom']))
      feature.setProperties({
        'name': data['city_name']
      })
      citiesSource.addFeature(feature)
    })
  }
})


// define Layer
const citiesLayer = new ol.layer.Vector({
  source:citiesSource
})

map.addLayer(citiesLayer)

function featinfo (event){
  const clickedFeature = map.forEachFeatureAtPixel(event.pixel,
    data => {
      return data
    })
    if (clickedFeature) {
      document.querySelector("#nameoffeature").innerText = clickedFeature.get('name')
      $('#featureinfo').modal('show')
    }
}

let clickedCoord

function addFeatures (event) {
  clickedCoord = event.target.getCoordinateFromPixel(event.pixel)
  console.log(clickedCoord)
  $('#addfeature').modal('show')
  map.on('click', featinfo)
  map.un('click', addFeatures)
}

// Getting information about feature on click
map.on('click', featinfo)

function addFeat (){
  map.un('click', featinfo)
  map.on('click', addFeatures)
}


function saveData() {
  const cityName = document.querySelector("#cityname").value
  if (cityName == '') {
    alert('Please enter cityname')
  } else {
    $.ajax({
      url:'save_city.php',
      type:'POST',
      data: {
        name: cityName,
        long: clickedCoord[0],
        lat: clickedCoord[1]
      },
      // dataType : 'text',
      success: function(dataResult) {
        const result = JSON.parse(dataResult)
        if (result.statusCode == 200) {
          console.log('added value successfully')
        } else {
          console.log('Some error with the code!')
        }
      }
    })
  }
}