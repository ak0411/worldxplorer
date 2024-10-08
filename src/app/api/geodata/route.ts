import { NextRequest, NextResponse } from 'next/server';
import { parseStringPromise } from 'xml2js';

export async function GET(req: NextRequest) {
  const land = req.nextUrl.searchParams.get('land');
  let endpoint = 'https://api.3geonames.org/?randomland=yes';

  if (land) {
    endpoint = `https://api.3geonames.org/?randomland==${land}`;
  }

  console.info('Endpoint URL: ' + endpoint);

  const response = await fetch(endpoint);

  if (!response.ok) {
    return NextResponse.json(
      { message: response.statusText },
      { status: response.status }
    );
  }

  const text = await response.text();
  console.info(text);

  // Parse the XML response using xml2js
  const result = await parseStringPromise(text);
  const lat = result.geodata.nearest[0].latt[0];
  const lng = result.geodata.nearest[0].longt[0];

  return NextResponse.json({ lat, lng }, { status: 200 });
}
