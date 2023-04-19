const saveButton = document.getElementById('menu-button');
const eventNameBox = document.getElementById('event');
const eventDescriptionBox = document.getElementById('desc');
const searchbar = document.getElementById('searchbar');
const menuButton = document.getElementById('open-list');

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
    // console.log(event);
    let marker = new google.maps.Marker({
      position: { lat: allEvents[event].Lat, lng: allEvents[event].Lng },
      map,
      title: allEvents[event].eventName,
      clickable: false,
      draggable: false,
    });
    Marks.push(allEvents[event]);
    createEventOnEventList(allEvents[event]);
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

function createEventOnEventList(event) {
  const itemList = document.createElement('li');
  itemList.classList.add('list-event');

  const details = document.createElement('details');
  const summary = document.createElement('summary');
  
  const eventName = document.createElement('p');
  eventName.innerText = event.eventName;
  eventName.classList.add('list-event-name');

  const locateButton = document.createElement('button');
  locateButton.classList.add('button', 'icon-btn', 'list-event-btn')

  locateButton.addEventListener('click', () => {
    map.setCenter({lat:event.Lat, lng:event.Lng});
  });

  const locateIcon = document.createElement('ion-icon');
  locateIcon.setAttribute('name', 'location-outline');

  locateButton.appendChild(locateIcon);
  summary.appendChild(eventName);
  summary.appendChild(locateButton);

  const description = document.createElement('p');
  description.innerText = event.Description;
  description.classList.add('list-event-desc');

  details.appendChild(summary);
  details.appendChild(description);
  itemList.appendChild(details);

  document.getElementById('list-list').appendChild(itemList);
}

async function search() {
  await loader();
  let allEvents = await listEvents();
  let textInput = searchbar.value.toLowerCase();
  let findEvents = allEvents.filter((event) => {
     return event.eventName.toLowerCase().includes(textInput);
  });
  document.getElementById('list-list').replaceChildren();
  findEvents.forEach(event => {
    createEventOnEventList(event);
  });
}

searchbar.addEventListener('keyup', search);
menuButton.addEventListener('click', search);