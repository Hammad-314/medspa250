"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Checkbox } from "../ui/checkbox";
import { Alert, AlertDescription } from "../ui/alert";
import { 
  ArrowLeft,
  UserPlus,
  CheckCircle,
  AlertCircle,
  Calendar,
  Phone,
  Mail,
  MapPin,
  FileText,
  Heart
} from "lucide-react";

const treatmentAreas = [
  { id: "face", name: "Facial Treatments", description: "Botox, fillers, facials" },
  { id: "body", name: "Body Contouring", description: "CoolSculpting, laser treatments" },
  { id: "hair", name: "Hair Removal", description: "Laser hair removal" },
  { id: "skin", name: "Skin Rejuvenation", description: "Chemical peels, microneedling" },
  { id: "wellness", name: "Wellness", description: "IV therapy, nutrition" },
];

const referralSources = [
  "Google Search",
  "Social Media",
  "Friend/Family Referral",
  "Website",
  "Walk-in",
  "Other"
];

export function AddClient({ onPageChange }) {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    
    // Address Information
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    
    // Emergency Contact
    emergencyName: "",
    emergencyPhone: "",
    emergencyRelation: "",
    
    // Medical Information
    allergies: "",
    medications: "",
    medicalConditions: "",
    skinType: "",
    previousTreatments: "",
    
    // Treatment Preferences
    treatmentAreas: [],
    referralSource: "",
    notes: "",
    
    // Marketing Preferences
    emailMarketing: false,
    smsMarketing: false,
    phoneMarketing: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleTreatmentAreaChange = (areaId, checked) => {
    setFormData(prev => ({
      ...prev,
      treatmentAreas: checked
        ? [...prev.treatmentAreas, areaId]
        : prev.treatmentAreas.filter(id => id !== areaId)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange("clients/list")}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Client List
          </Button>
        </div>
        
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Client Added Successfully!</h1>
            <p className="text-muted-foreground">
              {formData.firstName} {formData.lastName} has been added to your client database.
            </p>
          </div>
          <div className="flex justify-center space-x-4">
            <Button
              onClick={() => onPageChange("clients/list")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              View Client List
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setSuccess(false);
                setFormData({
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
                  dateOfBirth: "",
                  gender: "",
                  street: "",
                  city: "",
                  state: "",
                  zipCode: "",
                  country: "United States",
                  emergencyName: "",
                  emergencyPhone: "",
                  emergencyRelation: "",
                  allergies: "",
                  medications: "",
                  medicalConditions: "",
                  skinType: "",
                  previousTreatments: "",
                  treatmentAreas: [],
                  referralSource: "",
                  notes: "",
                  emailMarketing: false,
                  smsMarketing: false,
                  phoneMarketing: false,
                });
              }}
              className="border-border hover:bg-primary/5"
            >
              Add Another Client
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange("clients/list")}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Client List
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Add New Client</h1>
            <p className="text-muted-foreground">Create a new client profile in your database</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserPlus className="h-5 w-5 mr-2" />
              Personal Information
            </CardTitle>
            <CardDescription>Basic client details and contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="bg-input-background border-border"
                  placeholder="Enter first name"
                />
                {errors.firstName && (
                  <p className="text-sm text-destructive mt-1">{errors.firstName}</p>
                )}
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="bg-input-background border-border"
                  placeholder="Enter last name"
                />
                {errors.lastName && (
                  <p className="text-sm text-destructive mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-input-background border-border"
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <p className="text-sm text-destructive mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="bg-input-background border-border"
                  placeholder="Enter phone number"
                />
                {errors.phone && (
                  <p className="text-sm text-destructive mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  className="bg-input-background border-border"
                />
                {errors.dateOfBirth && (
                  <p className="text-sm text-destructive mt-1">{errors.dateOfBirth}</p>
                )}
              </div>
              <div>
                <Label htmlFor="gender">Gender *</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger className="bg-input-background border-border">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && (
                  <p className="text-sm text-destructive mt-1">{errors.gender}</p>
                )}
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
            <CardDescription>Client's residential address</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="street">Street Address</Label>
              <Input
                id="street"
                value={formData.street}
                onChange={(e) => handleInputChange("street", e.target.value)}
                className="bg-input-background border-border"
                placeholder="Enter street address"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className="bg-input-background border-border"
                  placeholder="Enter city"
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  className="bg-input-background border-border"
                  placeholder="Enter state"
                />
              </div>
              <div>
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange("zipCode", e.target.value)}
                  className="bg-input-background border-border"
                  placeholder="Enter ZIP code"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              Emergency Contact
            </CardTitle>
            <CardDescription>Emergency contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="emergencyName">Contact Name</Label>
                <Input
                  id="emergencyName"
                  value={formData.emergencyName}
                  onChange={(e) => handleInputChange("emergencyName", e.target.value)}
                  className="bg-input-background border-border"
                  placeholder="Enter contact name"
                />
              </div>
              <div>
                <Label htmlFor="emergencyPhone">Contact Phone</Label>
                <Input
                  id="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                  className="bg-input-background border-border"
                  placeholder="Enter contact phone"
                />
              </div>
              <div>
                <Label htmlFor="emergencyRelation">Relationship</Label>
                <Input
                  id="emergencyRelation"
                  value={formData.emergencyRelation}
                  onChange={(e) => handleInputChange("emergencyRelation", e.target.value)}
                  className="bg-input-background border-border"
                  placeholder="e.g., Spouse, Parent"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medical Information */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="h-5 w-5 mr-2" />
              Medical Information
            </CardTitle>
            <CardDescription>Medical history and treatment preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="allergies">Allergies</Label>
                <Textarea
                  id="allergies"
                  value={formData.allergies}
                  onChange={(e) => handleInputChange("allergies", e.target.value)}
                  className="bg-input-background border-border"
                  placeholder="List any known allergies"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="medications">Current Medications</Label>
                <Textarea
                  id="medications"
                  value={formData.medications}
                  onChange={(e) => handleInputChange("medications", e.target.value)}
                  className="bg-input-background border-border"
                  placeholder="List current medications"
                  rows={3}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="medicalConditions">Medical Conditions</Label>
              <Textarea
                id="medicalConditions"
                value={formData.medicalConditions}
                onChange={(e) => handleInputChange("medicalConditions", e.target.value)}
                className="bg-input-background border-border"
                placeholder="List any relevant medical conditions"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="skinType">Skin Type</Label>
                <Select value={formData.skinType} onValueChange={(value) => handleInputChange("skinType", value)}>
                  <SelectTrigger className="bg-input-background border-border">
                    <SelectValue placeholder="Select skin type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="oily">Oily</SelectItem>
                    <SelectItem value="dry">Dry</SelectItem>
                    <SelectItem value="combination">Combination</SelectItem>
                    <SelectItem value="sensitive">Sensitive</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="previousTreatments">Previous Treatments</Label>
                <Textarea
                  id="previousTreatments"
                  value={formData.previousTreatments}
                  onChange={(e) => handleInputChange("previousTreatments", e.target.value)}
                  className="bg-input-background border-border"
                  placeholder="List previous aesthetic treatments"
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Treatment Preferences */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Treatment Preferences
            </CardTitle>
            <CardDescription>Areas of interest and referral information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Areas of Interest</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                {treatmentAreas.map((area) => (
                  <div key={area.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={area.id}
                      checked={formData.treatmentAreas.includes(area.id)}
                      onCheckedChange={(checked) => handleTreatmentAreaChange(area.id, checked)}
                    />
                    <Label htmlFor={area.id} className="text-sm">
                      {area.name}
                      <span className="text-muted-foreground ml-1">({area.description})</span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="referralSource">How did you hear about us?</Label>
              <Select value={formData.referralSource} onValueChange={(value) => handleInputChange("referralSource", value)}>
                <SelectTrigger className="bg-input-background border-border">
                  <SelectValue placeholder="Select referral source" />
                </SelectTrigger>
                <SelectContent>
                  {referralSources.map((source) => (
                    <SelectItem key={source} value={source}>
                      {source}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                className="bg-input-background border-border"
                placeholder="Any additional notes or special requests"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Marketing Preferences */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Marketing Preferences</CardTitle>
            <CardDescription>Communication preferences for marketing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="emailMarketing"
                  checked={formData.emailMarketing}
                  onCheckedChange={(checked) => handleInputChange("emailMarketing", checked)}
                />
                <Label htmlFor="emailMarketing">Email marketing and newsletters</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="smsMarketing"
                  checked={formData.smsMarketing}
                  onCheckedChange={(checked) => handleInputChange("smsMarketing", checked)}
                />
                <Label htmlFor="smsMarketing">SMS notifications and promotions</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="phoneMarketing"
                  checked={formData.phoneMarketing}
                  onCheckedChange={(checked) => handleInputChange("phoneMarketing", checked)}
                />
                <Label htmlFor="phoneMarketing">Phone calls for promotions</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onPageChange("clients/list")}
            className="border-border hover:bg-primary/5"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Adding Client...
              </>
            ) : (
              "Add Client"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

