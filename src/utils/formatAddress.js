export function formatAddress(address) {
  if (!address) return "-";

  const { street, suite, city, zipcode } = address;

  return [street, suite, city, zipcode].filter(Boolean).join(", ");
}
