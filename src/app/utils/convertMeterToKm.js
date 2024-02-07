export function meterToKilometers(visibility) {
  const value = visibility / 1000;
  return `${value.toFixed(0)}km`;
}
