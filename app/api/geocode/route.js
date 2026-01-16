import {NextResponse} from "next/server";

export async function POST(request) {
    const body = await request.json();
    const address = body.address;
    console.log(`https://nominatim.openstreetmap.org/search?q=${address.toString()}&format=geocodejson`)

    const nominatimResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${address.toString()}&format=geocodejson`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        }
    );

    if (!nominatimResponse.ok) {
        return NextResponse.json({message: "Geocoding provider error"}, {status: 502});
    }

    const data = await nominatimResponse.json();
    return NextResponse.json(data, {status: 200});
}