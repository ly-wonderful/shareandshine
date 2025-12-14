import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/apiClient";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, MapPin, Users, Loader2, Play, X, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function PastEvents() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['pastEvents'],
    queryFn: () => api.entities.Event.filter({ type: 'past' }, '-date'),
  });

  const getVideoEmbedUrl = (url) => {
    if (!url) return null;
    
    // YouTube
    const youtubeMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    }
    
    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }
    
    return url;
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

        {/* Events Grid */}
        {!isLoading && events.length > 0 && (
          <div className="space-y-12">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-orange-200">
                  <div className="grid md:grid-cols-5 gap-6">
                    {/* Image Section */}
                    <div className="md:col-span-2">
                      {event.image_url && (
                        <div className="space-y-2 p-2">
                          <div className="relative aspect-video group overflow-hidden rounded-lg">
                            <img
                              src={event.image_url}
                              alt={event.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                            
                            {/* Video Play Button Overlay */}
                            {event.video_url && (
                              <button
                                onClick={() => {
                                  setSelectedEvent(event);
                                  setVideoModalOpen(true);
                                }}
                                className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-all group"
                              >
                                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                                  <Play className="w-8 h-8 text-orange-600 ml-1" />
                                </div>
                              </button>
                            )}
                          </div>

                          {/* Additional Images Gallery */}
                          {event.image_urls && event.image_urls.length > 0 && (
                            <div className="grid grid-cols-3 gap-2">
                              {event.image_urls.slice(0, 3).map((imgUrl, idx) => (
                                <div key={idx} className="relative aspect-square rounded overflow-hidden group cursor-pointer">
                                  <img
                                    src={imgUrl}
                                    alt={`${event.title} - Image ${idx + 2}`}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                  />
                                  {idx === 2 && event.image_urls.length > 3 && (
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                      <span className="text-white font-semibold text-lg">
                                        +{event.image_urls.length - 3}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="md:col-span-3 p-8 space-y-6">
                      {/* Header */}
                      <div>
                        <div className="flex items-center gap-3 mb-3 text-sm text-gray-500">
                          {event.date && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4 text-orange-500" />
                              {new Date(event.date).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </span>
                          )}
                          {event.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4 text-orange-500" />
                              {event.location}
                            </span>
                          )}
                          {event.participants_count && (
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4 text-orange-500" />
                              {event.participants_count}
                            </span>
                          )}
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">{event.title}</h2>
                        <p className="text-lg text-gray-700 leading-relaxed">{event.description}</p>
                      </div>

                      {/* Highlights */}
                      {event.highlights && event.highlights.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            Event Highlights
                          </h3>
                          <ul className="space-y-2">
                            {event.highlights.map((highlight, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-gray-700">
                                <span className="text-orange-500 mt-1">•</span>
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Impact Summary */}
                      {event.impact_summary && (
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="font-semibold text-green-800">
                            Impact: {event.impact_summary}
                          </span>
                        </div>
                      )}

                      {/* View Video Button */}
                      {event.video_url && (
                        <Button
                          onClick={() => {
                            setSelectedEvent(event);
                            setVideoModalOpen(true);
                          }}
                          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Watch Event Video
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Video Modal */}
        <Dialog open={videoModalOpen} onOpenChange={setVideoModalOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedEvent?.title}</DialogTitle>
            </DialogHeader>
            {selectedEvent?.video_url && (
              <div className="aspect-video">
                <iframe
                  src={getVideoEmbedUrl(selectedEvent.video_url)}
                  className="w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </DialogContent>
        </Dialog>

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