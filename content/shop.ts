export const deliveryAreas = [
  { id: "chaguanas", name: "Chaguanas", fee: 25 },
  { id: "central", name: "Central Trinidad", fee: 35 },
  { id: "north", name: "Port of Spain and the north", fee: 45 },
  { id: "south", name: "South Trinidad", fee: 55 },
  { id: "tobago", name: "Tobago", fee: 90 },
] as const;

export const bankTransfer = {
  bankName: "Replace with bank name",
  accountName: "Ameer Hosein",
  accountNumber: "Replace with account number",
  note: "Use your order reference as the transfer description.",
} as const;

export const shopCopy = {
  name: "AH Store",
  heading: "Shop AH",
  lede: "Tees, hoodies, caps, presets, prints, and a seat in the next class, given as a gift.",
  pickup: "Pickup at Plaza De Montrose, Chaguanas.",
  deliveryNote: "Delivery fees below are starter figures. Edit them in content/shop.ts.",
} as const;
