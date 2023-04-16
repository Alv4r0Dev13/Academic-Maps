const saveButton = document.getElementById('menu-button');
const eventNameBox = document.getElementById('event');
const eventDescriptionBox = document.getElementById('desc');

let Marks = [];

var marker, map;
var creating = false;
var mapGrowfun;

async function loader() {
  if (creating) return;
  creating = true;
  const { initMap, mapGrow } = await import('./map.js');
  mapGrowfun = mapGrow;
  const { marker: Mark, map: Mip } = await initMap();
  marker = Mark;
  map = Mip;
}

let loadMarkers = async () => {
  await loader();
  let allEvents = await listEvents();
  updateMapMarkers(allEvents, map);
}
loadMarkers();

function updateMapMarkers(allEvents, map) {
  for (let event in allEvents) {
    if (Marks.find(e => e.id === allEvents[event].id)) {
      continue;
    }
    console.log(event);
    let marker = new google.maps.Marker({
      position: { lat: allEvents[event].Lat, lng: allEvents[event].Lng },
      map,
      title: allEvents[event].eventName,
      clickable: false,
      draggable: false,
    });
    Marks.push(allEvents[event]);
  }
}

const getMap = async () => {
  await loader();
  saveButton.addEventListener('click', async () => {

    let name = eventNameBox.value;
    let description = eventDescriptionBox.value;
    let lat = marker.getPosition()['lat']();
    let lng = marker.getPosition()['lng']();
  
    let event = {
      eventName: name,
      Description: description,
      Lat: lat,
      Lng: lng
    };
    postJSON(event);
    let allEvents = await listEvents();
    updateMapMarkers(allEvents, map);
    mapGrowfun();
  });
}
getMap();

async function listEvents() {
    const response = await fetch("http://localhost:3000/events");
    const jsonData = await response.json();
    return(jsonData);
}

async function postJSON(data) {
    try {
      const response = await fetch("http://localhost:3000/eventsave", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(response);
      const result = await response.json();
      if (response.status >= 400 || response.status >= 500) {
        console.log('Server return error: ', result.err);
        return;
      }
      console.log("Success:", result.message);
    } catch (error) {
      console.error("Error:", error);
    }
}