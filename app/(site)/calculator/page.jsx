"use client";

import { m } from "framer-motion";
import { Calculator } from "lucide-react";
import { useReducer, useEffect } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useQuery } from "@tanstack/react-query";
import { defaultSettings, systemRecommendations } from "./data";
import CalculatorInputs from "./CalculatorInputs";
import SavingsStats from "./SavingsStats";
import EnvironmentalImpact from "./EnvironmentalImpact";
import RecommendedSystem from "./RecommendedSystem";
import SystemOptions from "./SystemOptions";
import CalculatorCTA from "./CalculatorCTA";

const initialState = {
  monthlyBill: 5000,
  roofSize: 300,
  acUnits: 1,
  fans: 3,
  lights: 5,
  fridge: 1,
  tv: 1,
  showResults: false,
};

function calculatorReducer(state, action) {
  switch (action.type) {
    case "SET":
      return { ...state, [action.field]: action.value };
    case "SHOW_RESULTS":
      return { ...state, showResults: true };
    default:
      return state;
  }
}

export default function CalculatorPage() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);
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

  const monthlyUsage = state.monthlyBill / settings.electricityRate;
  const dailyUsage = monthlyUsage / 30;

  const recommendedKW = Math.ceil(
    dailyUsage / (settings.solarHoursPerDay * settings.systemEfficiency),
  );

  const recommendedSystem =
    systemRecommendations.find((s) => s.kw >= recommendedKW) ||
    systemRecommendations[systemRecommendations.length - 1];

  const roofCapacity = Math.floor(state.roofSize / 40);

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

  useEffect(() => {
    if (state.monthlyBill > 0) {
      dispatch({ type: "SHOW_RESULTS" });
    }
  }, [state.monthlyBill]);

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

      <CalculatorInputs state={state} dispatch={dispatch} />

      {/* Results */}
      {state.showResults && (
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

              <SavingsStats
                monthlySavings={monthlySavings}
                yearlySavings={yearlySavings}
                paybackYears={paybackYears}
                twentyFiveYearSavings={twentyFiveYearSavings}
              />

              <EnvironmentalImpact
                co2Offset={co2Offset}
                monthlyGeneration={monthlyGeneration}
              />

              <RecommendedSystem
                system={recommendedSystem}
                dailyGeneration={dailyGeneration}
                monthlyGeneration={monthlyGeneration}
                monthlyUsage={monthlyUsage}
              />

              <SystemOptions
                recommendedSystem={recommendedSystem}
                roofCapacity={roofCapacity}
                prefersReducedMotion={prefersReducedMotion}
              />

              <CalculatorCTA />
            </m.div>
          </div>
        </section>
      )}
    </>
  );
}
