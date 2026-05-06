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
    id: "eco10",
    title: "Eco Saver 10%",
    description: "10% off orders ₱500 and above",
    type: "percent",
    value: 10,
    minSubtotal: 500,
  },
  {
    id: "freedelivery",
    title: "Free Delivery",
    description: "₱50 off delivery",
    type: "flat",
    value: 50,
    minSubtotal: 0,
  },
  {
    id: "bulk100",
    title: "Bulk Deal ₱100",
    description: "₱100 off orders ₱1,000 and above",
    type: "flat",
    value: 100,
    minSubtotal: 1000,
  },
];
