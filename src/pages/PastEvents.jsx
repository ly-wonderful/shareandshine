import React from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

const categoryColors = {
  workshop: "bg-blue-100 text-blue-800 border-blue-200",
  community_service: "bg-green-100 text-green-800 border-green-200",
  fundraiser: "bg-purple-100 text-purple-800 border-purple-200",
  social: "bg-pink-100 text-pink-800 border-pink-200",
  training: "bg-orange-100 text-orange-800 border-orange-200",
  other: "bg-gray-100 text-gray-800 border-gray-200"
};

export default function PastEvents() {
  const { data: events = [], isLoading } = useQuery({
    queryKey: ['pastEvents'],
    queryFn: () => base44.entities.Event.filter({ type: 'past' }, '-date'),
  });

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
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Our Journey</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Celebrating the moments that shaped our community and the incredible impact we've made together
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-orange-500" />
          </div>
        )}

        {/* Events Timeline */}
        {!isLoading && events.length > 0 && (
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-orange-500 to-amber-500"></div>

            <div className="space-y-12">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative grid md:grid-cols-2 gap-8 items-center ${
                    index % 2 === 0 ? 'md:text-right' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white border-4 border-orange-500 rounded-full z-10 shadow-lg"></div>

                  {/* Event Card */}
                  <div className={index % 2 === 0 ? 'md:col-start-1' : 'md:col-start-2'}>
                    <Card className="hover:shadow-2xl transition-all duration-300 border-2 border-orange-200 overflow-hidden bg-white">
                      {event.image_url && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={event.image_url}
                            alt={event.title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {event.category && (
                            <Badge className={`${categoryColors[event.category]} border`}>
                              {event.category.replace(/_/g, ' ').toUpperCase()}
                            </Badge>
                          )}
                          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                            <Calendar className="w-3 h-3 mr-1" />
                            {format(new Date(event.date), "MMM d, yyyy")}
                          </Badge>
                        </div>
                        <CardTitle className="text-2xl">{event.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">{event.description}</p>
                        <div className="space-y-2 text-sm text-gray-500">
                          {event.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-orange-500" />
                              <span>{event.location}</span>
                            </div>
                          )}
                          {event.time && (
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-orange-500" />
                              <span>{event.time}</span>
                            </div>
                          )}
                          {event.max_participants && (
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-orange-500" />
                              <span>{event.max_participants} Participants</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className={index % 2 === 0 ? 'md:col-start-2' : 'md:col-start-1'}></div>
                </motion.div>
              ))}
            </div>
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
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Past Events Yet</h3>
            <p className="text-gray-500">Check back soon to see our community's journey!</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}