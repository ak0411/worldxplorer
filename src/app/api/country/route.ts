// @ts-ignore
import { lookUp } from 'geojson-places';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lat = searchParams.get('lat') as string;
  const lng = searchParams.get('lng') as string;
  console.info(lat, lng);
  if (!lat || !lng) {
    return NextResponse.json({ country: null }, { status: 400 });
  }

  const output: string | null = lookUp(
    parseFloat(lat),
    parseFloat(lng)
  )?.country_a2;

  if (output) {
    return NextResponse.json({ country: output }, { status: 200 });
  } else {
    return NextResponse.json({ country: null }, { status: 400 });
  }
}
