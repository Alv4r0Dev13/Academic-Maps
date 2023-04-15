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
    eventName: "Teste3"
};

listEvents();
postJSON(postdata);
      
    