let adminMap = L.map('adminMap').setView([28.6139, 77.2090], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
.addTo(adminMap);

// 🔥 Store markers by user
let userMarkers = {};

async function loadLocations() {
  const res = await fetch("http://127.0.0.1:5000/get-locations");
  const data = await res.json();

  data.forEach(loc => {
    const id = loc.user_id;

    if (userMarkers[id]) {
      userMarkers[id].setLatLng([loc.lat, loc.lng]);
    } else {
      const marker = L.marker([loc.lat, loc.lng])
        .addTo(adminMap)
        .bindPopup("👤 User: " + id);

      userMarkers[id] = marker;
    }
  });
}

setInterval(loadLocations, 3000);

// refresh
setInterval(loadLocations, 3000);
async function loadSOS() {
  const res = await fetch("http://127.0.0.1:5000/get-sos");
  const data = await res.json();

  data.forEach(alert => {
    L.circle([alert.lat, alert.lng], {
      color: 'red',
      radius: 100
    }).addTo(adminMap)
    .bindPopup("🚨 SOS from User " + alert.user_id);
  });
}

// refresh SOS
setInterval(loadSOS, 5000);

let shownAlerts = [];

async function checkSOS() {
  const res = await fetch("http://127.0.0.1:5000/get-sos");
  const data = await res.json();

  if (data.length > 0) {
    const latest = data[0];

    // avoid repeat popup
    if (!shownAlerts.includes(latest.user_id + latest.lat)) {

      showPopup(latest.user_id);

      // 🔴 draw alert on map
      L.circle([latest.lat, latest.lng], {
        color: 'red',
        radius: 100
      }).addTo(adminMap);

      shownAlerts.push(latest.user_id + latest.lat);
    }
  }
}

function showPopup(userId) {
  const popup = document.getElementById("sosPopup");
  const sound = document.getElementById("alertSound");

  popup.innerText = "🚨 SOS from User " + userId;
  popup.style.display = "block";

  sound.play();

  setTimeout(() => {
    popup.style.display = "none";
  }, 5000);
}

// check every 3 sec
setInterval(checkSOS, 3000);