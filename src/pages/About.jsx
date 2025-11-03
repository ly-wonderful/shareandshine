import React from "react";
import { Card } from "@/components/ui/card";
import { Target, Eye, Heart, Users, Lightbulb, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  const values = [
    {
      icon: Heart,
      title: "Inclusivity",
      description: "We welcome young leaders from all backgrounds and communities to join our mission."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We encourage creative solutions and fresh perspectives to community challenges."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "We believe in the power of working together to amplify our impact."
    },
    {
      icon: Globe,
      title: "Community Focus",
      description: "We're committed to creating positive, lasting change in diverse communities."
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-100 to-amber-100">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6"
          >
            About Share&Shine
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-700 leading-relaxed"
          >
            A non-profit organization dedicated to empowering the next generation of young leaders 
            to serve their communities with creativity and passion.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="p-10 h-full bg-white border-2 border-orange-200 hover:shadow-2xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="w-9 h-9 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To provide a practical platform for young leaders to better serve their communities. 
                  We support the next generation of young people to become leaders in various fields, 
                  empowering them with the tools, resources, and network they need to make a real difference.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="p-10 h-full bg-white border-2 border-amber-200 hover:shadow-2xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center mb-6">
                  <Eye className="w-9 h-9 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  By supporting young leaders to unleash creativity and lead their peers, Share&Shine aims 
                  to build a more inclusive, diverse, and positive community environment through each unique 
                  project. We envision a world where every young person has the opportunity to lead and create change.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Our Story</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="prose prose-lg max-w-none"
          >
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-10">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Share&Shine Association was founded on the belief that young people are not just the leaders 
                of tomorrow—they are the leaders of today. We recognized a gap between the desire of young 
                individuals to make a difference and the practical opportunities available to them.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                What started as a small group of passionate youth has grown into a thriving community of 
                hundreds of young leaders across multiple communities. Each member brings unique skills, 
                perspectives, and ideas that contribute to our collective mission.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Through workshops, community service projects, fundraisers, and collaborative initiatives, 
                we've created a space where young leaders can develop their skills, connect with like-minded 
                peers, and make tangible impacts in their communities. Our projects range from environmental 
                initiatives to educational programs, from arts and culture events to social justice campaigns.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 h-full text-center hover:shadow-xl transition-all duration-300 bg-white border-2 border-transparent hover:border-orange-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-500 to-amber-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-6"
          >
            Together, We're Making a Difference
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-orange-50"
          >
            Every project, every event, and every initiative contributes to building stronger, 
            more connected communities. Join us in creating positive change.
          </motion.p>
        </div>
      </section>
    </div>
  );
}