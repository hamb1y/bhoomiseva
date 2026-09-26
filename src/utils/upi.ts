/**
 * Build a UPI deep link. On a phone this opens GPay, PhonePe or Paytm with the
 * payee, the amount and the purpose already filled in, so the donor types
 * nothing. The same string is what we encode into the QR code.
 */
export interface UpiDetails {
  /** Payee address, e.g. `9900103178@ybl`. */
  upi: string;
  /** Payee name shown in the payment app. */
  payeeName: string;
  /** Whole rupees. Omitted when null or zero. */
  amount?: number | null;
  /** Purpose, carried in the transaction note. */
  note?: string | null;
}

export function upiLink({ upi, payeeName, amount, note }: UpiDetails): string {
  const params = new URLSearchParams();
  params.set("pa", upi);
  params.set("pn", payeeName);
  if (amount && amount > 0) params.set("am", String(Math.round(amount)));
  params.set("cu", "INR");

  // Payment apps render `tn` as plain text; keep it short and safe.
  const cleanNote = (note ?? "")
    .replace(/[^\p{L}\p{N} .'-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 48);
  if (cleanNote) params.set("tn", cleanNote);

  // URLSearchParams writes spaces as "+", which some UPI apps do not decode.
  return `upi://pay?${params.toString().replace(/\+/g, "%20")}`;
}
