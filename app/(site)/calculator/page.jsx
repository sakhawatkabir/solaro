"use client";

import { m } from "framer-motion";
import {
  Sun,
  Zap,
  Home,
  Wind,
  Calculator,
  ArrowRight,
  CheckCircle,
  Phone,
  TrendingUp,
  Battery,
  Leaf,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useQuery } from "@tanstack/react-query";

const defaultSettings = {
  electricityRate: 9.5,
  solarHoursPerDay: 5.5,
  systemEfficiency: 0.8,
};

const systemRecommendations = [
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

function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit,
  icon: Icon,
}) {
  return (
    <div className="bg-white rounded-xl p-5 border border-ink/5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon size={18} className="text-accent" />
          <span className="font-semibold text-ink text-sm">{label}</span>
        </div>
        <span className="text-2xl font-heading font-semibold text-accent">
          {value.toLocaleString()}
          <span className="text-sm text-ink-mid ml-1">{unit}</span>
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-ink/10 rounded-full appearance-none cursor-pointer accent-accent"
      />
      <div className="flex justify-between text-xs text-ink-light mt-1">
        <span>{min.toLocaleString()}</span>
        <span>{max.toLocaleString()}</span>
      </div>
    </div>
  );
}

export default function CalculatorPage() {
  const [monthlyBill, setMonthlyBill] = useState(5000);
  const [roofSize, setRoofSize] = useState(300);
  const [acUnits, setAcUnits] = useState(1);
  const [fans, setFans] = useState(3);
  const [lights, setLights] = useState(5);
  const [fridge, setFridge] = useState(1);
  const [tv, setTv] = useState(1);
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const { data: settings = defaultSettings } = useQuery({
    queryKey: ["calculator-settings"],
    queryFn: async () => {
      const res = await fetch("/api/settings");
      const data = await res.json();
      if (data.settings) {
        return {
          electricityRate:
            Number(data.settings.electricityRate) ||
            defaultSettings.electricityRate,
          solarHoursPerDay:
            Number(data.settings.solarHoursPerDay) ||
            defaultSettings.solarHoursPerDay,
          systemEfficiency:
            Number(data.settings.systemEfficiency) ||
            defaultSettings.systemEfficiency,
        };
      }
      return defaultSettings;
    },
  });

  const monthlyUsage = monthlyBill / settings.electricityRate;
  const dailyUsage = monthlyUsage / 30;

  const recommendedKW = Math.ceil(
    dailyUsage / (settings.solarHoursPerDay * settings.systemEfficiency),
  );

  const recommendedSystem =
    systemRecommendations.find((s) => s.kw >= recommendedKW) ||
    systemRecommendations[systemRecommendations.length - 1];

  const roofCapacity = Math.floor(roofSize / 40);
  const maxKWFromRoof = roofCapacity * 0.55;

  const dailyGeneration =
    recommendedSystem.kw *
    settings.solarHoursPerDay *
    settings.systemEfficiency;
  const monthlyGeneration = dailyGeneration * 30;
  const monthlySavings = monthlyGeneration * settings.electricityRate;
  const yearlySavings = monthlySavings * 12;
  const paybackYears = recommendedSystem.price / yearlySavings;
  const twentyFiveYearSavings = yearlySavings * 25 - recommendedSystem.price;
  const co2Offset = monthlyGeneration * 0.82;

  const applianceLoad =
    acUnits * 1200 + fans * 75 + lights * 15 + fridge * 150 + tv * 100;

  useEffect(() => {
    if (monthlyBill > 0) {
      setShowResults(true);
    }
  }, [monthlyBill]);

  const transitionDuration = prefersReducedMotion ? 0 : 0.6;

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: transitionDuration }}
          >
            <div className="flex items-center gap-2 text-accent font-semibold text-sm tracking-widest uppercase mb-4">
              <Calculator size={16} />
              Savings Calculator
            </div>
            <h1 className="text-5xl lg:text-6xl font-heading font-semibold text-ink leading-tight mb-6">
              Calculate your{" "}
              <span className="text-accent italic">solar savings</span>
            </h1>
            <p className="text-ink-mid text-lg max-w-2xl leading-relaxed">
              Enter your monthly electricity bill and appliance details. We will
              calculate exactly how much you can save with solar energy in
              Bangladesh.
            </p>
          </m.div>
        </div>
      </section>

      {/* Calculator Inputs */}
      <section className="px-8 lg:px-16 pb-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Bill & Roof */}
            <div className="space-y-4">
              <h2 className="text-xl font-heading font-semibold text-ink mb-4">
                Your Current Usage
              </h2>
              <SliderInput
                label="Monthly Electricity Bill"
                value={monthlyBill}
                onChange={setMonthlyBill}
                min={1000}
                max={25000}
                step={500}
                unit="৳"
                icon={Zap}
              />
              <SliderInput
                label="Available Roof Space"
                value={roofSize}
                onChange={setRoofSize}
                min={100}
                max={2000}
                step={50}
                unit="sq ft"
                icon={Home}
              />
            </div>

            {/* Right Column - Appliances */}
            <div className="space-y-4">
              <h2 className="text-xl font-heading font-semibold text-ink mb-4">
                Your Appliances
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <SliderInput
                  label="AC Units"
                  value={acUnits}
                  onChange={setAcUnits}
                  min={0}
                  max={5}
                  step={1}
                  unit=""
                  icon={Wind}
                />
                <SliderInput
                  label="Fans"
                  value={fans}
                  onChange={setFans}
                  min={0}
                  max={10}
                  step={1}
                  unit=""
                  icon={Wind}
                />
                <SliderInput
                  label="Lights"
                  value={lights}
                  onChange={setLights}
                  min={0}
                  max={20}
                  step={1}
                  unit=""
                  icon={Sun}
                />
                <SliderInput
                  label="Refrigerator"
                  value={fridge}
                  onChange={setFridge}
                  min={0}
                  max={3}
                  step={1}
                  unit=""
                  icon={Battery}
                />
              </div>
              <SliderInput
                label="TV / Monitor"
                value={tv}
                onChange={setTv}
                min={0}
                max={5}
                step={1}
                unit=""
                icon={Sun}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      {showResults && (
        <section className="px-8 lg:px-16 pb-16">
          <div className="max-w-[1400px] mx-auto">
            <m.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: transitionDuration }}
            >
              <h2 className="text-3xl font-heading font-semibold text-ink text-center mb-8">
                Your Solar Savings Estimate
              </h2>

              {/* Main Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-xl p-6 border border-ink/5 text-center">
                  <div className="text-3xl font-heading font-semibold text-accent mb-1">
                    ৳{Math.round(monthlySavings).toLocaleString()}
                  </div>
                  <div className="text-sm text-ink-mid">Monthly Savings</div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-ink/5 text-center">
                  <div className="text-3xl font-heading font-semibold text-accent mb-1">
                    ৳{Math.round(yearlySavings).toLocaleString()}
                  </div>
                  <div className="text-sm text-ink-mid">Yearly Savings</div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-ink/5 text-center">
                  <div className="text-3xl font-heading font-semibold text-accent mb-1">
                    {paybackYears.toFixed(1)} yrs
                  </div>
                  <div className="text-sm text-ink-mid">Payback Period</div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-ink/5 text-center">
                  <div className="text-3xl font-heading font-semibold text-accent mb-1">
                    ৳{Math.round(twentyFiveYearSavings).toLocaleString()}
                  </div>
                  <div className="text-sm text-ink-mid">
                    25-Year Net Savings
                  </div>
                </div>
              </div>

              {/* Environmental Impact */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200 mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Leaf size={20} className="text-green-600" />
                  <span className="font-semibold text-green-800">
                    Environmental Impact
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-700">
                      {Math.round(co2Offset * 12).toLocaleString()} kg
                    </div>
                    <div className="text-sm text-green-600">
                      CO₂ offset per year
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-700">
                      {Math.round((co2Offset * 12) / 20)}
                    </div>
                    <div className="text-sm text-green-600">
                      Trees equivalent
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-700">
                      {Math.round(
                        (monthlyGeneration * 12) / 1000,
                      ).toLocaleString()}{" "}
                      MWh
                    </div>
                    <div className="text-sm text-green-600">
                      Clean energy per year
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended System */}
              <div className="bg-white rounded-2xl p-8 border border-ink/5 mb-8">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp size={20} className="text-accent" />
                  <h3 className="text-xl font-heading font-semibold text-ink">
                    Recommended System
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-accent font-semibold text-sm tracking-widest uppercase mb-2">
                      {recommendedSystem.name}
                    </div>
                    <div className="text-4xl font-heading font-semibold text-ink mb-4">
                      {formatPrice(recommendedSystem.price)}
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle size={16} className="text-accent" />
                        <span>{recommendedSystem.panels} x 550W Panels</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle size={16} className="text-accent" />
                        <span>{recommendedSystem.battery} Battery</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle size={16} className="text-accent" />
                        <span>{recommendedSystem.suitable}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-cream rounded-xl p-6">
                    <h4 className="font-semibold text-ink mb-4">
                      System Output
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-ink-mid">Daily Generation</span>
                        <span className="font-semibold">
                          {dailyGeneration.toFixed(1)} kWh
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-ink-mid">Monthly Generation</span>
                        <span className="font-semibold">
                          {monthlyGeneration.toFixed(0)} kWh
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-ink-mid">Your Usage</span>
                        <span className="font-semibold">
                          {monthlyUsage.toFixed(0)} kWh/month
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-ink-mid">Coverage</span>
                        <span className="font-semibold text-accent">
                          {Math.min(
                            Math.round(
                              (monthlyGeneration / monthlyUsage) * 100,
                            ),
                            100,
                          )}
                          %
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-ink-mid">Roof Required</span>
                        <span className="font-semibold">
                          {recommendedSystem.panels * 40} sq ft
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* All System Options */}
              <div className="mb-8">
                <h3 className="text-xl font-heading font-semibold text-ink mb-6">
                  All System Options
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {systemRecommendations.map((system) => {
                    const isRecommended = system.kw === recommendedSystem.kw;
                    const canFit = roofCapacity >= system.panels;
                    return (
                      <m.button
                        key={system.kw}
                        onClick={() => setSelectedSystem(system.kw)}
                        whileHover={prefersReducedMotion ? {} : { y: -3 }}
                        className={`p-6 rounded-xl border-2 text-left transition-all ${
                          isRecommended
                            ? "border-accent bg-accent/5 shadow-lg shadow-accent/10"
                            : "border-ink/10 bg-white hover:border-accent/30"
                        } ${!canFit ? "opacity-50" : ""}`}
                      >
                        {isRecommended && (
                          <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">
                            Recommended
                          </div>
                        )}
                        <div className="font-heading font-semibold text-ink mb-1">
                          {system.name}
                        </div>
                        <div className="text-xl font-semibold text-accent mb-3">
                          {formatPrice(system.price)}
                        </div>
                        <div className="text-sm text-ink-mid mb-2">
                          ৳{system.monthlySavings.toLocaleString()}/month
                          savings
                        </div>
                        <div className="text-xs text-ink-light">
                          {system.panels} panels • {system.battery} battery
                        </div>
                        {!canFit && (
                          <div className="text-xs text-red-500 mt-2">
                            Needs {system.panels * 40} sq ft roof
                          </div>
                        )}
                      </m.button>
                    );
                  })}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-ink rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-heading font-semibold text-white mb-4">
                  Ready to Start Saving?
                </h3>
                <p className="text-ink-faint mb-6 max-w-xl mx-auto">
                  Get a detailed quote with exact pricing for your home. Free
                  site survey included.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <span className="px-8 py-4 bg-accent text-white rounded-full font-semibold hover:bg-accent-mid transition-colors inline-flex items-center gap-2">
                      <Phone size={18} />
                      Get Free Quote
                    </span>
                  </Link>
                  <Link href="/products">
                    <span className="px-8 py-4 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-colors inline-flex items-center gap-2">
                      Browse Products
                      <ArrowRight size={18} />
                    </span>
                  </Link>
                </div>
              </div>
            </m.div>
          </div>
        </section>
      )}
    </>
  );
}

function formatPrice(price) {
  return "৳" + price.toLocaleString("bn-BD");
}
