"use client";

import { m } from "framer-motion";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import StatsBar from "./StatsBar";
import SearchBar from "./SearchBar";
import DivisionList from "./DivisionList";
import DeliveryProcess from "./DeliveryProcess";
import CTASection from "./CTASection";

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

  const filteredDivisions = divisionsWithDistricts.reduce((acc, div) => {
    const filteredDistricts = div.districts.filter((d) =>
      d.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    if (
      filteredDistricts.length > 0 ||
      div.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      acc.push({ ...div, districts: filteredDistricts });
    }
    return acc;
  }, []);

  const totalDistricts = districts.length;

  return (
    <>
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
              Sylhet tea gardens: we deliver, install, and maintain solar
              systems across every district of Bangladesh.
            </p>
          </m.div>
        </div>
      </section>

      <StatsBar
        isLoading={isLoading}
        totalDistricts={totalDistricts}
        transitionDuration={transitionDuration}
      />

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <section className="px-8 lg:px-16 pb-20">
        <div className="max-w-[1400px] mx-auto">
          <DivisionList
            isLoading={isLoading}
            filteredDivisions={filteredDivisions}
            expandedDivision={expandedDivision}
            setExpandedDivision={setExpandedDivision}
          />
        </div>
      </section>

      <DeliveryProcess transitionDuration={transitionDuration} />

      <CTASection />
    </>
  );
}
