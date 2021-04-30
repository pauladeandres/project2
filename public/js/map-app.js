let map
let marker
let contentString

function initMap() {

    map = new google.maps.Map(
        document.querySelector('#map'), 
        { zoom: 16, center: {lat: 40.415586629492516, lng: - 3.7074540617720997}, styles: mapStyles.aubergine }
    )

    getApiRestaurants()

    const infowindow = new google.maps.InfoWindow({
        content: contentString,
    });

    }

    function getApiRestaurants() {

        axios
            .get('/api/restaurants')
            .then(res => placeRestaurantsInMap(res.data))
            .catch(err => console.log('ERROR EN CLIENTE OBTENIENDO LOS RESTAURANTES', err))
    }

    function placeRestaurantsInMap(restaurants) {

        restaurants.forEach(elm => {
            const position = { lat: elm.locationlat, lng: elm.locationlng }
            const title = elm.name
            marker = new google.maps.Marker({ title, position, map })
            constentString = `<h2>${elm.name}</h2>`
    })

        marker.addListener(marker, "click", () => {
            console.log('hola')
            // infowindow.open(map, marker);
        });
 
}



