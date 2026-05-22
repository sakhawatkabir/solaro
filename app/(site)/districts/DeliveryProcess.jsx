import { m } from "framer-motion";
import { Phone, Clock, Truck, CheckCircle } from "lucide-react";

export default function DeliveryProcess({ transitionDuration }) {
  return (
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
  );
}
