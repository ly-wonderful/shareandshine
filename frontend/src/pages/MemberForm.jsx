import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/api/apiClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function MemberForm() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    age: "",
    school_organization: "",
    interests: "",
    why_join: "",
  });
  const [success, setSuccess] = useState(false);

  const submitMutation = useMutation({
    mutationFn: (data) => api.entities.Member.create(data),
    onSuccess: () => {
      setSuccess(true);
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        age: "",
        school_organization: "",
        interests: "",
        why_join: "",
      });
      setTimeout(() => setSuccess(false), 5000);
    },
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitMutation.mutate(formData);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Share&Shine!</h2>
          <p className="text-lg text-gray-600 mb-6">
            Thank you for your application. We'll review it and get back to you soon via email.
          </p>
          <div className="flex flex-col gap-3">
            <Button
              onClick={() => setSuccess(false)}
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
            >
              Submit Another Application
            </Button>
            <Link to="/">
              <Button variant="outline" className="w-full">
                Return to Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link to="/JoinUs">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Join Options
          </Button>
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Member Application</h1>
          <p className="text-lg text-gray-600">
            Join our community of young leaders making a difference
          </p>
        </motion.div>

        {/* Application Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="border-2 border-orange-200 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b">
              <CardTitle className="text-2xl">Tell Us About Yourself</CardTitle>
              <p className="text-gray-600 mt-2">All fields marked with * are required</p>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.full_name}
                      onChange={(e) => handleChange("full_name", e.target.value)}
                      placeholder="Enter your full name"
                      className="border-gray-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="your.email@example.com"
                      className="border-gray-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="(555) 123-4567"
                      className="border-gray-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age">Age *</Label>
                    <Input
                      id="age"
                      type="number"
                      min="10"
                      max="25"
                      required
                      value={formData.age}
                      onChange={(e) => handleChange("age", e.target.value)}
                      placeholder="Your age"
                      className="border-gray-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="school">School / Organization *</Label>
                  <Input
                    id="school"
                    required
                    value={formData.school_organization}
                    onChange={(e) => handleChange("school_organization", e.target.value)}
                    placeholder="Your school or organization"
                    className="border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interests">Areas of Interest / Skills</Label>
                  <Textarea
                    id="interests"
                    value={formData.interests}
                    onChange={(e) => handleChange("interests", e.target.value)}
                    placeholder="e.g., Community service, event planning, graphic design, public speaking..."
                    rows={3}
                    className="border-gray-300"
                  />
                  <p className="text-sm text-gray-500">
                    Share your interests, skills, or talents you'd like to contribute
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="why">Why do you want to join Share&Shine? *</Label>
                  <Textarea
                    id="why"
                    required
                    value={formData.why_join}
                    onChange={(e) => handleChange("why_join", e.target.value)}
                    placeholder="Tell us what motivates you and what you hope to achieve..."
                    rows={4}
                    className="border-gray-300"
                  />
                  <p className="text-sm text-gray-500">
                    Share your goals and how you hope to contribute to the community
                  </p>
                </div>

                <div className="pt-6">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-lg py-6 shadow-lg"
                    disabled={submitMutation.isPending}
                  >
                    {submitMutation.isPending ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Submitting Application...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                </div>

                {submitMutation.isError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">
                      Failed to submit application. Please try again or contact us directly.
                    </p>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
