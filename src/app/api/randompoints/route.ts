import { getRandomPointInCountry } from '@/utils/getRandomPointInCountry';
import { NextRequest, NextResponse } from 'next/server';

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const country = searchParams.get('country')?.toUpperCase();
  return NextResponse.json(getRandomPointInCountry(country ?? true), {
    status: 200,
  });
}
