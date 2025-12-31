export default function POST(req) {
  fetch("https://nominatim.openstreetmap.org/", {
    method: "POST",
    body: JSON.stringify(req),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
    });
}
