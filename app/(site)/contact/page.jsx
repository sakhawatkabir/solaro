"use client";

import { m } from "framer-motion";
import { useState } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useQuery } from "@tanstack/react-query";
import { submitContactLead } from "@/app/actions/leads";
import ContactInfoCards from "./ContactInfoCards";
import ContactForm from "./ContactForm";
import ContactMap from "./ContactMap";
import ContactFAQ from "./ContactFAQ";

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
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
              Let&apos;s start your{" "}
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

      <ContactInfoCards />

      {/* Contact Form + Map */}
      <section className="px-8 lg:px-16 pb-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactForm
              formData={formData}
              handleInputChange={handleInputChange}
              onSubmit={handleSubmit}
              submitting={submitting}
              submitted={submitted}
              submitError={submitError}
              districts={districts}
            />
            <ContactMap />
          </div>
        </div>
      </section>

      <ContactFAQ />
    </>
  );
}
