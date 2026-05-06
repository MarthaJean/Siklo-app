export type VoucherType = "percent" | "flat";

export type Voucher = {
  id: string;
  title: string;
  description: string;
  type: VoucherType;
  value: number;
  minSubtotal?: number;
};

export const vouchers: Voucher[] = [
  {
    id: "greenflow12",
    title: "Green Flow 12%",
    description: "12% off your next biowaste pickup",
    type: "percent",
    value: 12,
  },
  {
    id: "marketday75",
    title: "Market Day ₱75",
    description: "₱75 off any order today",
    type: "flat",
    value: 75,
  },
  {
    id: "coopspecial150",
    title: "Co-op Special ₱150",
    description: "₱150 off community bulk buys",
    type: "flat",
    value: 150,
  },
  {
    id: "compostclub8",
    title: "Compost Club 8%",
    description: "8% off compost-ready materials",
    type: "percent",
    value: 8,
  },
  {
    id: "harborbonus200",
    title: "Harbor Bonus ₱200",
    description: "₱200 off large organic lots",
    type: "flat",
    value: 200,
  },
];
