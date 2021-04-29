let map
let marker
let markerAdded = 0



function initMap() {

    map = new google.maps.Map(
        document.querySelector('#filter-map'), 
        { 
            zoom: 16, 
            center: { lat: 40.415586629492516, lng: - 3.7074540617720997 }, 
            styles: mapStyles.aubergine }
    )
    const geocoder = new google.maps.Geocoder();
    
    document
        .getElementById("submit") 
        .addEventListener("click",() => {
            geocodeAddress(geocoder, map);
    })

    function geocodeAddress( geocoder, resultsMap) {
        const address = (document.getElementById("address"))
            .value;
        geocoder.geocode({ address: address }, (results, status) => {
            if (status === "OK") {
                resultsMap.setCenter(results[0].geometry.location);
                new google.maps.Marker({
                    map: resultsMap,
                    position: results[0].geometry.location,
                });
            } else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        }); 
    }
}