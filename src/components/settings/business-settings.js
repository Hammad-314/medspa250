"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Switch } from "../ui/switch";
import { Badge } from "../ui/badge";
import { Alert, AlertDescription } from "../ui/alert";
import { 
  ArrowLeft,
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  CreditCard,
  Users,
  Settings,
  Save,
  CheckCircle,
  AlertCircle,
  Upload,
  Calendar,
  DollarSign
} from "lucide-react";

export function BusinessSettings({ onPageChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const [businessData, setBusinessData] = useState({
    // Business Information
    businessName: "MediSpa Wellness Center",
    legalName: "MediSpa Wellness Center LLC",
    businessType: "Medical Spa",
    taxId: "12-3456789",
    licenseNumber: "MED-2024-001",
    
    // Contact Information
    primaryPhone: "(555) 123-4567",
    secondaryPhone: "(555) 123-4568",
    email: "info@medispa.com",
    website: "www.medispa.com",
    
    // Address Information
    street: "123 Wellness Avenue",
    city: "Downtown",
    state: "CA",
    zipCode: "90210",
    country: "United States",
    
    // Business Hours
    mondayOpen: "9:00 AM",
    mondayClose: "6:00 PM",
    tuesdayOpen: "9:00 AM",
    tuesdayClose: "6:00 PM",
    wednesdayOpen: "9:00 AM",
    wednesdayClose: "6:00 PM",
    thursdayOpen: "9:00 AM",
    thursdayClose: "6:00 PM",
    fridayOpen: "9:00 AM",
    fridayClose: "6:00 PM",
    saturdayOpen: "10:00 AM",
    saturdayClose: "4:00 PM",
    sundayOpen: "Closed",
    sundayClose: "Closed",
    
    // Payment Settings
    currency: "USD",
    taxRate: 8.5,
    acceptCash: true,
    acceptCreditCard: true,
    acceptCheck: false,
    acceptBankTransfer: true,
    
    // Appointment Settings
    defaultDuration: 30,
    bufferTime: 15,
    maxAdvanceBooking: 90,
    minAdvanceBooking: 24,
    cancellationPolicy: "24 hours",
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: true,
    appointmentReminders: true,
    marketingEmails: false,
    
    // Features
    onlineBooking: true,
    clientPortal: true,
    inventoryTracking: true,
    reporting: true,
    
    // Compliance
    hipaaCompliant: true,
    dataRetention: 7,
    privacyPolicy: "https://medispa.com/privacy",
    termsOfService: "https://medispa.com/terms"
  });

  const handleInputChange = (field, value) => {
    setBusinessData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!businessData.businessName.trim()) newErrors.businessName = "Business name is required";
    if (!businessData.primaryPhone.trim()) newErrors.primaryPhone = "Primary phone is required";
    if (!businessData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(businessData.email)) newErrors.email = "Email is invalid";
    if (!businessData.street.trim()) newErrors.street = "Street address is required";
    if (!businessData.city.trim()) newErrors.city = "City is required";
    if (!businessData.state.trim()) newErrors.state = "State is required";
    if (!businessData.zipCode.trim()) newErrors.zipCode = "ZIP code is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }
    
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSaving(false);
    setSuccess(true);
    setIsEditing(false);
    
    // Clear success message after 3 seconds
    setTimeout(() => setSuccess(false), 3000);
  };

  const businessTypes = [
    "Medical Spa",
    "Dermatology Clinic",
    "Plastic Surgery",
    "Wellness Center",
    "Beauty Clinic",
    "Aesthetic Center"
  ];

  const currencies = [
    "USD",
    "EUR",
    "GBP",
    "CAD",
    "AUD"
  ];

  const timeSlots = [
    "6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM",
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
    "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM",
    "9:00 PM", "Closed"
  ];

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
            <h1 className="text-2xl font-bold text-foreground">Business Settings</h1>
            <p className="text-muted-foreground">Configure your business information and preferences</p>
          </div>
        </div>
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setErrors({});
                }}
                className="border-border hover:bg-primary/5"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Settings className="h-4 w-4 mr-2" />
              Edit Settings
            </Button>
          )}
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Business settings updated successfully!
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Business Overview */}
        <div className="lg:col-span-1">
          <Card className="bg-card border-border">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-xl">{businessData.businessName}</CardTitle>
              <Badge variant="outline" className="mt-2">
                {businessData.businessType}
              </Badge>
              <CardDescription className="mt-2">
                Licensed Medical Spa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{businessData.primaryPhone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{businessData.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{businessData.website}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{businessData.city}, {businessData.state}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Business Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="h-5 w-5 mr-2" />
                Basic Information
              </CardTitle>
              <CardDescription>Your business details and legal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    value={businessData.businessName}
                    onChange={(e) => handleInputChange("businessName", e.target.value)}
                    disabled={!isEditing}
                    className="bg-input-background border-border"
                  />
                  {errors.businessName && (
                    <p className="text-sm text-destructive mt-1">{errors.businessName}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="legalName">Legal Name</Label>
                  <Input
                    id="legalName"
                    value={businessData.legalName}
                    onChange={(e) => handleInputChange("legalName", e.target.value)}
                    disabled={!isEditing}
                    className="bg-input-background border-border"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="businessType">Business Type</Label>
                  <Select 
                    value={businessData.businessType} 
                    onValueChange={(value) => handleInputChange("businessType", value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="bg-input-background border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map(type => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="licenseNumber">License Number</Label>
                  <Input
                    id="licenseNumber"
                    value={businessData.licenseNumber}
                    onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                    disabled={!isEditing}
                    className="bg-input-background border-border"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="taxId">Tax ID</Label>
                <Input
                  id="taxId"
                  value={businessData.taxId}
                  onChange={(e) => handleInputChange("taxId", e.target.value)}
                  disabled={!isEditing}
                  className="bg-input-background border-border"
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                Contact Information
              </CardTitle>
              <CardDescription>How clients can reach your business</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="primaryPhone">Primary Phone *</Label>
                  <Input
                    id="primaryPhone"
                    value={businessData.primaryPhone}
                    onChange={(e) => handleInputChange("primaryPhone", e.target.value)}
                    disabled={!isEditing}
                    className="bg-input-background border-border"
                  />
                  {errors.primaryPhone && (
                    <p className="text-sm text-destructive mt-1">{errors.primaryPhone}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="secondaryPhone">Secondary Phone</Label>
                  <Input
                    id="secondaryPhone"
                    value={businessData.secondaryPhone}
                    onChange={(e) => handleInputChange("secondaryPhone", e.target.value)}
                    disabled={!isEditing}
                    className="bg-input-background border-border"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={businessData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    disabled={!isEditing}
                    className="bg-input-background border-border"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={businessData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    disabled={!isEditing}
                    className="bg-input-background border-border"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address Information */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Address Information
              </CardTitle>
              <CardDescription>Your business location</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="street">Street Address *</Label>
                <Input
                  id="street"
                  value={businessData.street}
                  onChange={(e) => handleInputChange("street", e.target.value)}
                  disabled={!isEditing}
                  className="bg-input-background border-border"
                />
                {errors.street && (
                  <p className="text-sm text-destructive mt-1">{errors.street}</p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={businessData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    disabled={!isEditing}
                    className="bg-input-background border-border"
                  />
                  {errors.city && (
                    <p className="text-sm text-destructive mt-1">{errors.city}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    value={businessData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    disabled={!isEditing}
                    className="bg-input-background border-border"
                  />
                  {errors.state && (
                    <p className="text-sm text-destructive mt-1">{errors.state}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP Code *</Label>
                  <Input
                    id="zipCode"
                    value={businessData.zipCode}
                    onChange={(e) => handleInputChange("zipCode", e.target.value)}
                    disabled={!isEditing}
                    className="bg-input-background border-border"
                  />
                  {errors.zipCode && (
                    <p className="text-sm text-destructive mt-1">{errors.zipCode}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Hours */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Business Hours
              </CardTitle>
              <CardDescription>When your business is open</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Monday</Label>
                  <div className="flex space-x-2">
                    <Select 
                      value={businessData.mondayOpen} 
                      onValueChange={(value) => handleInputChange("mondayOpen", value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="bg-input-background border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map(time => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select 
                      value={businessData.mondayClose} 
                      onValueChange={(value) => handleInputChange("mondayClose", value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="bg-input-background border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map(time => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Tuesday</Label>
                  <div className="flex space-x-2">
                    <Select 
                      value={businessData.tuesdayOpen} 
                      onValueChange={(value) => handleInputChange("tuesdayOpen", value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="bg-input-background border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map(time => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select 
                      value={businessData.tuesdayClose} 
                      onValueChange={(value) => handleInputChange("tuesdayClose", value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="bg-input-background border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map(time => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              {/* Add more days as needed */}
            </CardContent>
          </Card>

          {/* Payment Settings */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Payment Settings
              </CardTitle>
              <CardDescription>Configure payment methods and policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select 
                    value={businessData.currency} 
                    onValueChange={(value) => handleInputChange("currency", value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="bg-input-background border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map(currency => (
                        <SelectItem key={currency} value={currency}>
                          {currency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="taxRate">Tax Rate (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    step="0.1"
                    value={businessData.taxRate}
                    onChange={(e) => handleInputChange("taxRate", parseFloat(e.target.value))}
                    disabled={!isEditing}
                    className="bg-input-background border-border"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Accepted Payment Methods</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Cash</Label>
                      <p className="text-sm text-muted-foreground">
                        Accept cash payments
                      </p>
                    </div>
                    <Switch
                      checked={businessData.acceptCash}
                      onCheckedChange={(checked) => handleInputChange("acceptCash", checked)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Credit Card</Label>
                      <p className="text-sm text-muted-foreground">
                        Accept credit and debit cards
                      </p>
                    </div>
                    <Switch
                      checked={businessData.acceptCreditCard}
                      onCheckedChange={(checked) => handleInputChange("acceptCreditCard", checked)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Check</Label>
                      <p className="text-sm text-muted-foreground">
                        Accept check payments
                      </p>
                    </div>
                    <Switch
                      checked={businessData.acceptCheck}
                      onCheckedChange={(checked) => handleInputChange("acceptCheck", checked)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Bank Transfer</Label>
                      <p className="text-sm text-muted-foreground">
                        Accept bank transfers
                      </p>
                    </div>
                    <Switch
                      checked={businessData.acceptBankTransfer}
                      onCheckedChange={(checked) => handleInputChange("acceptBankTransfer", checked)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Features & Integrations
              </CardTitle>
              <CardDescription>Enable or disable system features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Online Booking</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow clients to book appointments online
                    </p>
                  </div>
                  <Switch
                    checked={businessData.onlineBooking}
                    onCheckedChange={(checked) => handleInputChange("onlineBooking", checked)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Client Portal</Label>
                    <p className="text-sm text-muted-foreground">
                      Provide clients with a self-service portal
                    </p>
                  </div>
                  <Switch
                    checked={businessData.clientPortal}
                    onCheckedChange={(checked) => handleInputChange("clientPortal", checked)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Inventory Tracking</Label>
                    <p className="text-sm text-muted-foreground">
                      Track product inventory and stock levels
                    </p>
                  </div>
                  <Switch
                    checked={businessData.inventoryTracking}
                    onCheckedChange={(checked) => handleInputChange("inventoryTracking", checked)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Advanced Reporting</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable detailed business analytics and reports
                    </p>
                  </div>
                  <Switch
                    checked={businessData.reporting}
                    onCheckedChange={(checked) => handleInputChange("reporting", checked)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
