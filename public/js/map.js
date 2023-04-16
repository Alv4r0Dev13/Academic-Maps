const markerModal = document.getElementById('marker-modal'),
    markerTitle = document.getElementById('modal-title'),
    markerButton = document.getElementById('modal-button'),
    latDisplay = document.getElementById('lat'),
    lngDisplay = document.getElementById('lng'),
    arrow = document.getElementById('arrow'),
    eventNameBox = document.getElementById('event'),
    eventDescriptionBox = document.getElementById('desc'),
    charCount = document.getElementById('char-count');
let map;

async function initMap() {
    if (!map) {
        console.log(map);
        const { Map } = await google.maps.importLibrary("maps");

        map = new Map(document.getElementById("map"), {
            center: { lat: -6.88778, lng: -38.55700 },
            zoom: 14,
            zoomControl: false,
            fullscreenControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        });
    }

    let marker = new google.maps.Marker({
        position: { lat: -6.88778, lng: -38.55700 },
        map,
        title: "Cajazeiras",
        clickable: false,
        draggable: true,
    });

    map.addListener('click', (evt) => {
        console.log(`lat: ${evt.latLng.lat()}, lng:${evt.latLng.lng()}`);

        marker.setPosition(evt.latLng);
        map.setCenter(evt.latLng);
        markerModal.style.display = 'none';
    });

    marker.addListener('dblclick', () => {
        markerModal.style.display = 'flex';
        markerTitle.innerHTML = `Posição: ${marker.getPosition()}`;
    });

    markerButton.addEventListener('click', () => {
        mapShrink();
        latDisplay.innerHTML = marker.getPosition()['lat']();
        lngDisplay.innerHTML = marker.getPosition()['lng']();
        eventNameBox.value = '';
        eventDescriptionBox.value = '';
        markerModal.style.display = 'none';
        charCount.innerText = '0';
    });

    arrow.addEventListener('click', () => {
        mapGrow();
    });

    return {marker, map};
}

// initMap();

// MAP ANIMATION
const mapDisplay = document.getElementById('map-window'),
    glass = document.getElementById('glass'),
    modalWin = document.getElementById('marker-modal'),
    eventsMenu = document.getElementById('menu'),
    menuEventName = document.getElementById('event');

function mapShrink() {
    const mapArea = 'calc(100% - (var(--sideBarSize) + var(--mapGap)))';
    mapDisplay.style.width = mapArea;
    modalWin.style.width = mapArea;
    arrow.style.opacity = '1';
}

function mapGrow() {
    mapDisplay.style.width = '100%';
    modalWin.removeAttribute('style');
    arrow.style.opacity = '0';
    eventsMenu.removeAttribute('style');
}

export { initMap, mapGrow };