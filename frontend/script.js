fetch("http://localhost:3000/schedule")
  .then((response) => response.json())
  .then((data) => {
    const table = document.getElementById("scheduleTable");
    data.forEach((item) => {
      const row = table.insertRow();
      row.insertCell(0).textContent = item.day;
      row.insertCell(1).textContent = item.subject;
      row.insertCell(2).textContent = item.time;
    });
  })
  .catch((error) => console.error("Error:", error));

fetch("https://your-railway-url.up.railway.app/schedule/add", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ day: "수요일", subject: "과학", time: "11:00" }),
})
  .then((response) => response.text())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));

fetch("https://your-railway-url.up.railway.app/schedule/update/1", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ day: "목요일", subject: "역사", time: "13:00" }),
})
  .then((response) => response.text())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));

fetch("https://your-railway-url.up.railway.app/schedule/delete/1", {
  method: "DELETE",
})
  .then((response) => response.text())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
