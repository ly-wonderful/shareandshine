import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/apiClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Plus, Edit2, Trash2, Loader2, X, Image as ImageIcon, Video, Upload, Bell, User, Download } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminPastEvents() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Check authentication on component mount
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("adminAuthenticated");
    if (!isAuthenticated) {
      navigate("/admin-login");
    }
  }, [navigate]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    image_url: "",
    image_urls: [],
    video_url: "",
    highlights: "",
    participants_count: "",
    impact_summary: "",
  });
  const [newImageUrl, setNewImageUrl] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [featuredImageFile, setFeaturedImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [eventType, setEventType] = useState('past');
  const [registrations, setRegistrations] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showRegistrations, setShowRegistrations] = useState(false);
  const [selectedEventFilter, setSelectedEventFilter] = useState('all');
  const fileInputRef = useRef(null);
  const featuredInputRef = useRef(null);

  // Load registrations from localStorage
  useEffect(() => {
    const loadRegistrations = () => {
      const stored = localStorage.getItem('eventRegistrations');
      if (stored) {
        const regs = JSON.parse(stored);
        setRegistrations(regs);
        
        // Check for unread registrations
        const lastViewedTime = localStorage.getItem('adminLastViewedRegistrations');
        if (lastViewedTime) {
          const unread = regs.filter(reg => new Date(reg.registeredAt) > new Date(lastViewedTime));
          setUnreadCount(unread.length);
        } else {
          setUnreadCount(regs.length);
        }
      }
    };
    
    loadRegistrations();
    
    // Poll for new registrations every 5 seconds
    const interval = setInterval(loadRegistrations, 5000);
    return () => clearInterval(interval);
  }, []);

  // Mark registrations as read when viewing
  const handleViewRegistrations = () => {
    setShowRegistrations(true);
    setUnreadCount(0);
    localStorage.setItem('adminLastViewedRegistrations', new Date().toISOString());
  };

  // Download registrations as Excel/CSV file
  const downloadRegistrationsByEvent = (eventId) => {
    let filteredRegs = registrations;
    let filename = 'all-registrations';

    if (eventId && eventId !== 'all') {
      filteredRegs = registrations.filter(reg => reg.eventId === eventId);
      const event = events.find(e => e.id === eventId);
      filename = event ? event.title.replace(/[^a-z0-9]/gi, '-').toLowerCase() : 'event-registrations';
    }

    if (filteredRegs.length === 0) {
      alert('No registrations found for this event');
      return;
    }

    // Create CSV content
    const headers = ['Event', 'Name', 'Gender', 'Age', 'Email', 'Phone', 'Registered At'];
    const csvContent = [
      headers.join(','),
      ...filteredRegs.map(reg => [
        `"${reg.eventTitle || 'Unknown Event'}"`,
        `"${reg.name}"`,
        `"${reg.gender}"`,
        reg.age,
        `"${reg.email}"`,
        `"${reg.phone}"`,
        `"${new Date(reg.registeredAt).toLocaleString()}"`
      ].join(','))
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['allEvents'],
    queryFn: async () => {
      // Fetch all events without filtering by type
      const response = await api.entities.Event.filter({}, '-date');
      return response;
    },
  });

  const createMutation = useMutation({
    mutationFn: (data) => api.entities.Event.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['allEvents']);
      queryClient.invalidateQueries(['pastEvents']);
      queryClient.invalidateQueries(['upcomingEvents']);
      resetForm();
      setIsCreateOpen(false);
    },
    onError: (error) => {
      console.error('Create mutation error:', error);
      alert(`Failed to create event: ${error.message || 'Unknown error'}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => api.entities.Event.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['allEvents']);
      queryClient.invalidateQueries(['pastEvents']);
      queryClient.invalidateQueries(['upcomingEvents']);
      resetForm();
      setEditingEvent(null);
    },
    onError: (error) => {
      console.error('Update mutation error:', error);
      alert(`Failed to update event: ${error.message || 'Unknown error'}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.entities.Event.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['allEvents']);
      queryClient.invalidateQueries(['pastEvents']);
      queryClient.invalidateQueries(['upcomingEvents']);
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      date: "",
      location: "",
      description: "",
      image_url: "",
      image_urls: [],
      video_url: "",
      highlights: "",
      participants_count: "",
      impact_summary: "",
    });
    setNewImageUrl("");
    setUploadedFiles([]);
    setFeaturedImageFile(null);
    setEventType('past');
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setEventType(event.type || 'past');
    setFormData({
      title: event.title || "",
      date: event.date || "",
      location: event.location || "",
      description: event.description || "",
      image_url: event.image_url || "",
      image_urls: event.image_urls || [],
      video_url: event.video_url || "",
      highlights: Array.isArray(event.highlights) ? event.highlights.join('\n') : event.highlights || "",
      participants_count: event.participants_count || "",
      impact_summary: event.impact_summary || "",
    });
  };

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        image_urls: [...prev.image_urls, newImageUrl.trim()]
      }));
      setNewImageUrl("");
    }
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      image_urls: prev.image_urls.filter((_, i) => i !== index)
    }));
  };

  // Convert file to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle featured image upload
  const handleFeaturedImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be less than 5MB');
      return;
    }

    setIsUploading(true);
    try {
      const base64 = await fileToBase64(file);
      setFeaturedImageFile({ file, preview: base64, name: file.name });
      setFormData(prev => ({ ...prev, image_url: base64 }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  // Handle multiple images upload
  const handleMultipleImagesUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} is not an image file`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} is larger than 5MB`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setIsUploading(true);
    try {
      const uploadedImages = await Promise.all(
        validFiles.map(async (file) => {
          const base64 = await fileToBase64(file);
          return { file, preview: base64, name: file.name };
        })
      );

      setUploadedFiles(prev => [...prev, ...uploadedImages]);
      setFormData(prev => ({
        ...prev,
        image_urls: [...prev.image_urls, ...uploadedImages.map(img => img.preview)]
      }));
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload some images');
    } finally {
      setIsUploading(false);
    }
  };

  // Remove uploaded file
  const handleRemoveUploadedFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      image_urls: prev.image_urls.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Submit triggered');
    console.log('formData.image_url:', formData.image_url);
    console.log('featuredImageFile:', featuredImageFile);
    
    // Validate that featured image is provided
    if (!formData.image_url && !featuredImageFile) {
      alert('Please upload a featured image or provide an image URL');
      return;
    }
    
    const submitData = {
      ...formData,
      type: eventType,
      highlights: formData.highlights.split('\n').filter(h => h.trim()),
      participants_count: formData.participants_count ? parseInt(formData.participants_count) : null,
    };

    console.log('Submitting data:', submitData);

    if (editingEvent) {
      updateMutation.mutate({ id: editingEvent.id, data: submitData });
    } else {
      createMutation.mutate(submitData);
    }
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  const renderEventForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Event Type Selector */}
      <div className="space-y-2">
        <Label>Event Type *</Label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="eventType"
              value="past"
              checked={eventType === 'past'}
              onChange={(e) => setEventType(e.target.value)}
              className="w-4 h-4 text-orange-500"
            />
            <span className="text-sm font-medium">Past Event</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="eventType"
              value="upcoming"
              checked={eventType === 'upcoming'}
              onChange={(e) => setEventType(e.target.value)}
              className="w-4 h-4 text-orange-500"
            />
            <span className="text-sm font-medium">Upcoming Event</span>
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Event Title *</Label>
        <Input
          id="title"
          required
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Youth Leadership Workshop"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date *</Label>
          <Input
            id="date"
            type="date"
            required
            value={formData.date}
            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            required
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            placeholder="Community Center"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          required
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="A comprehensive description of the event..."
          rows={4}
        />
      </div>

      {/* Featured Image Upload */}
      <div className="space-y-3">
        <Label>Featured Image *</Label>
        
        <div className="flex gap-3">
          <input
            ref={featuredInputRef}
            type="file"
            accept="image/*"
            onChange={handleFeaturedImageUpload}
            className="hidden"
          />
          <Button
            type="button"
            onClick={() => featuredInputRef.current?.click()}
            variant="outline"
            className="w-full"
            disabled={isUploading}
          >
            <Upload className="w-4 h-4 mr-2" />
            {featuredImageFile ? 'Change Featured Image' : 'Upload Featured Image'}
          </Button>
        </div>

        {featuredImageFile && (
          <div className="relative rounded-lg overflow-hidden border-2 border-green-200 bg-green-50">
            <img
              src={featuredImageFile.preview}
              alt="Featured preview"
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => {
                  setFeaturedImageFile(null);
                  setFormData(prev => ({ ...prev, image_url: '' }));
                }}
                variant="destructive"
                size="sm"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="p-2 bg-white/90 text-sm text-gray-700 truncate">
              {featuredImageFile.name}
            </div>
          </div>
        )}

        <p className="text-sm text-gray-500">Main event photo (required). Max 5MB</p>
      </div>

      {/* Multiple Images Section */}
      <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <Label>Additional Images (Optional)</Label>
        
        {/* Upload Multiple Images */}
        <div className="space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleMultipleImagesUpload}
            className="hidden"
          />
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            className="w-full"
            disabled={isUploading}
          >
            <Upload className="w-4 h-4 mr-2" />
            {isUploading ? 'Uploading...' : 'Upload Images'}
          </Button>
        </div>

        {/* Uploaded Files Preview */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Uploaded ({uploadedFiles.length}):</p>
            <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="relative group">
                  <img
                    src={file.preview}
                    alt={file.name}
                    className="w-full h-32 object-cover rounded border"
                  />
                  <Button
                    type="button"
                    onClick={() => handleRemoveUploadedFile(index)}
                    variant="destructive"
                    size="sm"
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                  <div className="text-xs text-gray-600 truncate mt-1 px-1">
                    {file.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="text-sm text-gray-500">Upload image files. Max 5MB per image</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="video">Video URL (optional)</Label>
        <div className="flex gap-2">
          <Video className="w-5 h-5 text-gray-400 mt-2" />
          <Input
            id="video"
            type="url"
            value={formData.video_url}
            onChange={(e) => setFormData(prev => ({ ...prev, video_url: e.target.value }))}
            placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
          />
        </div>
        <p className="text-sm text-gray-500">YouTube, Vimeo, or direct video link</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="highlights">Event Highlights</Label>
        <Textarea
          id="highlights"
          value={formData.highlights}
          onChange={(e) => setFormData(prev => ({ ...prev, highlights: e.target.value }))}
          placeholder="One highlight per line:&#10;50+ participants attended&#10;Raised $5,000 for charity&#10;Featured guest speakers"
          rows={4}
        />
        <p className="text-sm text-gray-500">Enter each highlight on a new line</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="participants">Participants Count</Label>
          <Input
            id="participants"
            type="number"
            min="0"
            value={formData.participants_count}
            onChange={(e) => setFormData(prev => ({ ...prev, participants_count: e.target.value }))}
            placeholder="50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="impact">Impact Summary</Label>
          <Input
            id="impact"
            value={formData.impact_summary}
            onChange={(e) => setFormData(prev => ({ ...prev, impact_summary: e.target.value }))}
            placeholder="Raised $5,000"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          onClick={(e) => {
            console.log('Button clicked!');
            console.log('Button disabled?', createMutation.isPending || updateMutation.isPending);
          }}
          className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
          disabled={createMutation.isPending || updateMutation.isPending}
        >
          {(createMutation.isPending || updateMutation.isPending) ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            editingEvent ? "Update Event" : "Create Event"
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            resetForm();
            setIsCreateOpen(false);
            setEditingEvent(null);
          }}
        >
          Cancel
        </Button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Manage Events</h1>
            <p className="text-gray-600">Create, edit, and manage past and upcoming events</p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Notification Button */}
            <Button
              variant="outline"
              className="relative gap-2"
              onClick={handleViewRegistrations}
            >
              <Bell className="w-4 h-4" />
              Registrations
              {unreadCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-0.5 text-xs">
                  {unreadCount}
                </Badge>
              )}
            </Button>
            
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600">
                <Plus className="w-4 h-4 mr-2" />
                Add New Event
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingEvent ? 'Edit Event' : 'Create New Event'}</DialogTitle>
              </DialogHeader>
              {renderEventForm()}
            </DialogContent>
          </Dialog>
          </div>
        </div>

        {/* Registrations View */}
        <Dialog open={showRegistrations} onOpenChange={setShowRegistrations}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Event Registrations ({registrations.length})
                </div>
              </DialogTitle>
            </DialogHeader>
            
            {/* Filter and Download Controls */}
            <div className="flex items-center gap-3 mt-4">
              <Select value={selectedEventFilter} onValueChange={setSelectedEventFilter}>
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Filter by event" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  {events
                    .filter(event => registrations.some(reg => reg.eventId === event.id))
                    .map(event => (
                      <SelectItem key={event.id} value={event.id}>
                        {event.title}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              
              <Button
                onClick={() => downloadRegistrationsByEvent(selectedEventFilter)}
                className="gap-2 bg-green-600 hover:bg-green-700"
              >
                <Download className="w-4 h-4" />
                Download Excel
              </Button>
            </div>
            
            <div className="space-y-4 mt-4">
              {(() => {
                const filteredRegs = selectedEventFilter === 'all' 
                  ? registrations 
                  : registrations.filter(reg => reg.eventId === selectedEventFilter);
                
                if (filteredRegs.length === 0) {
                  return (
                    <div className="text-center py-12">
                      <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600">
                        {registrations.length === 0 ? 'No registrations yet' : 'No registrations for this event'}
                      </p>
                    </div>
                  );
                }
                
                return [...filteredRegs].reverse().map((reg, index) => {
                  const event = events.find(e => e.id === reg.eventId);
                  return (
                    <Card key={index} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                              {reg.eventTitle || event?.title || 'Unknown Event'}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {new Date(reg.registeredAt).toLocaleString()}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <span className="font-semibold text-gray-700">Name:</span>
                              <span className="ml-2 text-gray-900">{reg.name}</span>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-700">Gender:</span>
                              <span className="ml-2 text-gray-900">{reg.gender}</span>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-700">Age:</span>
                              <span className="ml-2 text-gray-900">{reg.age}</span>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-700">Email:</span>
                              <span className="ml-2 text-gray-900">{reg.email}</span>
                            </div>
                            <div className="col-span-2">
                              <span className="font-semibold text-gray-700">Phone:</span>
                              <span className="ml-2 text-gray-900">{reg.phone}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                });
              })()}
            </div>
          </DialogContent>
        </Dialog>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-orange-500" />
          </div>
        )}

        {/* Events List */}
        {!isLoading && (
          <div className="space-y-6">
            {events.length === 0 ? (
              <Card className="p-12 text-center">
                <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No events yet</h3>
                <p className="text-gray-600 mb-4">Create your first event to get started</p>
                <Button
                  onClick={() => setIsCreateOpen(true)}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Event
                </Button>
              </Card>
            ) : (
              events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="grid md:grid-cols-3 gap-6 p-6">
                      {/* Image/Video Preview */}
                      <div className="space-y-3">
                        {event.image_url && (
                          <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                            <img
                              src={event.image_url}
                              alt={event.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        {event.image_urls && event.image_urls.length > 0 && (
                          <div className="flex items-center gap-2 text-sm text-blue-600">
                            <ImageIcon className="w-4 h-4" />
                            <span>{event.image_urls.length} additional image{event.image_urls.length > 1 ? 's' : ''}</span>
                          </div>
                        )}
                        {event.video_url && (
                          <div className="flex items-center gap-2 text-sm text-purple-600">
                            <Video className="w-4 h-4" />
                            <span>Video available</span>
                          </div>
                        )}
                      </div>

                      {/* Event Details */}
                      <div className="md:col-span-2 space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-2xl font-bold text-gray-900">{event.title}</h3>
                              {event.type === 'upcoming' && (
                                <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded">Upcoming</span>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                              {event.date && (
                                <span className="flex items-center gap-1">
                                  <span className="font-medium">📅</span>
                                  {new Date(event.date).toLocaleDateString()}
                                </span>
                              )}
                              {event.location && (
                                <span className="flex items-center gap-1">
                                  <span className="font-medium">📍</span>
                                  {event.location}
                                </span>
                              )}
                              {event.participants_count && (
                                <span className="flex items-center gap-1">
                                  <span className="font-medium">👥</span>
                                  {event.participants_count} participants
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2">
                            <Dialog
                              open={editingEvent?.id === event.id}
                              onOpenChange={(open) => {
                                if (!open) {
                                  setEditingEvent(null);
                                  resetForm();
                                }
                              }}
                            >
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEdit(event)}
                                >
                                  <Edit2 className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Edit Event</DialogTitle>
                                </DialogHeader>
                                {renderEventForm()}
                              </DialogContent>
                            </Dialog>

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Event</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete "{event.title}"? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(event.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>

                        <p className="text-gray-700">{event.description}</p>

                        {event.type === 'upcoming' && (
                          <div>
                            <Button
                              onClick={() => window.open(`/event-register/${event.id}`, '_blank')}
                              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
                            >
                              Register for This Event
                            </Button>
                          </div>
                        )}

                        {event.highlights && event.highlights.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Highlights:</h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                              {event.highlights.map((highlight, idx) => (
                                <li key={idx}>{highlight}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {event.impact_summary && (
                          <div className="inline-block px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
                            <span className="text-sm font-medium text-green-800">
                              Impact: {event.impact_summary}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
