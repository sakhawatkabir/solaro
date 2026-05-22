"use client";

import { m } from "framer-motion";
import { MessageSquare, Send, CheckCircle } from "lucide-react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const services = [
  { value: "residential", label: "Residential Solar Installation" },
  { value: "commercial", label: "Commercial Solar Solutions" },
  { value: "maintenance", label: "Solar Panel Maintenance" },
  { value: "battery", label: "Battery Storage Systems" },
  { value: "consultation", label: "Free Solar Consultation" },
  { value: "net-metering", label: "Net Metering Assistance" },
  { value: "other", label: "Other" },
];

export default function ContactForm({
  formData,
  handleInputChange,
  onSubmit,
  submitting,
  submitted,
  submitError,
  districts,
}) {
  const prefersReducedMotion = useReducedMotion();
  const transitionDuration = prefersReducedMotion ? 0 : 0.6;
  const districtsList = districts.map((d) => d.name);

  return (
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
        Fill out the form below and our solar experts will get back to you
        within 24 hours.
      </p>

      {submitted && (
        <m.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-accent/10 border border-accent/20 rounded-xl p-4 mb-6 flex items-center gap-3"
        >
          <CheckCircle size={20} className="text-accent flex-shrink-0" />
          <div>
            <div className="font-semibold text-accent">Message Sent!</div>
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

      <form onSubmit={onSubmit} className="space-y-5">
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
            onChange={handleInputChange}
            rows="5"
            className="w-full px-4 py-3 rounded-xl border border-ink/10 bg-white text-ink placeholder:text-ink-light focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all resize-none"
            placeholder="Tell us about your home, electricity bill, or any questions…"
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
              Sending…
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
  );
}
