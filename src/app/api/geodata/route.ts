import { NextRequest, NextResponse } from 'next/server';
import { parseStringPromise } from 'xml2js';

export async function GET(req: NextRequest) {
  const land = req.nextUrl.searchParams.get('land');
  let endpoint = 'https://api.3geonames.org/?randomland=yes';

  if (land) {
    endpoint = `https://api.3geonames.org/?randomland==${land}`;
  }

  const response = await fetch(endpoint);

  if (!response.ok) {
    return NextResponse.json(
      { message: response.statusText },
      { status: response.status }
    );
  }

  const text = await response.text();

  const { lat, lng } = await parseGeodata(text);
  getStreetViewablePos(lat, lng);
  //return NextResponse.json({ lat, lng }, { status: 200 });
}

/* TODO: handle when geodata doesnt exist */
const parseGeodata = async (xml: string) => {
  const result = await parseStringPromise(xml);
  const lat: number = result.geodata.nearest[0].latt[0];
  const lng: number = result.geodata.nearest[0].longt[0];
  return { lat, lng };
};

const getStreetViewablePos = async (lat: number, lng: number) => {
  const endpoint = `https://maps.googleapis.com/maps/api/streetview/metadata?location=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
  const response = await fetch(endpoint);
  console.info(response);
};
