import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Handshake, ArrowRight, Heart, Target, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function JoinUs() {
  const memberBenefits = [
    {
      icon: Sparkles,
      title: "Leadership Skills",
      description: "Working with young kids as an Event planner / leader - You initiate an extracurriculum or club based on your talents or interests, we work it out and make it a possibility.  "
    },
    {
      icon: Heart,
      title: "Make Impact",
      description: "Help us build and maintain our official social media to attract more attention."
    },
    {
      icon: Target,
      title: "Personal Growth",
      description: "Love web design, photography, or video editing? Join our marketing team and see how far your creativity can go!"
    }
  ];

  const partnerBenefits = [
    {
      icon: Users,
      title: "Community Impact",
      description: "Support youth development and community initiatives"
    },
    {
      icon: Handshake,
      title: "Collaboration",
      description: "Partner with passionate young leaders on projects"
    },
    {
      icon: Sparkles,
      title: "Brand Visibility",
      description: "Showcase your commitment to community development"
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Join Share&Shine</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Be part of empowering young leaders and building stronger communities
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="h-full border-2 border-orange-200 hover:shadow-2xl transition-all duration-300">
              <div className="p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mb-6">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Join as Volunteer</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Are you a middle or high school student ready to make a difference? Join our community of young leaders!
                </p>
                
                <div className="space-y-4 mb-8">
                  <h3 className="font-semibold text-gray-900 text-lg">Member Benefits:</h3>
                  {memberBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <benefit.icon className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">{benefit.title}</p>
                        <p className="text-sm text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link to="/member-form">
                  <Button size="lg" className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-lg py-6">
                    Apply
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="h-full border-2 border-amber-200 hover:shadow-2xl transition-all duration-300">
              <div className="p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center mb-6">
                  <Handshake className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Become a Partner</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Donate or Co-host events - partner with us to empower the next generation!
                </p>
                
                <div className="space-y-4 mb-8">
                  <h3 className="font-semibold text-gray-900 text-lg">Partnership Benefits:</h3>
                  {partnerBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <benefit.icon className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">{benefit.title}</p>
                        <p className="text-sm text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link to="/partner-form">
                  <Button size="lg" className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white text-lg py-6">
                    Become a Partner
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
