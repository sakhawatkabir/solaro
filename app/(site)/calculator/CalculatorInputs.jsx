"use client";

import { Zap, Home, Wind, Sun, Battery } from "lucide-react";
import SliderInput from "./SliderInput";

export default function CalculatorInputs({ state, dispatch }) {
  return (
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
              value={state.monthlyBill}
              onChange={(v) => dispatch({ type: "SET", field: "monthlyBill", value: v })}
              min={1000}
              max={25000}
              step={500}
              unit="৳"
              icon={Zap}
            />
            <SliderInput
              label="Available Roof Space"
              value={state.roofSize}
              onChange={(v) => dispatch({ type: "SET", field: "roofSize", value: v })}
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
                value={state.acUnits}
                onChange={(v) => dispatch({ type: "SET", field: "acUnits", value: v })}
                min={0}
                max={5}
                step={1}
                unit=""
                icon={Wind}
              />
              <SliderInput
                label="Fans"
                value={state.fans}
                onChange={(v) => dispatch({ type: "SET", field: "fans", value: v })}
                min={0}
                max={10}
                step={1}
                unit=""
                icon={Wind}
              />
              <SliderInput
                label="Lights"
                value={state.lights}
                onChange={(v) => dispatch({ type: "SET", field: "lights", value: v })}
                min={0}
                max={20}
                step={1}
                unit=""
                icon={Sun}
              />
              <SliderInput
                label="Refrigerator"
                value={state.fridge}
                onChange={(v) => dispatch({ type: "SET", field: "fridge", value: v })}
                min={0}
                max={3}
                step={1}
                unit=""
                icon={Battery}
              />
            </div>
            <SliderInput
              label="TV / Monitor"
              value={state.tv}
              onChange={(v) => dispatch({ type: "SET", field: "tv", value: v })}
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
  );
}
