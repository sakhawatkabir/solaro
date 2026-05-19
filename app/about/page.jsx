"use client";

import { m } from "framer-motion";
import {
  Sun,
  Users,
  Award,
  Zap,
  Target,
  Shield,
  Heart,
  Lightbulb,
  TrendingUp,
  MapPin,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function AboutPage() {
  const prefersReducedMotion = useReducedMotion();
  const transitionDuration = prefersReducedMotion ? 0 : 0.6;

  const stats = [
    { number: "10+", label: "Years in Bangladesh", icon: Calendar },
    { number: "45,500+", label: "Installations Completed", icon: Zap },
    { number: "64", label: "Districts Covered", icon: MapPin },
    { number: "4.9/5", label: "Customer Rating", icon: Award },
  ];

  const values = [
    {
      icon: Sun,
      title: "Clean Energy for All",
      description:
        "We believe every Bangladeshi home deserves reliable, affordable electricity. Solar is the answer to load shedding and rising DESA/DESCO bills.",
    },
    {
      icon: Shield,
      title: "Quality You Can Trust",
      description:
        "Tier-1 panels, certified installers, 25-year warranties. We never compromise on equipment quality or installation standards.",
    },
    {
      icon: Heart,
      title: "Customer First Always",
      description:
        "From free home surveys to lifetime support, we are with you at every step. Your satisfaction drives everything we do.",
    },
    {
      icon: Lightbulb,
      title: "Innovation Driven",
      description:
        "Latest MPPT inverters, LiFePO4 batteries, smart monitoring apps. We bring cutting-edge solar technology to Bangladesh.",
    },
  ];

  const milestones = [
    {
      year: "2014",
      title: "Founded in Dhaka",
      desc: "Started with a team of 5 engineers passionate about renewable energy in Bangladesh.",
    },
    {
      year: "2016",
      title: "1,000 Installations",
      desc: "Reached our first thousand homes across Dhaka, Gazipur, and Narayanganj.",
    },
    {
      year: "2018",
      title: "Nationwide Coverage",
      desc: "Expanded to all 8 divisions, covering all 64 districts of Bangladesh.",
    },
    {
      year: "2020",
      title: "Battery Storage Launch",
      desc: "Introduced LiFePO4 battery systems for complete load shedding protection.",
    },
    {
      year: "2023",
      title: "45,000+ Homes Powered",
      desc: "Became one of the largest residential solar providers in Bangladesh.",
    },
    {
      year: "2026",
      title: "Net Metering Pioneer",
      desc: "Helped thousands of customers sell excess power back to the grid through net metering.",
    },
  ];

  const team = [
    {
      name: "Rahim Ahmed",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
      bio: "15+ years in renewable energy. IIT Dhaka alum.",
    },
    {
      name: "Fatima Khan",
      role: "Chief Technology Officer",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
      bio: "Solar engineering expert. 200+ system designs.",
    },
    {
      name: "Kamal Hossain",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
      bio: "Manages 120+ installation teams across BD.",
    },
    {
      name: "Nusrat Jahan",
      role: "Customer Success Lead",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
      bio: "Ensures every customer gets lifetime support.",
    },
  ];

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
              About SOLARO
            </div>
            <h1 className="text-5xl lg:text-6xl font-heading font-semibold text-ink leading-tight mb-6">
              Powering Bangladesh{" "}
              <span className="text-accent italic">with sunshine</span>
            </h1>
            <p className="text-ink-mid text-lg max-w-2xl leading-relaxed">
              Since 2014, we have helped over 45,000 homes and businesses across
              all 64 districts switch to clean, reliable solar energy. Our
              mission is simple: end load shedding and make electricity affordable
              for every Bangladeshi family.
            </p>
          </m.div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-8 lg:px-16 pb-20">
        <div className="max-w-[1400px] mx-auto">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: transitionDuration, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 border border-ink/5 shadow-sm"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <m.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  <div className="size-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                    <stat.icon size={22} className="text-accent" />
                  </div>
                  <div className="text-4xl font-heading font-semibold text-accent mb-1">
                    {stat.number}
                  </div>
                  <div className="text-ink-mid text-sm">{stat.label}</div>
                </m.div>
              ))}
            </div>
          </m.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="px-8 lg:px-16 pb-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <m.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: transitionDuration }}
            >
              <div className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">
                Our Story
              </div>
              <h2 className="text-3xl lg:text-4xl font-heading font-semibold text-ink mb-6">
                Born from the frustration of load shedding
              </h2>
              <div className="space-y-4 text-ink-mid leading-relaxed">
                <p>
                  In 2014, our founder Rahim Ahmed sat through yet another
                  8-hour load shedding blackout in Dhaka. His children could not
                  study, his wife could not cook, and his home office came to a
                  halt. He knew there had to be a better way.
                </p>
                <p>
                  With a team of 5 engineers, he started SOLARO from a small
                  office in Greenfield, Dhaka. The vision was clear: make solar
                  energy accessible, affordable, and reliable for every
                  Bangladeshi home — not just the wealthy.
                </p>
                <p>
                  Today, over a decade later, we have powered 45,500+ homes
                  across all 64 districts. We handle everything from free home
                  surveys to DESA/DESCO net metering paperwork. Our customers
                  save an average of ৳3,500 per month on electricity bills.
                </p>
              </div>
            </m.div>

            <m.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: transitionDuration }}
              className="rounded-2xl overflow-hidden aspect-[4/3]"
            >
              <Image
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop"
                alt="SOLARO installation team"
                width={1200}
                height={900}
                className="w-full h-full object-cover"
              />
            </m.div>
          </div>
        </div>
      </section>

      {/* Values */}
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
              Our Values
            </div>
            <h2 className="text-3xl lg:text-4xl font-heading font-semibold text-ink mb-4">
              What drives us every day
            </h2>
            <p className="text-ink-mid max-w-2xl mx-auto">
              These core principles guide every decision we make and every system
              we install.
            </p>
          </m.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value) => (
              <m.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl p-8 border border-ink/5 hover:shadow-lg transition-shadow"
              >
                <div className="size-14 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                  <value.icon size={26} className="text-accent" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-ink mb-3">
                  {value.title}
                </h3>
                <p className="text-ink-mid leading-relaxed">
                  {value.description}
                </p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
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
              Our Journey
            </div>
            <h2 className="text-3xl lg:text-4xl font-heading font-semibold text-ink mb-4">
              Milestones that define us
            </h2>
          </m.div>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-accent/20" />
            <div className="space-y-8">
              {milestones.map((milestone) => (
                <m.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="flex gap-6 relative"
                >
                  <div className="size-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0 z-10">
                    <TrendingUp size={20} className="text-white" />
                  </div>
                  <div className="bg-white rounded-xl p-6 border border-ink/5 flex-1">
                    <div className="text-accent font-bold text-sm mb-1">
                      {milestone.year}
                    </div>
                    <h3 className="font-heading font-semibold text-ink text-lg mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-ink-mid text-sm leading-relaxed">
                      {milestone.desc}
                    </p>
                  </div>
                </m.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
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
              Our Team
            </div>
            <h2 className="text-3xl lg:text-4xl font-heading font-semibold text-ink mb-4">
              The people behind SOLARO
            </h2>
            <p className="text-ink-mid max-w-2xl mx-auto">
              Passionate professionals dedicated to bringing solar energy to
              every corner of Bangladesh.
            </p>
          </m.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <m.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl overflow-hidden border border-ink/5 group hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={400}
                    height={533}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-semibold text-ink text-lg">
                    {member.name}
                  </h3>
                  <div className="text-accent text-sm font-semibold mb-2">
                    {member.role}
                  </div>
                  <p className="text-ink-light text-sm">{member.bio}</p>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 lg:px-16 pb-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-gradient-to-br from-accent to-accent-mid rounded-2xl p-8 lg:p-12 text-center text-white">
            <h3 className="text-2xl lg:text-4xl font-heading font-semibold mb-4">
              Ready to Join 45,500+ Solar Homes?
            </h3>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Get a free home survey and custom quote. No obligation, no pressure
              — just honest advice about solar for your home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <span className="px-8 py-4 bg-white text-accent rounded-full font-semibold hover:bg-cream transition-colors inline-block">
                  Get Free Quote
                </span>
              </Link>
              <Link href="/calculator">
                <span className="px-8 py-4 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-colors inline-block">
                  Calculate Your Savings
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
