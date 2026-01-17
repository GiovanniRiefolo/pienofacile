import {NextResponse} from "next/server";

export async function POST(request) {
    const body = await request.json();
    const address = body.address;

    const nominatimResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${address.toString()}&format=geocodejson`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                "User-Agent": "pienofacile/1.0 (contact: giovanni@riefolo.dev)",
            },
        }
    );

    console.log(nominatimResponse)
    if (!nominatimResponse.ok) {
        return NextResponse.json({message: "Geocoding provider error"}, {status: 502});
    }

    const data = await nominatimResponse.json();
    return NextResponse.json(data, {status: 200});
}