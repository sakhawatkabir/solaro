"use client";

import { m } from "framer-motion";
import {
  Home,
  Building2,
  Wrench,
  Battery,
  ClipboardCheck,
  Monitor,
  Sun,
  Shield,
  Clock,
  Phone,
  CheckCircle,
  ArrowRight,
  Zap,
  FileText,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useReducedMotion } from "../hooks/useReducedMotion";

const services = [
  {
    icon: Home,
    title: "Residential Solar Installation",
    description:
      "Complete home solar systems from 1KW to 10KW. We handle everything — site survey, custom design, installation, and DESA/DESCO net metering paperwork.",
    features: [
      "Free home energy assessment",
      "Custom system design for your roof",
      "Professional installation in 1-3 days",
      "Net metering setup & paperwork",
      "25-year panel warranty included",
    ],
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop",
    price: "From ৳85,000",
  },
  {
    icon: Building2,
    title: "Commercial Solar Solutions",
    description:
      "Large-scale solar for factories, warehouses, offices, and commercial buildings across Bangladesh. Reduce operational costs by 40-60%.",
    features: [
      "Industrial-grade Tier-1 equipment",
      "Scalable systems from 20KW to 1MW+",
      "ROI analysis & financial planning",
      "Minimal business disruption during install",
      "Tax incentive & SREDA guidance",
    ],
    image:
      "https://images.unsplash.com/photo-1700529289398-dd313f11c9cc?q=80&w=1200&auto=format&fit=crop",
    price: "Custom quote",
  },
  {
    icon: Wrench,
    title: "Solar Panel Maintenance",
    description:
      "Keep your panels at peak efficiency with professional cleaning, inspection, and repair services. Essential for Bangladesh's dusty and monsoon climate.",
    features: [
      "Quarterly panel cleaning",
      "Performance monitoring & reporting",
      "Inverter & battery health checks",
      "Wiring & connection inspection",
      "Annual maintenance plans from ৳5,000/year",
    ],
    image:
      "https://images.unsplash.com/photo-1566821594226-cdc9cb42a4c8?q=80&w=1200&auto=format&fit=crop",
    price: "From ৳5,000/year",
  },
  {
    icon: Battery,
    title: "Battery Storage Systems",
    description:
      "LiFePO4 battery backup for complete load shedding protection. Store solar energy for evening use and power outages.",
    features: [
      "LiFePO4 batteries (6000+ cycles)",
      "5kWh to 20kWh capacity options",
      "Smart BMS with app monitoring",
      "Seamless grid-to-battery switching",
      "Expandable battery banks",
    ],
    image:
      "https://images.unsplash.com/photo-1705579605238-24a90c8799c5?q=80&w=1200&auto=format&fit=crop",
    price: "From ৳95,000",
  },
  {
    icon: ClipboardCheck,
    title: "Free Solar Consultation",
    description:
      "Not sure which system is right for you? Our solar experts will assess your home, analyze your electricity bill, and recommend the perfect solution.",
    features: [
      "In-person or video consultation",
      "Electricity bill analysis",
      "Roof suitability assessment",
      "Custom savings projection",
      "No obligation, no pressure",
    ],
    image:
      "https://images.unsplash.com/photo-1705579604902-eb832f58bf85?q=80&w=1200&auto=format&fit=crop",
    price: "FREE",
  },
  {
    icon: Monitor,
    title: "24/7 Monitoring & Support",
    description:
      "Real-time system monitoring with instant alerts. Our technical support team is available around the clock for troubleshooting and maintenance.",
    features: [
      "Real-time performance dashboard",
      "Instant mobile alerts for issues",
      "Remote diagnostics & troubleshooting",
      "Dedicated support hotline",
      "Lifetime technical support",
    ],
    image:
      "https://images.unsplash.com/photo-1630672607721-48e0a0187a92?q=80&w=1200&auto=format&fit=crop",
    price: "Included with installation",
  },
];

const processSteps = [
  {
    icon: Phone,
    title: "1. Free Consultation",
    desc: "Call us or fill out the form. We discuss your energy needs and budget.",
  },
  {
    icon: ClipboardCheck,
    title: "2. Site Survey",
    desc: "Our team visits your home within 48 hours for a thorough assessment.",
  },
  {
    icon: FileText,
    title: "3. Custom Proposal",
    desc: "Receive a detailed system design, savings estimate, and transparent pricing.",
  },
  {
    icon: Sun,
    title: "4. Installation",
    desc: "Professional installation by certified technicians in 1-3 days.",
  },
  {
    icon: Zap,
    title: "5. Commissioning",
    desc: "System tested, net metering activated, and you start saving immediately.",
  },
  {
    icon: Shield,
    title: "6. Lifetime Support",
    desc: "Ongoing monitoring, maintenance, and 24/7 technical support.",
  },
];

export default function ServicesPage() {
  const prefersReducedMotion = useReducedMotion();
  const transitionDuration = prefersReducedMotion ? 0 : 0.6;

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: transitionDuration }}
          >
            <div className="text-accent font-semibold text-sm tracking-widest uppercase mb-4">
              Our Services
            </div>
            <h1 className="text-5xl lg:text-6xl font-heading font-semibold text-ink leading-tight mb-6">
              Complete solar{" "}
              <span className="text-accent italic">
                solutions for Bangladesh
              </span>
            </h1>
            <p className="text-ink-mid text-lg max-w-2xl leading-relaxed">
              From free consultation to lifetime support, we handle everything
              so you can enjoy clean, reliable electricity without the hassle.
            </p>
          </m.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-8 lg:px-16 pb-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <m.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl overflow-hidden border border-ink/5 hover:shadow-xl transition-all group"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={1200}
                    height={750}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-accent text-white text-sm font-bold rounded-full">
                    {service.price}
                  </div>
                </div>
                <div className="p-6">
                  <div className="size-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <service.icon size={24} className="text-accent" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-ink mb-3">
                    {service.title}
                  </h3>
                  <p className="text-ink-mid text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <CheckCircle
                          size={14}
                          className="text-accent flex-shrink-0 mt-0.5"
                        />
                        <span className="text-ink-mid">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact">
                    <span className="inline-flex items-center gap-2 text-accent font-semibold text-sm hover:gap-3 transition-all">
                      Get Started
                      <ArrowRight size={16} />
                    </span>
                  </Link>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="px-8 lg:px-16 pb-20">
        <div className="max-w-[1400px] mx-auto">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: transitionDuration }}
            className="text-center mb-12"
          >
            <div className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">
              How It Works
            </div>
            <h2 className="text-3xl lg:text-4xl font-heading font-semibold text-ink mb-4">
              From inquiry to solar power in 6 steps
            </h2>
            <p className="text-ink-mid max-w-xl mx-auto">
              Our streamlined process makes going solar simple and stress-free.
            </p>
          </m.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step) => (
              <m.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-xl p-6 border border-ink/5 relative"
              >
                <div className="size-12 rounded-full bg-accent flex items-center justify-center mb-4">
                  <step.icon size={22} className="text-white" />
                </div>
                <h3 className="font-heading font-semibold text-ink text-lg mb-2">
                  {step.title}
                </h3>
                <p className="text-ink-mid text-sm leading-relaxed">
                  {step.desc}
                </p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-8 lg:px-16 pb-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-gradient-to-br from-accent to-accent-mid rounded-2xl p-8 lg:p-12 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-heading font-semibold mb-6">
                  Why 45,500+ homes trust SOLARO
                </h2>
                <div className="space-y-4">
                  {[
                    "Tier-1 solar panels with 25-year warranty",
                    "Certified installation teams across all 64 districts",
                    "Free home survey and custom system design",
                    "DESA/DESCO net metering paperwork handled for you",
                    "24/7 monitoring and lifetime technical support",
                    "Flexible financing and EMI options available",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle size={20} className="flex-shrink-0 mt-0.5" />
                      <span className="text-white/90">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="font-heading font-semibold text-xl mb-4">
                  Need a custom solution?
                </h3>
                <p className="text-white/80 mb-6">
                  Every home is different. Tell us about your electricity usage,
                  roof space, and budget — we will design the perfect system for
                  you.
                </p>
                <div className="space-y-3">
                  <Link href="/contact">
                    <span className="block w-full py-4 bg-white text-accent rounded-full font-semibold text-center hover:bg-cream transition-colors">
                      Get Free Quote
                    </span>
                  </Link>
                  <Link href="/calculator">
                    <span className="block w-full py-4 bg-white/10 text-white rounded-full font-semibold text-center hover:bg-white/20 transition-colors">
                      Calculate Your Savings
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
