import borders from '@/public/genBorders.json' with { type: 'json' };
import { NextRequest, NextResponse } from 'next/server';

export function getRandomPointInCountry(
  countryCode: string | boolean = true
): number[] | null {
  const features = borders.features.filter((feature: any) =>
    countryCode === true ? true : feature.properties.code === countryCode
  );
  if (features.length === 0) return null;
  const allPolygons: {
    polygon: number[][][];
    area: number;
    countryCode: string;
  }[] = [];

  // Function to calculate the area of a polygon
  function getArea(polygon: number[][][]): number {
    let area = 0;
    for (let i = 0, j = polygon[0].length - 1; i < polygon[0].length; j = i++) {
      const xi = polygon[0][i][0],
        yi = polygon[0][i][1];
      const xj = polygon[0][j][0],
        yj = polygon[0][j][1];
      area += xi * yj - xj * yi;
    }
    return Math.abs(area / 2);
  }

  // Extract all polygons from the features and calculate their areas
  features.forEach((feature: any) => {
    if (feature.geometry.type === 'Polygon') {
      allPolygons.push({
        polygon: feature.geometry.coordinates,
        area: getArea(feature.geometry.coordinates),
        countryCode: feature.properties.code,
      });
    } else if (feature.geometry.type === 'MultiPolygon') {
      feature.geometry.coordinates.forEach((polygon: number[][][]) => {
        allPolygons.push({
          polygon,
          area: getArea(polygon),
          countryCode: feature.properties.code,
        });
      });
    }
  });

  // Function to calculate the bounding box for a polygon
  function getBoundingBox(polygon: number[][][]): {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  } {
    let minX: number | undefined,
      maxX: number | undefined,
      minY: number | undefined,
      maxY: number | undefined;
    polygon[0].forEach(([x, y]: number[]) => {
      minX = minX === undefined ? x : Math.min(minX, x);
      maxX = maxX === undefined ? x : Math.max(maxX, x);
      minY = minY === undefined ? y : Math.min(minY, y);
      maxY = maxY === undefined ? y : Math.max(maxY, y);
    });
    return { minX: minX!, maxX: maxX!, minY: minY!, maxY: maxY! }; // Non-null assertion
  }

  // Function to check if a point is in the polygon
  function isPointInPolygon(point: number[], vs: number[][][]): boolean {
    const [x, y] = point;
    let inside = false;
    for (let i = 0, j = vs[0].length - 1; i < vs[0].length; j = i++) {
      const xi = vs[0][i][0],
        yi = vs[0][i][1];
      const xj = vs[0][j][0],
        yj = vs[0][j][1];
      const intersect =
        yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  }

  function getRandomUnWeightedPolygon(
    polygons: { polygon: number[][][] }[]
  ): number[][][] {
    return polygons[Math.floor(Math.random() * polygons.length)].polygon;
  }

  // Function to select a random polygon with larger polygons having a higher chance of being selected
  function getRandomWeightedPolygon(
    polygons: { polygon: number[][][]; area: number; countryCode: string }[]
  ): number[][][] {
    const westernEuropeCountries = [
      'AT',
      'BE',
      'FR',
      'DE',
      'IE',
      'NL',
      'CH',
      'GB',
    ];

    const totalArea = polygons.reduce((total, { area, countryCode }) => {
      const weight = westernEuropeCountries.includes(countryCode) ? 2 : 1;
      return total + area * weight;
    }, 0);
    let random = Math.random() * totalArea;

    for (const { polygon, area, countryCode } of polygons) {
      const weight = westernEuropeCountries.includes(countryCode) ? 2 : 1;
      if (random < area * weight) return polygon;
      random -= area * weight;
    }

    return polygons[polygons.length - 1].polygon;
  }

  // Try to find a random point within the country's polygons
  while (true) {
    const randomPolygon = getRandomWeightedPolygon(allPolygons);
    const bbox = getBoundingBox(randomPolygon);

    const randomPoint = [
      Math.random() * (bbox.maxX - bbox.minX) + bbox.minX,
      Math.random() * (bbox.maxY - bbox.minY) + bbox.minY,
    ];

    if (isPointInPolygon(randomPoint, randomPolygon)) {
      return randomPoint.reverse();
    }
  }
}

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const country = searchParams.get('country')?.toUpperCase();
  return NextResponse.json(getRandomPointInCountry(country ?? true), {
    status: 200,
  });
}
