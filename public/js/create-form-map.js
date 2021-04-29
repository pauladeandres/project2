let map

const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let labelIndex = 0;

function initMap() {

    map = new google.maps.Map(
        document.querySelector('#create-form-map'), { zoom: 16, center: { lat: 40.415586629492516, lng: - 3.7074540617720997 }, styles: mapStyles.aubergine }
    )
    //getUserGeolocation()

    google.maps.event.addListener(map, "click", (event) => {
        addMarker(event.latLng, map);
        console.log(event.latLng.lng())
        document.getElementById('locationlat').value = event.latLng.lat()
        document.getElementById('locationlng').value = event.latLng.lng()
    });
}

function addMarker(location, map) {
    new google.maps.Marker({
        position: location,
        label: 'My restaurant',
        map: map,
        draggable: true,
    });
}