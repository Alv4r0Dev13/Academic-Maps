const saveButton = document.getElementById('menu-button');
const eventNameBox = document.getElementById('event');
const eventDescriptionBox = document.getElementById('desc');

const getMap = async () => {
  const { initMap } = await import('./map.js');
  const marker = await initMap();
  saveButton.addEventListener('click', () => {

    let name = eventNameBox.value;
    let description = eventDescriptionBox.value;
    let lat = marker.getPosition()['lat']();
    let lng = marker.getPosition()['lng']();
  
    let event = {
      name: name,
      description: description,
      lat: lat,
      lng: lng
    };
  
    console.log(event);
  });
}
getMap();

async function listEvents() {
    const response = await fetch("http://localhost:3000/events");
    const jsonData = await response.json();
    console.table(jsonData);
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
      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  }

let postdata = {
    LatLon: "12345",
    eventName: "Teste3",
    Description: "Alguma descrição de teste"
};


// listEvents();
// postJSON(postdata);
      
    