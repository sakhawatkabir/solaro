"use client";

import { m } from "framer-motion";
import { Phone, Mail, MapPin, Headphones } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Call Us",
    details: ["+880 1700-000000", "+880 1800-000000"],
    sub: "Mon-Sat, 9AM-6PM",
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["info@solaro.com.bd", "support@solaro.com.bd"],
    sub: "We reply within 24 hours",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["45 Greenfield Street", "Dhaka 1212, Bangladesh"],
    sub: "Head office — open to walk-ins",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    details: ["Emergency hotline for existing customers"],
    sub: "For installations under warranty",
  },
];

export default function ContactInfoCards() {
  return (
    <section className="px-8 lg:px-16 pb-16">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactInfo.map((info, index) => (
            <m.div
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 border border-ink/5 hover:shadow-lg transition-shadow"
            >
              <div className="size-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <info.icon className="size-5 text-accent" />
              </div>
              <h3 className="font-heading font-semibold text-ink mb-3">
                {info.title}
              </h3>
              {info.details.map((detail) => (
                <p key={detail} className="text-ink-mid text-sm">
                  {detail}
                </p>
              ))}
              <p className="text-ink-light text-xs mt-2">{info.sub}</p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
