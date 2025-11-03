import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Loader2, Clock, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import EventRegistrationModal from "../components/EventRegistrationModal";

const categoryColors = {
  workshop: "bg-blue-100 text-blue-800 border-blue-200",
  community_service: "bg-green-100 text-green-800 border-green-200",
  fundraiser: "bg-purple-100 text-purple-800 border-purple-200",
  social: "bg-pink-100 text-pink-800 border-pink-200",
  training: "bg-orange-100 text-orange-800 border-orange-200",
  other: "bg-gray-100 text-gray-800 border-gray-200"
};

export default function UpcomingEvents() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['upcomingEvents'],
    queryFn: () => base44.entities.Event.filter({ type: 'upcoming' }, 'date'),
  });

  const handleRegisterClick = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Upcoming Events</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join us for exciting opportunities to connect, learn, and make a difference in our community
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-orange-500" />
          </div>
        )}

        {/* Events Grid */}
        {!isLoading && events.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full flex flex-col hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-orange-300 overflow-hidden bg-white">
                  {event.image_url && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={event.image_url}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute top-4 right-4">
                        {event.category && (
                          <Badge className={`${categoryColors[event.category]} border shadow-lg`}>
                            {event.category.replace(/_/g, ' ').toUpperCase()}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                  <CardHeader className="flex-grow">
                    <div className="flex items-center gap-2 text-orange-600 font-medium mb-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">
                        {format(new Date(event.date), "EEEE, MMMM d, yyyy")}
                      </span>
                    </div>
                    <CardTitle className="text-2xl mb-3">{event.title}</CardTitle>
                    <p className="text-gray-600">{event.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      {event.time && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4 text-orange-500" />
                          <span className="text-sm">{event.time}</span>
                        </div>
                      )}
                      {event.location && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4 text-orange-500" />
                          <span className="text-sm">{event.location}</span>
                        </div>
                      )}
                      {event.max_participants && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="w-4 h-4 text-orange-500" />
                          <span className="text-sm">{event.max_participants} spots available</span>
                        </div>
                      )}
                    </div>
                    <Button
                      onClick={() => handleRegisterClick(event)}
                      className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg"
                    >
                      Register Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && events.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-12 h-12 text-orange-500" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Upcoming Events</h3>
            <p className="text-gray-500">Stay tuned! We're planning exciting new events.</p>
          </motion.div>
        )}
      </div>

      {/* Registration Modal */}
      {showModal && selectedEvent && (
        <EventRegistrationModal
          event={selectedEvent}
          onClose={() => {
            setShowModal(false);
            setSelectedEvent(null);
          }}
        />
      )}
    </div>
  );
}