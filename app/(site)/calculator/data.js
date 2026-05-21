export const defaultSettings = {
  electricityRate: 9.5,
  solarHoursPerDay: 5.5,
  systemEfficiency: 0.8,
};

export const systemRecommendations = [
  {
    kw: 1,
    name: "1KW Starter Kit",
    price: 85000,
    panels: 2,
    battery: "2.4kWh",
    suitable: "1-2 rooms, basic backup",
    monthlySavings: 1200,
  },
  {
    kw: 3,
    name: "3KW Home Kit",
    price: 185000,
    panels: 6,
    battery: "5kWh",
    suitable: "3-4 bed home, full backup",
    monthlySavings: 3500,
  },
  {
    kw: 5,
    name: "5KW AC-Ready Kit",
    price: 285000,
    panels: 10,
    battery: "10kWh",
    suitable: "Large home, multiple ACs",
    monthlySavings: 5500,
  },
  {
    kw: 10,
    name: "10KW Premium Kit",
    price: 450000,
    panels: 18,
    battery: "20kWh",
    suitable: "Villa, commercial use",
    monthlySavings: 9500,
  },
];
