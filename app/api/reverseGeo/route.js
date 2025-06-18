export default function POST(req, res) {
  fetch("https://nominatim.openstreetmap.org/", {
    method: "POST",
    body: JSON.stringify(req),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
    });
}
