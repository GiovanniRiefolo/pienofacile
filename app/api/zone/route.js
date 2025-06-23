import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const response = await fetch(
      "https://carburanti.mise.gov.it/ospzApi/search/zone",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const data = await response.json();

    return NextResponse.json({
      status: 200,
      data: data,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }
}
