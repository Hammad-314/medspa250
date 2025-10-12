"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Calendar } from "../ui/calendar";
import { Badge } from "../ui/badge";
import { Alert, AlertDescription } from "../ui/alert";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  MapPin, 
  Stethoscope, 
  ArrowLeft,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const services = [
  { id: "botox", name: "Botox Injections", duration: 30, price: 400, description: "Anti-aging facial treatment" },
  { id: "filler", name: "Dermal Fillers", duration: 45, price: 600, description: "Volume restoration and contouring" },
  { id: "hydrafacial", name: "Hydrafacial", duration: 60, price: 180, description: "Deep cleansing and hydrating facial" },
  { id: "laser", name: "Laser Hair Removal", duration: 30, price: 150, description: "Permanent hair reduction" },
  { id: "iv", name: "IV Therapy", duration: 45, price: 200, description: "Vitamin and nutrient infusion" },
  { id: "prp", name: "PRP Treatment", duration: 90, price: 500, description: "Platelet-rich plasma therapy" },
];

const providers = [
  { id: "dr-chen", name: "Dr. Michael Chen", specialty: "Cosmetic Dermatology", rating: 4.9 },
  { id: "dr-johnson", name: "Dr. Sarah Johnson", specialty: "Aesthetic Medicine", rating: 4.8 },
  { id: "dr-smith", name: "Dr. Emily Smith", specialty: "Laser Treatments", rating: 4.7 },
];

const locations = [
  { id: "downtown", name: "Downtown Clinic", address: "123 Main St, Downtown" },
  { id: "westside", name: "Westside Location", address: "456 Oak Ave, Westside" },
  { id: "northside", name: "Northside Branch", address: "789 Pine St, Northside" },
];

const timeSlots = [
  "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
  "5:00 PM", "5:30 PM", "6:00 PM"
];

export function BookAppointment({ onPageChange }) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [clientInfo, setClientInfo] = useState({
    name: "",
    email: "",
    phone: "",
    notes: ""
  });
  const [isBooking, setIsBooking] = useState(false);

  const handleServiceSelect = (serviceId) => {
    setSelectedService(serviceId);
    setStep(2);
  };

  const handleProviderSelect = (providerId) => {
    setSelectedProvider(providerId);
    setStep(3);
  };

  const handleLocationSelect = (locationId) => {
    setSelectedLocation(locationId);
    setStep(4);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setStep(5);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setStep(6);
  };

  const handleClientInfoChange = (field, value) => {
    setClientInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleBooking = async () => {
    setIsBooking(true);
    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsBooking(false);
    setStep(7); // Success step
  };

  const getSelectedService = () => services.find(s => s.id === selectedService);
  const getSelectedProvider = () => providers.find(p => p.id === selectedProvider);
  const getSelectedLocation = () => locations.find(l => l.id === selectedLocation);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">Select Service</h2>
              <p className="text-muted-foreground">Choose the treatment you'd like to book</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service) => (
                <Card 
                  key={service.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow border-border hover:border-primary/30"
                  onClick={() => handleServiceSelect(service.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <Badge variant="outline">${service.price}</Badge>
                    </div>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {service.duration} min
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">Select Provider</h2>
              <p className="text-muted-foreground">Choose your preferred healthcare provider</p>
            </div>
            <div className="space-y-4">
              {providers.map((provider) => (
                <Card 
                  key={provider.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow border-border hover:border-primary/30"
                  onClick={() => handleProviderSelect(provider.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{provider.name}</h3>
                        <p className="text-muted-foreground">{provider.specialty}</p>
                        <div className="flex items-center mt-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <div key={i} className={`w-4 h-4 ${i < Math.floor(provider.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                                ★
                              </div>
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-muted-foreground">{provider.rating}</span>
                        </div>
                      </div>
                      <Stethoscope className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">Select Location</h2>
              <p className="text-muted-foreground">Choose your preferred clinic location</p>
            </div>
            <div className="space-y-4">
              {locations.map((location) => (
                <Card 
                  key={location.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow border-border hover:border-primary/30"
                  onClick={() => handleLocationSelect(location.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{location.name}</h3>
                        <p className="text-muted-foreground">{location.address}</p>
                      </div>
                      <MapPin className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">Select Date</h2>
              <p className="text-muted-foreground">Choose your preferred appointment date</p>
            </div>
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && handleDateSelect(date)}
                className="rounded-md border border-border"
                disabled={(date) => date < new Date()}
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">Select Time</h2>
              <p className="text-muted-foreground">Choose your preferred appointment time</p>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  className="border-border hover:border-primary/30"
                  onClick={() => handleTimeSelect(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">Client Information</h2>
              <p className="text-muted-foreground">Please provide your contact details</p>
            </div>
            <div className="max-w-md mx-auto space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={clientInfo.name}
                  onChange={(e) => handleClientInfoChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  className="bg-input-background border-border"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={clientInfo.email}
                  onChange={(e) => handleClientInfoChange("email", e.target.value)}
                  placeholder="Enter your email"
                  className="bg-input-background border-border"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={clientInfo.phone}
                  onChange={(e) => handleClientInfoChange("phone", e.target.value)}
                  placeholder="Enter your phone number"
                  className="bg-input-background border-border"
                />
              </div>
              <div>
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={clientInfo.notes}
                  onChange={(e) => handleClientInfoChange("notes", e.target.value)}
                  placeholder="Any special requests or notes"
                  className="bg-input-background border-border"
                />
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Appointment Booked!</h2>
              <p className="text-muted-foreground">Your appointment has been successfully scheduled</p>
            </div>
            <div className="max-w-md mx-auto">
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Service:</span>
                      <span className="font-medium">{getSelectedService()?.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Provider:</span>
                      <span className="font-medium">{getSelectedProvider()?.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Date:</span>
                      <span className="font-medium">{selectedDate.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Time:</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Location:</span>
                      <span className="font-medium">{getSelectedLocation()?.name}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange("dashboard")}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Book Appointment</h1>
            <p className="text-muted-foreground">Schedule your wellness treatment</p>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      {step < 7 && (
        <div className="flex items-center justify-center space-x-4">
          {[1, 2, 3, 4, 5, 6].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNum
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {stepNum}
              </div>
              {stepNum < 6 && (
                <div
                  className={`w-8 h-0.5 ${
                    step > stepNum ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Main Content */}
      <Card className="bg-card border-border">
        <CardContent className="p-8">
          {renderStep()}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      {step < 7 && step > 1 && step !== 6 && (
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setStep(step - 1)}
            className="border-border hover:bg-primary/5"
          >
            Previous
          </Button>
          <div></div>
        </div>
      )}

      {step === 6 && (
        <div className="flex justify-center">
          <Button
            onClick={handleBooking}
            disabled={!clientInfo.name || !clientInfo.email || !clientInfo.phone || isBooking}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
          >
            {isBooking ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Booking...
              </>
            ) : (
              "Book Appointment"
            )}
          </Button>
        </div>
      )}

      {step === 7 && (
        <div className="flex justify-center">
          <Button
            onClick={() => onPageChange("dashboard")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Back to Dashboard
          </Button>
        </div>
      )}
    </div>
  );
}

