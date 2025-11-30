"use client";

import { motion } from "framer-motion";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Badge from "../components/Badge";

export default function AboutPage() {
  const stats = [
    { number: "10+", label: "Years Experience" },
    { number: "5000+", label: "Happy Customers" },
    { number: "15000+", label: "Solar Panels Installed" },
    { number: "99%", label: "Customer Satisfaction" },
  ];

  const team = [
    {
      name: "John Anderson",
      role: "CEO & Founder",
      image: "https://i.pravatar.cc/400?u=john-anderson",
    },
    {
      name: "Sarah Mitchell",
      role: "Chief Technology Officer",
      image: "https://i.pravatar.cc/400?u=sarah-mitchell",
    },
    {
      name: "Michael Chen",
      role: "Head of Operations",
      image: "https://i.pravatar.cc/400?u=michael-chen",
    },
    {
      name: "Emily Rodriguez",
      role: "Customer Success Manager",
      image: "https://i.pravatar.cc/400?u=emily-rodriguez",
    },
  ];

  const values = [
    {
      title: "Innovation",
      description:
        "We constantly push the boundaries of solar technology to deliver cutting-edge solutions.",
    },
    {
      title: "Sustainability",
      description:
        "Our commitment to the environment drives everything we do, from product design to installation.",
    },
    {
      title: "Customer First",
      description:
        "Your satisfaction is our priority. We provide personalized service and ongoing support.",
    },
    {
      title: "Quality",
      description:
        "We use only premium materials and employ certified professionals for every installation.",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Navigation />

      <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white py-32 px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1509391366360-2e959784a276?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920"
            alt="Solar panels background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="primary" className="inline-flex mb-6">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              ABOUT US
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl lg:text-6xl font-heading font-bold mb-6"
          >
            Powering a Sustainable <span className="text-primary">Future</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-300 leading-relaxed"
          >
            Since 2014, we've been helping homeowners and businesses transition
            to clean, renewable energy. Our mission is to make solar power
            accessible, affordable, and reliable for everyone.
          </motion.p>
        </div>
      </section>

      <section className="py-20 px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl lg:text-6xl font-heading font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-black dark:text-white mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  Founded in 2014, Solaro Energy began with a simple vision: to
                  make clean energy accessible to everyone. What started as a
                  small team of passionate engineers has grown into a leading
                  solar energy provider.
                </p>
                <p>
                  Over the years, we've installed thousands of solar systems,
                  helping families and businesses reduce their carbon footprint
                  while saving money on energy costs. Our commitment to quality,
                  innovation, and customer satisfaction has made us a trusted
                  name in the industry.
                </p>
                <p>
                  Today, we continue to push the boundaries of solar technology,
                  offering cutting-edge solutions that are efficient, reliable,
                  and built to last.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?crop=entropy&cs=srgb&fm=jpg&q=85&w=800"
                alt="Solar installation team"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-black dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              These core principles guide everything we do and shape our
              commitment to excellence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all"
              >
                <h3 className="text-2xl font-heading font-bold text-black dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-black dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The passionate professionals driving our mission forward.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-full aspect-square rounded-2xl overflow-hidden mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-heading font-bold text-black dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
