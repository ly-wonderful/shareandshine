import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/api/apiClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle, ArrowLeft, DollarSign, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function PartnerForm() {
  const [formData, setFormData] = useState({
    organization_name: "",
    contact_person: "",
    email: "",
    phone: "",
    organization_type: "",
    website: "",
    partnership_interest: [],
    donation_amount: "",
    event_ideas: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);

  const submitMutation = useMutation({
    mutationFn: (data) => api.entities.Partner.create(data),
    onSuccess: () => {
      setSuccess(true);
      setFormData({
        organization_name: "",
        contact_person: "",
        email: "",
        phone: "",
        organization_type: "",
        website: "",
        partnership_interest: [],
        donation_amount: "",
        event_ideas: "",
        message: "",
      });
      setTimeout(() => setSuccess(false), 5000);
    },
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      partnership_interest: prev.partnership_interest.includes(interest)
        ? prev.partnership_interest.filter(i => i !== interest)
        : [...prev.partnership_interest, interest]
    }));
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You for Your Interest!</h2>
          <p className="text-lg text-gray-600 mb-6">
            We've received your partnership application and will contact you soon to discuss next steps.
          </p>
          <div className="flex flex-col gap-3">
            <Button
              onClick={() => setSuccess(false)}
              className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600"
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Partnership Application</h1>
          <p className="text-lg text-gray-600">
            Let's collaborate to empower the next generation of leaders
          </p>
        </motion.div>

        {/* Application Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="border-2 border-amber-200 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 border-b">
              <CardTitle className="text-2xl">Organization Information</CardTitle>
              <p className="text-gray-600 mt-2">All fields marked with * are required</p>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Organization Details */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="org-name">Organization Name *</Label>
                    <Input
                      id="org-name"
                      required
                      value={formData.organization_name}
                      onChange={(e) => handleChange("organization_name", e.target.value)}
                      placeholder="Your organization's name"
                      className="border-gray-300"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="contact">Contact Person *</Label>
                      <Input
                        id="contact"
                        required
                        value={formData.contact_person}
                        onChange={(e) => handleChange("contact_person", e.target.value)}
                        placeholder="Primary contact name"
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
                        placeholder="contact@organization.com"
                        className="border-gray-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="(555) 123-4567"
                        className="border-gray-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="org-type">Organization Type *</Label>
                      <Input
                        id="org-type"
                        required
                        value={formData.organization_type}
                        onChange={(e) => handleChange("organization_type", e.target.value)}
                        placeholder="e.g., Business, Nonprofit, School"
                        className="border-gray-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website (optional)</Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleChange("website", e.target.value)}
                      placeholder="https://www.yoursite.com"
                      className="border-gray-300"
                    />
                  </div>
                </div>

                {/* Partnership Interest */}
                <div className="space-y-4 pt-6 border-t">
                  <Label className="text-lg font-semibold">Partnership Interests *</Label>
                  <p className="text-sm text-gray-600">Select all that apply</p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => handleInterestToggle("donation")}
                      className={`p-6 rounded-lg border-2 transition-all text-left ${
                        formData.partnership_interest.includes("donation")
                          ? "border-amber-500 bg-amber-50"
                          : "border-gray-200 hover:border-amber-200"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <DollarSign className={`w-6 h-6 flex-shrink-0 ${
                          formData.partnership_interest.includes("donation") ? "text-amber-600" : "text-gray-400"
                        }`} />
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">Make a Donation</h3>
                          <p className="text-sm text-gray-600">Support our programs and initiatives</p>
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleInterestToggle("cohost")}
                      className={`p-6 rounded-lg border-2 transition-all text-left ${
                        formData.partnership_interest.includes("cohost")
                          ? "border-amber-500 bg-amber-50"
                          : "border-gray-200 hover:border-amber-200"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Calendar className={`w-6 h-6 flex-shrink-0 ${
                          formData.partnership_interest.includes("cohost") ? "text-amber-600" : "text-gray-400"
                        }`} />
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">Co-host an Event</h3>
                          <p className="text-sm text-gray-600">Collaborate on community events</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Conditional Fields */}
                {formData.partnership_interest.includes("donation") && (
                  <div className="space-y-2 p-6 bg-amber-50 rounded-lg border border-amber-200">
                    <Label htmlFor="donation">Donation Amount (optional)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <Input
                        id="donation"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.donation_amount}
                        onChange={(e) => handleChange("donation_amount", e.target.value)}
                        placeholder="0.00"
                        className="pl-7 border-gray-300"
                      />
                    </div>
                    <p className="text-sm text-gray-600">
                      You can specify an amount or discuss with us later
                    </p>
                  </div>
                )}

                {formData.partnership_interest.includes("cohost") && (
                  <div className="space-y-2 p-6 bg-amber-50 rounded-lg border border-amber-200">
                    <Label htmlFor="event-ideas">Event Ideas</Label>
                    <Textarea
                      id="event-ideas"
                      value={formData.event_ideas}
                      onChange={(e) => handleChange("event_ideas", e.target.value)}
                      placeholder="Share your ideas for events you'd like to co-host..."
                      rows={3}
                      className="border-gray-300"
                    />
                    <p className="text-sm text-gray-600">
                      Tell us about events you'd like to collaborate on
                    </p>
                  </div>
                )}

                {/* Additional Message */}
                <div className="space-y-2 pt-6 border-t">
                  <Label htmlFor="message">Additional Information</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="Share any additional information about your organization or partnership goals..."
                    rows={4}
                    className="border-gray-300"
                  />
                </div>

                <div className="pt-6">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white text-lg py-6 shadow-lg"
                    disabled={submitMutation.isPending || formData.partnership_interest.length === 0}
                  >
                    {submitMutation.isPending ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Submitting Application...
                      </>
                    ) : (
                      "Submit Partnership Application"
                    )}
                  </Button>
                  {formData.partnership_interest.length === 0 && (
                    <p className="text-sm text-amber-600 mt-2 text-center">
                      Please select at least one partnership interest
                    </p>
                  )}
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
