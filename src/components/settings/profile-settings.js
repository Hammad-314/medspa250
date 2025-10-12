"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Switch } from "../ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Alert, AlertDescription } from "../ui/alert";
import { 
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Bell,
  Camera,
  Save,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Lock,
  Key
} from "lucide-react";
import { useAuth } from "../auth-context";

export function ProfileSettings({ onPageChange }) {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const [profileData, setProfileData] = useState({
    // Personal Information
    firstName: user?.name?.split(' ')[0] || "",
    lastName: user?.name?.split(' ')[1] || "",
    email: user?.email || "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    
    // Address Information
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    
    // Professional Information
    title: "",
    department: "",
    employeeId: "",
    hireDate: "",
    bio: "",
    
    // Security Settings
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false,
    
    // Notification Preferences
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    appointmentReminders: true,
    marketingEmails: false,
    
    // Privacy Settings
    profileVisibility: "private",
    showEmail: false,
    showPhone: false,
  });

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!profileData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!profileData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!profileData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(profileData.email)) newErrors.email = "Email is invalid";
    
    // Password validation only if changing password
    if (profileData.newPassword) {
      if (!profileData.currentPassword) newErrors.currentPassword = "Current password is required";
      if (profileData.newPassword.length < 8) newErrors.newPassword = "Password must be at least 8 characters";
      if (profileData.newPassword !== profileData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    }
    
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

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin": return "bg-red-100 text-red-800 border-red-200";
      case "provider": return "bg-blue-100 text-blue-800 border-blue-200";
      case "reception": return "bg-green-100 text-green-800 border-green-200";
      case "client": return "bg-purple-100 text-purple-800 border-purple-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
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
            <h1 className="text-2xl font-bold text-foreground">Profile Settings</h1>
            <p className="text-muted-foreground">Manage your personal information and preferences</p>
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
              <User className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Profile updated successfully!
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <div className="lg:col-span-1">
        <Card className="bg-card border-border">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-xl">
                      {(user?.name || "")
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                    >
                      <Camera className="h-4 w-4" />
                </Button>
              )}
                </div>
              </div>
              <CardTitle className="text-xl">{user?.name}</CardTitle>
              <div className="flex justify-center">
                <Badge
                  variant="outline"
                  className={`${getRoleBadgeColor(user?.role)} border capitalize`}
                >
                  {user?.role}
                </Badge>
              </div>
              <CardDescription className="mt-2">
                Member since {new Date().getFullYear()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user?.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Last active: Today</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {profileData.twoFactorEnabled ? "2FA Enabled" : "2FA Disabled"}
                  </span>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-6">
        {/* Personal Information */}
          <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Personal Information
            </CardTitle>
              <CardDescription>Your basic personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                  <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                    value={profileData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  disabled={!isEditing}
                  className="bg-input-background border-border"
                />
                {errors.firstName && (
                  <p className="text-sm text-destructive mt-1">{errors.firstName}</p>
                )}
              </div>
              <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                    value={profileData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  disabled={!isEditing}
                  className="bg-input-background border-border"
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
                    value={profileData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={!isEditing}
                  className="bg-input-background border-border"
                />
                {errors.email && (
                  <p className="text-sm text-destructive mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                    value={profileData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  disabled={!isEditing}
                  className="bg-input-background border-border"
                />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                    id="dateOfBirth"
                    type="date"
                    value={profileData.dateOfBirth}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  disabled={!isEditing}
                  className="bg-input-background border-border"
                />
              </div>
              <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select 
                    value={profileData.gender} 
                    onValueChange={(value) => handleInputChange("gender", value)}
                  disabled={!isEditing}
                  >
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
                </div>
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                  value={profileData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                disabled={!isEditing}
                className="bg-input-background border-border"
                  placeholder="Tell us about yourself..."
                rows={3}
              />
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
          <CardDescription>Your residential address</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
                <Label htmlFor="street">Street Address</Label>
            <Input
                  id="street"
                  value={profileData.street}
                  onChange={(e) => handleInputChange("street", e.target.value)}
              disabled={!isEditing}
              className="bg-input-background border-border"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                    value={profileData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                disabled={!isEditing}
                className="bg-input-background border-border"
              />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                    value={profileData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
                disabled={!isEditing}
                className="bg-input-background border-border"
              />
            </div>
            <div>
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input
                id="zipCode"
                    value={profileData.zipCode}
                onChange={(e) => handleInputChange("zipCode", e.target.value)}
                disabled={!isEditing}
                className="bg-input-background border-border"
              />
            </div>
          </div>
        </CardContent>
      </Card>

          {/* Security Settings */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center">
                <Lock className="h-5 w-5 mr-2" />
                Security Settings
          </CardTitle>
              <CardDescription>Manage your password and security preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showPassword ? "text" : "password"}
                    value={profileData.currentPassword}
                    onChange={(e) => handleInputChange("currentPassword", e.target.value)}
                    disabled={!isEditing}
                    className="bg-input-background border-border pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {errors.currentPassword && (
                  <p className="text-sm text-destructive mt-1">{errors.currentPassword}</p>
                )}
              </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                  <Label htmlFor="newPassword">New Password</Label>
              <Input
                    id="newPassword"
                    type="password"
                    value={profileData.newPassword}
                    onChange={(e) => handleInputChange("newPassword", e.target.value)}
                disabled={!isEditing}
                className="bg-input-background border-border"
              />
                  {errors.newPassword && (
                    <p className="text-sm text-destructive mt-1">{errors.newPassword}</p>
                  )}
            </div>
            <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                    id="confirmPassword"
                    type="password"
                    value={profileData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                disabled={!isEditing}
                className="bg-input-background border-border"
              />
                  {errors.confirmPassword && (
                    <p className="text-sm text-destructive mt-1">{errors.confirmPassword}</p>
                  )}
            </div>
          </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch
                  checked={profileData.twoFactorEnabled}
                  onCheckedChange={(checked) => handleInputChange("twoFactorEnabled", checked)}
              disabled={!isEditing}
                />
          </div>
        </CardContent>
      </Card>

          {/* Notification Preferences */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notification Preferences
          </CardTitle>
              <CardDescription>Choose how you want to be notified</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={profileData.emailNotifications}
                    onCheckedChange={(checked) => handleInputChange("emailNotifications", checked)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via text message
                    </p>
                  </div>
                  <Switch
                    checked={profileData.smsNotifications}
                    onCheckedChange={(checked) => handleInputChange("smsNotifications", checked)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications in the app
                    </p>
                  </div>
                  <Switch
                    checked={profileData.pushNotifications}
                    onCheckedChange={(checked) => handleInputChange("pushNotifications", checked)}
                disabled={!isEditing}
              />
            </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Appointment Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Get reminded about upcoming appointments
                    </p>
                  </div>
                  <Switch
                    checked={profileData.appointmentReminders}
                    onCheckedChange={(checked) => handleInputChange("appointmentReminders", checked)}
                disabled={!isEditing}
              />
            </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive promotional emails and updates
                    </p>
                  </div>
                  <Switch
                    checked={profileData.marketingEmails}
                    onCheckedChange={(checked) => handleInputChange("marketingEmails", checked)}
                disabled={!isEditing}
              />
            </div>
          </div>
        </CardContent>
      </Card>

          {/* Privacy Settings */}
      <Card className="bg-card border-border">
        <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Privacy Settings
              </CardTitle>
              <CardDescription>Control your privacy and visibility</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
              <div>
                <Label htmlFor="profileVisibility">Profile Visibility</Label>
                <Select 
                  value={profileData.profileVisibility} 
                  onValueChange={(value) => handleInputChange("profileVisibility", value)}
                  disabled={!isEditing}
                >
                  <SelectTrigger className="bg-input-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="friends">Friends Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

          <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Email Address</Label>
                  <p className="text-sm text-muted-foreground">
                      Allow others to see your email address
                    </p>
                  </div>
                  <Switch
                    checked={profileData.showEmail}
                    onCheckedChange={(checked) => handleInputChange("showEmail", checked)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Phone Number</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow others to see your phone number
                    </p>
                  </div>
                  <Switch
                    checked={profileData.showPhone}
                    onCheckedChange={(checked) => handleInputChange("showPhone", checked)}
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