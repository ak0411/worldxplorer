export const getStreetViewOptions = (
  position: google.maps.LatLngLiteral
): google.maps.StreetViewPanoramaOptions => ({
  position: position,
  visible: true,
  enableCloseButton: false,
  addressControl: false,
  fullscreenControl: false,
  showRoadLabels: false,
  zoomControl: false,
});
