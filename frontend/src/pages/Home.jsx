
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/apiClient";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Users, Calendar, Target, Heart, TrendingUp, ArrowRight, Eye, MapPin, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Fetch past events
  const { data: pastEvents = [] } = useQuery({
    queryKey: ['homePastEvents'],
    queryFn: () => api.entities.Event.filter({ type: 'past' }, '-date'),
  });

  // Fetch upcoming events
  const { data: upcomingEvents = [] } = useQuery({
    queryKey: ['homeUpcomingEvents'],
    queryFn: () => api.entities.Event.filter({ type: 'upcoming' }, 'date'),
  });

  // Combine and limit to 6 events for display (3 past, 3 upcoming)
  const displayEvents = [
    ...upcomingEvents.slice(0, 3),
    ...pastEvents.slice(0, 3)
  ].slice(0, 6);

  const stats = [
    { icon: Users, value: "500+", label: "Young Leaders" },
    { icon: Calendar, value: "50+", label: "Events Hosted" },
    { icon: Heart, value: "1000+", label: "Lives Impacted" },
    { icon: TrendingUp, value: "15+", label: "Communities" },
  ];

  const features = [
    {
      icon: Target,
      title: "Leadership Development",
      description: "Empowering youth with skills and opportunities to lead meaningful projects in their communities."
    },
    {
      icon: Users,
      title: "Community Building",
      description: "Creating inclusive spaces where young people connect, collaborate, and inspire positive change."
    },
    {
      icon: Sparkles,
      title: "Creative Projects",
      description: "Supporting innovative initiatives that address real community needs with fresh perspectives."
    },
  ];

  const gallery = [
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800",
    "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800",
    "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800",
    "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800",
    "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800",
    "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800",
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden -mt-40">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <style>{`
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(20px, -50px) scale(1.1); }
            50% { transform: translate(-20px, 20px) scale(0.9); }
            75% { transform: translate(50px, 50px) scale(1.05); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}</style>

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: isVisible ? 1 : 0,
              // y: isVisible ? 0 : 30,
              // x: isVisible ? [-2, 2, -2, 2, 0] : 0,
              rotate: isVisible ? [0, 1, -5, 1, 0] : 0
            }}
            transition={{
              opacity: { duration: 0.8, delay: 0.2 },
              rotate: { duration: 2, delay: 3, repeat: Infinity, repeatDelay: 3 }
            }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-10 " 
          >
            Empowering
            <span className="block bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent mt-2 leading-snug">
              Young Leaders
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            To build an inclusive, diverse, and caring community by helping young leaders unleash creativity, embrace leadership, and shine together.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center "
          >
            <Link to="/JoinUs">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-lg px-8 py-6 shadow-2xl hover:shadow-orange-500/50 transition-all duration-300">
                Join Our Community
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <a href="#about">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 border-orange-500 text-orange-600 hover:bg-orange-50">
                Learn More
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl mb-4 shadow-lg">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      <section className="relative min-h-screen flex items-center justify-centerpy-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-100 to-amber-100" id="about">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-10 "
          >
            About Share&Shine
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className=" bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-10"
          >          
            <p className="text-lg text-gray-700 leading-relaxed mb-6 text-left">
              Share & Shine Association (SSA) is a 501(c)(3) non-profit organization that empowers young leaders to grow through creativity, service, and community engagement.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed text-left">
              Founded by educators, parents, and professionals, SSA offers hands-on opportunities for youth to lead, collaborate, and make a difference. We inspire every middle school or high school student to share their talents and shine in their own way.
            </p>
          </motion.div>

          {/* Mission & Vision Cards */}
          <div className="max-w-7xl mx-auto mt-16">
            <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="p-10 h-full bg-white border-2 border-orange-200 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Target className="w-9 h-9 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To empower and inspire young people to become confident, compassionate leaders who create positive change in their communities and beyond.
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
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Eye className="w-9 h-9 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To build an inclusive, diverse, and caring community by helping young leaders unleash creativity, embrace leadership, and shine together.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>

        </div>
      </section>

      {/* Features Section */}
      {/* <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              What We Do
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Building the next generation of community leaders through practical experience and meaningful projects
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 h-full hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-orange-200 bg-white">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center mb-6">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Events Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Our Community in Action
            </h2>
            <p className="text-xl text-gray-600">
              Moments that inspire change and create lasting impact
            </p>
          </div>

          {displayEvents.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No events to display yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-300 group">
                    {event.image_url && (
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={event.image_url}
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-3 right-3">
                          <Badge className={event.type === 'upcoming' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'}>
                            {event.type === 'upcoming' ? 'Upcoming' : 'Past Event'}
                          </Badge>
                        </div>
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{event.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                          <MapPin className="w-4 h-4" />
                          <span className="line-clamp-1">{event.location}</span>
                        </div>
                      )}
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">{event.description}</p>
                      <Link to={event.type === 'past' ? '/PastEvents' : '/UpcomingEvents'}>
                        <Button variant="outline" size="sm" className="w-full group-hover:bg-orange-50 group-hover:text-orange-600 group-hover:border-orange-500">
                          {event.type === 'upcoming' ? 'View Details' : 'See More'}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/UpcomingEvents">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                  View All Upcoming Events
                </Button>
              </Link>
              <Link to="/PastEvents">
                <Button size="lg" variant="outline" className="border-2">
                  Explore Past Events
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-12 shadow-2xl"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-orange-50 mb-8 max-w-2xl mx-auto">
              Join hundreds of young leaders who are already creating positive change in their communities
            </p>
            <Link to="/JoinUs">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 text-lg px-8 py-6 shadow-xl">
                Join Us Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
