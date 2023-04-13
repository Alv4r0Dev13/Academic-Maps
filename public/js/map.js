const markerModal = document.getElementById('marker-modal'),
      markerTitle = document.getElementById('modal-title'),
      markerButton = document.getElementById('modal-button'),
      modal = document.getElementById('modal-window'),
      closeModal = document.getElementById('close-modal'),
      modalPosition = document.getElementById('position');
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
        console.log(marker.getPosition());
        markerTitle.innerHTML = `Posição: ${marker.getPosition()}`;
    });

    markerButton.addEventListener('click', () => {
        modalPosition.innerHTML = `Posição: ${marker.getPosition()}`;
        markerModal.style.display = 'none';
        modal.style.display = 'flex';
    });

    closeModal.addEventListener('click', () => modal.style.display = 'none')
}

initMap();