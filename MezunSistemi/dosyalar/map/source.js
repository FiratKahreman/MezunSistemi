mapboxgl.accessToken = 'pk.eyJ1IjoiZmlyYXRrYWhybW4iLCJhIjoiY2tybmJ5aHB1MHZmdTJwbm8yZ2h6dGhkeiJ9.6q7Nd5O3nTCm54h618EWZQ';



const map = new mapboxgl.Map({
    container: 'map',
    style: 'https://api.jsonbin.io/b/612dcff7259bcb6118ef834b',
    zoom: 13,    
    center: [39.75, 41]
});

map.on('load', () => {
    map.addSource('films', {
        type: 'geojson',
        data: 'https://api.jsonbin.io/b/612aa4cdc5159b35ae05ac8e/4'
    });

    map.addSource('series', {
        type: 'geojson',
        data: 'https://api.jsonbin.io/b/612dd06b259bcb6118ef8373'
    });


    map.addLayer({
        'id': 'films',
        'type': 'circle',
        'source': 'films',
        'paint': {
            'circle-color': 'brown',
            'circle-radius': 7,
            'circle-stroke-width': 2,
            'circle-stroke-color': 'white'
        },

    });


    map.on('click', 'films', (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.isim;
        const place = e.features[0].properties.konum;
        const year = e.features[0].properties.yil;
        const tur = e.features[0].properties.tur;
        const aciklama = e.features[0].properties.aciklama;
        const cover = e.features[0].properties.cover;



        popup.setLngLat(coordinates).setHTML(description + "<br>Türü: " + tur + "<br>Yıl: " + year + "<br>Konum: " + place).addTo(map);

        document.getElementById("baslik").innerHTML = description;
        document.getElementById("content").innerHTML = aciklama;
        document.getElementById("poster").innerHTML = "<img style=\"height= 10%;\"src= " + cover + "></img>";
        map.flyTo({
            center: e.features[0].geometry.coordinates
        });


    });

    map.on('click', 'series', (e) => {

        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.isim;
        const place = e.features[0].properties.konum;
        const year = e.features[0].properties.yil;
        const tur = e.features[0].properties.tur;



        popup.setLngLat(coordinates).setHTML(description + "<br>Türü: " + tur + "<br>Yıl: " + year + "<br>Konum: " + place).addTo(map);
        document.getElementById("baslik").innerHTML = description;
        document.getElementById("content").innerHTML = tur;
        document.getElementById("poster").innerHTML = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto possimus voluptates delectus labore necessitatibus laborum praesentium totam! Exercitationem et asperiores commodi beatae vero nulla libero tempora, fugit nihil in impedit?Lorem ipsum dolor sit amet consectetur adipisicing elit.Iusto possimus voluptates delectus labore necessitatibus laborum praesentium totam!Exercitationem et asperiores commodi beatae vero nulla libero tempora, fugit nihil in impedit ? Lorem ipsum dolor sit amet consectetur adipisicing elit.Iusto possimus voluptates delectus labore necessitatibus laborum praesentium totam!Exercitationem et asperiores commodi beatae vero nulla libero tempora, fugit nihil in impedit ? Lorem ipsum dolor sit amet consectetur adipisicing elit.Iusto possimus voluptates delectus labore necessitatibus laborum praesentium totam!Exercitationem et asperiores commodi beatae vero nulla libero tempora, fugit nihil in impedit ? Lorem ipsum dolor sit amet consectetur adipisicing elit.Iusto possimus voluptates delectus labore necessitatibus laborum praesentium totam!Exercitationem et asperiores commodi beatae vero nulla libero tempora, fugit nihil in impedit ? ";
        map.flyTo({
            center: e.features[0].geometry.coordinates
        });
    });

    map.on('mouseenter', 'films', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'films', () => {
        map.getCanvas().style.cursor = '';

    });

   
    const popup = new mapboxgl.Popup({
        closeButton: true,
        closeOnClick: true

    });





});

map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    })
);

map.addControl(new mapboxgl.FullscreenControl());
map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
    })
);

var filmkontrol = 1;
var dizikontrol = 1;

async function filmlerackapa() {

    if (filmkontrol == 1) {
        map.setLayoutProperty('films', 'visibility', 'none');
        filmkontrol = 0;
    } else if (filmkontrol == 0) {
        map.setLayoutProperty('films', 'visibility', 'visible');
        filmkontrol = 1;
    }
}

async function dizilerackapa() {

    if (dizikontrol == 1) {
        map.setLayoutProperty('series', 'visibility', 'none');
        dizikontrol = 0;
    } else if (dizikontrol == 0) {
        map.setLayoutProperty('series', 'visibility', 'visible');
        dizikontrol = 1;
    }
}

async function setoption() {
    const scale = new mapboxgl.ScaleControl({
        maxWidth: 100,
        unit: 'metric'
    });
    map.addControl(scale);

    scale.setUnit('metric');
}

