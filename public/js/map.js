const markerModal = document.getElementById('marker-modal'),
    markerTitle = document.getElementById('modal-title'),
    markerButton = document.getElementById('modal-button'),
    latDisplay = document.getElementById('lat'),
    lngDisplay = document.getElementById('lng'),
    arrow = document.getElementById('arrow');
let map;

async function initMap() {
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");

    map = new Map(document.getElementById("map"), {
        center: { lat: -6.88778, lng: -38.55700 },
        zoom: 14,
        zoomControl: false,
        fullscreenControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

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
        markerModal.style.display = 'none';
    });

    arrow.addEventListener('click', () => {
        mapGrow();
        console.log('click');
    });
}

initMap();

// MAP ANIMATION
const mapDisplay = document.getElementById('map'),
    glass = document.getElementById('glass'),
    modalWin = document.getElementById('marker-modal'),
    eventsMenu = document.getElementById('menu'),
    menuEventName = document.getElementById('event');

function mapShrink() {
    mapDisplay.style.width = 'calc(70vw - 40px)';
    glass.style.width = 'calc(70vw - 40px)';
    modalWin.style.width = 'calc(70vw - 40px)';
    arrow.style.left = 'calc(30vw + 5px)';
    setTimeout(() => {
        eventsMenu.style.zIndex = '5';
        menuEventName.focus();
    }, 800);
}

function mapGrow() {
    mapDisplay.style.width = 'calc(100vw - 40px)';
    glass.removeAttribute('style');
    modalWin.removeAttribute('style');
    arrow.removeAttribute('style');
    eventsMenu.removeAttribute('style');
}