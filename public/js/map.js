const markerModal = document.getElementById('marker-modal'),
    markerTitle = document.getElementById('modal-title'),
    markerButton = document.getElementById('modal-button'),
    latDisplay = document.getElementById('lat'),
    lngDisplay = document.getElementById('lng'),
    arrow = document.getElementById('arrow'),
    eventNameBox = document.getElementById('event'),
    eventDescriptionBox = document.getElementById('desc'),
    charCount = document.getElementById('char-count'),
    listButton = document.getElementById('open-list'),
    searchBar = document.getElementById('searchbar');
let map;

async function initMap() {
    if (!map) {
        // console.log(map);
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

    markerButton.addEventListener('click', () => showCreateEventMenu(marker));

    listButton.addEventListener('click', () => {
        if (content.hasAttribute('style')) closeEventList();
        else openEventList();
    });

    arrow.addEventListener('click', () => mapGrow());

    return { marker, map };
}

// initMap();

// MAP ANIMATION
const mapDisplay = document.getElementById('map-window'),
    glass = document.getElementById('glass'),
    modalWin = document.getElementById('marker-modal'),
    eventsMenu = document.getElementById('menu'),
    menuEventName = document.getElementById('event'),
    content = document.getElementById('content');

async function showCreateEventMenu(marker) {
    if (content.hasAttribute('style')) {
        closeEventList();
        await new Promise(r => setTimeout(r, 500));
    }

    mapShrink();
    arrow.style.display = 'block';
    latDisplay.innerHTML = marker.getPosition().lat();
    lngDisplay.innerHTML = marker.getPosition().lng();
    eventNameBox.value = '';
    eventDescriptionBox.value = '';
    markerModal.style.display = 'none';
    listButton.style.display = 'none';
    charCount.innerText = '0';
}

function mapShrink() {
    const mapArea = 'calc(100% - (var(--sideBarSize) + var(--gap)))';
    mapDisplay.style.width = mapArea;
    modalWin.style.width = mapArea;
}

function mapGrow() {
    mapDisplay.removeAttribute('style');
    modalWin.removeAttribute('style');
    arrow.removeAttribute('style');
    listButton.removeAttribute('style');
    eventsMenu.removeAttribute('style');
}

function openEventList() {
    content.style.justifyContent = 'left';
    mapShrink();
}

function closeEventList() {
    mapGrow();
    setTimeout(() => {
        content.removeAttribute('style');
        searchBar.value = '';
    }, 500);
}

export { initMap, mapGrow };