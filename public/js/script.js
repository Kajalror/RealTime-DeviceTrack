const socket = io();
console.log("hey socket");

// === geolocation ===

if(navigator.geolocation){
    navigator.geolocation.watchPosition(
        (position)=> {
       const {latitude, longitude} = position.coords;
       socket.emit("send-location", { latitude,longitude});
        },
        (error)=>{
            console.log(error);
        },
        {
            enableHighAccuracy: true,
            timeout:8000,
            maximumAge: 0,
        }
    );
}


// world center point (0,0) and zoom level = 10

const map = L.map("map").setView( [0, 0], 16);
console.log("map ---  :", map);

// === tileLayer link from show location ==

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png ", {
    attribution: "karnal",
}).addTo(map);

const markers = {};
console.log("Markers:", markers);

socket.on("receive-location", (data) => {
    const {id, latitude, longitude} = data;
    console.log("id: ", id);
    console.log("data--- :", data);
    map.setView([latitude, longitude], 16);

    if(markers[id]){
        console.log("markers", markers[id]);
        markers[id].setLatLng([latitude, longitude]);

    } else {
        markers[id] = L.marker([latitude, longitude] ).addTo(map);
        console.log ("marker", markers[id]);
    }
});




socket.on('remove-marker', (id) => {
    if (markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id];
    }
});






