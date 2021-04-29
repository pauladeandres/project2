let map
let marker
let markerAdded = 0

function initMap() {

    map = new google.maps.Map(
        document.querySelector('#create-form-map'), { zoom: 16, center: { lat: 40.415586629492516, lng: - 3.7074540617720997 }, styles: mapStyles.aubergine }
    )
    //getUserGeolocation()

    google.maps.event.addListener(map, "click", (event) => {

        if(markerAdded === 0) {
        addMarker(event.latLng, map);
        markerAdded = 1
        console.log(event.latLng.lng())
        } else {
            marker.setPosition(event.latLng)
            markerAdded = 1
        }
        document.getElementById('locationlat').value = event.latLng.lat()
        document.getElementById('locationlng').value = event.latLng.lng()
        
        
            google.maps.event.addListener(marker, "dragend", (event) => {
                
                document.getElementById('locationlat').value = marker.getPosition().lat()
                document.getElementById('locationlng').value = marker.getPosition().lng()
            })     
    });
}

function addMarker(location, map) {
    marker = new google.maps.Marker({
        position: location,
        label: 'My restaurant',
        animation: google.maps.Animation.DROP,
        map: map,
        draggable: true,
    });
}