"use client";

import { m } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Headphones,
  Building2,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useQuery } from "@tanstack/react-query";
import { submitContactLead } from "@/app/actions/leads";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    district: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const prefersReducedMotion = useReducedMotion();
  const transitionDuration = prefersReducedMotion ? 0 : 0.6;

  const { data: districts = [] } = useQuery({
    queryKey: ["districts"],
    queryFn: async () => {
      const res = await fetch("/api/districts");
      const data = await res.json();
      return data.districts || [];
    },
  });

  const handleContactInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContactFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");

    const result = await submitContactLead(formData);

    setSubmitting(false);

    if (result.success) {
      setSubmitted(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        service: "",
        message: "",
        district: "",
      });
      setTimeout(() => setSubmitted(false), 5000);
    } else {
      setSubmitError(result.error || "Something went wrong");
    }
  };

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

  const services = [
    { value: "residential", label: "Residential Solar Installation" },
    { value: "commercial", label: "Commercial Solar Solutions" },
    { value: "maintenance", label: "Solar Panel Maintenance" },
    { value: "battery", label: "Battery Storage Systems" },
    { value: "consultation", label: "Free Solar Consultation" },
    { value: "net-metering", label: "Net Metering Assistance" },
    { value: "other", label: "Other" },
  ];

  const districtsList = districts.map((d) => d.name);

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
              Contact Us
            </div>
            <h1 className="text-5xl lg:text-6xl font-heading font-semibold text-ink leading-tight mb-6">
              Let's start your{" "}
              <span className="text-accent italic">solar journey</span>
            </h1>
            <p className="text-ink-mid text-lg max-w-2xl leading-relaxed">
              Have questions about solar? Need a free home survey? Our team is
              ready to help you switch to clean energy. Reach out and we will
              respond within 24 hours.
            </p>
          </m.div>
        </div>
      </section>

      {/* Contact Info Cards */}
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

      {/* Contact Form + Map */}
      <section className="px-8 lg:px-16 pb-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <m.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: transitionDuration }}
            >
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare size={20} className="text-accent" />
                <h2 className="text-2xl font-heading font-semibold text-ink">
                  Send Us a Message
                </h2>
              </div>
              <p className="text-ink-mid mb-8">
                Fill out the form below and our solar experts will get back to
                you within 24 hours.
              </p>

              {submitted && (
                <m.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-accent/10 border border-accent/20 rounded-xl p-4 mb-6 flex items-center gap-3"
                >
                  <CheckCircle
                    size={20}
                    className="text-accent flex-shrink-0"
                  />
                  <div>
                    <div className="font-semibold text-accent">
                      Message Sent!
                    </div>
                    <div className="text-sm text-ink-mid">
                      We will contact you within 24 hours.
                    </div>
                  </div>
                </m.div>
              )}

              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-700 text-sm">
                  {submitError}
                </div>
              )}

              <form onSubmit={handleContactFormSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-firstName"
                      className="block text-sm font-semibold text-ink mb-2"
                    >
                      First Name
                    </label>
                    <input
                      id="contact-firstName"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleContactInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-ink/10 bg-white text-ink placeholder:text-ink-light focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all"
                      placeholder="Rahim"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-lastName"
                      className="block text-sm font-semibold text-ink mb-2"
                    >
                      Last Name
                    </label>
                    <input
                      id="contact-lastName"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleContactInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-ink/10 bg-white text-ink placeholder:text-ink-light focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all"
                      placeholder="Ahmed"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-semibold text-ink mb-2"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleContactInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-ink/10 bg-white text-ink placeholder:text-ink-light focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all"
                      placeholder="rahim@email.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-sm font-semibold text-ink mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleContactInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-ink/10 bg-white text-ink placeholder:text-ink-light focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all"
                      placeholder="+880 17XX-XXXXXX"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-service"
                      className="block text-sm font-semibold text-ink mb-2"
                    >
                      Service Interested In
                    </label>
                    <select
                      id="contact-service"
                      name="service"
                      value={formData.service}
                      onChange={handleContactInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-ink/10 bg-white text-ink focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all appearance-none"
                    >
                      <option value="">Select a service</option>
                      {services.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="contact-district"
                      className="block text-sm font-semibold text-ink mb-2"
                    >
                      Your District
                    </label>
                    <select
                      id="contact-district"
                      name="district"
                      value={formData.district}
                      onChange={handleContactInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-ink/10 bg-white text-ink focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all appearance-none"
                    >
                      <option value="">Select district</option>
                      {districtsList.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-semibold text-ink mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleContactInputChange}
                    rows="5"
                    className="w-full px-4 py-3 rounded-xl border border-ink/10 bg-white text-ink placeholder:text-ink-light focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all resize-none"
                    placeholder="Tell us about your home, electricity bill, or any questions..."
                  />
                </div>

                <m.button
                  whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-accent hover:bg-accent-mid disabled:bg-accent/50 text-white font-semibold rounded-full transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </m.button>
              </form>
            </m.div>

            {/* Map / Image */}
            <m.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: transitionDuration }}
              className="space-y-6"
            >
              <div className="rounded-2xl overflow-hidden aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop"
                  alt="SOLARO office Dhaka"
                  width={1200}
                  height={900}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Office Info */}
              <div className="bg-white rounded-2xl p-6 border border-ink/5">
                <div className="flex items-center gap-2 mb-4">
                  <Building2 size={20} className="text-accent" />
                  <h3 className="font-heading font-semibold text-ink">
                    Head Office — Dhaka
                  </h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin
                      size={16}
                      className="text-accent flex-shrink-0 mt-0.5"
                    />
                    <div>
                      <div className="text-ink font-medium">
                        45 Greenfield Street
                      </div>
                      <div className="text-ink-mid">Dhaka 1212, Bangladesh</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock
                      size={16}
                      className="text-accent flex-shrink-0 mt-0.5"
                    />
                    <div>
                      <div className="text-ink font-medium">Office Hours</div>
                      <div className="text-ink-mid">
                        Saturday - Thursday: 9:00 AM - 6:00 PM
                      </div>
                      <div className="text-ink-mid">Friday: Closed</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Contact Us */}
              <div className="bg-accent/5 rounded-2xl p-6 border border-accent/10">
                <h3 className="font-heading font-semibold text-ink mb-4">
                  Why Talk to Us?
                </h3>
                <div className="space-y-3">
                  {[
                    "Free home energy assessment",
                    "Custom system design for your roof",
                    "No obligation, no pressure",
                    "Honest savings estimates",
                    "Net metering guidance included",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle
                        size={16}
                        className="text-accent flex-shrink-0"
                      />
                      <span className="text-ink-mid text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </m.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
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
              FAQ
            </div>
            <h2 className="text-3xl lg:text-4xl font-heading font-semibold text-ink mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-ink-mid max-w-xl mx-auto">
              Quick answers to common questions about going solar in Bangladesh.
            </p>
          </m.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[
              {
                q: "How long does installation take?",
                a: "Most residential installations are completed in 1-3 days depending on system size. Commercial projects may take 1-2 weeks.",
              },
              {
                q: "What warranties do you offer?",
                a: "25-year panel performance warranty, 5-year battery warranty, 5-year inverter warranty, and lifetime technical support.",
              },
              {
                q: "Do you help with net metering?",
                a: "Yes. We handle all DESA/DESCO net metering paperwork so you can sell excess power back to the grid.",
              },
              {
                q: "How much can I save monthly?",
                a: "Most customers save 40-70% on their electricity bill. A 3KW system typically saves ৳3,500/month.",
              },
              {
                q: "Do you serve rural areas?",
                a: "Yes. We cover all 64 districts including remote areas. Delivery timeline may be 7-14 days for remote locations.",
              },
              {
                q: "Are financing options available?",
                a: "Yes. We partner with several banks offering solar loans with competitive interest rates and flexible EMI plans.",
              },
            ].map((faq) => (
              <m.div
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-xl p-6 border border-ink/5 hover:shadow-md transition-shadow"
              >
                <h3 className="font-heading font-semibold text-ink mb-2">
                  {faq.q}
                </h3>
                <p className="text-ink-mid text-sm leading-relaxed">{faq.a}</p>
              </m.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
