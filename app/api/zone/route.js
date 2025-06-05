import { NextResponse } from "next/server";

export default function POST(req, res) {
  fetch("https://carburanti.mise.gov.it/ospzApi/search/zone", {
    method: "POST",
    body: req,
  })
    .then((response) => response.json())
    .then((response) => {
      if (response === ok) {
        return NextResponse.json({
          status: response.status,
          data: response.data,
        });
      }
    });
}
