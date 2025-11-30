import { Handshake, Settings, Activity, Headset } from "lucide-react";
import Badge from "./Badge";

export default function ProcessSection() {
  const steps = [
    {
      icon: Handshake,
      title: "Consultation",
      description: "Schedule a free consultation to assess your energy needs.",
    },
    {
      icon: Settings,
      title: "Custom Design & Quote",
      description: "We create a tailored solar plan for your property.",
    },
    {
      icon: Activity,
      title: "Professional Installation",
      description:
        "Our certified team installs your solar system safely and efficiently.",
    },
    {
      icon: Headset,
      title: "Monitoring & Support",
      description:
        "Track your power generation in real-time and enjoy continuous support.",
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-950 py-20 px-8 transition-colors duration-300">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-start mb-16">
          <div>
            <h2 className="text-5xl lg:text-6xl font-heading font-normal text-black dark:text-white mb-2">
              A Simple Process,
            </h2>
            <p className="text-5xl lg:text-6xl font-heading font-normal text-gray-300 dark:text-gray-600">
              From Start to Shine
            </p>
          </div>

          <Badge
            variant="default"
            className="inline-flex bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            HOW IT WORKS
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1700529289398-dd313f11c9cc?crop=entropy&cs=srgb&fm=jpg&q=85&w=800"
                alt="Worker installing solar panels by David Clode on Unsplash"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <Icon
                      className="w-8 h-8 text-gray-800 dark:text-gray-200"
                      strokeWidth={1.5}
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-heading font-semibold text-black dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
