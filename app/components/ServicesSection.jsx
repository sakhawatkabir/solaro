"use client";

import { useState } from "react";
import { HiArrowRight } from "react-icons/hi";
import Badge from "./Badge";

export default function ServicesSection() {
  const [currentService, setCurrentService] = useState(2); // 03 out of 05
  const totalServices = 5;

  const services = [
    {
      title: "Commercial Solar",
      subtitle: "Solutions",
      description:
        "Large-scale solar installations for businesses, warehouses, and commercial properties.",
      image:
        "https://images.unsplash.com/photo-1700529289398-dd313f11c9cc?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    },
    {
      title: "Solar Panel",
      subtitle: "Maintenance",
      description:
        "Professional cleaning and maintenance services to keep your solar panels operating at peak efficiency.",
      image:
        "https://images.unsplash.com/photo-1566821594226-cdc9cb42a4c8?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    },
    {
      title: "Residential Solar",
      subtitle: "Installation",
      description:
        "Custom solar panel systems for homes of all sizes. Large-scale solar setups for offices, factories, and institutions.",
      image:
        "https://images.unsplash.com/photo-1700529289398-dd313f11c9cc?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    },
    {
      title: "Energy Storage",
      subtitle: "Systems",
      description:
        "Battery backup solutions to store excess solar energy for use during peak hours or outages.",
      image:
        "https://images.unsplash.com/photo-1705579605238-24a90c8799c5?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    },
    {
      title: "Solar",
      subtitle: "Consultation",
      description:
        "Expert advice on solar feasibility, system design, and return on investment calculations.",
      image:
        "https://images.unsplash.com/photo-1705579604902-eb832f58bf85?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    },
  ];

  const currentServiceData = services[currentService];
  const progress = ((currentService + 1) / totalServices) * 100;

  const handleNext = () => {
    setCurrentService((prev) => (prev < totalServices - 1 ? prev + 1 : 0));
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-20 px-8 transition-colors duration-300">
      <div className="container mx-auto max-w-7xl">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 min-h-[500px]">
          <div className="absolute inset-0">
            <img
              src={currentServiceData.image}
              alt={`${currentServiceData.title} ${currentServiceData.subtitle}`}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-transparent"></div>
          </div>

          <div className="relative z-10 p-12 h-full flex flex-col justify-between min-h-[500px]">
            <div className="space-y-6 max-w-xl">
              <Badge
                variant="default"
                className="inline-flex bg-white/20 text-white backdrop-blur-sm border border-white/30"
              >
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                SERVICES
              </Badge>

              <h2 className="text-5xl lg:text-6xl font-heading font-bold leading-tight">
                <span className="text-white">{currentServiceData.title}</span>
                <br />
                <span className="text-primary">
                  {currentServiceData.subtitle}
                </span>
              </h2>

              <p className="text-white/90 text-lg leading-relaxed max-w-md">
                {currentServiceData.description}
              </p>
            </div>

            <div className="flex items-end justify-between">
              <div className="space-y-4">
                <div className="text-6xl font-heading font-bold text-white">
                  0{currentService + 1}
                  <span className="text-2xl text-white/60 ml-1">
                    /0{totalServices}
                  </span>
                </div>

                <div className="w-64 h-1 bg-white/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-500 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <button
                onClick={handleNext}
                className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center transition-all shadow-lg shadow-primary/30 hover:scale-105"
                aria-label="Next service"
              >
                <HiArrowRight className="w-7 h-7 text-black" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
