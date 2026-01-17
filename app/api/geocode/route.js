import {NextResponse} from "next/server";

export async function POST(request) {
    const body = await request.json();
    const address = body.address;

    const q = encodeURIComponent(String(address ?? "").trim());

    const nominatimResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${q}&format=jsonv2`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                "User-Agent": "pienofacile/1.0 (contact: giovanni@riefolo.dev)",
            },
        }
    );

    if (!nominatimResponse.ok) {
        return NextResponse.json({message: "Geocoding provider error"}, {status: 502});
    }

    const data = await nominatimResponse.json();
    return NextResponse.json(data, {status: 200});
}