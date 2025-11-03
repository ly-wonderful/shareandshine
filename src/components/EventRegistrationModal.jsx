import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle } from "lucide-react";

export default function EventRegistrationModal({ event, onClose }) {
  const [formData, setFormData] = useState({
    participant_name: "",
    participant_email: "",
    participant_phone: "",
    dietary_restrictions: "",
    special_requirements: "",
  });
  const [success, setSuccess] = useState(false);

  const registerMutation = useMutation({
    mutationFn: (data) => base44.entities.EventRegistration.create({
      ...data,
      event_id: event.id,
      event_title: event.title,
    }),
    onSuccess: () => {
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerMutation.mutate(formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (success) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h3>
            <p className="text-gray-600 text-center">
              You're all set for {event.title}. Check your email for confirmation details.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Register for Event</DialogTitle>
          <DialogDescription className="text-lg">
            {event.title}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              required
              value={formData.participant_name}
              onChange={(e) => handleChange("participant_name", e.target.value)}
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.participant_email}
              onChange={(e) => handleChange("participant_email", e.target.value)}
              placeholder="your.email@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.participant_phone}
              onChange={(e) => handleChange("participant_phone", e.target.value)}
              placeholder="(555) 123-4567"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dietary">Dietary Restrictions</Label>
            <Input
              id="dietary"
              value={formData.dietary_restrictions}
              onChange={(e) => handleChange("dietary_restrictions", e.target.value)}
              placeholder="e.g., Vegetarian, Gluten-free, None"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="special">Special Requirements or Notes</Label>
            <Textarea
              id="special"
              value={formData.special_requirements}
              onChange={(e) => handleChange("special_requirements", e.target.value)}
              placeholder="Any special requirements we should know about?"
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={registerMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Registering...
                </>
              ) : (
                "Complete Registration"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}