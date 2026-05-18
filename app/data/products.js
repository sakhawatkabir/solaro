export const products = [
  {
    id: "kit-1kw",
    category: "home-kit",
    title: "1KW Solar Home Kit",
    subtitle: "Perfect for small apartments",
    price: 85000,
    originalPrice: 95000,
    image:
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1200&auto=format&fit=crop",
    badge: "Best for Beginners",
    description:
      "Ideal for 1-2 room apartments or small homes. Powers LED lights, fans, TV, router, and phone charging during load shedding.",
    specs: {
      panels: "2 x 550W Monocrystalline Panels",
      inverter: "1kW Hybrid Inverter (MPPT)",
      battery: "2.4kWh Lithium Battery",
      backupTime: "4-6 hours for essential loads",
      coverage: "150-200 sq ft roof space",
      warranty: "25 years on panels, 5 years on battery",
    },
    includes: [
      "Solar Panels with mounting structure",
      "Hybrid Inverter with MPPT charger",
      "Lithium Battery Pack",
      "DC/AC wiring and breakers",
      "Installation & commissioning",
      "Net metering paperwork assistance",
    ],
    savings: {
      monthly: 1200,
      yearly: 14400,
      payback: "6-7 years",
    },
    suitableFor: [
      "1-2 room apartments",
      "Small families (2-3 people)",
      "Basic backup during load shedding",
    ],
  },
  {
    id: "kit-3kw",
    category: "home-kit",
    title: "3KW Solar Home Kit",
    subtitle: "Complete power for medium homes",
    price: 185000,
    originalPrice: 210000,
    image:
      "https://images.unsplash.com/photo-1592833159155-c62df1b65634?q=80&w=1200&auto=format&fit=crop",
    badge: "Most Popular",
    description:
      "Our best-selling kit for medium-sized homes. Powers all essential appliances including fridge, fans, lights, TV, computers, and AC (1 ton) for limited hours.",
    specs: {
      panels: "6 x 550W Monocrystalline Panels",
      inverter: "3kW Hybrid Inverter (MPPT)",
      battery: "5kWh Lithium Battery",
      backupTime: "6-8 hours for full home load",
      coverage: "400-500 sq ft roof space",
      warranty: "25 years on panels, 5 years on battery",
    },
    includes: [
      "6 Solar Panels with aluminum mounting",
      "3kW Hybrid Inverter with WiFi monitoring",
      "5kWh Lithium Iron Phosphate Battery",
      "Complete wiring, breakers & protection",
      "Professional installation (1-2 days)",
      "Mobile app for real-time monitoring",
      "Net metering & DESA coordination",
    ],
    savings: {
      monthly: 3500,
      yearly: 42000,
      payback: "5-6 years",
    },
    suitableFor: [
      "3-4 bedroom homes",
      "Families of 4-6 people",
      "Full home backup during load shedding",
      "Reducing DESA/DESCO bills significantly",
    ],
  },
  {
    id: "kit-5kw",
    category: "home-kit",
    title: "5KW Solar Home Kit",
    subtitle: "Large home & AC-ready power",
    price: 285000,
    originalPrice: 325000,
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop",
    badge: "AC Ready",
    description:
      "Powerful system for large homes with multiple AC units. Full home backup with extended battery runtime. Eliminates load shedding completely.",
    specs: {
      panels: "10 x 550W Monocrystalline Panels",
      inverter: "5kW Hybrid Inverter (Dual MPPT)",
      battery: "10kWh Lithium Battery",
      backupTime: "8-12 hours for full home",
      coverage: "700-900 sq ft roof space",
      warranty: "25 years on panels, 5 years on battery",
    },
    includes: [
      "10 Premium Solar Panels",
      "5kW Dual MPPT Hybrid Inverter",
      "10kWh High-Capacity Lithium Battery",
      "Industrial-grade mounting & wiring",
      "Surge protection & safety breakers",
      "Professional installation (2-3 days)",
      "Smart monitoring app & dashboard",
      "1-year free maintenance",
    ],
    savings: {
      monthly: 5500,
      yearly: 66000,
      payback: "4-5 years",
    },
    suitableFor: [
      "Large homes & villas",
      "Families with multiple AC units",
      "Complete energy independence",
      "Home offices with high power needs",
    ],
  },
  {
    id: "kit-10kw",
    category: "home-kit",
    title: "10KW Solar Home Kit",
    subtitle: "Commercial-grade residential power",
    price: 450000,
    originalPrice: 520000,
    image:
      "https://images.unsplash.com/photo-1700529289398-dd313f11c9cc?q=80&w=1200&auto=format&fit=crop",
    badge: "Premium",
    description:
      "Top-tier system for luxury homes and small commercial use. Powers multiple ACs, pumps, and heavy appliances with zero downtime.",
    specs: {
      panels: "18 x 550W Monocrystalline Panels",
      inverter: "10kW Three-Phase Hybrid Inverter",
      battery: "20kWh Lithium Battery Bank",
      backupTime: "12-16 hours full load",
      coverage: "1200-1500 sq ft roof space",
      warranty: "25 years on panels, 10 years on battery",
    },
    includes: [
      "18 Tier-1 Grade Panels",
      "10kW Three-Phase Hybrid Inverter",
      "20kWh Expandable Battery Bank",
      "Commercial-grade installation",
      "Advanced monitoring & BMS",
      "3 years free maintenance",
      "Priority support & hotline",
    ],
    savings: {
      monthly: 9500,
      yearly: 114000,
      payback: "4 years",
    },
    suitableFor: [
      "Luxury villas & bungalows",
      "Small commercial buildings",
      "Homes with pool pumps & lifts",
      "Maximum energy independence",
    ],
  },
  {
    id: "panel-400w",
    category: "panel",
    title: "400W Monocrystalline Solar Panel",
    subtitle: "High-efficiency Tier-1 panel",
    price: 28000,
    originalPrice: 32000,
    image:
      "https://images.unsplash.com/photo-1592833159155-c62df1b65634?q=80&w=1200&auto=format&fit=crop",
    badge: null,
    description:
      "Premium monocrystalline solar panel with 21.5% efficiency. Perfect for limited roof space in Bangladeshi urban homes.",
    specs: {
      power: "400W peak output",
      efficiency: "21.5% cell efficiency",
      cells: "144 half-cut monocrystalline cells",
      dimensions: "1722 x 1134 x 30 mm",
      weight: "21.5 kg",
      warranty: "25-year performance warranty",
    },
    includes: [
      "1x 400W Solar Panel",
      "MC4 connectors",
      "Mounting clamps (4pcs)",
      "Performance certificate",
    ],
    savings: null,
    suitableFor: [
      "DIY solar projects",
      "Expanding existing systems",
      "Small installations",
    ],
  },
  {
    id: "panel-550w",
    category: "panel",
    title: "550W Premium Monocrystalline Panel",
    subtitle: "Latest generation high-power panel",
    price: 35000,
    originalPrice: 40000,
    image:
      "https://images.unsplash.com/photo-1566821594226-cdc9cb42a4c8?q=80&w=1200&auto=format&fit=crop",
    badge: "Best Value",
    description:
      "Next-generation 550W panel with advanced PERC technology. Higher wattage means fewer panels needed for your system.",
    specs: {
      power: "550W peak output",
      efficiency: "22.8% cell efficiency",
      cells: "144 half-cut mono PERC cells",
      dimensions: "2278 x 1134 x 35 mm",
      weight: "28.5 kg",
      warranty: "25-year performance warranty",
    },
    includes: [
      "1x 550W Solar Panel",
      "MC4 connectors",
      "Mounting clamps (4pcs)",
      "Performance certificate",
    ],
    savings: null,
    suitableFor: [
      "New installations",
      "System upgrades",
      "Maximum roof efficiency",
    ],
  },
  {
    id: "battery-5kwh",
    category: "battery",
    title: "5kWh Lithium Battery",
    subtitle: "LiFePO4 battery for solar storage",
    price: 95000,
    originalPrice: 110000,
    image:
      "https://images.unsplash.com/photo-1705579605238-24a90c8799c5?q=80&w=1200&auto=format&fit=crop",
    badge: "Popular",
    description:
      "Safe and long-lasting LiFePO4 battery pack. Powers essential loads during load shedding for 6-8 hours.",
    specs: {
      capacity: "5.12kWh usable capacity",
      type: "LiFePO4 (Lithium Iron Phosphate)",
      cycles: "6000+ charge cycles",
      voltage: "48V DC system",
      bms: "Smart BMS with app monitoring",
      warranty: "5 years / 6000 cycles",
    },
    includes: [
      "5kWh Battery Pack",
      "Built-in Smart BMS",
      "Wall-mount bracket",
      "Communication cables",
      "User manual & app access",
    ],
    savings: null,
    suitableFor: [
      "3-4kW solar systems",
      "Evening backup power",
      "Load shedding protection",
    ],
  },
  {
    id: "battery-10kwh",
    category: "battery",
    title: "10kWh Lithium Battery Bank",
    subtitle: "Extended backup for large homes",
    price: 165000,
    originalPrice: 195000,
    image:
      "https://images.unsplash.com/photo-1630672607721-48e0a0187a92?q=80&w=1200&auto=format&fit=crop",
    badge: null,
    description:
      "Double capacity battery bank for extended runtime. Powers your entire home through long load shedding periods.",
    specs: {
      capacity: "10.24kWh usable capacity",
      type: "LiFePO4 (Lithium Iron Phosphate)",
      cycles: "6000+ charge cycles",
      voltage: "48V DC system",
      bms: "Smart BMS with app monitoring",
      warranty: "5 years / 6000 cycles",
    },
    includes: [
      "10kWh Battery Bank (2x 5kWh)",
      "Built-in Smart BMS",
      "Wall-mount brackets",
      "Communication cables",
      "User manual & app access",
    ],
    savings: null,
    suitableFor: [
      "5kW+ solar systems",
      "Full home backup",
      "Commercial applications",
    ],
  },
  {
    id: "inverter-3kw",
    category: "inverter",
    title: "3kW Hybrid Solar Inverter",
    subtitle: "MPPT with WiFi monitoring",
    price: 45000,
    originalPrice: 52000,
    image:
      "https://images.unsplash.com/photo-1705579604902-eb832f58bf85?q=80&w=1200&auto=format&fit=crop",
    badge: null,
    description:
      "Intelligent hybrid inverter with dual MPPT and WiFi monitoring. Seamlessly switches between grid, solar, and battery.",
    specs: {
      capacity: "3kW continuous output",
      mppt: "Dual MPPT tracker",
      efficiency: "97.8% max efficiency",
      input: "100-500V DC input range",
      output: "Single-phase 220V AC",
      warranty: "5 years warranty",
    },
    includes: [
      "3kW Hybrid Inverter",
      "WiFi monitoring dongle",
      "Installation manual",
      "Wall mounting brackets",
    ],
    savings: null,
    suitableFor: [
      "3kW solar systems",
      "Single-phase homes",
      "Grid-tie with backup",
    ],
  },
  {
    id: "inverter-5kw",
    category: "inverter",
    title: "5kW Hybrid Solar Inverter",
    subtitle: "Dual MPPT for large systems",
    price: 65000,
    originalPrice: 75000,
    image:
      "https://images.unsplash.com/photo-1548614945-8c704da88432?q=80&w=1200&auto=format&fit=crop",
    badge: "AC Ready",
    description:
      "High-capacity hybrid inverter capable of running multiple AC units. Advanced grid management and battery charging.",
    specs: {
      capacity: "5kW continuous output",
      mppt: "Dual MPPT tracker",
      efficiency: "98.2% max efficiency",
      input: "120-550V DC input range",
      output: "Single-phase 220V AC",
      warranty: "5 years warranty",
    },
    includes: [
      "5kW Hybrid Inverter",
      "WiFi monitoring dongle",
      "Installation manual",
      "Wall mounting brackets",
    ],
    savings: null,
    suitableFor: [
      "5kW solar systems",
      "AC-ready homes",
      "Large single-phase setups",
    ],
  },
];

export function getProductById(id) {
  return products.find((p) => p.id === id) || null;
}

export function getProductsByCategory(category) {
  return products.filter((p) => p.category === category);
}

export function formatPrice(price) {
  return new Intl.NumberFormat("bn-BD", {
    style: "currency",
    currency: "BDT",
    minimumFractionDigits: 0,
  })
    .format(price)
    .replace("BDT", "৳");
}
