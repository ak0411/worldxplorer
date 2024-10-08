export default async function getCountry(lat?: number, lng?: number) {
  let data = null;
  try {
    const res = await fetch(`/api/country?lat=${lat}&lng=${lng}`);
    data = await res.json();
  } catch (e) {
    data = { country: null };
  }
  return data.country ?? null;
}
