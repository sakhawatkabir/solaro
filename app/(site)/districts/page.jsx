"use client";

import { m } from "framer-motion";
import {
  MapPin,
  Search,
  Truck,
  Clock,
  Phone,
  Star,
  Zap,
  Users,
  CheckCircle,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const divisionConfig = [
  { name: "Dhaka", icon: "🏙️", timeline: "3-5 days" },
  { name: "Chittagong", icon: "🌊", timeline: "5-7 days" },
  { name: "Rajshahi", icon: "🌾", timeline: "5-7 days" },
  { name: "Khulna", icon: "🦐", timeline: "7-10 days" },
  { name: "Sylhet", icon: "🍃", timeline: "7-10 days" },
  { name: "Rangpur", icon: "🌻", timeline: "7-10 days" },
  { name: "Barishal", icon: "🚣", timeline: "10-14 days" },
  { name: "Mymensingh", icon: "🐟", timeline: "7-10 days" },
];

export default function DistrictsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedDivision, setExpandedDivision] = useState(null);
  const prefersReducedMotion = useReducedMotion();
  const transitionDuration = prefersReducedMotion ? 0 : 0.6;

  const { data: districts = [], isLoading } = useQuery({
    queryKey: ["districts"],
    queryFn: async () => {
      const res = await fetch("/api/districts");
      const data = await res.json();
      return data.districts || [];
    },
  });

  const divisionsWithDistricts = divisionConfig.map((div) => {
    const divDistricts = districts.filter((d) => d.division === div.name);
    return {
      ...div,
      districts: divDistricts.map((d) => d.name),
      installations: `${divDistricts.length * 500}+`,
    };
  });

  const filteredDivisions = divisionsWithDistricts
    .map((div) => ({
      ...div,
      districts: div.districts.filter((d) =>
        d.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter(
      (div) =>
        div.districts.length > 0 ||
        div.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  const totalDistricts = districts.length;

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
            <div className="flex items-center gap-2 text-accent font-semibold text-sm tracking-widest uppercase mb-4">
              <MapPin size={16} />
              Coverage Area
            </div>
            <h1 className="text-5xl lg:text-6xl font-heading font-semibold text-ink leading-tight mb-6">
              Serving all{" "}
              <span className="text-accent italic">64 districts</span>
            </h1>
            <p className="text-ink-mid text-lg max-w-2xl leading-relaxed">
              From Dhaka to the Chittagong Hill Tracts, from Sundarbans to
              Sylhet tea gardens — we deliver, install, and maintain solar
              systems across every district of Bangladesh.
            </p>
          </m.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="px-8 lg:px-16 pb-16">
        <div className="max-w-[1400px] mx-auto">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: transitionDuration, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 border border-ink/5 shadow-sm"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-heading font-semibold text-accent mb-1">
                  {isLoading ? "..." : totalDistricts}
                </div>
                <div className="text-ink-mid text-sm">Districts Covered</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-heading font-semibold text-accent mb-1">
                  45,500+
                </div>
                <div className="text-ink-mid text-sm">
                  Installations Completed
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-heading font-semibold text-accent mb-1">
                  4.9
                </div>
                <div className="flex items-center justify-center gap-1 text-ink-mid text-sm">
                  <Star size={14} fill="currentColor" className="text-accent" />
                  Average Rating
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-heading font-semibold text-accent mb-1">
                  8
                </div>
                <div className="text-ink-mid text-sm">Regional Offices</div>
              </div>
            </div>
          </m.div>
        </div>
      </section>

      {/* Search */}
      <section className="px-8 lg:px-16 pb-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="relative max-w-md">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-light"
            />
            <input
              type="text"
              placeholder="Search your district..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-ink/10 rounded-full text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all"
            />
          </div>
        </div>
      </section>

      {/* Divisions */}
      <section className="px-8 lg:px-16 pb-20">
        <div className="max-w-[1400px] mx-auto">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-ink/5 p-6 animate-pulse"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-zinc-200 rounded-full" />
                    <div className="space-y-2">
                      <div className="h-5 w-32 bg-zinc-200 rounded" />
                      <div className="h-4 w-24 bg-zinc-200 rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDivisions.map((div, index) => (
                <m.div
                  key={div.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white rounded-2xl border border-ink/5 overflow-hidden"
                >
                  {/* Division Header */}
                  <button
                    onClick={() =>
                      setExpandedDivision(
                        expandedDivision === div.name ? null : div.name,
                      )
                    }
                    className="w-full flex items-center justify-between p-6 hover:bg-cream/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{div.icon}</span>
                      <div className="text-left">
                        <h3 className="text-xl font-heading font-semibold text-ink">
                          {div.name} Division
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-ink-mid">
                          <span className="flex items-center gap-1">
                            <MapPin size={14} />
                            {div.districts.length} districts
                          </span>
                          <span className="flex items-center gap-1">
                            <Zap size={14} />
                            {div.installations} installs
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="hidden sm:flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full">
                        <Clock size={14} className="text-accent" />
                        <span className="text-sm font-medium text-accent">
                          {div.timeline}
                        </span>
                      </div>
                      <ChevronDown
                        size={20}
                        className={`text-ink-light transition-transform ${
                          expandedDivision === div.name ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {/* Districts Grid */}
                  {expandedDivision === div.name && (
                    <m.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 border-t border-ink/5"
                    >
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 pt-6">
                        {div.districts.map((district) => (
                          <div
                            key={district}
                            className="flex items-center gap-2 p-3 rounded-xl bg-cream/50 hover:bg-accent/5 transition-colors"
                          >
                            <CheckCircle
                              size={16}
                              className="text-accent flex-shrink-0"
                            />
                            <span className="text-sm text-ink">{district}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 p-4 bg-cream rounded-xl border border-ink/5">
                        <div className="flex items-start gap-3">
                          <Phone
                            size={20}
                            className="text-accent flex-shrink-0 mt-0.5"
                          />
                          <div>
                            <div className="font-semibold text-ink text-sm">
                              {div.name} Regional Office
                            </div>
                            <div className="text-ink-mid text-sm">
                              Call: +880 1XXX-XXXXXX | Email:{" "}
                              {div.name.toLowerCase()}@solaro.com.bd
                            </div>
                            <div className="text-ink-light text-xs mt-1">
                              Installation timeline: {div.timeline} from order
                              confirmation
                            </div>
                          </div>
                        </div>
                      </div>
                    </m.div>
                  )}
                </m.div>
              ))}
            </div>
          )}

          {!isLoading && filteredDivisions.length === 0 && (
            <div className="text-center py-16">
              <Search size={48} className="text-ink-faint mx-auto mb-4" />
              <h3 className="text-xl font-heading font-semibold text-ink mb-2">
                No districts found
              </h3>
              <p className="text-ink-mid">
                Try searching with a different district name.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Delivery Process */}
      <section className="px-8 lg:px-16 pb-20">
        <div className="max-w-[1400px] mx-auto">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: transitionDuration }}
          >
            <h2 className="text-3xl lg:text-4xl font-heading font-semibold text-ink text-center mb-12">
              How We Deliver to Your District
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  icon: Phone,
                  title: "1. Order Placement",
                  desc: "Call us or order online. We confirm your system requirements.",
                },
                {
                  icon: Clock,
                  title: "2. Site Survey",
                  desc: "Our team visits your location within 24-48 hours for assessment.",
                },
                {
                  icon: Truck,
                  title: "3. Delivery & Install",
                  desc: "Equipment delivered and professionally installed by certified technicians.",
                },
                {
                  icon: CheckCircle,
                  title: "4. Commissioning",
                  desc: "System tested, net metering setup, and you start saving immediately.",
                },
              ].map((step, idx) => (
                <div
                  key={step.title}
                  className="bg-white rounded-2xl p-6 border border-ink/5 text-center relative"
                >
                  <div className="size-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <step.icon size={24} className="text-accent" />
                  </div>
                  <h3 className="font-heading font-semibold text-ink mb-2">
                    {step.title}
                  </h3>
                  <p className="text-ink-mid text-sm leading-relaxed">
                    {step.desc}
                  </p>
                  {idx < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 text-ink-faint">
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>
          </m.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 lg:px-16 pb-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-gradient-to-br from-accent to-accent-mid rounded-2xl p-8 lg:p-12 text-center text-white">
            <h3 className="text-2xl lg:text-4xl font-heading font-semibold mb-4">
              Not Sure If We Cover Your Area?
            </h3>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              We cover all 64 districts of Bangladesh. Even if your area is
              remote, we will find a way. Call us to confirm delivery to your
              location.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+8801XXXXXXXXX"
                className="px-8 py-4 bg-white text-accent rounded-full font-semibold hover:bg-cream transition-colors inline-flex items-center justify-center gap-2"
              >
                <Phone size={18} />
                Call: +880 1XXX-XXXXXX
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
