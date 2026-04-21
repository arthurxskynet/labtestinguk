const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function randomSegment(length: number): string {
  let s = "";
  for (let i = 0; i < length; i++) {
    s += ALPHABET[Math.floor(Math.random() * ALPHABET.length)]!;
  }
  return s;
}

/**
 * Unique certificate codes: VP-XXXXXX-XXXX or VP-XXXXXX-XXXX-ETX when endotoxin is included.
 */
export function generateCertificateCode(options: { endotoxin: boolean }): string {
  const base = `VP-${randomSegment(6)}-${randomSegment(4)}`;
  return options.endotoxin ? `${base}-ETX` : base;
}
